import { gql } from 'apollo-angular';

export const GET_COUNTRY_BY_ID = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      capital
      code
      currencies
      languages {
        code
        name
      }
      continent {
        name
      }
    }
  }
`;
