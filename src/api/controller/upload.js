import express from 'express';
import multer from 'multer'
import multer3 from 'multer-s3'
import aws from 'aws-sdk';
import { successResponse } from '../utils/http';

const storage = multer.diskStorage({ 
    destination(req, file, cb ) {
        cb(null, '../../uploads')
    },
    filename(req, file, cb){
        cb(null,`${Date.now()}`.jpeg)
    }
})

export const uploadImage = (req, res) => {
    const upload = multer({storage})
    upload.single('image');
    successResponse(res, {file: `/${req.file.path}`, message:'upload success'})
}



