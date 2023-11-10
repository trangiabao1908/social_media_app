import express from "express";
import postController from "../controllers/postController";
import middlewareAuth from "../middlewares/middlewareAuth";
import { upload } from "../utils/storage";

const router = express.Router();

// CREATE POST, method: POST //
router.post(
  "/",
  middlewareAuth.verifyToken,
  upload.single("picture"),
  postController.createPost
);

//GET ALL POST
router.get("/posts", middlewareAuth.verifyToken, postController.getAllPost);
//GET POST BYSELF, method: GET //
router.get("/", middlewareAuth.verifyToken, postController.getPost);

//GET POST BY ID, method: GET //
router.get("/:userId", middlewareAuth.verifyToken, postController.getPostsByID);

//UPDATE POST BY ID, method: PUT //
router.put("/:postId", middlewareAuth.verifyToken, postController.updatePost);

//DELETE POST BY ID, method: DELETE //
router.delete(
  "/:postId",
  middlewareAuth.verifyToken,
  postController.deletePost
);

//LIKE OR DISLIKE POST BY ID, method: PATCH //
router.patch(
  "/:postId/like",
  middlewareAuth.verifyToken,
  postController.likeDislikePost
);
//COMMENT POST BY ID, method: PATCH //
router.patch(
  "/:postId/comment",
  middlewareAuth.verifyToken,
  postController.commentPost
);
//DELETE POST BY ID, method: PATCH //
router.put(
  "/:postId/comment",
  middlewareAuth.verifyToken,
  postController.deleteCommentPost
);
export default router;
