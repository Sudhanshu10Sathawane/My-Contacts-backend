const express=require("express");
const router=express.Router();
const {getContacts, getContact, createContact ,updateContact, deleteContact} =require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);
router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);
/*Since same as getContacts will move it*/
// router.route("/").post(createContact);
/*Since same as getContact will move it*/
// router.route("/:id").put(updateContact);
// router.route("/:id").delete(deleteContact);
module.exports=router;