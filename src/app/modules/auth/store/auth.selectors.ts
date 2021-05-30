import { State } from '@Models/store.model';

import { User } from '../models/user.model';

interface AuthSelectors {
  selectAuthPending(state: State): boolean;
  selectAuthUser(state: State): User;
}

export const authSelectors: AuthSelectors = {
  selectAuthPending: (state: State): boolean => <boolean>state.auth?.pending,
  selectAuthUser: (state: State): User => <User>state.auth?.user,
};
