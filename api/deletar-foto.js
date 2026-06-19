const crypto = require('crypto');

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

  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud_name || !api_key || !api_secret) {
    return res.status(500).json({ error: 'Credenciais Cloudinary não configuradas no Vercel.' });
  }

  try {
    const timestamp = Math.round(Date.now() / 1000);
    const signature = crypto
      .createHash('sha256')
      .update(`public_id=${publicId}&timestamp=${timestamp}${api_secret}`)
      .digest('hex');

    const params = new URLSearchParams();
    params.append('public_id', publicId);
    params.append('timestamp', timestamp);
    params.append('api_key', api_key);
    params.append('signature', signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`,
      { method: 'POST', body: params }
    );

    const result = await response.json();
    res.json(result);
  } catch (err) {
    console.error('Erro ao deletar do Cloudinary:', err);
    res.status(500).json({ error: err.message });
  }
};
