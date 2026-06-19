const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const publicId = req.query.publicId || (req.body && req.body.publicId);

  if (!publicId) {
    return res.status(400).json({ error: 'publicId obrigatório' });
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    res.json(result);
  } catch (err) {
    console.error('Erro ao deletar do Cloudinary:', err);
    res.status(500).json({ error: err.message });
  }
};
