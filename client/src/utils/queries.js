
import { gql } from '@apollo/client';

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

