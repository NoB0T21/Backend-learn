const supabase = require('../db/supabase');
const multer = require('multer');
const uuid = require('uuid-v4')
const upload = multer({ dest: 'uploads/' });

module.exports.uploadFile = [
    upload.single('file'),
    async (req, res) => {
        const { file } = req;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const token = process.env.SUPABASE_KEY;
        if (!token) {
            return res.status(401).json({ error: 'Token missing' });
        }

         const uniqueFilename = `${uuid()}-${file.originalname}`;

        const { data, error } = await supabase
            .storage
            .from('drive')
            .upload(uniqueFilename, file.path, {
                cacheControl: '3600',
                upsert: false,
            });
    
        if (error) {
            return res.status(400).json({ error: error.message });
        }
    
        res.status(200).json({ data });
    }
]