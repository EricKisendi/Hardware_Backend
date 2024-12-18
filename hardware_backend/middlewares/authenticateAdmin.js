module.exports.authenticateAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized, user not authenticated' });
  }

  if (req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Access denied, admin access required' });
  }
};
