import mongoose from "mongoose";

const connectDB = async () =>{

    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
    
        console.log(`✅ MongoDB connected !! DB : ${connectionInstance.connection.host}`);
    } catch (error) {
        
        console.error(`❌ MongoDB Connection failed ${error}`);
        
        process.exit(1);    // Exit with failure
    }
    
}


export default connectDB;





// uBS9KUS598yIEaPg
// mongodb+srv://vasu264kumar:uBS9KUS598yIEaPg@cluster0.nvejbbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0