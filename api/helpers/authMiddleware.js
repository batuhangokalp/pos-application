const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token bulunamadı.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token'ı doğrula

    req.user = decoded; // Kullanıcı bilgilerini req.user'a ekle
    next(); // Bir sonraki middleware'e veya route handler'a geç
  } catch (error) {
    res.status(401).json({ error: 'Geçersiz token.' });
  }
};

module.exports = authMiddleware;
