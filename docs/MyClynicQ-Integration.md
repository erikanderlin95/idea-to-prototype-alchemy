# MyClynicQ Integration Architecture

## Overview
MyClynicQ is a conversational AI plugin that extends ClynicQ's patient engagement through WhatsApp, SMS, and embedded web chat. This document maps all integration points between the core ClynicQ platform and the future MyClynicQ chatbot plugin.

---

## 1. Database Integration Points

### 1.1 Appointments Table
**Purpose**: Access appointment data for confirmations, reminders, and rebooking

**Integration Requirements**:
- **READ**: Fetch upcoming appointments for reminder scheduling
- **READ**: Get appointment history for rebooking suggestions
- **UPDATE**: Modify appointment status based on patient responses
- **WEBHOOK**: Trigger bot messages on appointment state changes

**Key Fields Used**:
```sql
-- MyClynicQ will access:
appointments (
  id,                    -- Unique appointment reference
  user_id,              -- Patient identifier
  clinic_id,            -- Clinic context
  appointment_date,     -- For reminders
  appointment_time,     -- For reminders
  status,               -- Track confirmation/cancellation
  reason,               -- Context for conversation
  doctor_id,            -- Personalize messages
  cancellation_reason   -- Learn from cancellations
)
```

**RLS Considerations**:
- Bot will need service role access with patient consent
- Create dedicated `myclynicq_bot` role for secure access
- Log all bot-initiated data access for audit trail

---

### 1.2 Queue Entries Table
**Purpose**: Real-time queue position updates and notifications

**Integration Requirements**:
- **READ**: Monitor queue position changes
- **REALTIME**: Subscribe to queue updates for patient notifications
- **WEBHOOK**: Trigger messages when queue position reaches threshold

**Key Fields Used**:
```sql
queue_entries (
  id,
  clinic_id,
  user_id,
  queue_number,           -- Position in queue
  estimated_wait_time,    -- Calculate ETA
  status,                 -- waiting, called, completed
  created_at,             -- Track wait duration
  updated_at              -- Last position update
)
```

**Notification Triggers**:
- Position <= 3: "You're next! Please head to the clinic."
- Status = 'called': "It's your turn! Please proceed to Counter X."
- Wait time > expected: "Sorry for the delay. Updated wait time: X minutes."

---

### 1.3 Profiles Table
**Purpose**: Patient information for personalized conversations

**Integration Requirements**:
- **READ**: Get patient name, preferences, contact info
- **WRITE**: Update communication preferences (opt-in/opt-out)
- **EXTEND**: Add bot-specific preferences table

**Key Fields Used**:
```sql
profiles (
  id,
  full_name,              -- Personalize greetings
  phone,                  -- WhatsApp/SMS contact
  date_of_birth,          -- Age-appropriate messaging
  address                 -- Location-based suggestions
)
```

**Extension Table Needed**:
```sql
CREATE TABLE myclynicq_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  whatsapp_enabled BOOLEAN DEFAULT true,
  sms_enabled BOOLEAN DEFAULT true,
  reminder_hours_before INTEGER DEFAULT 24,
  language_preference TEXT DEFAULT 'en',
  timezone TEXT DEFAULT 'Asia/Singapore',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

### 1.4 Clinics Table
**Purpose**: Clinic context for bot conversations

**Integration Requirements**:
- **READ**: Get clinic details for responses
- **READ**: Operating hours for appointment suggestions
- **READ**: Contact info for escalation

**Key Fields Used**:
```sql
clinics (
  id,
  name,                   -- Clinic identification
  address,                -- Location info
  phone,                  -- Human escalation
  operating_hours,        -- Booking constraints
  type,                   -- GP, TCM, Wellness
  is_open                 -- Real-time availability
)
```

---

### 1.5 Chat Messages Table (Extended)
**Purpose**: Store bot conversation history

**Integration Requirements**:
- **CREATE**: New bot conversation table
- **READ**: Load conversation history for context
- **WRITE**: Log all bot interactions

**New Table Structure**:
```sql
CREATE TABLE myclynicq_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  channel TEXT NOT NULL, -- 'whatsapp', 'sms', 'web'
  phone_number TEXT,     -- For WhatsApp/SMS
  session_id TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE myclynicq_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES myclynicq_conversations(id),
  role TEXT NOT NULL,    -- 'user', 'assistant', 'system'
  content TEXT NOT NULL,
  intent TEXT,           -- 'book_appointment', 'cancel', 'query_status'
  metadata JSONB,        -- Store structured data
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

