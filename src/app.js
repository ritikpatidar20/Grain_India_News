import express from 'express'
import cookieParser from'cookie-parser'
import cors from "cors"


const app=express();
// app.use(cors({
//     origin:process.env.origin,
//     credentials:true
// }));
//  app.use(cors({
//     origin: 'http://localhost:5173', // The origin of your frontend application
//     credentials: true, // This allows cookies to be sent and received
//   }));
  // app.use(cors({
  //   origin: 'https://grainindianews.netlify.app',
  //   methods: ['GET', 'POST'],
  //   allowedHeaders: ['Content-Type', 'Authorization']
  // })); 
  app.use(cors({
    origin: 'https://grain-india-news.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials:true
  }));

app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.json({
    limit:"16kb"
}))
app.use(express.static("public"))
//app.use(bodyParser.json());

app.use(cookieParser())
 //routes
import adminrouter from './routes/admin.routes.js';
import crouselrouter from './routes/crousel.routes.js';
import blogrouter from './routes/blog.routes.js';
 app.use("/api/v1/admin",adminrouter);

app.use("/api/v1/crousel",crouselrouter)

app.use("/api/v1/blog",blogrouter)

export default app;