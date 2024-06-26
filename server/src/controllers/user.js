import { createError } from "../error.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const updateRootUser = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync("root", salt);

  let user;

  user = await User.findOne({ name: "root" });

  if (!user) {
    user = await User.findOne({ email: "root" });
  }

  if (!user) {
    await User.deleteMany({ roles: { $in: ["root"] } });

    return User({
      name: "root",
      password: hash,
      email: "root",
      roles: ["root"]
    }).save();
  }
  return User.findOneAndUpdate(
    {
      name: user.name
    },
    {
      $set: {
        password: hash,
        email: "root",
        roles: ["root"]
      }
    }
  );
};

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        {
          new: true
        }
      );
      res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted!");
    } catch (e) {
      next(e);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id }
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 }
    });
    res.status(200).json("Subscription successful.");
  } catch (e) {
    next(e);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id }
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 }
    });
    res.status(200).json("Unsubscription successful.");
  } catch (e) {
    next(e);
  }
};
