import express from "express";
import middlewareAuth from "../middlewares/middlewareAuth";
import userController from "../controllers/userController";
const router = express.Router();

// Get All User, Method: GET //
// api/user/getAllUser
router.get(
  "/getAllUser",
  middlewareAuth.verifyToken,
  userController.getAllUser
);

// Get User, Method: GET //
// api/user/:userId //
router.get("/:userId", middlewareAuth.verifyToken, userController.getUser);

//GET User Friend, method: GET //
// api/user/:userId/friends
router.get(
  "/:userId/friends",
  middlewareAuth.verifyToken,
  userController.getUserFriend
);

// ADD OR REMOVE FRIEND, method: GET//
// api/user/:friendId
router.get(
  "/addRemove/:friendId",
  middlewareAuth.verifyToken,
  userController.addRemoveFriend
);
export default router;
