// ===== Too Easy — Supabase connection =====
// Loaded via CDN script tag before this file on any page that uses it.
const SUPABASE_URL = 'https://rwlczmarwbsxyelpcshc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_CXd10vVinJnpUJkQTbn-ew_7zbQeHKb';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchProducts() {
  const { data, error } = await sb.from('products').select('*').order('collection').order('id');
  if (error) { console.error('fetchProducts error:', error); return []; }
  return data;
}

async function addProduct(product) {
  const { data, error } = await sb.from('products').insert([product]).select();
  if (error) { console.error('addProduct error:', error); return null; }
  return data[0];
}

async function updateProduct(id, updates) {
  const { data, error } = await sb.from('products').update(updates).eq('id', id).select();
  if (error) { console.error('updateProduct error:', error); return null; }
  return data[0];
}

async function deleteProduct(id) {
  const { error } = await sb.from('products').delete().eq('id', id);
  if (error) { console.error('deleteProduct error:', error); return false; }
  return true;
}

async function uploadProductImage(file) {
  const fileName = Date.now() + '-' + file.name.replace(/\s+/g, '-');
  const { data, error } = await sb.storage.from('product-images').upload(fileName, file);
  if (error) { console.error('uploadProductImage error:', error); return null; }
  const { data: urlData } = sb.storage.from('product-images').getPublicUrl(fileName);
  return urlData.publicUrl;
}

async function adminLogin(email, password) {
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) { return { ok: false, message: error.message }; }
  return { ok: true, session: data.session };
}

async function adminLogout() {
  await sb.auth.signOut();
}

async function getSession() {
  const { data } = await sb.auth.getSession();
  return data.session;
}
