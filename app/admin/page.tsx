'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash2, LogOut, Search, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [applications, setApplications] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Yönetici Giriş Kontrolü
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@atletizm.com' && password === '123456') {
      setIsLoggedIn(true);
      setLoginError('');
      fetchApplications();
    } else {
      setLoginError('Geçersiz e-posta veya şifre!');
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setApplications(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bu başvuruyu silmek istediğinizden emin misiniz?')) {
      const { error } = await supabase.from('applications').delete().eq('id', id);
      if (!error) {
        setApplications(applications.filter((app) => app.id !== id));
      } else {
        alert('Silinirken bir hata oluştu.');
      }
    }
  };

  // Arama filtresi (ad, telefon veya not ile)
  const filteredApplications = applications.filter((app) => {
    const query = searchQuery.toLowerCase();
    return (
      app.full_name?.toLowerCase().includes(query) ||
      app.phone?.toLowerCase().includes(query) ||
      app.notes?.toLowerCase().includes(query)
    );
  });

  // Giriş yapılmadıysa Giriş Ekranı
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-slate-100">
          <div className="text-center mb-6">
            <div className="inline-flex p-3 bg-amber-400/20 rounded-full mb-3 text-amber-500">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Atletizm Kulübü</h1>
            <p className="text-sm font-semibold text-slate-600 mt-1">Yönetici Girişi</p>
          </div>

          {loginError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg text-sm mb-4 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">E-posta</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@atletizm.com"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Şifre</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-3 rounded-lg shadow transition"
            >
              Giriş Yap
            </button>
          </form>

          <div className="text-center mt-6">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600 transition">
              <ArrowLeft className="w-4 h-4" /> Ana sayfaya dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Giriş yapıldıysa Başvuru Listesi Paneli
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-blue-950 text-white flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6 border-b border-blue-900">
            <h2 className="text-xl font-bold">Atletizm Kulübü</h2>
            <p className="text-xs text-blue-300 mt-1">Yönetim Paneli</p>
          </div>
          <nav className="p-4 space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 bg-blue-900 rounded-xl text-amber-400 font-medium">
              <Shield className="w-5 h-5" /> Başvurular
            </div>
          </nav>
        </div>

        <div className="p-4 border-t border-blue-900">
          <button
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-2 text-rose-300 hover:text-white transition w-full px-4 py-2 rounded-lg text-sm font-medium"
          >
            <LogOut className="w-4 h-4" /> Çıkış
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Başvurular</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="md:hidden flex items-center gap-2 text-rose-600 bg-white px-4 py-2 rounded-lg shadow-sm font-medium self-start"
          >
            <LogOut className="w-4 h-4" /> Çıkış
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="p-4 bg-amber-100 rounded-xl text-amber-600">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Toplam</p>
              <h3 className="text-2xl font-extrabold text-slate-900">{applications.length} başvuru</h3>
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center">
            <div className="relative w-full">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Ad, telefon veya not ile ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase">
                  <th className="p-4">Ad Soyad</th>
                  <th className="p-4">Telefon</th>
                  <th className="p-4">Yaş</th>
                  <th className="p-4">Not</th>
                  <th className="p-4">Tarih</th>
                  <th className="p-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">
                      Yükleniyor...
                    </td>
                  </tr>
                ) : filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">
                      Kayıt bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-semibold text-slate-800">{app.full_name}</td>
                      <td className="p-4 text-slate-600">{app.phone}</td>
                      <td className="p-4 text-slate-600">{app.child_age}</td>
                      <td className="p-4 text-slate-600 max-w-xs truncate">{app.notes || '-'}</td>
                      <td className="p-4 text-slate-500 text-xs">
                        {new Date(app.created_at).toLocaleString('tr-TR')}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="inline-flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-1.5 rounded-lg text-xs font-bold transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Sil
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}