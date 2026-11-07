import ApplicationForm from '@/app/components/ApplicationForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <section id="kayit-ol" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">Hemen Kayıt Olun</h2>
          <ApplicationForm />
        </div>
      </section>
    </main>
  );
}