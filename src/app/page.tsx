// src/app/page.tsx


import Header from "@/app/components/Header";
import SpecialtyPage from "@/app/specialties/[specialty]/page";
import AddDoctorButton from "@/app/components/AddButton";

export default function Home() {
  return (
      <div className="bg-white ">
      <Header />
        <main className="max-w-6xl mx-auto px-4 py-8 ">
         <div>
             <SpecialtyPage/>
             <AddDoctorButton />
         </div>
        </main>
      </div>
  );
}