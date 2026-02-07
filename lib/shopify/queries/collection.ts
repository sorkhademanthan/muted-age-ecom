/**
 * GraphQL queries for collections
 */

export const COLLECTION_FRAGMENT = `
  fragment CollectionFragment on Collection {
    id
    title
    handle
    description
    descriptionHtml
    image {
      id
      url
      altText
      width
      height
    }
  }
`;

export const GET_COLLECTION_BY_HANDLE = `
  query getCollectionByHandle($handle: String!, $first: Int = 12) {
    collection(handle: $handle) {
      ...CollectionFragment
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
  ${COLLECTION_FRAGMENT}
`;

export const GET_COLLECTIONS = `
  query getCollections($first: Int = 12) {
    collections(first: $first) {
      edges {
        node {
          ...CollectionFragment
        }
      }
    }
  }
  ${COLLECTION_FRAGMENT}
`;
