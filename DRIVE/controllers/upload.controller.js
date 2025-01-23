const supabase = require('../db/supabase');
const fileServices = require('../services/files.service');
const authMiddleware = require('../middlewares/auth');
const multer = require('multer');
const userService = require('../services/user.service');
const uuid = require('uuid-v4');
const upload = multer({ dest: 'uploads/' });

module.exports.uploadFile =[
    authMiddleware,
    upload.single('file'),
    async (req, res) => {
        const { file } = req;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
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

        const newFile = await fileServices.createFile({
            path: uniqueFilename,
            originalname: file.originalname,
            user: req.user.userId,
        });
        res.status(200).json(newFile);
    }
]