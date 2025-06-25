import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote , getNoteById } from "../controllers/notes.controller.js";


const router = express.Router();


router.get("/",getAllNotes);


router.get("/:id",getNoteById);


router.post("/",createNote);


router.put("/:id",updateNote);


router.delete("/:id",deleteNote);



export default router;




// app.get("/api/notes",(req,res)=>{
//     // get notes
//     res.status(200).send("you get 1 todos");
// })


// app.post("/api/notes",(req,res)=>{
//     // get notes
//     res.status(201).send("Note create successfully");
// })


// app.put("/api/notes/:id",(req,res)=>{
//     // get notes
//     res.status(200).send("Note update successfully");
// })


// app.delete("/api/notes/:id",(req,res)=>{
//     // get notes
//     res.status(200).send("Note delete successfully");
// })