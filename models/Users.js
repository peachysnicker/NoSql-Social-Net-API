const { Schema, model } = require("mongoose");

//Schema to create Users model
const userSchema = new Schema(
  {
    first: String,
    last: String,
    age: Number,
    thoughts: [
      // array of thoughts and it refers to the thoughts model
      {
        type: Schema.Types.ObjectId,
        ref: "thoughts",
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

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual("fullName")
  // Getter
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  // Setter to set the first and last name
  .set(function (v) {
    const first = v.split(" ")[0];
    const last = v.split(" ")[1];
    this.set({ first, last });
  });

// Initialize the User model
const Users = model("user", userSchema);

module.exports = Users;
