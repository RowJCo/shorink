const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
    try {
        const token = req.cookies.Authorization;
        if (!token) {
            return res.status(401).json({ message: 'No Token' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = decoded.userID;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unable to check authorization" });
    }
};

module.exports = checkAuth;