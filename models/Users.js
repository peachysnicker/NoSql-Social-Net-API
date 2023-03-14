const { Schema, model } = require("mongoose");

//Schema to create Users model
const userSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      max_length: 50,
    },
    last: {
      type: String,
      required: true,
      max_length: 50,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Users = model("user", userSchema);

module.exports = Users;
