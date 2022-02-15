const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.headers.authorization;  
    const jwtToken = "mySecretToken";

    if (!token) {
        return res.status(401).json({msg: 'No token, Authorization denied'});
    } 

    try {
        const decoder = jwt.verify(token, jwtToken);
        req.user = decoder.user;
        next()
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}