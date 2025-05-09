// src/app/page.tsx


import Header from "@/app/components/Header";
import SpecialtyPage from "@/app/specialties/[specialty]/page";

export default function Home() {
  return (
      <div className="bg-white ">
      <Header />
        <main className="max-w-6xl mx-auto px-4 py-8 ">
         <div>
             <SpecialtyPage/>
         </div>
        </main>
      </div>
  );
}