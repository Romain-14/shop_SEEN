import express from 'express';
const app = express();

const mySession = {
    secret: "i love dev <3",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  mySession.cookie.secure = true // serve secure cookies
}

export default mySession;