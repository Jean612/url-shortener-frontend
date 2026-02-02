import { gql } from 'graphql-request';

export const GET_LINK_STATS = gql`
  query GetLinkStats($slug: String!) {
    link(slug: $slug) {
      id
      originalUrl
      shortUrl
      slug
      clicksCount
      createdAt
      clicks {
        id
        country
        userAgent
        createdAt
      }
    }
  }
`;