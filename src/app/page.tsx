import { CreateLinkForm } from '@/components/features/link-shortener/CreateLinkForm';
import { Globe } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-4">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] opacity-5"></div>

      <div className="container max-w-3xl mx-auto space-y-12">

        {/* Header Hero Minimalista */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-2 border border-blue-100">
            <Globe size={14} />
            <span>URL Shortener Profesional</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight text-balance">
            Acorta tus enlaces. <br className="hidden md:block" />
            <span className="text-blue-600">Mide tu impacto.</span>
          </h1>

          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Herramienta simple, rápida y segura. Sin registros, sin líos.
          </p>
        </div>

        {/* El Formulario es el Protagonista */}
        <div className="relative z-10">
          <CreateLinkForm />
        </div>

        {/* Footer minúsculo */}
        <p className="text-center text-xs text-slate-400 mt-20">
          © 2026 Jean Chavez Dev. Built with Next.js & GraphQL.
        </p>

      </div>
    </main>
  );
}