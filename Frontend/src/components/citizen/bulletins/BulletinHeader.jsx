import { HeartPulse } from "lucide-react";

function BulletinHeader() {
  return (
    <section className="pb-16 text-center px-6">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-6">
          <HeartPulse size={24} />
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-content-main mb-4 tracking-tight">
          مركز التوعية الصحية
        </h1>

        <p className="text-content-light text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto">
          تابع آخر المستجدات الصحية والعروض الحصرية من صيدليات غزة.
        </p>
      </div>
    </section>
  );
}

export default BulletinHeader;
