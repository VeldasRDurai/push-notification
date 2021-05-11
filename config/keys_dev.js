require('dotenv').config();

module.exports = {
    mongoURI: "mongodb://localhost:27017/webpush",
    privateKey: process.env.VAPID_PRIVATE_KEY,
    publicKey: process.env.VAPID_PUBLIC_KEY
}    