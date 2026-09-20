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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: { id: string; customer_name: string; customer_whatsapp: string; start_date: string; end_date: string; status: "pending" | "confirmed" | "completed" | "cancelled"; notes: string | null; created_at: string; updated_at: string }
        Insert: { id?: string; customer_name: string; customer_whatsapp: string; start_date: string; end_date: string; status?: "pending" | "confirmed" | "completed" | "cancelled"; notes?: string | null; created_at?: string; updated_at?: string }
        Update: { customer_name?: string; customer_whatsapp?: string; start_date?: string; end_date?: string; status?: "pending" | "confirmed" | "completed" | "cancelled"; notes?: string | null; updated_at?: string }
        Relationships: []
      }
      booking_items: {
        Row: { id: string; booking_id: string; product_id: string; price: number; created_at: string }
        Insert: { id?: string; booking_id: string; product_id: string; price?: number; created_at?: string }
        Update: { booking_id?: string; product_id?: string; price?: number }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          product_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          product_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_skus: {
        Row: { id: string; product_id: string; sku: string; name: string; image_url: string | null; price: number | null; stock: number; status: boolean; created_at: string; updated_at: string }
        Insert: { id?: string; product_id: string; sku: string; name?: string; image_url?: string | null; price?: number | null; stock?: number; status?: boolean; created_at?: string; updated_at?: string }
        Update: { sku?: string; name?: string; image_url?: string | null; price?: number | null; stock?: number; status?: boolean; updated_at?: string }
        Relationships: []
      }
      products: {
        Row: {
          category_id: string | null
          deposit: number | null
          created_at: string
          description: string | null
          discount_price: number | null
          id: string
          main_image: string | null
          has_multiple_skus: boolean
          name: string
          minimum_rental_days: number | null
          pinned: boolean
          price: number
          rental_worth: number | null
          slug: string
          status: boolean
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          deposit?: number | null
          created_at?: string
          description?: string | null
          discount_price?: number | null
          id?: string
          main_image?: string | null
          has_multiple_skus?: boolean
          name: string
          minimum_rental_days?: number | null
          pinned?: boolean
          price?: number
          rental_worth?: number | null
          slug: string
          status?: boolean
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          deposit?: number | null
          created_at?: string
          description?: string | null
          discount_price?: number | null
          id?: string
          main_image?: string | null
          has_multiple_skus?: boolean
          name?: string
          minimum_rental_days?: number | null
          pinned?: boolean
          price?: number
          rental_worth?: number | null
          slug?: string
          status?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          business_name: string
          catalog_slug: string
          catalog_visible: boolean
          default_product_order: string
          id: string
          instagram: string | null
          logo_url: string | null
          maps_url: string | null
          minimum_rental_days: number
          show_rental_dates: boolean
          social_link_style: string
          store_address: string | null
          catalog_appearance?: Json
          store_name_font: string
          tagline: string | null
          tiktok: string | null
          updated_at: string
          whatsapp_number: string
        }
        Insert: {
          business_name?: string
          catalog_slug?: string
          catalog_visible?: boolean
          default_product_order?: string
          id?: string
          instagram?: string | null
          logo_url?: string | null
          maps_url?: string | null
          minimum_rental_days?: number
          show_rental_dates?: boolean
          social_link_style?: string
          store_address?: string | null
          catalog_appearance?: Json
          store_name_font?: string
          tagline?: string | null
          tiktok?: string | null
          updated_at?: string
          whatsapp_number?: string
        }
        Update: {
          business_name?: string
          catalog_slug?: string
          catalog_visible?: boolean
          default_product_order?: string
          id?: string
          instagram?: string | null
          logo_url?: string | null
          maps_url?: string | null
          minimum_rental_days?: number
          show_rental_dates?: boolean
          social_link_style?: string
          store_address?: string | null
          catalog_appearance?: Json
          store_name_font?: string
          tagline?: string | null
          tiktok?: string | null
          updated_at?: string
          whatsapp_number?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_admin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "user"],
    },
  },
} as const
