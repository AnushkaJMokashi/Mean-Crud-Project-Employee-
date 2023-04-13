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
router.post("/user/create", async (req, res) => {
  try {
    var emp = new Employee({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
    });
    await emp.save((err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in Employee Save :" + JSON.stringify(err, undefined, 2)
        );
      }
    });
  } catch (e) {
    console.log(e);
  }
});
router.put("/user/update/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
    };
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: emp }
    ).then((result)=>res.send(result));
  } catch (e) {
    console.log(e);
  }
});

router.delete("/user/remove/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  await Employee.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Employee Delete :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

module.exports = router;
