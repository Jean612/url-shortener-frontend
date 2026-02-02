import { graphqlClient } from '@/lib/graphql/client';
import { GET_TOP_LINKS } from '@/lib/graphql/queries/links';
import { CreateLinkForm } from '@/components/features/link-shortener/CreateLinkForm';
import Link from 'next/link';
import { Globe, MousePointer2, Calendar } from 'lucide-react'; // Iconos para darle vida

interface LinkData {
  id: string;
  originalUrl: string;
  shortUrl: string | null;
  clicksCount: number;
  createdAt: string;
}

interface GetLinksResponse {
  topLinks: LinkData[];
}

export default async function Home() {
  let links: LinkData[] = [];
  let error = null;

  try {
    const data = await graphqlClient.request<GetLinksResponse>(GET_TOP_LINKS);
    links = data.topLinks;
  } catch (e) {
    console.error("Error conectando con Rails:", e);
    error = "No se pudo conectar con el Backend.";
  }

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] opacity-5"></div>

      <div className="container max-w-5xl mx-auto px-4 py-20 md:py-32">

        {/* Header Hero */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-2 border border-blue-100">
            <Globe size={14} />
            <span>URL Shortener Profesional</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight text-balance">
            Acorta tus enlaces. <br className="hidden md:block" />
            <span className="text-blue-600">Expande tu alcance.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
            Transforma URLs largas e imposibles de recordar en enlaces cortos, limpios y rastreables.
          </p>
        </div>

        {/* Sección del Formulario (Centrada y destacada) */}
        <div className="max-w-xl mx-auto mb-20 relative z-10">
          <CreateLinkForm />
        </div>

        {/* Lista de Links */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Calendar size={16} />
              Últimos enlaces
            </h3>
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-md font-medium">
              {links.length} {links.length === 1 ? 'Link' : 'Links'}
            </span>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 mb-6 text-center text-sm">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-4">
            {links.length === 0 && !error ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
                <p className="text-slate-400">No has creado ningún enlace todavía.</p>
                <p className="text-sm text-slate-300 mt-1">¡Sé el primero en crear uno arriba!</p>
              </div>
            ) : (
              links.map((link) => (
                <div
                  key={link.id}
                  className="group relative bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                    {/* Columna Izquierda: Info del Link */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <Link
                          href={link.shortUrl || '#'}
                          className="text-lg font-bold text-blue-600 hover:text-blue-700 hover:underline truncate"
                          target="_blank"
                        >
                          {link.shortUrl ? link.shortUrl.replace(/^https?:\/\//, '') : 'Procesando...'}
                        </Link>
                      </div>
                      <p className="text-sm text-slate-500 truncate font-mono bg-slate-50 px-2 py-1 rounded inline-block max-w-full">
                        {link.originalUrl}
                      </p>
                    </div>

                    {/* Columna Derecha: Estadísticas */}
                    <div className="flex items-center gap-4 shrink-0 sm:border-l sm:pl-4 sm:border-slate-100">
                      <div className="flex flex-col items-center sm:items-end min-w-[60px]">
                        <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                          <MousePointer2 size={14} />
                          {link.clicksCount}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1 font-medium uppercase tracking-wide">Clicks</span>
                      </div>

                      <div className="text-right hidden sm:block">
                        <p className="text-xs font-medium text-slate-400">Creado el</p>
                        <p className="text-xs text-slate-600 font-medium">
                          {new Date(link.createdAt).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}