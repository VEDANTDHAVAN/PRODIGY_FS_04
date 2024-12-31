import mongoose from "mongoose";
import config from "../config.js";
function connect(){
    mongoose.connect(config.MONGODB_URI)
        .then(()=> {
        console.log("MongoDB Database Connected!!");
        })
        .catch(error => {
        console.log(error);
        })
};

export default connect;
