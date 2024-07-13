const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../auth/generateTokens");
const Token = require("./token");
const getUserInfo = require("../lib/getUserInfo");

const UserSchema = new mongoose.Schema({
    id: { type: Object },
    imageUrl: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
    if (this.isModified("password") || this.isNew) {
        const document = this;

        bcrypt.hash(document.password, 10, (err, hash) => {
            if (err) {
                next(err);
            } else {
                document.password = hash;
                next();
            }
        });
    } else {
        next();
    }
});

UserSchema.statics.nameExist = async function(name) {
    const result = await this.findOne({ name });
    return !!result;
};

UserSchema.statics.emailExist = async function(email) {
    const result = await this.findOne({ email });
    return !!result;
};

UserSchema.methods.comparePassword = async function(password, hash) {
    const same = await bcrypt.compare(password, hash);
    return same;
};

UserSchema.methods.createAccessToken = function() {
    return generateAccessToken(getUserInfo(this)); 
};

UserSchema.methods.createRefreshToken = async function (next) {
    const refreshToken = generateRefreshToken(getUserInfo(this));

    try {
      await new Token({ token: refreshToken }).save();
      return refreshToken;

    } catch (error) {
      console.error(error);
    }
  };

module.exports = mongoose.model('User', UserSchema);
