const Reactions = require("../models/React")
const mongoose = require("mongoose")

// exports.postReact = async (req, res) => {
//   try {
//     const { react, postRef, reactBy } = req.body;

//     // Check if a reaction with the same postRef and reactBy exists
//     const existingReact = await React.findOne({ postRef, reactBy });

//     if (existingReact) {
//       // If the existing reaction is the same as the new one, remove it
//       if (existingReact.react === react) {
//         await React.deleteOne({ _id: existingReact._id });
//         return res.status(200).json({ message: "Reaction removed successfully" });
//       } else {
//         // Update the existing reaction if it's different
//         existingReact.react = react;
//         await existingReact.save();
//         return res.status(200).json({ message: "Reaction updated successfully" });
//       }
//     } else {
//       // Create a new reaction if it doesn't exist
//       const newReact = new React({
//         react: react,
//         postRef,
//         reactBy,
//       });
//       await newReact.save();
//       return res.status(200).json({ message: "Reaction added successfully" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }



// exports.postReact = async(req,res)=>{
//   try {
//     const {postId,type} = req.body;
//     const check = await Reacts.findOne({
//       postRef: postId,
//       reactBy: req.user.id
//     })
//     if (check === null){
//      const newReact = await Reacts.create(req.body)
//      res.status(200).json({message:`${react} is succefully `})

//       }else{
//         if ( check.react === react ){
//           const removeReact = await Reacts.findByIdAndRemove(check._id)
//           res.status(200).json({message:`${react} removed `})
        
//         }else{
//           const updatedReact = await Reacts.findByIdAndUpdate(check._id,{
//             react: react
//           })
//           res.status(200).json({message:`${react} is updated success`})
//         }

//     }
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({message:error.message})
    
//   }

// }


exports.postReact = async (req, res) => {
  try {
    const { postRef, react } = req.body;
    const check = await Reactions.findOne({
      postRef: postRef,
      reactBy: req.user.id,
    });
    // console.log(check)
    // console.log(postRef)
    if (check == null) {
      const newReact = new Reactions({
        react: react,
        postRef: postRef,
        reactBy: req.user.id,
      });
      await newReact.save();
      res.status(200).json({message:`${react} is newly added success`})

    } else {
      if (check.react == react) {
        await Reactions.findByIdAndRemove(check._id);
        res.status(200).json({message:`${react} is remove success`})

      } else {
        await Reactions.findByIdAndUpdate(check._id, {
          react: react,
        });
        res.status(200).json({message:`${react} is updated success`})

      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// !like posting this reactID into the post model 
// exports.postReact = async (req, res) => {
//   try {
//     const { react, postRef, reactBy } = req.body;

//     const check = await Reacts.findOne({
//       postRef: postRef,
//       reactBy: reactBy,
//     });

//     if (check === null) {
//       // Create a new reaction
//       const newReact = await Reacts.create(req.body);

//       // Push the new reaction ObjectId to the post's 'reacts' array
//       const post = await Post.findById(postRef);
//       post.reacts.push(newReact._id);
//       await post.save();

//       res.status(200).json({ message: `${react} is successfully added` });
//     } else {
//       if (check.react === react) {
//         // If the user is trying to remove the same reaction, delete the reaction
//         await Reacts.findByIdAndRemove(check._id);

//         // Remove the reaction ObjectId from the post's 'reacts' array
//         const post = await Post.findById(postRef);
//         post.reacts.pull(check._id);
//         await post.save();

//         res.status(200).json({ message: `${react} removed` });
//       } else {
//         // If the user is changing the reaction, update the existing reaction
//         const updatedReact = await Reacts.findByIdAndUpdate(check._id, {
//           react: react,
//         });
//         res.status(200).json({ message: `${react} is updated successfully` });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };


exports.getReacts = async (req, res) => {
  try {
    const reactsArray = await Reactions.find({ postRef: req.params.id });

    /*
    const check1 = reacts.find(
      (x) => x.reactBy.toString() == req.user.id
    )?.react;
    */

    const check = await Reactions.findOne({
      postRef: req.params.id,
      reactBy: req.user.id,
    });
    
    const newReacts = reactsArray.reduce((group, react) => {
      let key = react["react"];
      group[key] = group[key] || [];
      group[key].push(react);
      return group;
    }, {});



    const reacts = [
      {
        react: "like",
        count: newReacts.like ? newReacts.like.length : 0,
      },
      {
        react: "love",
        count: newReacts.love ? newReacts.love.length : 0,
      },
      {
        react: "haha",
        count: newReacts.haha ? newReacts.haha.length : 0,
      },
      {
        react: "sad",
        count: newReacts.sad ? newReacts.sad.length : 0,
      },
      {
        react: "wow",
        count: newReacts.wow ? newReacts.wow.length : 0,
      },
      {
        react: "angry",
        count: newReacts.angry ? newReacts.angry.length : 0,
      },
    ];

    res.json({
      reacts,
      check: check?.react,
      total: reactsArray.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

