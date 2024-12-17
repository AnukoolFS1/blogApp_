const { createHmac, randomBytes } = require("node:crypto")
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImgUrl: {
        type: String,
        default: "/images/149071.png"
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamp: true })

UserSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();

    const hash = createHmac("sha256", salt).update(user.password).digest("hex")

    this.salt = salt;
    this.password = hash;

    next()
})

const Users = new model("user", UserSchema)

module.exports = Users