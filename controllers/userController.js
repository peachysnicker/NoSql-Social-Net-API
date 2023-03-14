const { User, Thought, Reaction } = require("../models");

module.exports = {
  //GET all users
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  //GET a single user by _id & populate thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // Populate means to populate 'thoughts' and 'friends'
      .populate("thoughts")
      .populate("friends")
      // If no user then error with message
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //CREATE a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  //UPDATE a user by _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //DELETE a user by _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
      })
      .then(() => {
        res.json({ message: "Successfully deleted user" });
      })
      .catch((err) => res.status(400).json(err));
  },

  //BONUS to remove a user's associated thoughts when deleted
};
