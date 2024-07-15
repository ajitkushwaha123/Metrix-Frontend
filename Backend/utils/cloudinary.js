import {v2 as cloudinary} from 'cloudinary';    
import fs from 'fs';    

cloudinary.config({
    cloud_name: "drku1djt5",
    api_key: "346414787548979",
    api_secret: "FvALE4F1Cs0Xi1MG0bs0vvCuX7U"
});         

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath){
            return null;
        }
        
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto"
        })

        console.log("Image uploaded successfully" , response.url);
        return response;
    } catch (err) {
        fs.unlinkSync(localFilePath);
        return null;
    }
};

export {uploadOnCloudinary}

