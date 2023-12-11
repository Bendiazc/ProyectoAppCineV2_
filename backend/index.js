import express from "express";
import cors from "cors";
import createMongoDBcon from "./config/mongodb.js";
import * as userRoutes from "./routes/userRoutes.js";
import * as ticketsRoutes from "./routes/ticketsRoutes.js";
import * as cinemaRoutes from "./routes/cinemaRoutes.js";
import * as productRoutes from "./routes/confiteriaRoutes.js";

const app = express();
app.use(cors());

createMongoDBcon();

app.use(express.json({ limit: '2mb' }));
app.use(express.json());

app.use(userRoutes.router);
app.use(cinemaRoutes.router);
app.use(ticketsRoutes.router);
app.use(productRoutes.router);

app.listen(8050);
