'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useRollbar } from '@rollbar/react';
import { graphqlClient } from '@/lib/graphql/client';
import { GET_LINK_STATS } from '@/lib/graphql/queries/getLinkStats';
import Link from 'next/link';
import { BarChart3, Globe, Clock, ArrowLeft, MousePointer2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Click {
  id: string;
  country: string | null;
  userAgent: string | null;
  createdAt: string;
}

interface LinkStats {
  id: string;
  originalUrl: string;
  shortUrl: string;
  slug: string;
  clicksCount: number;
  createdAt: string;
  clicks: { nodes: Click[] };
}

export default function StatsPage() {
  const { slug } = useParams<{ slug: string }>();
  const rollbar = useRollbar();

  const { data, isLoading, error } = useQuery({
    queryKey: ['LinkStats', slug],
    queryFn: async () => {
      const result = await graphqlClient.request<{ link: LinkStats }>(GET_LINK_STATS, { slug });
      if (!result.link) {
        rollbar.warning('Link no encontrado en la base de datos', { slug });
      }
      return result.link;
    },
    retry: false,
  });

  if (error) {
    rollbar.error('Error al obtener estadísticas del link', error as Error, { slug });
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Enlace no encontrado 🕵️‍♂️</h1>
        <p className="text-slate-500 mb-6">El slug "{slug}" no existe o fue eliminado.</p>
        <Link href="/" className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const link = data;

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header de Navegación */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 transition-colors mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al acortador
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 items-start">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Estadísticas</h1>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm w-fit">
                <span className="text-xs font-semibold text-slate-400 uppercase">Slug:</span>
                <span className="text-sm font-mono font-medium text-blue-600">{link.slug}</span>
            </div>
          </div>
        </div>

        {/* Tarjetas de Resumen */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Clicks</CardTitle>
              <MousePointer2 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{link.clicksCount}</div>
              <p className="text-xs text-slate-500 mt-1">Visitas totales históricas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Fecha Creación</CardTitle>
              <Clock className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-slate-900 mt-1">
                  {new Date(link.createdAt).toLocaleDateString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                 {new Date(link.createdAt).toLocaleTimeString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Link Corto</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <a href={link.shortUrl} target="_blank" className="text-lg font-bold text-blue-600 hover:underline truncate block">
                {link.shortUrl.replace(/^https?:\/\//, '')}
              </a>
              <p className="text-xs text-slate-400 mt-1 truncate max-w-[200px]" title={link.originalUrl}>
                Destino: {link.originalUrl}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de Clicks Recientes */}
        <Card className="overflow-hidden border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="h-5 w-5 text-slate-500" />
                    Historial de Visitas
                </CardTitle>
            </CardHeader>
            <div className="p-0">
                {link.clicks?.nodes && link.clicks.nodes.length > 0 ? (
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-6 align-middle font-medium text-slate-500">País</th>
                                    <th className="h-12 px-6 align-middle font-medium text-slate-500">Fecha y Hora</th>
                                    <th className="h-12 px-6 align-middle font-medium text-slate-500">Dispositivo</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {link.clicks.nodes.map((click) => (
                                    <tr key={click.id} className="border-b border-slate-100 transition-colors hover:bg-slate-50">
                                        <td className="p-6 align-middle font-medium">
                                            {click.country ? (
                                                <span className="flex items-center gap-2">
                                                    <span>{click.country}</span>
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 italic">Desconocido 🌍</span>
                                            )}
                                        </td>
                                        <td className="p-6 align-middle text-slate-600">
                                            {new Date(click.createdAt).toLocaleString()}
                                        </td>
                                        <td className="p-6 align-middle truncate max-w-xs text-slate-500" title={click.userAgent || ''}>
                                            {click.userAgent ? (
                                                click.userAgent.includes('Mobile') ? '📱 Móvil' : '💻 Escritorio'
                                            ) : "Anónimo"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-16 text-center text-slate-500 bg-white">
                        <p className="mb-2 text-lg">🦗</p>
                        <p>No hay visitas registradas todavía.</p>
                        <p className="text-sm mt-1 text-slate-400">¡Comparte el link para empezar a ver datos!</p>
                    </div>
                )}
            </div>
        </Card>

      </div>
    </div>
  );
}
