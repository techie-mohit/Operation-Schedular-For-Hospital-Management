import User from "../models/user.js";
import bcrypt from "bcryptjs";

const admin = async () => {
  const existingAdmin = await User.findOne({ role: "admin" });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash("Admin@123", 10);
    await User.create({
      name: "Super Admin",
      email: "admin@example.com",
      passwordHash,
      role: "admin",
    });
    console.log("✅ Default admin created: admin@example.com / Admin@123");
  }
};

export default admin;
