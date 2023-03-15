module.exports = {
  //GET all thoughts
  getThought(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //GET a single though by its _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
  //POST a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

  //PUT to update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },
  //DELETE to remove a thought by its _id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((deleteThought) => {
        if (!deleteThought) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        return User.findOneAndUpdate(
          { username: deleteThought.username },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
  //POST to create a reaction stored in a single thought's reaction array field
  //DELETE to pull and remove a reaction by the reaction's reactionId value
};
