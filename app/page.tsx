'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Trophy, Users, Calendar, Award, Send, CheckCircle, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    child_age: '9',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: submitError } = await supabase
        .from('applications')
        .insert([formData]);

      if (submitError) throw submitError;

      setSubmitted(true);
      setFormData({
        full_name: '',
        phone: '',
        child_age: '9',
        notes: '',
      });
    } catch (err: any) {
      setError(err.message || 'Başvuru gönderilirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Üst Menü */}
      <header className="bg-slate-900 text-white py-4 px-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-extrabold tracking-tight">Atletizm Kulübü</h1>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="hover:text-amber-400 transition">Ana Sayfa</a>
            <a href="#program" className="hover:text-amber-400 transition">Program</a>
            <a href="#iletisim" className="hover:text-amber-400 transition">İletişim</a>
            <Link href="/admin" className="text-slate-400 hover:text-white transition flex items-center gap-1">
              <Shield className="w-4 h-4" /> Yönetici
            </Link>
          </nav>
          <a href="#kayit" className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-5 py-2 rounded-lg font-bold text-sm shadow transition">
            Kayıt Ol
          </a>
        </div>
      </header>

      {/* Hero Header */}
      <section className="bg-gradient-to-r from-blue-950 to-indigo-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-4">
            <Trophy className="w-10 h-10 text-amber-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Geleceğin Atletleri Burada Başlar
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Çocukların fiziksel gelişimini destekleyen, disiplinli, eğlenceli ve güvenli bir atletizm ortamı.
          </p>
          <a href="#kayit" className="inline-block bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold px-8 py-3.5 rounded-xl shadow-lg transition">
            Hemen Kayıt Ol &gt;
          </a>
        </div>
      </section>

      {/* Hakkımızda Bölümü ve Kartlar */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Hakkımızda</h3>
          <p className="text-slate-600 leading-relaxed">
            Atletizm Kulübü, çocukların sporla büyümesini, sağlıklı, özgüvenli ve disiplinli bireyler olarak gelişmesini hedefleyen bir gençlik atletizm kulübüdür. Deneyimli antrenörlerimizle, yaş gruplarına uygun antrenmanlar sunarak atletizmin temel branşlarında yeteneklerini keşfetmelerine destek oluyoruz.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h4 className="font-bold text-lg mb-2">Disiplinli ve planlı antrenmanlar</h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <Award className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h4 className="font-bold text-lg mb-2">Sporla özgüven, başarıya motivasyon</h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h4 className="font-bold text-lg mb-2">Sosyal, eğlenceli ve destekleyici bir ortam</h4>
          </div>
        </div>
      </section>

      {/* Antrenman Programı Tablosu */}
      <section id="program" className="py-12 max-w-5xl mx-auto px-4">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Antrenman Programı</h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-950 text-white text-sm font-bold">
                <th className="p-4">Gün</th>
                <th className="p-4">Saat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              <tr>
                <td className="p-4 font-semibold text-slate-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" /> Pazartesi
                </td>
                <td className="p-4 text-slate-600">17:30 - 18:30</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" /> Çarşamba
                </td>
                <td className="p-4 text-slate-600">17:30 - 18:30</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" /> Cumartesi
                </td>
                <td className="p-4 text-slate-600">11:00 - 12:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Kayıt Başvurusu Formu */}
      <section id="kayit" className="py-16 bg-slate-100 border-t border-slate-200 px-4">
        <div className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-slate-200">
          <h3 className="text-2xl font-bold text-center mb-2 text-slate-900">Kayıt Başvurusu</h3>
          <p className="text-center text-slate-600 text-sm mb-6">Aşağıdaki formu doldurarak kulübümüze başvuru yapabilirsiniz.</p>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center">
              <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h4 className="font-bold text-lg mb-1">Başvurunuz alındı</h4>
              <p className="text-sm">En kısa sürede sizinle iletişime geçeceğiz.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-4 text-sm text-emerald-700 underline font-medium"
              >
                Yeni Başvuru Yap
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Ad Soyad *</label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  placeholder="Adım ve soyadım"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Telefon *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  placeholder="0500 XXX XX XX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Çocuğun Yaşı *</label>
                <select
                  value={formData.child_age}
                  onChange={(e) => setFormData({ ...formData, child_age: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm"
                >
                  {[7, 8, 9, 10, 11, 12, 13, 14, 15].map((age) => (
                    <option key={age} value={age}>{age} Yaş</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Not (isteğe bağlı)</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  placeholder="Varsa eklemek istediğiniz not yetin..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-3 rounded-lg shadow transition flex items-center justify-center gap-2"
              >
                {loading ? 'Gönderiliyor...' : (
                  <>
                    <Send className="w-4 h-4" />
                    Gönder
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer (Alt Bilgi) */}
      <footer id="iletisim" className="bg-blue-950 text-white py-8 px-6 border-t border-blue-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <h2 className="text-lg font-bold">Atletizm Kulübü</h2>
          <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-slate-300">
            <span>📞 0 (532) 123 45 67</span>
            <span>📍 Atatürk Cad. No: 24, Kadıköy / İstanbul</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="w-9 h-9 bg-blue-900 hover:bg-blue-800 rounded-full flex items-center justify-center transition">IG</a>
            <a href="#" className="w-9 h-9 bg-blue-900 hover:bg-blue-800 rounded-full flex items-center justify-center transition">FB</a>
          </div>
        </div>
      </footer>
    </div>
  );
}