const { Schema, model } = require("mongoose");

//Schema to create Users model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/], //must match valid email address
    },
    thoughts: [
      // array of thoughts and it refers to the thoughts model
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      // array of thoughts and it refers to the thoughts model
      {
        type: Schema.Types.ObjectId,
        ref: "User",
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

//create virtual friendCount that retrieves the length of the user's friends array field on query
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize the User model
const User = model("User", userSchema);

module.exports = User;
