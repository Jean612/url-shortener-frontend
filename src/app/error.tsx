'use client';

import { useEffect } from 'react';
import { useRollbar } from '@rollbar/react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  const rollbar = useRollbar();

  useEffect(() => {
    rollbar.error('Error de render no manejado', error);
  }, [error, rollbar]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center px-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Algo salió mal</h1>
      <p className="text-slate-500 mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
