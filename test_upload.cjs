const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function testUpload() {
  try {
    console.log("Starting upload test to 'avatars' bucket...");
    // Create a dummy text file to act as our "image" blob
    const dummyBlob = new Blob(['dummy content'], { type: 'text/plain' });
    const file = new File([dummyBlob], 'dummy.txt', { type: 'text/plain' });
    
    // Simulate user upload
    const fileName = `test-user-${Math.random().toString(36).substring(2, 15)}.txt`;
    
    console.log("Uploading file:", fileName);
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error('Upload Error:', uploadError);
      return;
    }
    
    console.log("Upload Success:", uploadData);
    
    const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(fileName);
    console.log("Public URL:", urlData.publicUrl);
    
    // Test fetch
    const response = await fetch(urlData.publicUrl);
    console.log("Fetch Status:", response.status);
    
  } catch (err) {
    console.error("Exception:", err);
  }
}

testUpload();
