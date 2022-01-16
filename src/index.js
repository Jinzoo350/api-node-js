import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models, { sequelize } from './models';
import routes from './routes';

const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});

// * Routes * //

app.use('/object', routes.object);

// * Start * //

sequelize.sync().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(
      `API Node JS is online on PORT : ${process.env.PORT}!`,
    ),
  );
});
