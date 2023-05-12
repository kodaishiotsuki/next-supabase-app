// Supabase Client
import { headers, cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "./database.types";

// Create a client instance
export const createClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
