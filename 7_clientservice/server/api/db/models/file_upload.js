import mongoose from "mongoose";

const FileUploadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },         
    url: { type: String, required: true },          
    filepath: { type: String, required: true },     
    size: { type: Number, required: true },        // File size in bytes
    meta_data: { type: mongoose.Schema.Types.Mixed },  
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AppUser",   
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("FileUpload", FileUploadSchema);
