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
    users: [User]!
    me: User
    allMonsters: [Monster]!
}

type ChangePasswordResponse {
    success: Boolean!
    message: String!
    user: User
}

type PaymentConfirmation {
    success: Boolean!
    message: String
    payment: Payment
}

type Payment {
    id: ID!
    amount: Int!
    currency: String!
    status: String!
}

type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMonster(name: String, image: String, _id: ID!): User
    changeMonster(name: String, image: String, _id: ID!): User
    initializeMonster(name: String, image: String, _id: ID!): User
    changePassword(currentPassword: String!, newPassword: String!): ChangePasswordResponse
    processPayment(amount: Int!, token: String!): PaymentConfirmation! # Added processPayment mutation
}
`;

module.exports = typeDefs;
