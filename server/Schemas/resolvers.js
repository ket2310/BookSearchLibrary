const { User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find({}).populate('savedBooks');
    },
    user: async (parent, { userId }) => {
      return Profile.findOne({ _id: profileId }).populate('savedBooks');
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password })
        .saveBook
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    addBook: async (parent, { userId, book }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { savedBooks: book } },
        { new: true, runValidators: true }
      );
    },

    removeBook: async (oarent, { userId, book }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { savedBooks, book } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
