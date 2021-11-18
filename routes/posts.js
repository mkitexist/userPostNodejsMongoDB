const express=require("express");
const router=express.Router();
const postController=require("../controllers/posts")
const checkAuth=require("../middleware/check-auth");
const multer=require("../middleware/multer");

router.post('/',checkAuth,multer,postController.createPost)
router.get('/',postController.getPosts);
router.delete('/:id',checkAuth,postController.deletePost)
router.put("/:id",checkAuth,multer,postController.updatePosts)
router.get("/:id",postController.getPost)

module.exports=router;