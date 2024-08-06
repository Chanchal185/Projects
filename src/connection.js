const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://127.0.0.1:27017/login");

connect.then(()=>{
    console.log("Database connected successfully");
})
.catch(()=>{
    console.log("Database is not connected");
})

const loginSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    }
});

const collection = new mongoose.model("users", loginSchema);

module.exports = collection;









// const mongoose = require('mongoose')
// const connect = async()=>{
//     try{
//         let connection = await mongoose.connect('mongodb://127.0.0.1:27017/login',{ useNewUrlParser: true})
//         console.log('Connected to database.....');
//     }
//     catch(error){
//         console.log(error)
//     }
// }
// module.exports = connect;









