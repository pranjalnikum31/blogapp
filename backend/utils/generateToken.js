
const jwt=require("jsonwebtoken")

async function generateJWT(payload) {
    let token = await jwt.sign(payload,"tagdasecret")
    return token
}


async function verifyJWT(token) {
    try {
        let data = await jwt.verify(token,"tagdasecret")
        return data
    } catch (err) {
        // console.log(err.message)
        return false
    }
    
}
async function decodejwt(token) {
    let decoded=await jwt.decode(token)
    return decoded
}
module.exports={generateJWT,verifyJWT,decodejwt}