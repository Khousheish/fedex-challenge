import { SignUpDetails } from './sign-up-details.model';
import { User } from './user.model';

export interface SignUpProps {
  signUpDetails: SignUpDetails;
}

export interface SignUpSuccessProps {
  user: User;
}
