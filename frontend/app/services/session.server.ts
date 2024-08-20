import { CookieOptions, createCookie, createCookieSessionStorage } from '@remix-run/node'; // or cloudflare/deno

const cookieOptions: CookieOptions = {
  path: '/',
  secrets: ['s3cret1'],
  secure: process.env.NODE_ENV === 'production',
};

const cookie = createCookie('session', cookieOptions);

export const sessionStorage = createCookieSessionStorage({
  cookie,
});

export const { commitSession, destroySession, getSession } = sessionStorage;
