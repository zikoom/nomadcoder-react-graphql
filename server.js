import { ApolloServer, gql } from "apollo-server";


const Tweets = [
  {
    id: '1',
    text: 'hahaha',
    userId: "2"
  },
  {
    id: '2',
    text: 'hohoho',
    userId: "1"
  }
]

const users = [
  {
    id: '1',
    firstName: 'koom',
    lastName: 'yoon',
  },
  {
    id: '2',
    firstName: '2222',
    lastName: 'kim',
  }
]

const typeDefs = gql`

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
    userId: String
  }

  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  type Query {
    allUsers: [User!]!
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
    },

    allUsers() {
      return users;
    },


  },
  Mutation: {
    postTweet(root, {text, userId}){
      console.log(root, text, userId);
      const newTweet = {
        id: Tweets.length + 1,
        text: text,
        userId: userId
      }

      Tweets.push(newTweet);
      return newTweet;
    }
  },
  User: {
    fullName({firstName, lastName}) {
      return `${firstName} ${lastName}`;
    }
  },
  Tweet: {
    author({userId}) {
      return users.find(u => u.id === userId)
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
  console.log(`running on ${url}`)
})