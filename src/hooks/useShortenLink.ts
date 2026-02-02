import { useMutation, useQueryClient } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphql/client';
import { CREATE_LINK_MUTATION } from '@/lib/graphql/mutations/links';

interface CreateLinkInput {
  originalUrl: string;
}

interface CreateLinkResponse {
  createLink: {
    link: {
      id: string;
      shortUrl: string;
      originalUrl: string;
    } | null;
    errors: string[];
  };
}

export function useShortenLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateLinkInput) => {
      const data = await graphqlClient.request<CreateLinkResponse>(
        CREATE_LINK_MUTATION,
        input
      );
      
      // Si Rails devuelve errores en el array 'errors', lanzamos una excepción
      if (data.createLink.errors && data.createLink.errors.length > 0) {
        throw new Error(data.createLink.errors.join(', '));
      }

      return data.createLink.link;
    },
    onSuccess: () => {
      // Cuando se crea un link exitosamente, refrescamos la lista de abajo automáticamente
      queryClient.invalidateQueries({ queryKey: ['GetTopLinks'] });
    },
  });
}