export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          cancellation_reason: string | null
          cancelled_at: string | null
          clinic_id: string
          created_at: string | null
          doctor_id: string | null
          id: string
          notes: string | null
          reason: string | null
          status: string
          treatment_category_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          clinic_id: string
          created_at?: string | null
          doctor_id?: string | null
          id?: string
          notes?: string | null
          reason?: string | null
          status?: string
          treatment_category_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          cancellation_reason?: string | null
          cancelled_at?: string | null
          clinic_id?: string
          created_at?: string | null
          doctor_id?: string | null
          id?: string
          notes?: string | null
          reason?: string | null
          status?: string
          treatment_category_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_treatment_category_id_fkey"
            columns: ["treatment_category_id"]
            isOneToOne: false
            referencedRelation: "treatment_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_analytics: {
        Row: {
          appointment_date: string
          booking_date: string
          booking_window_days: number | null
          clinic_id: string
          created_at: string | null
          id: string
          is_return_patient: boolean | null
          time_slot: string | null
          user_id: string | null
        }
        Insert: {
          appointment_date: string
          booking_date: string
          booking_window_days?: number | null
          clinic_id: string
          created_at?: string | null
          id?: string
          is_return_patient?: boolean | null
          time_slot?: string | null
          user_id?: string | null
        }
        Update: {
          appointment_date?: string
          booking_date?: string
          booking_window_days?: number | null
          clinic_id?: string
          created_at?: string | null
          id?: string
          is_return_patient?: boolean | null
          time_slot?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_analytics_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_leads: {
        Row: {
          booking_type: string
          case_id: string | null
          clinic_id: string | null
          clinic_name: string | null
          created_at: string
          id: string
          mobile_number: string
          patient_name: string
          redirect_type: string | null
          redirect_url: string | null
          source: string
          status: string
        }
        Insert: {
          booking_type?: string
          case_id?: string | null
          clinic_id?: string | null
          clinic_name?: string | null
          created_at?: string
          id?: string
          mobile_number: string
          patient_name: string
          redirect_type?: string | null
          redirect_url?: string | null
          source?: string
          status?: string
        }
        Update: {
          booking_type?: string
          case_id?: string | null
          clinic_id?: string | null
          clinic_name?: string | null
          created_at?: string
          id?: string
          mobile_number?: string
          patient_name?: string
          redirect_type?: string | null
          redirect_url?: string | null
          source?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_leads_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      clinic_onboarding_requests: {
        Row: {
          clinic_name: string
          clinic_type: string
          contact_person: string
          created_at: string
          id: string
          phone: string
          website: string | null
        }
        Insert: {
          clinic_name: string
          clinic_type: string
          contact_person: string
          created_at?: string
          id?: string
          phone: string
          website?: string | null
        }
        Update: {
          clinic_name?: string
          clinic_type?: string
          contact_person?: string
          created_at?: string
          id?: string
          phone?: string
          website?: string | null
        }
        Relationships: []
      }
      clinics: {
        Row: {
          address: string
          awards: Json | null
          booking_url: string | null
          created_at: string | null
          description: string | null
          email: string | null
          has_digital_queue: boolean | null
          id: string
          is_nmg_affiliated: boolean | null
          is_open: boolean | null
          name: string
          operating_hours: Json | null
          phase2_enabled: boolean | null
          phone: string
          rating: number | null
          type: string
          updated_at: string | null
        }
        Insert: {
          address: string
          awards?: Json | null
          booking_url?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          has_digital_queue?: boolean | null
          id?: string
          is_nmg_affiliated?: boolean | null
          is_open?: boolean | null
          name: string
          operating_hours?: Json | null
          phase2_enabled?: boolean | null
          phone: string
          rating?: number | null
          type: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          awards?: Json | null
          booking_url?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          has_digital_queue?: boolean | null
          id?: string
          is_nmg_affiliated?: boolean | null
          is_open?: boolean | null
          name?: string
          operating_hours?: Json | null
          phase2_enabled?: boolean | null
          phone?: string
          rating?: number | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      consultant_clinic_recommendations: {
        Row: {
          clinic_id: string
          consultant_id: string
          created_at: string | null
          id: string
        }
        Insert: {
          clinic_id: string
          consultant_id: string
          created_at?: string | null
          id?: string
        }
        Update: {
          clinic_id?: string
          consultant_id?: string
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "consultant_clinic_recommendations_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultant_clinic_recommendations_consultant_id_fkey"
            columns: ["consultant_id"]
            isOneToOne: false
            referencedRelation: "consultants"
            referencedColumns: ["id"]
          },
        ]
      }
      consultants: {
        Row: {
          areas_of_focus: string[] | null
          created_at: string | null
          full_bio: string | null
          id: string
          is_active: boolean | null
          name: string
          patient_types: string[] | null
          photo_url: string | null
          services_offered: string[] | null
          short_bio: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          areas_of_focus?: string[] | null
          created_at?: string | null
          full_bio?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          patient_types?: string[] | null
          photo_url?: string | null
          services_offered?: string[] | null
          short_bio?: string | null
          title?: string
          updated_at?: string | null
        }
        Update: {
          areas_of_focus?: string[] | null
          created_at?: string | null
          full_bio?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          patient_types?: string[] | null
          photo_url?: string | null
          services_offered?: string[] | null
          short_bio?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      doctors: {
        Row: {
          availability: Json | null
          bio: string | null
          clinic_id: string | null
          created_at: string | null
          id: string
          is_verified: boolean | null
          languages: string[] | null
          name: string
          photo_url: string | null
          qualifications: string | null
          registration_no: string | null
          specialty: string | null
          years_of_practice: number | null
        }
        Insert: {
          availability?: Json | null
          bio?: string | null
          clinic_id?: string | null
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          languages?: string[] | null
          name: string
          photo_url?: string | null
          qualifications?: string | null
          registration_no?: string | null
          specialty?: string | null
          years_of_practice?: number | null
        }
        Update: {
          availability?: Json | null
          bio?: string | null
          clinic_id?: string | null
          created_at?: string | null
          id?: string
          is_verified?: boolean | null
          languages?: string[] | null
          name?: string
          photo_url?: string | null
          qualifications?: string | null
          registration_no?: string | null
          specialty?: string | null
          years_of_practice?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "doctors_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      managed_care_cases: {
        Row: {
          case_id: string
          case_type: string
          clinic_id: string | null
          clinic_name: string | null
          condition_concern: string
          contact_number: string
          created_at: string | null
          id: string
          patient_name: string
          preferred_location: string | null
          preferred_timing: string | null
          source: string
          status: string
          updated_at: string | null
          urgency: string
        }
        Insert: {
          case_id: string
          case_type?: string
          clinic_id?: string | null
          clinic_name?: string | null
          condition_concern: string
          contact_number: string
          created_at?: string | null
          id?: string
          patient_name: string
          preferred_location?: string | null
          preferred_timing?: string | null
          source?: string
          status?: string
          updated_at?: string | null
          urgency?: string
        }
        Update: {
          case_id?: string
          case_type?: string
          clinic_id?: string | null
          clinic_name?: string | null
          condition_concern?: string
          contact_number?: string
          created_at?: string | null
          id?: string
          patient_name?: string
          preferred_location?: string | null
          preferred_timing?: string | null
          source?: string
          status?: string
          updated_at?: string | null
          urgency?: string
        }
        Relationships: [
          {
            foreignKeyName: "managed_care_cases_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string | null
          date_of_birth: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      queue_entries: {
        Row: {
          check_in_code: string | null
          clinic_id: string
          created_at: string | null
          estimated_wait_time: number | null
          id: string
          mobile_number: string | null
          patient_name: string | null
          queue_number: number
          status: string
          updated_at: string | null
          user_id: string | null
          visit_type: string | null
        }
        Insert: {
          check_in_code?: string | null
          clinic_id: string
          created_at?: string | null
          estimated_wait_time?: number | null
          id?: string
          mobile_number?: string | null
          patient_name?: string | null
          queue_number: number
          status?: string
          updated_at?: string | null
          user_id?: string | null
          visit_type?: string | null
        }
        Update: {
          check_in_code?: string | null
          clinic_id?: string
          created_at?: string | null
          estimated_wait_time?: number | null
          id?: string
          mobile_number?: string | null
          patient_name?: string | null
          queue_number?: number
          status?: string
          updated_at?: string | null
          user_id?: string | null
          visit_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "queue_entries_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      queue_notifications: {
        Row: {
          clinic_id: string
          id: string
          message: string
          queue_entry_id: string
          read_at: string | null
          sent_at: string | null
          sent_by: string
          user_id: string
        }
        Insert: {
          clinic_id: string
          id?: string
          message: string
          queue_entry_id: string
          read_at?: string | null
          sent_at?: string | null
          sent_by: string
          user_id: string
        }
        Update: {
          clinic_id?: string
          id?: string
          message?: string
          queue_entry_id?: string
          read_at?: string | null
          sent_at?: string | null
          sent_by?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "queue_notifications_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "queue_notifications_queue_entry_id_fkey"
            columns: ["queue_entry_id"]
            isOneToOne: false
            referencedRelation: "queue_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      queue_statistics: {
        Row: {
          average_wait_time: number | null
          clinic_id: string
          created_at: string | null
          date: string
          id: string
          no_show_count: number | null
          peak_hour: number | null
          total_appointments: number | null
          total_patients: number | null
          updated_at: string | null
        }
        Insert: {
          average_wait_time?: number | null
          clinic_id: string
          created_at?: string | null
          date: string
          id?: string
          no_show_count?: number | null
          peak_hour?: number | null
          total_appointments?: number | null
          total_patients?: number | null
          updated_at?: string | null
        }
        Update: {
          average_wait_time?: number | null
          clinic_id?: string
          created_at?: string | null
          date?: string
          id?: string
          no_show_count?: number | null
          peak_hour?: number | null
          total_appointments?: number | null
          total_patients?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "queue_statistics_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      queue_verifications: {
        Row: {
          attempts: number
          clinic_id: string
          created_at: string
          device_fingerprint: string | null
          expires_at: string
          id: string
          ip_address: string | null
          mobile_number: string
          patient_name: string
          status: string
          verification_code: string
          verified_at: string | null
          visit_type: string
        }
        Insert: {
          attempts?: number
          clinic_id: string
          created_at?: string
          device_fingerprint?: string | null
          expires_at?: string
          id?: string
          ip_address?: string | null
          mobile_number: string
          patient_name: string
          status?: string
          verification_code: string
          verified_at?: string | null
          visit_type?: string
        }
        Update: {
          attempts?: number
          clinic_id?: string
          created_at?: string
          device_fingerprint?: string | null
          expires_at?: string
          id?: string
          ip_address?: string | null
          mobile_number?: string
          patient_name?: string
          status?: string
          verification_code?: string
          verified_at?: string | null
          visit_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "queue_verifications_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          clinic_id: string
          comment: string | null
          created_at: string | null
          id: string
          rating: number
          user_id: string
        }
        Insert: {
          clinic_id: string
          comment?: string | null
          created_at?: string | null
          id?: string
          rating: number
          user_id: string
        }
        Update: {
          clinic_id?: string
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      treatment_categories: {
        Row: {
          category_type: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          category_type: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          category_type?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          clinic_id: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          clinic_id?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          clinic_id?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      queue_stats_public: {
        Row: {
          clinic_id: string | null
          estimated_wait_minutes: number | null
          queue_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "queue_entries_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "clinic_staff" | "patient"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "clinic_staff", "patient"],
    },
  },
} as const
