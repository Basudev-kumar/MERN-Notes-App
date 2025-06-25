import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import path from "path";
import notesRoutes from "../src/routes/notesRoutes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";



dotenv.config({
    path:"./.env"
})




const app = express();
const PORT=process.env.PORT || 5001 ;
const __dirname = path.resolve();


// midddleware
if(process.env.NODE_ENV !== "production"){

    app.use(cors({
        origin:"http://localhost:5173",
    })
    );
}


app.use(express.json());   // this middleware will parse JSON bodies: req.body

app.use(rateLimiter);




// this is our simple custom middleware
// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
    
// })



app.use("/api/notes",notesRoutes);
// app.use("/api/product",productRoutes);
// app.use("/api/cart",cartRoutes);
// app.use("/api/category",catrgoryRoutes);



// What is an Endpoint
// An Endpoint is a combination of a URL + HTTP method that lets the client interract with a specific resource.

// like ex:- https://example.com/api/notes.
// it only load the specific resouce on it in url   


if(process.env.NODE_ENV === "production"){

    app.use(express.static(path.join(__dirname , "../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    });
}



connectDB().then(()=>{


    app.listen(PORT , ()=>{
        console.log("Server started on Port : ",PORT);
    })

});






