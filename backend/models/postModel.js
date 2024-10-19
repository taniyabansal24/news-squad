import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    featuredImage: { type: String },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
<<<<<<< HEAD
=======
    // views: 
    // likes
    // tags
    // userId
    // introdescription

>>>>>>> 9ec866ad232901ba253445aadd066978180bad85
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
