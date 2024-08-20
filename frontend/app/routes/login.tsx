import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { Helmet } from 'react-helmet';
import { AuthorizationError } from 'remix-auth';
import { authenticator } from '~/services/auth.server';
import Button from '~/src/components/Button';
import { RoutesList } from '~/src/configuration/routes/RouteList';

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    return await authenticator.authenticate('user-pass', request, {
      successRedirect: '/',
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof AuthorizationError) {
      console.log('login error', error);
      return json({ error: error.cause?.message }, { status: 403 });
    }
    if (error instanceof Response) {
      // Redirects work by throwing a Response so we re throw it to let Remix handle it
      throw error;
    }
  }
};

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  });
}

const Login = () => {
  const actionData = useActionData<typeof action>();

  return (
    <>
      <Helmet>
        <title>TA | Welcome</title>
      </Helmet>
      <div className="boxed-content login-page">
        <img alt="tube-archivist-logo" />
        <h1>Tube Archivist</h1>
        <h2>Your Self Hosted YouTube Media Server</h2>

        {actionData?.error && <p className="danger-zone">Failed to login.</p>}

        <Form method="POST">
          <input
            type="text"
            name="username"
            id="id_username"
            placeholder="Username"
            autoComplete="username"
            maxLength={150}
            required={true}
          />
          <br />
          <input
            type="password"
            name="password"
            id="id_password"
            placeholder="Password"
            autoComplete="current-password"
            required={true}
          />
          <br />
          <p>
            Remember me: <input type="checkbox" name="remember_me" id="id_remember_me" />
          </p>
          <input type="hidden" name="next" value={RoutesList.Home} />
          <Button label="Login" type="submit" />
        </Form>
        <p className="login-links">
          <span>
            <a href="https://github.com/tubearchivist/tubearchivist" target="_blank">
              Github
            </a>
          </span>{' '}
          <span>
            <a href="https://github.com/tubearchivist/tubearchivist#donate" target="_blank">
              Donate
            </a>
          </span>
        </p>
      </div>
      <div className="footer-colors">
        <div className="col-1"></div>
        <div className="col-2"></div>
        <div className="col-3"></div>
      </div>
    </>
  );
};

export default Login;
