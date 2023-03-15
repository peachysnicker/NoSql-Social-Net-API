const { User, Thought, Reaction } = require("../models");

module.exports = {
  //GET all users
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //GET a single user by _id & populate thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // Populate means to populate 'thoughts' and 'friends'
      .populate({ path: "thoughts", select: "-__v" })
      .populate({ path: "friends", select: "-__v" })
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
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //UPDATE a user by _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  //DELETE a user by _id
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : Thought.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "User deleted, but no thoughts found",
            })
          : res.json({
              message: "User successfully deleted with associated thought?",
            })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //BONUS to remove a user's associated thoughts when deleted

  //POST to add a new friend to user's friend list
  addFriend(req, res) {
    console.log("You are adding an friend!");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friendss: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //DELETE to remove a friend from user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friend: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
