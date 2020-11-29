import * as jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).send({ message: "Access Denied" });
  } else {
    try {
      const verified = jwt.verify(token, "token");
      req.owner = verified;
      next();
    } catch (e) {
      return res.status(400).send({ message: "Invalid Token" });
    }
  }
};

export default validateToken;
