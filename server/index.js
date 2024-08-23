import express from "express";
import dotenv from "dotenv";
import { dbconnect } from "./config/dbConnect.js";
import productrouter from "./controller/productCtrl.js";
import userroutes from "./controller/userCtrl.js";
import cookieParser from "cookie-parser";
import orderRouter from "./controller/orderCtrl.js";
import issueItemRouter from "./controller/issueItemCtrl.js";
import returnItemRouter from "./controller/returnItemCtrl.js";
import reportRouter from "./controller/reportCtrl.js";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

dbconnect();

//middleware

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());





app.use('/api/product', productrouter);
app.use('/api/user', userroutes);
app.use('/api/order',orderRouter)
app.use('/api/issueitem',issueItemRouter)
app.use('/api/returnitem',returnItemRouter)
app.use('/api/report',reportRouter)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);

})