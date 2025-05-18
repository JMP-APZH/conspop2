import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';
import { authDirectiveTransformer } from './directives/auth';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Apply the directive transformer
export const schemaWithAuth = authDirectiveTransformer(schema);