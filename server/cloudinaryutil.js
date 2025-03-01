const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const options = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto"
}

const uploadImage = async ({ folderid, image, type }) => {
    try {
        const result = await cloudinary.uploader.upload(image,
            {
                folder: `${folderid}/${type}`, 
                overwrite: true,
                invalidate: true,
                resource_type: "auto"
            });
        return result.secure_url;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { uploadImage };
