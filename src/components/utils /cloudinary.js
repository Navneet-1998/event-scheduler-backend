require('dotenv').config();
const { v2 } = require('cloudinary');
const cloudinary = v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Api_Key,
    api_secret: process.env.Api_Secret,
});

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error('Local file path is missing.');
        }

        // Upload the file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });

        // File has been uploaded successfully
        console.log('File is uploaded successfully on Cloudinary', response.url);

        // Return the Cloudinary response
        return response;
    } catch (error) {
        // Handle the error
        console.error('Error uploading file to Cloudinary:', error);

        // Remove the locally saved temporary file as the upload operation failed
        fs.unlinkSync(localFilePath);

        // Return null or handle the error in an appropriate way based on your application's logic
        return null;
    }
};

module.exports = { uploadOnCloudinary };