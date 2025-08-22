// import dotenv from "dotenv";
// import express, { json } from "express";
// import cors from "cors";
// import path from "path";
// import notesRoutes from "../src/routes/notesRoutes.js";
// import connectDB from "./config/db.js";
// import rateLimiter from "./middleware/rateLimiter.js";



// dotenv.config({
//     path:"./.env"
// })




// const app = express();
// const PORT=process.env.PORT || 5001 ;
// const __dirname = path.resolve();


// // midddleware
// if(process.env.NODE_ENV !== "production"){

//     app.use(cors({
//         origin:"http://localhost:5173",
//     })
//     );
// }


// app.use(express.json());   // this middleware will parse JSON bodies: req.body

// // app.use(rateLimiter);




// // this is our simple custom middleware
// // app.use((req,res,next)=>{
// //     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
// //     next();
    
// // })



// app.use("/api/notes",notesRoutes);
// // app.use("/api/product",productRoutes);
// // app.use("/api/cart",cartRoutes);
// // app.use("/api/category",catrgoryRoutes);



// // What is an Endpoint
// // An Endpoint is a combination of a URL + HTTP method that lets the client interract with a specific resource.

// // like ex:- https://example.com/api/notes.
// // it only load the specific resouce on it in url   


// if(process.env.NODE_ENV === "production"){

//     app.use(express.static(path.join(__dirname , "../frontend/dist")));

//     app.get("*",(req,res)=>{
//         res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
//     });
// }



// connectDB().then(()=>{


//     app.listen(PORT , ()=>{
//         console.log("Server started on Port : ",PORT);
//     })

// });


















import express from "express";
import dotenv from "dotenv";
import notesRoutes from "../src/routes/notesRoutes.js";
import connectDB from "./config/db.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// ✅ Helmet with CSP (allows Tailwind/DaisyUI fonts & inline styles)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "https:", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https:", "data:"],
      connectSrc: ["'self'", "https:"],
    },
  })
);

// ✅ Middleware
app.use(express.json());

// Local dev: allow Vite frontend
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
} else {
  app.use(cors()); // allow all in prod (Render handles HTTPS)
}

// ✅ Rate limiting (safe for free Render dynos)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 20,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// ✅ Routes
app.get("/api", (req, res) => {
  res.json({ message: "🚀 ThinkBoard Backend is running!" });
});
app.use("/api/notes", notesRoutes);

// ✅ Serve React build in production (Render fullstack deploy)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

// ✅ Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server started on Port: ${PORT}`);
  });
});
