import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "Access denied" });

  const token = authHeader.split(" ")[1]; // Extract the token part
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
      const verified = jwt.verify(token, process.env.SECRET);
      req.user = verified;
      next();
  } catch (error) {
      res.status(400).json({ message: "Invalid token" });
  }
};


export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access Denied: You do not have the required permissions' });
      }
      next();
    };
  };