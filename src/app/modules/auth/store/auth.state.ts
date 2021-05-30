import { User } from '../models/user.model';

export interface AuthState {
  pending: boolean;
  user: User | null;
}
