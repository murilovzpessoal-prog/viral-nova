import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function checkSchema2() {
  const { data, error } = await supabase.from('profiles').select('custom_avatars').limit(1);
  console.log("Error:", error?.message || "No error");
}
checkSchema2();
