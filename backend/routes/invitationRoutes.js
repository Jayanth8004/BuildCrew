import express from "express";
import mongoose from "mongoose";
import Invitation from "../models/Invitation.js";
import Project from "../models/Project.js";
import Team from "../models/Team.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

// GET /api/invitations/my - Invitations received by or sent by authenticated user
router.get("/my", authenticateUser, async (req, res) => {
  try {
    const received = await Invitation.find({ receiver: req.user._id })
      .populate("sender", "name email avatar university role")
      .populate("project", "title categoryBadge type")
      .populate("team", "teamName")
      .sort({ createdAt: -1 });

    const sent = await Invitation.find({ sender: req.user._id })
      .populate("receiver", "name email avatar university role")
      .populate("project", "title categoryBadge type")
      .populate("team", "teamName")
      .sort({ createdAt: -1 });

    return res.json({ received, sent });
  } catch (err) {
    console.error("Fetch invitations error:", err);
    return res.status(500).json({ error: "Could not retrieve invitations.", details: err.message });
  }
});

// POST /api/invitations - Dispatch invitation to a student
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { receiverId, projectId, teamId, role, message } = req.body;

    if (!receiverId || !mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ error: "Valid receiverId is required." });
    }

    if (receiverId.toString() === req.user._id.toString()) {
      return res.status(400).json({ error: "You cannot invite yourself." });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ error: "Recipient student account not found." });
    }

    // Check if duplicate pending invitation exists
    const query = {
      sender: req.user._id,
      receiver: receiver._id,
      status: "pending",
    };
    if (projectId && mongoose.Types.ObjectId.isValid(projectId)) {
      query.project = projectId;
    }

    const existing = await Invitation.findOne(query);
    if (existing) {
      return res.status(409).json({ error: "A pending invitation has already been sent to this student." });
    }

    const invitation = await Invitation.create({
      sender: req.user._id,
      receiver: receiver._id,
      project: projectId && mongoose.Types.ObjectId.isValid(projectId) ? projectId : undefined,
      team: teamId && mongoose.Types.ObjectId.isValid(teamId) ? teamId : undefined,
      role: role || "Teammate / Contributor",
      message: message || `${req.user.name} invited you to join their squad!`,
      status: "pending",
    });

    // Create Notification in MongoDB for receiver
    await Notification.create({
      recipient: receiver._id,
      type: "invitation_received",
      title: "New Squad Invitation 🚀",
      message: `${req.user.name} invited you to collaborate as "${invitation.role}".`,
      relatedId: invitation._id.toString(),
      read: false,
    });

    const populated = await Invitation.findById(invitation._id)
      .populate("sender", "name email avatar university role")
      .populate("receiver", "name email avatar university role")
      .populate("project", "title categoryBadge");

    return res.status(201).json({
      success: true,
      message: "Invitation sent successfully in MongoDB.",
      invitation: populated,
    });
  } catch (err) {
    console.error("Create invitation error:", err);
    return res.status(500).json({ error: "Failed to dispatch invitation.", details: err.message });
  }
});

// PATCH /api/invitations/:id - Accept or reject invitation
router.patch("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Status must be 'accepted' or 'rejected'." });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid invitation ID." });
    }

    const invitation = await Invitation.findById(id)
      .populate("project")
      .populate("team");

    if (!invitation) {
      return res.status(404).json({ error: "Invitation not found." });
    }

    // Only receiver can accept/reject
    if (invitation.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Forbidden: You cannot respond to this invitation." });
    }

    invitation.status = status;
    await invitation.save();

    // If accepted: add receiver to team / project
    if (status === "accepted") {
      if (invitation.project) {
        const project = await Project.findById(invitation.project._id);
        if (project && !project.members.map((m) => m.toString()).includes(req.user._id.toString())) {
          project.members.push(req.user._id);
          project.filledCount = Math.min(project.totalCapacity, (project.filledCount || 1) + 1);
          await project.save();
        }
      }

      if (invitation.team) {
        const team = await Team.findById(invitation.team._id);
        if (team && !team.members.map((m) => m.toString()).includes(req.user._id.toString())) {
          team.members.push(req.user._id);
          await team.save();
        }
      }

      // Notify the sender
      await Notification.create({
        recipient: invitation.sender,
        type: "invitation_accepted",
        title: "Invitation Accepted! 🤝",
        message: `${req.user.name} accepted your squad invitation.`,
        relatedId: invitation._id.toString(),
        read: false,
      });
    } else if (status === "rejected") {
      // Notify sender of rejection
      await Notification.create({
        recipient: invitation.sender,
        type: "invitation_rejected",
        title: "Invitation Declined",
        message: `${req.user.name} was unable to accept your squad invitation.`,
        relatedId: invitation._id.toString(),
        read: false,
      });
    }

    const updated = await Invitation.findById(id)
      .populate("sender", "name email avatar university role")
      .populate("receiver", "name email avatar university role")
      .populate("project", "title categoryBadge members");

    return res.json({
      success: true,
      message: `Invitation ${status} successfully.`,
      invitation: updated,
    });
  } catch (err) {
    console.error("Respond invitation error:", err);
    return res.status(500).json({ error: "Failed to update invitation.", details: err.message });
  }
});

export default router;
