import jwt from "jsonwebtoken";

export const auth = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.cookies?.token;
      if (!token) return res.status(401).json({ error: "No token provided" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: "Forbidden: Insufficient rights" });
      }

      next();
    } catch (err) {
      console.error("Auth Middleware Error:", err.message);
      res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  };
};
