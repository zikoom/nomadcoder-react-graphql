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
    postTweet(root, {text, userId}){
      console.log(root, text, userId);
      const newTweet = {
        id: Tweets.length + 1,
        text: text
      }

      Tweets.push(newTweet);
      return newTweet;
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
  console.log(`running on ${url}`)
})