'use client';

import { useState } from 'react';
import { submitApplication } from '@/app/actions/submit-application';

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    child_age: '9',
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ success?: boolean; text?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Spam / Çift tıklama koruması
    if (loading) return;

    setLoading(true);
    setStatusMessage(null);

    try {
      const result = await submitApplication(formData);
      
      if (result.success) {
        setStatusMessage({ success: true, text: result.message });
        setFormData({ full_name: '', phone: '', child_age: '9' });
      } else {
        setStatusMessage({ success: false, text: result.error });
      }
    } catch {
      setStatusMessage({ success: false, text: 'Bir hata oluştu, lütfen tekrar deneyin.' });
    } finally {
      // Spam koruması için butonun hızlıca tekrar basılmasını önlemek adına kısa bir gecikme (1.5 saniye) koyabiliriz
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-xl shadow-md text-gray-900">
      <h2 className="text-xl font-bold text-gray-800">Kayıt Ol</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
        <input
          type="text"
          required
          maxLength={100}
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Telefon Numarası</label>
        <input
          type="tel"
          required
          maxLength={15}
          placeholder="05XXXXXXXXX"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Çocuğun Yaşı</label>
        <select
          value={formData.child_age}
          onChange={(e) => setFormData({ ...formData, child_age: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 6} value={i + 6}>
              {i + 6} Yaş
            </option>
          ))}
        </select>
      </div>

      {statusMessage && (
        <div className={`p-3 rounded text-sm ${statusMessage.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {statusMessage.text}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {loading ? 'Gönderiliyor...' : 'Başvuruyu Tamamla'}
      </button>
    </form>
  );
}