'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BarChart3, Search, ArrowLeft, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function SearchStatsPage() {
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Lógica inteligente: Si el usuario pega la URL completa, extraemos solo el slug
    let slug = input.trim();
    if (slug.includes('/')) {
        slug = slug.split('/').pop() || slug;
    }

    router.push(`/stats/${slug}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-4">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#3b82f6_100%)] opacity-5"></div>

      <Card className="w-full max-w-lg border-none shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="mb-2">
             <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors">
               <ArrowLeft size={16} className="mr-1" /> Volver al inicio
             </Link>
          </div>
          <CardTitle className="text-3xl font-bold text-center flex flex-col items-center gap-4 py-2">
            <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 ring-1 ring-blue-100">
                <BarChart3 size={40} />
            </div>
            Consultar Estadísticas
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Ingresa el código o la URL corta para ver su impacto.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <LinkIcon size={20} />
                </div>
                <Input
                  placeholder="Ej: XyZ123 o midominio.com/XyZ123"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="pl-12 h-14 text-lg bg-white border-slate-200 focus:border-blue-500 transition-all"
                  autoFocus
                />
            </div>
            <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-slate-900 hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl" 
                disabled={!input.trim()}
            >
              <Search className="mr-2 h-5 w-5" /> Buscar Datos
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}