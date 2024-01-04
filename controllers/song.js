import mongoose from "mongoose";
import { SongModel } from "../models/song.js"

export const getAllSongs = async (req, res) => {
    try {

        let allSongs= await SongModel.find({});
        res.json(allSongs)

    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get songs" })
    }
}



export const getSongById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })
        let song = await SongModel.findById(id);
        if (!song)
            return res.status(404).json({ type: "no id", message: "no song with such id" })
        return res.json(song)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get song" })
    }

}


export const deleteSong = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })
            let existingSong = await SongModel.findOne({ _id: id });
      
          if (!existingSong) {
            return res.status(404).json({ type: "not found", message: "song not found" });
          }
      
        let song = await SongModel.findByIdAndDelete(id);
        return res.json(song)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot dekete Song" })
    }

}

export const addSong = async (req, res) => {
    let { name, during,  album } = req.body;

    if (!name)
        return res.status(404).json({ type: "missing param", message: "missing name param" })
    try {
        let sameSong = await SongModel.findOne({ name: name });
        if (sameSong)
            return res.status(409).json({ type: "same details", message: "there is already same Song" })
        let newSong = new SongModel({ name,album,during });
        await newSong.save();

        return res.json(newSong)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get Song" })
    }

}
// export const updateSong = async (req, res) => {
//     try {
 
//      const updatedSong=req.body;
//      const id=req.params.id
    
//       const result = await SongModel.updateOne(
//         { _id: id },
//         { $set: updatedSong } );
//      if(result)
//       return res.json(result);
//        return res.status(404).json({ type: "no Song to update", message: "no Song with such id to update" })
//     }
//     catch (err) {
//         console.log(err)
//         res.status(400).json({ type: "invalid operation", message: "sorry cannot update Song" })
//     }}







    export const updateSong = async (req, res) => {
      
       try { 
         let id=req.body.id;
        if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ type: "not valid id", message: "id not in right format" })
        let {updatedData} = req.body;
     
        if (!id || !updatedData) {
          return res.status(400).json({ type: "missing params", message: "missing songId or updatedData" });
        }
      

          let existingSong = await SongModel.findOne({ _id: id });
      
          if (!existingSong) {
            return res.status(404).json({ type: "not found", message: "song not found" });
          }
      
          let updatedSong = await SongModel.findByIdAndUpdate(id, updatedData, { new: true });
      
          return res.json(updatedSong);
        }
         catch (err) {
          console.log(err);
          res.status(500).json({ type: "error", message: "failed to update song" });
        }
      };