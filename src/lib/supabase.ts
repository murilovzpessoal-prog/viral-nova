import { createClient } from '@supabase/supabase-js';

// @ts-ignore
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// @ts-ignore
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadImageToSupabase = async (
  file: File,
  bucketName: string,
  userId: string
): Promise<string | null> => {
  try {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max dimensions
          const MAX_SIZE = 800;
          if (width > height && width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.7 quality to ensure small base64 payload
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(dataUrl);
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Exception uploading image:', error);
    return null;
  }
};

// ==========================================
// DRAFTS
// ==========================================
export const saveDraft = async (userId: string, draft: any) => {
  const { error } = await supabase.from('drafts').upsert({
    id: draft.id,
    user_id: userId,
    name: draft.name,
    media: draft.media,
    timeline_videos: draft.timelineVideos,
    timeline_texts: draft.timelineTexts,
    updated_at: new Date().toISOString()
  }, { onConflict: 'id' });
  if (error) console.error('Error saving draft:', error);
};

export const getDrafts = async (userId: string) => {
  // Fetch drafts younger than 7 days (the DB trigger also deletes them)
  const { data, error } = await supabase
    .from('drafts')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .order('updated_at', { ascending: false });
  
  if (error) {
    console.error('Error getting drafts:', error);
    return [];
  }
  return data.map(d => ({
    id: d.id,
    name: d.name,
    updatedAt: new Date(d.updated_at).getTime(),
    media: d.media,
    timelineVideos: d.timeline_videos,
    timelineTexts: d.timeline_texts
  }));
};

// ==========================================
// CUSTOM AVATARS
// ==========================================
export const saveCustomAvatar = async (userId: string, avatar: any) => {
  const { error } = await supabase.from('custom_avatars').upsert({
    id: avatar.id,
    user_id: userId,
    name: avatar.name,
    image: avatar.image
  });
  if (error) console.error('Error saving custom avatar:', error);
};

export const getCustomAvatars = async (userId: string) => {
  const { data, error } = await supabase
    .from('custom_avatars')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error getting custom avatars:', error);
    return [];
  }
  return data.map(d => ({
    id: d.id,
    name: d.name,
    image: d.image
  }));
};

export const deleteCustomAvatarDB = async (userId: string, id: string) => {
  const { error } = await supabase
    .from('custom_avatars')
    .delete()
    .match({ id, user_id: userId });
  if (error) console.error('Error deleting avatar:', error);
};

// ==========================================
// CUSTOM PRODUCTS
// ==========================================
export const saveCustomProduct = async (userId: string, product: any) => {
  const { error } = await supabase.from('custom_products').upsert({
    id: product.id,
    user_id: userId,
    name: product.name,
    image: product.image,
    price: product.price || "R$ 0,00"
  });
  if (error) console.error('Error saving custom product:', error);
};

export const getCustomProducts = async (userId: string) => {
  const { data, error } = await supabase
    .from('custom_products')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error getting custom products:', error);
    return [];
  }
  return data.map(d => ({
    id: d.id,
    name: d.name,
    image: d.image,
    price: d.price
  }));
};

export const deleteCustomProductDB = async (userId: string, id: string) => {
  const { error } = await supabase
    .from('custom_products')
    .delete()
    .match({ id, user_id: userId });
  if (error) console.error('Error deleting product:', error);
};
