var mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {  //model name passed
    
    name: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
});//structure or schema of model

module.exports = { Employee };  //need to export to access in controller