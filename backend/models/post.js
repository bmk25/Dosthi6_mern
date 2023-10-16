const {mongoose,Schema}= require("mongoose");
// const User = require("./user");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["profilePicture", "coverPicture", null],
      default: null,
    },
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    background: {
      type: String,
    },
    comments: [
      {
        comment: {
          type: String,
        },
        image: {
          type: String,
        },
        commentBy: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        commentAt: {
          type: Date,
          require: true,
        },
      },
    ],
    // reacts: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "React",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
