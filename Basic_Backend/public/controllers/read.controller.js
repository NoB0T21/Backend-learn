const homeService = require('../services/home.service');

module.exports.read = async (req, res) => {
    try {
        const fileid = req.params._id;
        
        // Validate file ID
        if (!fileid) {
            return res.status(400).json({ message: 'File ID is required' });
        }

        // Fetch the file
        const file = await homeService.getfile({ fileid });

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Render the file details
        res.render('read', { file });
    } catch (error) {
        console.error('Error fetching file:', error); // Useful for debugging
        res.status(500).json({
            message: 'An unexpected error occurred while processing your request',
        });
    }
};
