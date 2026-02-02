'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link2, ArrowRight, Loader2, Copy, Check, Sparkles, BarChart3 } from 'lucide-react';
import { useShortenLink } from '@/hooks/useShortenLink';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

// Esquema de validación
const schema = z.object({
    url: z.string().url({ message: "Ingresa una URL válida (ej: https://google.com)" }),
});

type FormData = z.infer<typeof schema>;

export function CreateLinkForm() {
    const [copied, setCopied] = useState(false);
    const [lastShortLink, setLastShortLink] = useState<string | null>(null);
    const [lastSlug, setLastSlug] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const { mutate, isPending, error } = useShortenLink();

    const onSubmit = (data: FormData) => {
        setLastShortLink(null);
        mutate({ originalUrl: data.url }, {
            onSuccess: (newLink) => {
                if (newLink?.shortUrl) {
                    setLastShortLink(newLink.shortUrl);
                    setLastSlug(newLink.slug);
                    reset();
                }
            }
        });
    };

    const copyToClipboard = () => {
        if (lastShortLink) {
            navigator.clipboard.writeText(lastShortLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mb-16 px-4">

            {/* --- FORMULARIO CON EFECTO GLOW --- */}
            <div className="relative group">
                {/* El resplandor azul detrás */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

                <div className="relative bg-white rounded-xl shadow-xl p-2 sm:p-3 ring-1 ring-slate-900/5">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1">
                            {/* Icono perfectamente centrado */}
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                <Link2 className="h-5 w-5" />
                            </div>

                            <Input
                                {...register('url')}
                                placeholder="Pega tu enlace largo aquí (https://...)"
                                className="pl-12 h-14 text-lg border-0 bg-transparent focus-visible:ring-0 placeholder:text-slate-400"
                                disabled={isPending}
                                autoComplete="off"
                            />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-base transition-all shadow-md hover:shadow-lg sm:w-auto w-full"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    Acortar <ArrowRight className="h-5 w-5" />
                                </span>
                            )}
                        </Button>
                    </form>
                </div>
            </div>

            {/* --- MENSAJES DE ERROR --- */}
            <div className="min-h-[24px] mt-2 px-2">
                {errors.url && (
                    <p className="text-red-500 text-sm font-medium flex items-center gap-1 animate-in slide-in-from-top-1">
                        ⚠️ {errors.url.message}
                    </p>
                )}
                {error && (
                    <p className="text-red-500 text-sm font-medium flex items-center gap-1 animate-in slide-in-from-top-1">
                        ❌ Ocurrió un error: {error.message}
                    </p>
                )}
            </div>

            {/* --- RESULTADO EXITOSO --- */}
            {lastShortLink && (
                <div className="mt-6 p-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl shadow-lg animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-white rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 overflow-hidden w-full">
                            <div className="bg-green-100 p-2 rounded-full shrink-0">
                                <Sparkles className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-0.5">¡Enlace listo!</p>
                                <a
                                    href={lastShortLink}
                                    target="_blank"
                                    className="text-xl md:text-2xl font-bold text-slate-800 hover:text-blue-600 truncate block transition-colors"
                                >
                                    {lastShortLink.replace(/^https?:\/\//, '')}
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0"> {/* Agregado items-center y shrink-0 */}
                            <Button
                                onClick={copyToClipboard}
                                className={`h-12 px-6 rounded-xl font-medium transition-all duration-300 ${copied
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200 border-transparent'
                                    : 'bg-slate-900 text-white hover:bg-slate-800'
                                    }`}
                            >
                                {copied ? (
                                    <span className="flex items-center gap-2">
                                        <Check className="h-5 w-5" /> Copiado
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Copy className="h-4 w-4" /> Copiar
                                    </span>
                                )}
                            </Button>

                            <Link href={`/stats/${lastSlug}`} target="_blank"> {/* Usamos lastSlug que ya guardaste */}
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-12 w-12 rounded-xl border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all"
                                    title="Ver Estadísticas"
                                >
                                    <BarChart3 className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}