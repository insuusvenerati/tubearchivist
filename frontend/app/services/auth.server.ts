import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import signIn from '~/api/sign-in.server';
import { User } from '~/types';
import { sessionStorage } from './session.server';

export const authenticator = new Authenticator<User>(sessionStorage);

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const username = form.get('username') as string;
    const password = form.get('password') as string;
    const remember = form.get('remember_me') as string;

    const user = await signIn({ username, password, remember });
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  'user-pass',
);