### 1.6 Queue Notifications Table (Extended)
**Purpose**: Track bot-sent notifications

**Integration Requirements**:
- **WRITE**: Log bot notifications
- **READ**: Prevent duplicate notifications
- **ANALYTICS**: Track notification effectiveness

**Extension Needed**:
```sql
ALTER TABLE queue_notifications ADD COLUMN IF NOT EXISTS channel TEXT DEFAULT 'app';
ALTER TABLE queue_notifications ADD COLUMN IF NOT EXISTS bot_sent BOOLEAN DEFAULT false;
ALTER TABLE queue_notifications ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMPTZ;
ALTER TABLE queue_notifications ADD COLUMN IF NOT EXISTS clicked BOOLEAN DEFAULT false;
```

---

## 2. API Integration Points

### 2.1 Webhook Endpoints (ClynicQ → MyClynicQ)

**Required Webhooks**:

```typescript
// POST /api/webhooks/appointment-created
{
  event: 'appointment.created',
  appointment_id: uuid,
  user_id: uuid,
  clinic_id: uuid,
  appointment_date: date,
  appointment_time: time
}

// POST /api/webhooks/appointment-updated
{
  event: 'appointment.updated',
  appointment_id: uuid,
  old_status: string,
  new_status: string,
  updated_at: timestamp
}

// POST /api/webhooks/queue-position-updated
{
  event: 'queue.position_updated',
  queue_entry_id: uuid,
  user_id: uuid,
  clinic_id: uuid,
  queue_number: integer,
  estimated_wait_time: integer
}

// POST /api/webhooks/appointment-reminder
{
  event: 'appointment.reminder',
  appointment_id: uuid,
  user_id: uuid,
  hours_before: integer,
  appointment_datetime: timestamp
}
```

**Implementation in ClynicQ**:
```typescript
// Create webhook service in ClynicQ
export const triggerWebhook = async (event: string, payload: any) => {
  const webhookUrl = import.meta.env.VITE_MYCLYNICQ_WEBHOOK_URL;
  
  if (!webhookUrl) return; // Plugin not enabled
  
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ClynicQ-Signature': generateSignature(payload)
      },
      body: JSON.stringify({
        event,
        payload,
        timestamp: new Date().toISOString()
      })
    });
  } catch (error) {
    console.error('Webhook delivery failed:', error);
  }
};
```

---

### 2.2 REST API Endpoints (MyClynicQ → ClynicQ)

**Required API Access**:

```typescript
// GET /api/appointments/:userId
// Response: List of user appointments
interface AppointmentsResponse {
  appointments: Array<{
    id: string;
    clinic_name: string;
    doctor_name: string;
    date: string;
    time: string;
    status: string;
  }>;
}

// POST /api/appointments/reschedule
// Request: Reschedule appointment
interface RescheduleRequest {
  appointment_id: string;
  new_date: string;
  new_time: string;
  reason?: string;
}

// DELETE /api/appointments/:appointmentId
// Request: Cancel appointment
interface CancelRequest {
  reason: string;
  notification_preference: 'none' | 'email' | 'sms';
}

// GET /api/queue/status/:clinicId/:userId
// Response: Current queue position
interface QueueStatusResponse {
  queue_number: number;
  estimated_wait_time: number;
  people_ahead: number;
  status: string;
}

// GET /api/clinics/:clinicId/availability
// Response: Available time slots
interface AvailabilityResponse {
  clinic_id: string;
  dates: Array<{
    date: string;
    slots: string[];
  }>;
}
```

---

## 3. Realtime Subscriptions

