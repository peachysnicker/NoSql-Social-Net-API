const { Schema, model } = require("mongoose");
// Come back and add reaction schema later
// const reactionSchema = require('./Reaction');

//Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    // reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// ReactionCount to get the length of the array
// thoughtSchema.virtual("reactionCount").get(function () {
//   return this.reactions.length;
// });

const Thoughts = model("thought", thoughtSchema);

module.exports = Thoughts;
