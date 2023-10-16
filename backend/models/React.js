const {mongoose,Schema }= require("mongoose")

const reactSchema = new mongoose.Schema({
   
  react:{
    type : String,
    enum: ["like", "love", "haha", "sad", "angry", "wow"],
    required: true,
  },
  postRef:{
    type : Schema.Types.ObjectId,
    ref: "Post",
    required:true,
  },
  reactBy:{
    type :Schema.Types.ObjectId,
    ref: "User",
    required:true,

  }
},
{
  timestamps: true,
}
)

module.exports = mongoose.model("React", reactSchema);
