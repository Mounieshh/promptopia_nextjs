import mongoose from "mongoose";


let isConnected = false;

export const connectToDb = async() => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("DB is already connected..");
        return;
        
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName :'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology:true
        })

        isConnected = true;
        console.log("MongoDB database connected");
        
    } catch (error) {
        console.log(error)
    }
}