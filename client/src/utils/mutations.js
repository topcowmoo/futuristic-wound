// Imports the gql function from the Apollo Client pasckage, which is used to define GraphQL queries and mutations.
import { gql } from "@apollo/client";

// GraphQL mutation to LOGIN_USER. It takes two variables: $username and $password, both of type String. It sends these variables to the login mutation on the server, which returns a token and user data if the login is successful.
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// GraphQL mutation to ADD_USER. It takes three variables: $username, $email, and $password, all of type String. It sends these variables to the addUser mutation on the server, which creates a new user with the provided information and returns a token and user data for the newly created user.
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// GraphQL mutation to SAVE_MONSTER. It takes three variables: $_id, $name, and $image. It sends these variables to the saveMonster mutation on the server, which saves a monster with the provided information to the user's account and returns the updated user data with the saved monster.
export const SAVE_MONSTER = gql`
  mutation saveMonster($_id: ID!, $name: String!, $image: String!) {
    saveMonster(_id: $_id, name: $name, image: $image) {
      _id
      username
      savedMonsters {
        _id
        name
        image
      }
    }
  }
`;

// GraphQL mutation to CHANGE_MONSTER. It takes three variables: $_id, $name, and $image. It sends these variables to the changeMonster mutation on the server, which updates the active monster for the user with the provided information and returns the updated user data with the new active monster.
export const CHANGE_MONSTER = gql`
  mutation changeMonster($_id: ID!, $name: String, $image: String) {
    changeMonster(_id: $_id, name: $name, image: $image) {
      _id
      username
      activeMonster {
        _id
        name
        image
      }
    }
  }
`;

// GraphQL mutation to INITIALIZE_MONSTER. It takes three variables: $_id, $name, and $image. It sends these variables to the initializeMonster mutation on the server, which initializes a new active monster for the user with the provided information and also saves this monster to the user's account. It returns the updated user data with the new active monster and all saved monsters.
export const INITIALIZE_MONSTER = gql`
  mutation initializeMonster($_id: ID!) {
    initializeMonster(_id: $_id ) {
      _id
      username
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


export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      success
      message
    }
  }
`;
