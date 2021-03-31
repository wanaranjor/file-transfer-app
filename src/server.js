import * as sapper from '@sapper/server';
import { json } from 'body-parser';
import compression from 'compression';
import session from 'express-session';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import polka from 'polka';
import sessionFileStore from 'session-file-store';
import sirv from 'sirv';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const FileStore = sessionFileStore(session);
const hour = 3600000; // 1 hour milisegundos
const expiryDate = new Date(Date.now() + hour * 6) // 6 horas
console.log(expiryDate);
// TODO: implementar:
// cookie: {
//   secure: true,
//   httpOnly: true,
//   domain: 'example.com',
//   path: 'foo/bar',
//   expires: expiryDate
// }

polka() // You can also use Express
  .use(
    json(),
    session({
      secret: ['veryimportantsecret', 'notsoimportantsecret', 'highlyprobablysecret'],
      name: 'sessionId',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        expires: expiryDate
      },
      store: new FileStore({
        path: process.env.NOW ? `/tmp/sapper/sessions` : `.sessions`
      })
    })
  )
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: req => (
        {
          user: req.session && req.session.user,
          // TODO: si user existe sacar data
          profile: req.session && req.session.user && jwt.decode(req.session.user.data.token)
        })
    })
  )
  .use(
    helmet()
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });