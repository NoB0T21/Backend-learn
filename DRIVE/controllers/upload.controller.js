const supabase = require('../db/supabase');
const fileServices = require('../services/files.service');
const authMiddleware = require('../middlewares/auth');
const multer = require('multer');
const userService = require('../services/user.service');
const uuid = require('uuid-v4');
const upload =  multer({ storage: multer.memoryStorage() });

module.exports.uploadFile =[
    authMiddleware,
    upload.single('file'),
    async (req, res) => {
        const { file } = req;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const files = file.originalname;
        const refiles = files.split(" ").join("");
         const uniqueFilename = `${uuid()}-${refiles}`;

        const { data, error } = await supabase
            .storage
            .from('NoB0T')
            .upload(uniqueFilename, file.buffer, {
                contentType: file.mimetype,
                cacheControl: '3600',
                upsert: false,
            })
    
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        getFilePath();

        async function getFilePath() {
            const { data, urlError } = await supabase
                .storage
                .from('NoB0T')
                .getPublicUrl(`${uniqueFilename}`);

            if (urlError) {
                throw urlError;
            }

        const newFile = await fileServices.createFile({
            path: uniqueFilename,
            originalname: file.originalname,
            user: req.user.userId,
            ImageUrl: data.publicUrl,
            fileType: file.mimetype
        });
        }
        res.redirect('/home');
    }
]

module.exports.showFile = [
    authMiddleware,
    async (req, res) => {
        const userFiles = await fileServices.getFiles({user: req.user.userId});
        res.render('home', { files: userFiles });
    }
]