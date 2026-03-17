import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSchema() {
  const { data, error } = await supabase.from('profiles').select('*').limit(1);
  console.log("Profiles output:");
  console.log(data);
  if (error) console.error("Error:", error);
}

checkSchema();
