import ApplicationForm from '@/app/components/ApplicationForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-[#0B1F4B]">
      {/* Üst Menü */}
      <header className="bg-[#0B1F4B] text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-wide">Atletizm Kulübü</div>
          <nav className="hidden md:flex items-center space-x-8 font-medium">
            <a href="#" className="hover:text-[#FFC72C] transition">Ana Sayfa</a>
            <a href="#program" className="hover:text-[#FFC72C] transition">Program</a>
            <a href="#iletisim" className="hover:text-[#FFC72C] transition">İletişim</a>
            <a href="#kayit-ol" className="bg-[#FFC72C] text-[#0B1F4B] px-5 py-2 rounded-lg font-bold hover:bg-yellow-400 transition shadow">
              Kayıt Ol
            </a>
          </nav>
        </div>
      </header>

      {/* Hero / Büyük Görsel Alanı */}
      <section className="bg-[#0B1F4B] text-white py-16 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Geleceğin Atletleri <br /><span className="text-[#FFC72C]">Burada Başlar</span>
            </h1>
            <p className="text-slate-300 text-lg">
              Çocukların fiziksel gelişimini destekleyen, disiplinli, eğlenceli ve güvenli bir atletizm ortamı.
            </p>
            <div>
              <a href="#kayit-ol" className="inline-block bg-[#FFC72C] text-[#0B1F4B] px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition shadow-lg">
                Hemen Kayıt Ol &gt;
              </a>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-slate-700">
            <img 
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop" 
              alt="Atletizm Yapan Çocuklar" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Hakkımızda Bölümü ve Kartlar */}
      <section className="container mx-auto max-w-6xl py-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#0B1F4B]">Hakkımızda</h2>
        <p className="text-slate-700 text-lg mb-12 max-w-4xl leading-relaxed">
          Atletizm Kulübü, çocukların sporla büyümesini, sağlıklı, özgüvenli ve disiplinli bireyler olarak gelişmesini hedefleyen bir gençlik atletizm kulübüdür. Deneyimli antrenörlerimizle, yaş gruplarına uygun antrenmanlar sunarak atletizmin temel branşlarında yeteneklerini keşfetmelerine destek oluyoruz.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start space-x-4">
            <div className="bg-yellow-100 p-3 rounded-lg text-[#0B1F4B] font-bold">⏱️</div>
            <div>
              <h3 className="font-bold text-lg mb-1">Disiplinli ve planlı antrenmanlar</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start space-x-4">
            <div className="bg-yellow-100 p-3 rounded-lg text-[#0B1F4B] font-bold">🎯</div>
            <div>
              <h3 className="font-bold text-lg mb-1">Sporla özgüven, başarıya motivasyon</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start space-x-4">
            <div className="bg-yellow-100 p-3 rounded-lg text-[#0B1F4B] font-bold">🌟</div>
            <div>
              <h3 className="font-bold text-lg mb-1">Sosyal, eğlenceli ve destekleyici bir ortam</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Antrenman Programı & Kayıt Formu İkili Alanı */}
      <section id="program" className="bg-slate-100 py-16 px-4">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Antrenman Programı Tablosu */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#0B1F4B]">Antrenman Programı</h2>
            <div className="bg-white rounded-xl shadow overflow-hidden border border-slate-200">
              <div className="bg-[#0B1F4B] text-white grid grid-cols-2 p-4 font-semibold">
                <div>Gün</div>
                <div>Saat</div>
              </div>
              <div className="divide-y divide-slate-200">
                <div className="grid grid-cols-2 p-4 items-center">
                  <div className="font-medium flex items-center gap-2">📅 Pazartesi</div>
                  <div className="text-slate-600">17:30 - 18:30</div>
                </div>
                <div className="grid grid-cols-2 p-4 items-center">
                  <div className="font-medium flex items-center gap-2">📅 Çarşamba</div>
                  <div className="text-slate-600">17:30 - 18:30</div>
                </div>
                <div className="grid grid-cols-2 p-4 items-center">
                  <div className="font-medium flex items-center gap-2">📅 Cumartesi</div>
                  <div className="text-slate-600">11:00 - 12:00</div>
                </div>
              </div>
            </div>
          </div>

          {/* Kayıt Başvurusu Formu */}
          <div id="kayit-ol">
            <h2 className="text-2xl font-bold mb-6 text-[#0B1F4B]">Kayıt Başvurusu</h2>
            <div className="bg-white rounded-xl shadow p-6 border border-slate-200">
              <ApplicationForm />
            </div>
          </div>

        </div>
      </section>

      {/* Alt Bilgi (Footer) */}
      <footer id="iletisim" className="bg-[#0B1F4B] text-white py-10 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold">Atletizm Kulübü</div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">📞 0 (532) 123 45 67</div>
            <div className="flex items-center gap-2">📍 Atatürk Cad. No: 24, Kadıköy / İstanbul</div>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-slate-700">📷</a>
            <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-slate-700">📘</a>
          </div>
        </div>
      </footer>
    </div>
  );
}