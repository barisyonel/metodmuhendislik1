import Header from "@/app/components/Header";

export default function Hakkimizda() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20 container mx-auto px-6">
        <h1 className="text-4xl font-black text-slate-900 mb-8 uppercase tracking-tight">Hakkımızda</h1>
        <article className="prose prose-lg max-w-4xl text-slate-700">
          <p className="text-xl font-medium text-blue-800 leading-relaxed mb-6">
            Metod Mühendislik, endüstriyel tesislerin enerji güvenliğini sağlamak amacıyla kurulmuş bir mühendislik ve üretim merkezidir.
          </p>
          <p>
            Yılların verdiği tecrübe ile Samsun merkezli fabrikamızda, Türkiye&apos;nin ve dünyanın dört bir yanına IEC standartlarında pano çözümleri sunuyoruz...
          </p>
        </article>
      </main>
    </>
  );
}