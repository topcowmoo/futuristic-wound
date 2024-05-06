import { gql } from "@apollo/client";

export const GET_ACTIVE_MONSTER = gql`
  query GetActiveMonster {
    me {
      activeMonster {
        _id
        name
        image
      }
    }
  }
`;

export const GET_SAVED_AND_ACTIVE_MONSTERS = gql`
  query GetSavedAndActiveMonsters {
    me {
      activeMonster {
        _id
        name
        image
      }
      savedMonsters {
        _id
        name
        image
      }
    }
  }
`;

export const GET_ALL_MONSTERS = gql`
  query GetAllMonsters {
    allMonsters {
      _id
      name
      image
    }
  }
`;

export const GET_SAVED_MONSTERS = gql`
  query GetSavedMonsters {
    me {
      savedMonsters {
        _id
        name
        image
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($priceId: ID!) {
    createCheckoutSession(priceId: $priceId) {
      session
    }
  }
`;
