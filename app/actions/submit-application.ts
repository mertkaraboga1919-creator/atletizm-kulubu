'use server';

import { createClient } from '@supabase/supabase-js';

// Supabase istemcisini sunucu tarafında güvenli şekilde tanımlıyoruz
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function submitApplication(formData: {
  full_name: string;
  phone: string;
  child_age: string;
}) {
  try {
    const { full_name, phone, child_age } = formData;

    // --- SUNUCU TARAFI GÜVENLİK DOĞRULAMALARI (Server-Side Validation) ---
    
    // 1. Alanların boş olup olmadığını kontrol et
    if (!full_name || !phone || !child_age) {
      return { success: false, error: 'Tüm alanların doldurulması zorunludur.' };
    }

    // 2. Ad Soyad uzunluk kontrolü
    const trimmedName = full_name.trim();
    if (trimmedName.length < 3 || trimmedName.length > 100) {
      return { success: false, error: 'Geçersiz ad soyad uzunluğu.' };
    }

    // 3. Telefon numarası format ve rakam kontrolü (Sadece rakam, boşluk ve artı (+) karakterine izin ver)
    const phoneRegex = /^[0-9+\s()-]{7,15}$/;
    if (!phoneRegex.test(phone)) {
      return { success: false, error: 'Lütfen geçerli bir telefon numarası girin.' };
    }

    // 4. Yaş kontrolü (Örn: 6 - 15 yaş arası olmalı)
    const ageNum = parseInt(child_age, 10);
    if (isNaN(ageNum) || ageNum < 6 || ageNum > 15) {
      return { success: false, error: 'Geçersiz yaş seçimi.' };
    }

    // --- VERİTABANINA GÜVENLİ KAYIT ---
    const { error } = await supabase.from('applications').insert([
      {
        full_name: trimmedName,
        phone: phone.trim(),
        child_age: ageNum,
      },
    ]);

    if (error) {
      console.error('Supabase kayıt hatası:', error.message);
      return { success: false, error: 'Veritabanına kaydedilirken bir hata oluştu.' };
    }

    return { success: true, message: 'Başvurunuz başarıyla alındı!' };
  } catch (err) {
    console.error('Sunucu hatası:', err);
    return { success: false, error: 'Beklenmeyen bir sunucu hatası oluştu.' };
  }
}