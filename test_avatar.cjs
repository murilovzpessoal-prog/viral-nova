const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase.from('profiles').select('avatar_url').not('avatar_url', 'is', null).limit(1);
  if (error) {
    console.error("DB Error:", error);
    return;
  }
  console.log("Found profile avatars:", data);
  if (data && data.length > 0 && data[0].avatar_url) {
    console.log("Testing URL fetch for:", data[0].avatar_url);
    const res = await fetch(data[0].avatar_url);
    console.log("Fetch status:", res.status, res.statusText);
    console.log("Content-Type:", res.headers.get('content-type'));
    const body = await res.text();
    console.log("Body snippet:", body.substring(0, 100));
  }
}
test();
