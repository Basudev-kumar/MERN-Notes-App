import Note from "../models/note.models.js";

export async function getAllNotes (_,res){

    try {

        const notes = await Note.find().sort({createdAt:-1});    // -1 will sort in desc. order ( newest first )
        res.status(200).json(notes);

        // res.status(200).send("You just fetched the notes !!! \n hello leemda");
    } catch (error) {
        
        console.error("Error in getAllNotes controllers ",error);
        res.status(500).json({message:"Internal server error"});
    }
}



export const getNoteById = async (req ,res) =>{

    try {
        
        const getNoteById = await Note.findById(req.params.id,{new:true});
        if(!getNoteById) return res.status(404).json({message:"Note not found"});
        res.status(200).json({message:"Note found successfully"});

    } catch (error) {
        
        console.error("Error in getNoteById controllers ",error);
        res.status(500).json({message:"Internal server error"});
    }
}


export const createNote = async (req,res)=>{

    
    try {

        const {title,content} = req.body;
        const newNote = new Note({title:title,content:content});
        const saveNote = await newNote.save();
        res.status(201).json(saveNote);
        
        // res.status(201).send("Note create successfully");
    } catch (error) {
        
        console.error("Error in createNote controllers ",error);
        res.status(500).json({message:"Internal server error"});
    }
}



export async function updateNote (req,res) {
    
    try {
        
        const {title,content} = req.body;
        const updateNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true});

        if(!updateNote) return res.status(404).json({message:"Note not found"});

        const saveNote = await updateNote.save();
        res.status(200).json(saveNote);

    } catch (error) {
        
        console.error("Error in updateNote controllers ",error);
        res.status(500).json({message:"Internal server error"});
    }
}


export const deleteNote = async (req,res)=>{
    
    try {
        
        const deleteNote = await Note.findByIdAndDelete(req.params.id,{new:true});
        if(!deleteNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json({message:"Note deleted successfully"});


        // res.status(200).send("Note delete successfully");

    } catch (error) {
        
        console.error("Error in deleteNote controllers ",error);
        res.status(500).json({message:"Internal server error"});
    }
}