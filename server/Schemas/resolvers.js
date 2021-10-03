const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    users: async () => {
      return User.find({}).populate('savedBooks');
    },
    me: async (parent, args, context) => {
      console.log("hello world")
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate('savedBooks');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      console.log("one")
      const user = await User.create({ username, email, password });
      console.log("two")
      
      const token = signToken(user);
      console.log("three")
      return { token, user };
    },
    login: async (parent, { email, password }) => {
  
      const user = await User.findOne({ email });
      console.log ("Hey-rro!")
      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }
      console.log("getting token")
      const token = signToken(user);
      return { token, user };
    },

    addBook: async (parent, { book }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
      }
    },

    removeBook: async (oarent, { bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          { $pull: { savedBooks, bookId } },
          { new: true }
        );
      }
    },
  },
};

module.exports = resolvers;
