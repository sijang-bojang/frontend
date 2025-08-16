import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Supabase 환경변수(EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY)가 설정되지 않았습니다."
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
