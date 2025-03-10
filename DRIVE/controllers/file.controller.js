const supabase = require('../db/supabase');
const authMiddleware = require('../middlewares/auth');
const fileServices = require('../services/files.service');
const mime = require('mime-types');

module.exports.downloadFile = [
    authMiddleware,
    async (req, res) => {
        try{const loginUSerID = req.user.userId;
            const path = req.params.path;

            const file = await fileServices.getFile({user: loginUSerID, path});
            if (!file) {
                return res.status(400).json({ error: 'No such file' });
            }

            const { data, error } = await supabase
                .storage
                .from('NoB0T')
                .download(path);

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            const mimeType = mime.lookup(file.originalname) || 'application/octet-stream';

            res.setHeader('Content-Disposition', `attachment; filename="${file.originalname}"`);
            res.setHeader('Content-Type', mimeType);
            res.send(Buffer.from(await data.arrayBuffer()));
        }catch(err) {
            res.status(503).json({
                message: "Server error",
                error: err.message 
            });
        }

    }
]

module.exports.deleteFile = [
    authMiddleware,
    async (req, res) => {
        try{const loginUSerID = req.user.userId;
            const path = req.params.path;

            const file = await fileServices.getFile({user: loginUSerID, path});
            if (!file) {
                return res.status(400).json({ error: 'No such file' });
            }

            const {error, data} = await supabase
                .storage
                .from('NoB0T')
                .remove([file.path]);
                
            if (error) {
                return res.status(400).json({ error: error.message });
            }

            const deletedFile = await fileServices.deleteFile({user: loginUSerID, path});
            res.redirect('/home')
        }catch(err) {
            res.status(503).json({
                message: "Server error",
                error: err.message 
            });
        }
    }
]