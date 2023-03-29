const express = require("express")

const loginHandler = require("../controllers/loginController")
const tokenAuthentication = require("../controllers/authentication")
const totalMembers = require("../controllers/totalMembersController")
const family = require("../controllers/familyController")
const search = require("../controllers/searchController")
const router = express.Router()

router.post("/api/login",loginHandler)
router.get("/api/gotpeople",tokenAuthentication,totalMembers)
router.get("/api/gotpeople/:family",tokenAuthentication,family)
router.get("/api/search",tokenAuthentication,search)

module.exports = router