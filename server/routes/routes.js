var express = require("express");
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
const { Employee } = require("../src/user/userModel");

router.get("/user/getAll", async (req, res) => {
  try {
    const users = await Employee.find({});
    console.log(users);
    res.json(users);
  } catch (e) {
    console.log(e);
  }
});
router.post("/user/create",async(req,res)=>{
  try{
    const{name,address,phone} = req.body;
    const emp = await Employee.create({
      name,address,phone
    });
    return res.json({status:true,emp});
  }catch(e){
    console.log(e);
  }
})

router.put("/user/update/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id,{
      name:req.body.name,
      address:req.body.address,
      phone:req.body.phone
    });
  } catch (e) {
    console.log(e);
  }
});

router.delete("/user/remove/:id", async (req, res) => {
  const deleted = await Employee.findByIdAndRemove(req.params.id);
  if(deleted){
    return res.json({status:true});
  }else{
    return res.json({status: false});
  }
});

module.exports = router;
