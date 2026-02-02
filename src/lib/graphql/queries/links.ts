import { gql } from 'graphql-request';

// Usamos 'topLinks' porque GraphQL convierte snake_case a camelCase automáticamente.
// Si esto falla, prueba con 'top_links', pero el estándar es camelCase.
export const GET_TOP_LINKS = gql`
  query GetTopLinks {
    topLinks {
      id
      originalUrl
      shortUrl
      clicksCount
      createdAt
    }
  }
`;