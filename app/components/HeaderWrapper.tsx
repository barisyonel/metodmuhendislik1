// Server Component - Services'i veritabanından çeker ve Header'a prop olarak geçirir
import { getServices } from "@/app/lib/data";
import Header from "./Header";

export default async function HeaderWrapper() {
  // Services'i direkt veritabanından çek (API route'a gerek yok!)
  const services = await getServices();
  
  return <Header initialServices={services} />;
}


