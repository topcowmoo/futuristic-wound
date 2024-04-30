// Define the `Query` and `Mutation` types

const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedMonsters: [Monster]
    activeMonster: Monster
  }

  type Monster {
    _id: ID
    name: String
    image: String

  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users:[User]!
    me: User
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMonster(name: String!, image: String!, _id: ID!): User
    
    changeMonster(name: String!, image: String!, _id: ID!): User
    initializeMonster(name: String!, image: String!, _id: ID!): User


    # Do we need a mutation to change the active monster showing on the page, this monster will be remembered when you close the app and reopen it.
    # This monster will only change when you change it in the monster closet 
    
    # same thought process, for initialize monster for new users 
    
  }













`
module.exports = typeDefs;