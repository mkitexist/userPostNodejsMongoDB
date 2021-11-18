const Post=require("../models/post");


exports.createPost=(req,res,next)=>{
    const url=req.protocol+'://'+req.get("host");
    const post= new Post({
        title:req.body.title,
        content:req.body.content,
        imagePath:url+"/images/"+req.file.filename,//by multer
        creator:req.userData.userId
    });
    post.save().then(createdPost=>{
        res.status(201).json({
            message:"post added sucessfully",
            post:{
                ...createdPost,
                id:createdPost._id,
            }
        })
    }).catch(err=>{
        res.status(500).json({message:"creating the post failed"})
    });
    // console.log(post);

}
exports.updatePosts=async(req,res,next)=>{
    let imagePath=req.body.imagePath;
    if(req.file){
    const url=req.protocol+'://'+req.get("host");
    imagePath=url+"/images/"+req.file.filename//by multer

    }
    const post= {
        title:req.body.title,
        content:req.body.content,
        creator:req.userData.userId,
        imagePath
    };
    // const post= new Post({
    //     title:req.body.title,
    //     content:req.body.content
    // });
    try{
        let updated=await Post.updateOne({_id:req.params.id,creator:req.userData.userId},post);
        // console.log("udated",updated);
        if(updated.modifiedCount>0){
            res.status(200).json({
                message:"updated sucessfully",
            });
    
        }else{
            res.status(401).json({
                message:"ohh ho not your post",
            });
        }

    }catch(err){
            res.status(500).json({message:"couldnt update the post"})
    }
}
exports.getPosts=async (req,res,next)=>{
    // const post=[
    //          {
    //              id:"1",
    //             title: "first Post",
    //             content: "this is the first content"
    //           },
    //           {
    //               id:"2",
    //             title: "second Post",
    //             content: "this is the second content"
    //           },
    //           {
    //               id:"3",
    //             title: "third Post",
    //             content: "this is the third content"
    //           }
    // ]
    try{

        const pageSize=+req.query.pageSize;
        const currentPage=+req.query.page;
        const postQuery=Post.find();
        if(pageSize&&currentPage){
            postQuery.skip(pageSize*(currentPage-1))
            .limit(pageSize);
        }
    const post= await postQuery;
    let count=await Post.count();
    
        return res.status(200).json({
            message:"post sent sucessfully",
            posts:post,
            maxPosts:count
        });
    }catch(err){
        res.status(500).json({message:"Fetching post failed"})
        
    }
}

exports.getPost=async(req,res,next)=>{
    try{

        let p= await Post.findById(req.params.id);
        if(p){
          res.status(200).json(
             p
          );
        }else{
          res.status(404).json({
              message:"Post not found",
          });
        }
    }catch(err){
            res.status(500).json({message:"Fetching post failed"})
            
    }
}

exports.deletePost=async(req,res,next)=>{
    // console.log("deleting the post",req.params.id);
    try{

        let deleted= await Post.deleteOne({_id:req.params.id,creator:req.userData.userId});
      //   console.log("dleted",deleted);
        if(deleted.deletedCount>0){
            res.status(200).json({
                message:"deleted sucessfully",
            });
        }else{
          res.status(401).json({
              message:"ohh ho not your post",
          });
        }
        }
    catch(err){
        res.status(500).json({message:"deleting the post failed"})
}
}