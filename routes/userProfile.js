const express = require("express");
const {
  userProfileCreate,
  updateBasicDetails,
  getUserProfile,
  getallProfiles,
  getProfileById,
} = require("../controllers/userProfile");
const { protect } = require("../middleware/auth");

const controller = require("../controllers/userProfile");

const router = express.Router();

router.post("/create", controller.createUser);
router.post("/login", controller.userLogin);
router.post("/login-with-google", controller.loginWithGoogle);

router.post("/update-credit-card", controller.updateUserCreditCard);
router.post("/update", controller.updateUser);
router.post("/basicdetails", controller.updateBasicDetails);
router.post("/familydetails", controller.updateFamilyDetails);
router.post("/groomdetails", controller.updateGroomDetail);
router.post("/lifestyle", controller.updateLifeStyle);
router.post("/peronalinfo", controller.updatePerosnalInfo);
router.post("/religiondetail", controller.updateReligionDetails);
router.post("/aboutfamily", controller.updateAboutFamily);

router.get("/getprofile", protect, getUserProfile);
router.post("/getall", getallProfiles);
router.post("/getuserprofile", controller.getProfileById);

module.exports = router;
