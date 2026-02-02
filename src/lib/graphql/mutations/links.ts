import { gql } from 'graphql-request';

export const CREATE_LINK_MUTATION = gql`
  mutation CreateLink($originalUrl: String!) {
    createLink(input: { originalUrl: $originalUrl }) {
      link {
        id
        shortUrl
        originalUrl
      }
      errors
    }
  }
`;