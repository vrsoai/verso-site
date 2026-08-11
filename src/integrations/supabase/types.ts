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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      conversations: {
        Row: {
          context_mode: string | null
          created_at: string
          device_id: string | null
          device_info: Json | null
          extension_version: string | null
          id: string
          locale: string | null
          source_conversation_id: string | null
          source_message_count: number | null
          source_metadata: Json | null
          source_model: string | null
          source_plan_type: string | null
          source_platform: string | null
          source_title: string | null
          timezone: string | null
          trigger_type: string | null
          updated_at: string | null
          user_id: string
          verso_model: string | null
        }
        Insert: {
          context_mode?: string | null
          created_at?: string
          device_id?: string | null
          device_info?: Json | null
          extension_version?: string | null
          id?: string
          locale?: string | null
          source_conversation_id?: string | null
          source_message_count?: number | null
          source_metadata?: Json | null
          source_model?: string | null
          source_plan_type?: string | null
          source_platform?: string | null
          source_title?: string | null
          timezone?: string | null
          trigger_type?: string | null
          updated_at?: string | null
          user_id: string
          verso_model?: string | null
        }
        Update: {
          context_mode?: string | null
          created_at?: string
          device_id?: string | null
          device_info?: Json | null
          extension_version?: string | null
          id?: string
          locale?: string | null
          source_conversation_id?: string | null
          source_message_count?: number | null
          source_metadata?: Json | null
          source_model?: string | null
          source_plan_type?: string | null
          source_platform?: string | null
          source_title?: string | null
          timezone?: string | null
          trigger_type?: string | null
          updated_at?: string | null
          user_id?: string
          verso_model?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          conversation_id: string | null
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          source_platform: string | null
          user_id: string
          pair_id: string | null
          panel_id: string | null
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          source_platform?: string | null
          user_id: string
          pair_id?: string | null
          panel_id?: string | null
        }
        Update: {
          conversation_id?: string | null
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          source_platform?: string | null
          user_id?: string
          pair_id?: string | null
          panel_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversation_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          model_name: string
          order_index: number
          response_metadata: Json | null
          role: string
          input_tokens: number | null
          output_tokens: number | null
          thinking_tokens: number | null
          total_response_ms: number | null
          ttfs_ms: number | null
          finish_reason: string | null
          grounding_source_count: number
          grounding_sources: Json
          thinking_content: string | null
          code_executions: Json
          attached_files: Json
          was_aborted: boolean
          provider: string | null
          model_version_raw: string | null
          captured_at: string | null
          capture_source: string | null
          pair_id: string | null
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          model_name: string
          order_index: number
          response_metadata?: Json | null
          role: string
          input_tokens?: number | null
          output_tokens?: number | null
          thinking_tokens?: number | null
          total_response_ms?: number | null
          ttfs_ms?: number | null
          finish_reason?: string | null
          grounding_source_count?: number
          grounding_sources?: Json
          thinking_content?: string | null
          code_executions?: Json
          attached_files?: Json
          was_aborted?: boolean
          provider?: string | null
          model_version_raw?: string | null
          captured_at?: string | null
          capture_source?: string | null
          pair_id?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          model_name?: string
          order_index?: number
          response_metadata?: Json | null
          role?: string
          input_tokens?: number | null
          output_tokens?: number | null
          thinking_tokens?: number | null
          total_response_ms?: number | null
          ttfs_ms?: number | null
          finish_reason?: string | null
          grounding_source_count?: number
          grounding_sources?: Json
          thinking_content?: string | null
          code_executions?: Json
          attached_files?: Json
          was_aborted?: boolean
          provider?: string | null
          model_version_raw?: string | null
          captured_at?: string | null
          capture_source?: string | null
          pair_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversation_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      ratings: {
        Row: {
          conversation_id: string
          created_at: string
          id: string
          rating: string
          updated_at: string
          user_id: string
          user_prompt: string | null
          verso_model: string
          pair_id: string | null
          pair_id_source: string | null
        }
        Insert: {
          conversation_id: string
          created_at?: string
          id?: string
          rating: string
          updated_at?: string
          user_id: string
          user_prompt?: string | null
          verso_model: string
          pair_id?: string | null
          pair_id_source?: string | null
        }
        Update: {
          conversation_id?: string
          created_at?: string
          id?: string
          rating?: string
          updated_at?: string
          user_id?: string
          user_prompt?: string | null
          verso_model?: string
          pair_id?: string | null
          pair_id_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: true
            referencedRelation: "conversation_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: true
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          age_range: string | null
          auth_user_id: string | null
          avatar_url: string | null
          chrome_instance_id: string | null
          created_at: string
          display_name: string | null
          email: string | null
          gender: string | null
          id: string
          profession: string | null
          profile_completed_at: string | null
          updated_at: string
          panel_id: string | null
        }
        Insert: {
          age_range?: string | null
          auth_user_id?: string | null
          avatar_url?: string | null
          chrome_instance_id?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          gender?: string | null
          id?: string
          profession?: string | null
          profile_completed_at?: string | null
          updated_at?: string
          panel_id?: string | null
        }
        Update: {
          age_range?: string | null
          auth_user_id?: string | null
          avatar_url?: string | null
          chrome_instance_id?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          gender?: string | null
          id?: string
          profession?: string | null
          profile_completed_at?: string | null
          updated_at?: string
          panel_id?: string | null
        }
        Relationships: []
      }
      waiting_list: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      conversation_list: {
        Row: {
          context_mode: string | null
          created_at: string | null
          id: string | null
          message_count: number | null
          source_conversation_id: string | null
          source_model: string | null
          source_platform: string | null
          title: string | null
          trigger_type: string | null
          user_id: string | null
          verso_model: string | null
        }
        Insert: {
          context_mode?: string | null
          created_at?: string | null
          id?: string | null
          message_count?: never
          source_conversation_id?: string | null
          source_model?: string | null
          source_platform?: string | null
          title?: never
          trigger_type?: string | null
          user_id?: string | null
          verso_model?: string | null
        }
        Update: {
          context_mode?: string | null
          created_at?: string | null
          id?: string | null
          message_count?: never
          source_conversation_id?: string | null
          source_model?: string | null
          source_platform?: string | null
          title?: never
          trigger_type?: string | null
          user_id?: string | null
          verso_model?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
      increment_visit_count: {
        Args: { profile_id: string }
        Returns: undefined
      }
      requesting_chrome_instance_id: { Args: never; Returns: string }
      requesting_user_ids: { Args: never; Returns: string[] }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
