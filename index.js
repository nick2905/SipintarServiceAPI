import express from 'express';
import mongoose from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
import routes from './src/routes/sipintarRoutes';
import bodyParser, { json } from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());

// mongoose connection
mongoose.Promise = global.Promise;
mongoose
  .connect(
    'mongodb://nicolas:nicolas@sipintaritdel-shard-00-00.v07hc.mongodb.net:27017,sipintaritdel-shard-00-01.v07hc.mongodb.net:27017,sipintaritdel-shard-00-02.v07hc.mongodb.net:27017/SipintarDB?ssl=true&replicaSet=atlas-d0umx0-shard-0&authSource=admin&retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected to database ');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT setup
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'JWT'
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(' ')[1],
      'RESTFULLAPI',
      (err, decode) => {
        if (err) req.user = undefined;
        console.log("JWT -> " + req.user);
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

routes(app);

app.get('/', (req, res) => {
  res.send(`Welcome to Express`);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Your server is running on ${process.env.PORT});
});
