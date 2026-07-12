const mongoose = require("mongoose")



async function connectToDB() {

    try {
        const conn=await mongoose.connect(process.env.MONGODB_URL)

        console.log("Connected to Database")
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = connectToDB