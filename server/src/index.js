const { ApolloServer } = require('apollo-server');

const fs = require('fs');
const path = require('path');


let tasks = [{
    id: 'task-0',
    status: 'complete',
    description: 'Fullstack tutorial for GraphQL'
  }]

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    tasks: () => tasks,
  },
  Mutation:{
    task: (parent, args) => {
  
      let idCount = tasks.length
  
         const task = {
          id: `task-${idCount++}`,
          description: args.description,
          status: args.status,
        }
        tasks.push(task)
        return task
      }
  }
}

  const server = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'),
      'utf8'
    ),
    resolvers,
  })


  
  server
    .listen()
    .then(({ url }) =>
      console.log(`Server is running on ${url}`)
    );