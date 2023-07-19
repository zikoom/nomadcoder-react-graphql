import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

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
    allMovies: [Movie!]!
    allUsers: [User!]!
    allTweets: [Tweet]
    tweet(id: ID!): Tweet
    movie(id: String!): Movie
  }

  type Mutation {
    postTweet(text: String, userId: ID): Tweet
  }
  type Movie {
    id: Int!
    url: String!
    imdb_code: String!
    title: String!
    title_english: String!
    title_long: String!
    slug: String!
    year: Int!
    rating: Float!
    runtime: Float!
    genres: [String]!
    summary: String
    description_full: String!
    synopsis: String
    yt_trailer_code: String!
    language: String!
    background_image: String!
    background_image_original: String!
    small_cover_image: String!
    medium_cover_image: String!
    large_cover_image: String!
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

    async allMovies() {
      const r = await fetch("https://yts.mx/api/v2/list_movies.json");
      const json = await r.json();
      return json.data.movies;
    },

    async movie(root, {id}) {
      const r = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
      const json = await r.json();
      return json.data.movie;
    }


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