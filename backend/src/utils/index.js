const { usermodel } = require("../model")
const bcrypt = require("bcrypt")
const createdummyuser = async (dummyuser) => {
    try {

        const user = await usermodel.findOne({
            email: dummyuser.email
        })
        if (user) return
        const hashpassword = await bcrypt.hash(dummyuser.password, 10)
        await usermodel.create({ ...dummyuser, password: hashpassword })
        console.log(`sucessfully create dummy user`)
    } catch (error) {
        console.log(error)
    }

}

module.exports = { createdummyuser }