const mongoURI="mongodb+srv://anmayademo:0OSClwwv0gLnV9Xu@cluster0.qc5qdlg.mongodb.net/RoboCraft?retryWrites=true&w=majority";

// mongodb+srv://anmayademo:0OSClwwv0gLnV9Xu@cluster0.qc5qdlg.mongodb.net/
const mongoose=require('mongoose');

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = connectToMongo
