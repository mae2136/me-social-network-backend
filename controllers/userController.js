const { User } = require('../models');


module.exports = {
    // getUsers
    getUsers(req, res) {
        User.find()
            .then((users) => res.status(200).json(users))
            .catch((err) => res.status(500).json(err));
    },

    // getSingleUser
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    : res.status(200).json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // createUser
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // updateUser
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.status(200).json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // deleteUser
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.status(200).json({ message: 'User deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
    // addFriend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID :(' })
                    : res.status(200).json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // deleteFriend
    deleteFriend(req, res) {
        console.log("Test params: ", req.params);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No friend found with that ID :(' })
                    : res.status(200).json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};