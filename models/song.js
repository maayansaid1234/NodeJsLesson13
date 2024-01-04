import mongoose from "mongoose";



const songSchema = mongoose.Schema({
    name: {type:String,require:true},
    album:String,
    during:Number
   
})

export const SongModel = mongoose.model("songs", songSchema);