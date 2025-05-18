// backend/src/graphql/directives/auth.ts
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from 'graphql';
import { Role } from '@prisma/client';

export function authDirectiveTransformer(schema: GraphQLSchema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, 'auth')?.[0];
      if (authDirective) {
        const { requires } = authDirective;
        const { resolve = defaultFieldResolver } = fieldConfig;
        
        fieldConfig.resolve = async function (source, args, context, info) {
          if (!context.user) {
            throw new GraphQLError('Not authenticated');
          }
          
          if (requires && context.user.role !== requires) {
            throw new GraphQLError(`Requires ${requires} role`);
          }
          
          return resolve(source, args, context, info);
        };
      }
      return fieldConfig;
    }
  });
}