import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { authenticator } from '~/services/auth.server';
import Button from '~/src/components/Button';
import { RoutesList } from '~/src/configuration/routes/RouteList';

export const action = async ({ request }: ActionFunctionArgs) => {
  return await authenticator.authenticate('user-pass', request, {
    successRedirect: '/',
  });
};

//   const signInData = await signIn(request);

//   // Create the headers that will need to be returned to the browser. These headers are needed for every subsequent request that require authentication.
//   const headers = new Headers();

//   // Store the response's `sessionid` cookie into the headers.
//   const {
//     name: sessionIdName,
//     value: sessionIdValue,
//     ...sessionIdCookieSerializeOptions
//   } = signInData.cookie.sessionIdCookie as setCookie.Cookie;

//   const {
//     name: csrftokenName,
//     value: csrfTokenValue,
//     ...csrfCookieSerializeOptions
//   } = signInData.cookie.csrftokenCookie as setCookie.Cookie;

//   if (!sessionIdName || !csrftokenName) {
//     return json({ error: 'Failed to login.' }, { status: 403 });
//   }

//   const sessionIdSession = await getSession(request.headers.get('Cookie'));

//   sessionIdSession.set(sessionIdName as 'sessionid', sessionIdValue);
//   sessionIdSession.set(csrftokenName as 'csrftoken', csrfTokenValue);

//   headers.append(
//     'Set-Cookie',
//     await commitSession(
//       sessionIdSession,
//       // Use the response's `sessionid` cookie serialization options.
//       sessionIdCookieSerializeOptions as CookieSerializeOptions,
//     ),
//   );
//   headers.append(
//     'Set-Cookie',
//     await commitSession(
//       sessionIdSession,
//       // Use the response's `sessionid` cookie serialization options.
//       csrfCookieSerializeOptions as CookieSerializeOptions,
//     ),
//   );

//   return redirect('/', {
//     headers,
//   });
// };
// importColours(ColourConstant.Dark as ColourVariants);
const Login = () => {
  const [saveLogin, setSaveLogin] = useState(false);
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

        {/* {actionData?.error && <p className="danger-zone">Failed to login.</p>} */}

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
            Remember me:{' '}
            <input
              type="checkbox"
              name="remember_me"
              id="id_remember_me"
              checked={saveLogin}
              onChange={() => {
                setSaveLogin(!saveLogin);
              }}
            />
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
