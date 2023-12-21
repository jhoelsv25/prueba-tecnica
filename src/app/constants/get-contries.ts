import { gql } from 'apollo-angular';

export const GET_COUNTRIES = gql`
  {
    countries {
      name
      code
      continent {
        name
      }
    }
  }
`;
