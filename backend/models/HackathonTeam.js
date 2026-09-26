import mongoose from "mongoose";

const hackathonTeamSchema = new mongoose.Schema(
  {
    hackathon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      required: true,
    },
    hackathonId: {
      type: String,
      default: "",
    },
    hackathonTitle: {
      type: String,
      default: "",
    },
    teamName: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      default: "",
    },
    track: {
      type: String,
      default: "General Track",
    },
    tagline: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    techStack: {
      type: [String],
      default: [],
    },
    filledCount: {
      type: Number,
      default: 1,
    },
    totalCapacity: {
      type: Number,
      default: 4,
    },
    syncSchedule: {
      type: String,
      default: "Sundays 6:00 PM PT",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lead: {
      name: { type: String, default: "" },
      university: { type: String, default: "" },
      role: { type: String, default: "Team Lead" },
      avatar: { type: String, default: "" },
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    openVacancies: [
      {
        title: String,
        seats: String,
        skills: [String],
        hours: String,
      },
    ],
    status: {
      type: String,
      enum: ["forming", "recruiting", "full", "active", "submitted"],
      default: "recruiting",
    },
  },
  {
    timestamps: true,
  }
);

const HackathonTeam = mongoose.model("HackathonTeam", hackathonTeamSchema);

export default HackathonTeam;
