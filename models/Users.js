const { Schema, model } = require("mongoose");

//Schema to create Users model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      // NEED TO ADD TRIMMED FEATURE
    },
    email: {
      type: String,
      required: true,
      // ADD UNIQUE FEATURE TRUE
      // ADD MUST MATCH VALID EMAIL ADDRESS - LOOK INTO MONGOOSE MATCHING VALIDATION
    },
    thoughts: [
      // array of thoughts and it refers to the thoughts model
      {
        type: Schema.Types.ObjectId,
        ref: "thoughts",
      },
    ],
    friends: [
      // array of thoughts and it refers to the thoughts model
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  // Indicating we want virtuals to be included with our response, overriding the default behaviour
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Initialize the User model
const Users = model("user", userSchema);

module.exports = Users;
