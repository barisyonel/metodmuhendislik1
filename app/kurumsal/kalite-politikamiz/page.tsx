import Header from "@/app/components/Header";

export default function KalitePolitikasi() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20 container mx-auto px-6">
        <h1 className="text-4xl font-black text-slate-900 mb-8 uppercase tracking-tight">Kalite Politikamız</h1>
        <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
           <p className="text-lg leading-loose italic text-slate-600">
             &quot;Koşulsuz müşteri memnuniyeti ve sıfır hata prensibiyle üretim yapmayı, teknolojik gelişmeleri yakından takip etmeyi taahhüt ediyoruz.&quot;
           </p>
        </div>
      </main>
    </>
  );
}