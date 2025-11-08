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
          user_id: string
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
          user_id: string
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
          user_id?: string
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
      clinics: {
        Row: {
          address: string
          created_at: string | null
          description: string | null
          email: string | null
          id: string
          is_open: boolean | null
          name: string
          operating_hours: Json | null
          phone: string
          rating: number | null
          type: string
          updated_at: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_open?: boolean | null
          name: string
          operating_hours?: Json | null
          phone: string
          rating?: number | null
          type: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_open?: boolean | null
          name?: string
          operating_hours?: Json | null
          phone?: string
          rating?: number | null
          type?: string
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
          clinic_id: string
          created_at: string | null
          estimated_wait_time: number | null
          id: string
          queue_number: number
          status: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          clinic_id: string
          created_at?: string | null
          estimated_wait_time?: number | null
          id?: string
          queue_number: number
          status?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          clinic_id?: string
          created_at?: string | null
          estimated_wait_time?: number | null
          id?: string
          queue_number?: number
          status?: string
          updated_at?: string | null
          user_id?: string | null
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
      [_ in never]: never
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
