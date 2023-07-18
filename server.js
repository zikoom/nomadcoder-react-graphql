import { ApolloServer, gql } from "apollo-server";


const Tweets = [
  {
    id: '1',
    text: 'hahaha'
  },
  {
    id: '2',
    text: 'hohoho'
  }
]

const typeDefs = gql`

  type User {
    id: ID
    username: String
  }

  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  type Query {
    allTweets: [Tweet]
    tweet(id: ID!): Tweet
  }

  type Mutation {
    postTweet(text: String, userId: ID): Tweet
  }
`;

const resolvers = {
  Query: {
    tweet() {
      console.log('im called');
      return null;
    },

    allTweets() {
      return Tweets;
    }
  },
  Mutation: {
    postTweet(root, params){
      console.log(root, params);
      return {
        id: 1,
        text: 'haha',

      }
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
  console.log(`running on ${url}`)
})