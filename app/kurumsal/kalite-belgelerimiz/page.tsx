import Header from "@/app/components/Header";

export default function KaliteBelgeleri() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20 container mx-auto px-6">
        <h1 className="text-4xl font-black text-slate-900 mb-8 uppercase tracking-tight">Kalite Belgelerimiz</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
          {["ISO 9001", "ISO 14001", "ISO 45001", "Tip Test Belgesi"].map(belge => (
            <div key={belge} className="border-2 border-slate-100 p-8 rounded-2xl text-center hover:shadow-xl transition-all">
               <div className="text-4xl mb-4">📄</div>
               <h4 className="font-bold text-slate-900">{belge}</h4>
               <p className="text-sm text-slate-500 mt-2 italic">Görüntüle (PDF)</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}