### 3.1 Queue Updates
```typescript
// MyClynicQ subscribes to queue changes
const subscribeToQueueUpdates = (userId: string) => {
  return supabase
    .channel(`queue-updates-${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'queue_entries',
        filter: `user_id=eq.${userId}`
      },
      (payload) => {
        // Trigger bot notification
        sendQueueUpdateMessage(payload.new);
      }
    )
    .subscribe();
};
```

### 3.2 Appointment Changes
```typescript
// Subscribe to appointment updates
const subscribeToAppointments = (userId: string) => {
  return supabase
    .channel(`appointments-${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'appointments',
        filter: `user_id=eq.${userId}`
      },
      (payload) => {
        sendAppointmentUpdateMessage(payload);
      }
    )
    .subscribe();
};
```

---

## 4. Edge Function Integration

### 4.1 Bot Handler Function
```typescript
// supabase/functions/myclynicq-handler/index.ts
// This will be called by WhatsApp/SMS webhooks

serve(async (req) => {
  const { message, from, channel } = await req.json();
  
  // 1. Identify or create user from phone number
  const user = await identifyUser(from);
  
  // 2. Load conversation context
  const conversation = await loadConversation(user.id, channel);
  
  // 3. Process message with AI (using Lovable AI)
  const intent = await detectIntent(message, conversation);
  
  // 4. Execute action based on intent
  switch (intent) {
    case 'book_appointment':
      return await handleBooking(user, message);
    case 'cancel_appointment':
      return await handleCancellation(user, message);
    case 'query_status':
      return await handleStatusQuery(user, message);
    default:
      return await handleGeneralQuery(user, message);
  }
});
```

### 4.2 Reminder Scheduler Function
```typescript
// supabase/functions/appointment-reminders/index.ts
// Runs on schedule (cron job)

serve(async (req) => {
  // Get appointments for tomorrow
  const { data: appointments } = await supabase
    .from('appointments')
    .select(`
      *,
      profiles!inner(*),
      clinics!inner(*),
      myclynicq_preferences!inner(*)
    `)
    .gte('appointment_date', tomorrow)
    .lte('appointment_date', tomorrow)
    .eq('status', 'confirmed');
  
  // Send reminders via enabled channels
  for (const apt of appointments) {
    if (apt.myclynicq_preferences.whatsapp_enabled) {
      await sendWhatsAppReminder(apt);
    }
    if (apt.myclynicq_preferences.sms_enabled) {
      await sendSMSReminder(apt);
    }
  }
});
```

---

## 5. Security & Authentication

### 5.1 Bot Service Account
```sql
-- Create dedicated bot role
CREATE TABLE myclynicq_service_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  api_key TEXT NOT NULL UNIQUE,
  permissions JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Bot permissions
{
  "appointments": ["read", "update"],
  "queue_entries": ["read"],
  "profiles": ["read"],
  "clinics": ["read"],
  "notifications": ["create"]
}
```

### 5.2 User Consent Management
```sql
CREATE TABLE myclynicq_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  consent_type TEXT NOT NULL, -- 'whatsapp', 'sms', 'data_processing'
  granted BOOLEAN DEFAULT false,
  granted_at TIMESTAMPTZ,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 6. Data Flow Diagrams

### 6.1 Appointment Booking Flow
```
Patient (WhatsApp) → MyClynicQ Bot → Edge Function
                                          ↓
                                   Parse Intent & Entities
                                          ↓
                                   Query Available Slots
                                   (GET /api/clinics/:id/availability)
                                          ↓
                                   Create Appointment
                                   (POST /api/appointments)
                                          ↓
                                   ClynicQ Database Update
                                          ↓
                                   Webhook Trigger
                                          ↓
                                   Confirmation Message → Patient
```

### 6.2 Queue Update Flow
```
Clinic Staff Updates Queue → ClynicQ Database
                                     ↓
                              Realtime Trigger
                                     ↓
                              MyClynicQ Subscriber
                                     ↓
                              Check User Preferences
                                     ↓
                              Send Notification (WhatsApp/SMS)
                                     ↓
                              Log Notification Delivery
```

---

## 7. Configuration & Feature Flags

### 7.1 Enable MyClynicQ Per Clinic
```sql
CREATE TABLE myclynicq_clinic_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id),
  enabled BOOLEAN DEFAULT false,
  whatsapp_enabled BOOLEAN DEFAULT false,
  sms_enabled BOOLEAN DEFAULT false,
  web_chat_enabled BOOLEAN DEFAULT true,
  whatsapp_business_number TEXT,
  twilio_phone_number TEXT,
  settings JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 7.2 Settings Schema
```json
{
  "reminder_hours_before": [24, 2],
  "auto_cancel_no_response_hours": 4,
  "language": "en",
  "working_hours": {
    "start": "09:00",
    "end": "18:00"
  },
  "fallback_to_human": true,
  "escalation_keywords": ["urgent", "emergency", "doctor"]
}
```

---

## 8. Analytics & Monitoring

### 8.1 Bot Analytics Table
```sql
CREATE TABLE myclynicq_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL, -- 'message_sent', 'intent_detected', 'action_completed'
  user_id UUID,
  conversation_id UUID,
  channel TEXT,
  intent TEXT,
  success BOOLEAN,
  response_time_ms INTEGER,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 8.2 Key Metrics to Track
- Message response time
- Intent detection accuracy
- Booking conversion rate
- Cancellation reasons
- Channel preferences
- Peak conversation times
- Escalation rate to human support

---

## 9. Migration Strategy

### Phase 1: Preparation (Week 1-2)
- [ ] Add webhook endpoints to ClynicQ
- [ ] Create MyClynicQ database tables
- [ ] Set up service account authentication
- [ ] Implement API endpoints for bot access

### Phase 2: Basic Bot (Week 3-4)
- [ ] Deploy embedded web chat widget
- [ ] Implement appointment status queries
- [ ] Add booking cancellation flow
- [ ] Enable appointment reminders

### Phase 3: Multi-Channel (Week 5-8)
- [ ] Integrate WhatsApp Business API
- [ ] Add Twilio SMS support
- [ ] Implement queue position updates
- [ ] Add rebooking suggestions

### Phase 4: Intelligence (Week 9-12)
- [ ] Enhanced intent detection with Lovable AI
- [ ] Personalized recommendations
- [ ] Predictive reminder timing
- [ ] Multi-language support

---

## 10. Rollout Plan

### Soft Launch
1. Enable for 1-2 pilot clinics
2. Web chat only initially
3. Monitor performance and gather feedback
4. Fix bugs and refine flows

### Limited Release
1. Add WhatsApp for pilot clinics
2. Expand to 5-10 clinics
3. A/B test message timing
4. Optimize based on analytics

### General Availability
1. Open to all ClynicQ clinics
2. Enable all channels (WhatsApp, SMS, Web)
3. Launch clinic admin dashboard
4. Provide customization options

---

## 11. Cost Considerations

### Per-Message Costs
- WhatsApp Business API: ~$0.005-0.01 per message
- Twilio SMS: ~$0.0075 per SMS
- Lovable AI: Usage-based pricing
- Storage: Minimal (conversation history)

### Pricing Model Options
1. **Freemium**: 100 messages/month free, then $0.02/message
2. **Tiered**: Small ($50/mo), Medium ($200/mo), Enterprise (custom)
3. **Per-Patient**: $0.50/patient/month for unlimited messages

---

## 12. Support & Documentation

### For Clinics
- Setup guide
- Customization options
- Conversation flow examples
- Troubleshooting guide
- Analytics interpretation

### For Developers
- API documentation
- Webhook specifications
- Edge function examples
- Database schema reference
- Integration testing guide

---

## Next Steps

1. **Review this architecture** with stakeholders
2. **Prioritize features** for Phase 1
3. **Set up development environment** for MyClynicQ
4. **Create initial database migrations** for integration tables
5. **Build webhook infrastructure** in ClynicQ
6. **Develop basic bot prototype** with web chat

---

**Last Updated**: [Current Date]
**Version**: 1.0
**Maintained By**: ClynicQ Development Team
