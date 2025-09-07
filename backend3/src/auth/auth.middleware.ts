import { MiddlewareFn } from 'type-graphql';
import { Context } from '../context';

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.userId) throw new Error('Not authenticated');
  return next();
};

export const isAdmin: MiddlewareFn<Context> = ({ context }, next) => {
  if (context.userRole !== 'ADMIN') throw new Error('Not authorized');
  return next();
};