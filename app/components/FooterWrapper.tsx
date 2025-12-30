// Server Component - Services'i veritabanından çeker ve Footer'a prop olarak geçirir
import { getServices } from "@/app/lib/data";
import Footer from "./Footer";

export default async function FooterWrapper() {
  // Services'i direkt veritabanından çek (API route'a gerek yok!)
  const services = await getServices();
  
  return <Footer initialServices={services} />;
}


