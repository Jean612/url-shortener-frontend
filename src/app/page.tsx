import { CreateLinkForm } from '@/components/features/link-shortener/CreateLinkForm';
import { Globe, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    // ESTRUCTURA BASE: Flex vertical (Columna)
    <main className="min-h-screen bg-slate-50/50 flex flex-col relative overflow-hidden">
      
      {/* 1. FONDO (Con pointer-events-none para que no bloquee clicks) */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] opacity-5 pointer-events-none"></div>

      {/* 2. NAVBAR SUPERIOR (Aquí va el botón, limpio y separado) */}
      <nav className="w-full p-4 md:p-6 flex justify-end z-20">
        <Link href="/stats">
          <Button variant="outline" className="gap-2 bg-white/80 backdrop-blur border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm">
            <BarChart3 size={16} />
            <span className="hidden sm:inline">Mis Estadísticas</span>
          </Button>
        </Link>
      </nav>

      {/* 3. CONTENIDO CENTRADO (Ocupa el resto del espacio con flex-1) */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 w-full z-10 pb-20">
        <div className="container max-w-3xl mx-auto space-y-12">

          {/* Header Hero */}
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

          {/* Formulario */}
          <div className="relative z-10">
            <CreateLinkForm />
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 mt-20">
            © 2026 Jean Chavez Dev. Built with Next.js & GraphQL.
          </p>

        </div>
      </div>
    </main>
  );
}