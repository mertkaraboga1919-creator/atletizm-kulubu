import { createClient } from '@supabase/supabase-js';

// Supabase istemcisini güvenli şekilde tanımlıyoruz
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function submitApplication(formData: {
  full_name: string;
  phone: string;
  child_age: string;
}) {
  try {
    // 1. Temel Girdi Doğrulama (Validation & Sanitization)
    const fullName = formData.full_name?.trim();
    const phone = formData.phone?.trim();
    const childAge = formData.child_age?.trim();

    if (!fullName || fullName.length < 3) {
      return { success: false, error: 'Lütfen geçerli bir ad ve soyad girin.' };
    }

    if (!phone || phone.length < 10) {
      return { success: false, error: 'Lütfen geçerli bir telefon numarası girin.' };
    }

    // 2. Supabase Veritabanına Güvenli Kayıt Ekleme
    const { error } = await supabase.from('applications').insert([
      {
        full_name: fullName,
        phone: phone,
        child_age: childAge,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Supabase kayıt hatası:', error.message);
      return { success: false, error: 'Kayıt oluşturulurken bir veritabanı hatası oluştu.' };
    }

    return { success: true, message: 'Başvurunuz başarıyla alındı!' };
  } catch (err) {
    console.error('Beklenmeyen hata:', err);
    return { success: false, error: 'Sunucu tarafında bir hata oluştu.' };
  }
}