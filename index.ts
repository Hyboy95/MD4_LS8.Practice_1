import express from "express";
import bodyParser from "body-parser";
import session from "express-session"
import { Database } from "./src/models/database.model";
import { authRouter } from "./src/routers/auth.router";

const PORT = 3000;
const app = express();

Database.connectDB()
        .then(() => console.log('DB Connected!'))
        .catch(error => console.log('DB connection error:', error.message));

app.set('views', "./src/views");
app.set('view engine', 'ejs');
app.use(express.static('./src/public'))

app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
   }));

app.use('/auth', authRouter);

app.listen(PORT, 'localhost', () => console.log(`Server is running at http://localhost:${PORT}`));
