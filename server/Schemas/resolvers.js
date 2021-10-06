const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { ObjectId } = require('mongodb');


const resolvers = {
  Query: {
    users: async () => {
      return User.find({}).populate('savedBooks');
    },
    me: async (parent, args, context) => {
      console.log(context.user)
      console.log("hello world don't you know who i am?")
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate('savedBooks');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      
      return { token, user };
    },
    login: async (parent, { email, password }) => {
  
      const user = await User.findOne({ email });
      console.log ("Hey-rro!  Login================")
      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }
      console.log("getting token")
      const token = signToken(user);
      if (token)
      console.log(token)
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
      console.log("Hey-rro! Inside Resolver removeBook.")
      if (context.user) {
        console.log("Hey-rro from Kirk!!!!!!!!!!!!!")
        console.log(context.user._id)
        console.log(bookId)
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { _id: ObjectId(bookId) } } },
          { new: true }
        );
      }
    },
  },
};

module.exports = resolvers;
