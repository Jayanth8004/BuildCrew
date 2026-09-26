import bcrypt from "bcryptjs";
import User from "./models/User.js";

/**
 * Ensures founder administrator accounts exist in MongoDB with role: "admin".
 * No mock data, demo students, or hardcoded projects are seeded.
 */
export const seedFounderAdmins = async () => {
  try {
    const admin1Email = (process.env.ADMIN1_EMAIL || "hiteshav2006@gmail.com").trim().toLowerCase();
    const admin1Password = process.env.ADMIN1_PASSWORD || "789632147@";
    const admin2Email = (process.env.ADMIN2_EMAIL || "jhs498969@gmail.com").trim().toLowerCase();
    const admin2Password = process.env.ADMIN2_PASSWORD || "789632147@";

    const founders = [
      {
        email: admin1Email,
        password: admin1Password,
        name: "Hitesh (Founder)",
        roleTitle: "Co-Founder & Platform Architect",
        college: "Stanford University",
        branch: "Computer Science",
        role: "admin",
        avatar: "https://lh3.googleusercontent.com/aida/AEtjO1U9z5PpV3Oif5HhhByVbwFRYk7HWVBiaoD0VNB5HJ0qL8NTgyV9zdv3Z0kb1LWlSYbxqz2J0ARPqkm6aWj8V5UZtnnkauBTB6e-Pvqfvt90EnUwriRM5A97Q9V9iZdlRCjtwercmGE3G05yZRlXzzCm7g9O5kGcUVghkc3NcvdMvplHHEzkzeKbC2NS5k3KzdHOvmlEJGz_SqF5Q0Kz5kl0mRpG_0NW8L5Hs51VIWTludWsf0Raog0dXhpSS-eK4_xEupfb60OG",
        profileImage: "https://lh3.googleusercontent.com/aida/AEtjO1U9z5PpV3Oif5HhhByVbwFRYk7HWVBiaoD0VNB5HJ0qL8NTgyV9zdv3Z0kb1LWlSYbxqz2J0ARPqkm6aWj8V5UZtnnkauBTB6e-Pvqfvt90EnUwriRM5A97Q9V9iZdlRCjtwercmGE3G05yZRlXzzCm7g9O5kGcUVghkc3NcvdMvplHHEzkzeKbC2NS5k3KzdHOvmlEJGz_SqF5Q0Kz5kl0mRpG_0NW8L5Hs51VIWTludWsf0Raog0dXhpSS-eK4_xEupfb60OG",
        bio: "BuildCrew Founder & Collegiate Platform Lead.",
      },
      {
        email: admin2Email,
        password: admin2Password,
        name: "Jayanth (Founder)",
        roleTitle: "Co-Founder & Lead Engineer",
        college: "Stanford University",
        branch: "Computer Science",
        role: "admin",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCM4VJ_y3eQXx_ZHkdkypEkb7yiKToP7XJhWP_YDFlZfxGJ3MN3udbXoX2FRhx3dPmQ-yEZqmNebAKWJ2h-grRjGY_of0K2uTM7Rok4fj5vO6Wj8jTyql1s2JZDvTJ5Q-jxt9ivZlV-bmHx6XBuaV01dsed81fwl7nVCB0T-4u31a-tkPM2tapPgPF3vFcTY3wg4K8hcQrf0I7v4NTXkQxco37OGKfcQ9quJb_twlg0XiCwWPYsXe_",
        profileImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCM4VJ_y3eQXx_ZHkdkypEkb7yiKToP7XJhWP_YDFlZfxGJ3MN3udbXoX2FRhx3dPmQ-yEZqmNebAKWJ2h-grRjGY_of0K2uTM7Rok4fj5vO6Wj8jTyql1s2JZDvTJ5Q-jxt9ivZlV-bmHx6XBuaV01dsed81fwl7nVCB0T-4u31a-tkPM2tapPgPF3vFcTY3wg4K8hcQrf0I7v4NTXkQxco37OGKfcQ9quJb_twlg0XiCwWPYsXe_",
        bio: "BuildCrew Co-Founder & Systems Lead.",
      },
    ];

    for (const f of founders) {
      if (!f.email) continue;
      const existing = await User.findOne({ email: f.email });
      if (!existing) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(f.password, salt);
        await User.create({
          ...f,
          password: hashedPassword,
        });
      } else {
        // Ensure role is admin
        if (existing.role !== "admin") {
          existing.role = "admin";
          await existing.save();
        }
      }
    }
  } catch (err) {
    // Silent catch
  }
};
