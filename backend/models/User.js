import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      default: "Stanford University",
    },
    university: {
      type: String,
      default: "Stanford University",
    },
    branch: {
      type: String,
      default: "Computer Science",
    },
    major: {
      type: String,
      default: "Computer Science",
    },
    semester: {
      type: Number,
      default: 6,
    },
    graduationYear: {
      type: String,
      default: "2026",
    },
    year: {
      type: String,
      default: "'26",
    },
    roleTitle: {
      type: String,
      default: "Student Builder",
    },
    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
    bio: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    interests: {
      type: [String],
      default: [],
    },
    lookingFor: {
      type: String,
      default: "",
    },
    match: {
      type: String,
      default: "95% Match",
    },
    github: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Helper method to remove password before returning JSON
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
