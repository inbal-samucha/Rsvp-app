import moment from 'moment';
import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import { NextFunction, Request, Response } from "express";

import ExeptionError, { HttpCode } from "../utils/errors/ExeptionError.ts";
import { convertObjToLowerCase } from "../utils/handlerFunction.ts";

import Event, {EventName, EventStatus} from "../models/Event.ts";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    let payload = {...req.body}

   
      
        if(req.files && req.files.image){

            const imageFile: UploadedFile = req.files.image as UploadedFile;
            const fileBuffer: Buffer = imageFile.data as Buffer;
    
            const cloudinaryUpload = () => {
                
                return new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream({ folder: 'RSVP' }, (error, result) => {
    
                        if (error) {
                            reject(new ExeptionError({code: HttpCode.BAD_REQUEST, message: "Error uploading to Cloudinary:", logging: true}));
                        } else {       
                            resolve(result);
                        }
                    });
    
                    uploadStream.end(fileBuffer);
    
                });
            };
    
            try{
                const imageUploadResult: any  = await cloudinaryUpload();
                payload = {
                    ...payload,
                    image:{
                        public_id: imageUploadResult.public_id, //TODO: change the public id using the optins in cloudinary
                        img_url: imageUploadResult.secure_url
                    }
                }
            }catch(err){
                next(err); //TODO: check if i can remove the next(err) and try and catch because my error hanler
            }
        }


        if(req.body.date && moment(req.body.date, 'YYYY-MM-DD').isValid()){
            if(moment(req.body.date, 'YYYY-MM-DD').isValid()){
                var momentDate = moment.utc(req.body.date, "YYYY-MM-DD").format();
                var newDate = new Date(momentDate)
                req.body.date = newDate;
            }else{
                throw new ExeptionError({code: HttpCode.BAD_REQUEST, message: "Invalid date format", logging: true});
            }
        }
    
        
        convertObjToLowerCase(payload); 

        const event = await Event.create(payload);

        return res.status(200).json(event);
}

//get all events with option to filter in query
const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
    let filterObj = { ...req.query }

    convertObjToLowerCase(filterObj); //Note: just if the app in english

    const events = await Event.find({...filterObj}); 
    if(!events){
        throw new ExeptionError({code: HttpCode.NOT_FOUND, message: "event not found", logging: true});
    }

    return res.status(200).json(events);
}

const getOneEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.id;
    
    const event = await Event.findById(eventId); 
    if(!event){ 
        throw new ExeptionError({code: HttpCode.BAD_REQUEST, message: "No such event id", logging: true});
    }

    return res.status(200).json(event);
}

const updateOneEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.id;
    
    if(req.body.date && moment(req.body.date, 'YYYY-MM-DD').isValid()){
        if(moment(req.body.date, 'YYYY-MM-DD').isValid()){
            var momentDate = moment.utc(req.body.date, "YYYY-MM-DD").format();
            var newDate = new Date(momentDate)
            req.body.date = newDate;
        }else{
            throw new ExeptionError({code: HttpCode.BAD_REQUEST, message: "Invalid date format", logging: true});
        }
    }
  
    
    const event = await Event.findByIdAndUpdate(eventId, {$set:req.body}, {new:true});
    if(!event){ 
        throw new ExeptionError({code: HttpCode.BAD_REQUEST, message: "No such event id", logging: true});
    }

    return res.status(200).json(event);
}

const deleteOneEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.id;

    const event = await Event.findByIdAndDelete(eventId);
    if(!event){ 
        throw new ExeptionError({code: HttpCode.BAD_REQUEST, message: "No such event id", logging: true});
    }

    return res.status(200).json({message: 'event was deleted'});
}

const getfilterEvents = async(req: Request, res: Response, next: NextFunction) => {

        const { eventType, eventStatus, date, location, hosts_name } = req.query;
        
        const query : { [key: string]: any } = {};

        if (eventType) {
          query.type = eventType as string;
        }
        if (date) {
          const momentDate = moment.utc(date as string , "YYYY-MM-DD").format();
          query.date = { $eq: new Date(momentDate) };
        }
        if (location) {
          query.location = location as string;
        }
        if (eventStatus) {
          query.status = eventStatus as string;
        }
        if (hosts_name) {
            query.hosts_name = hosts_name as string;
        }
    

        const filteredEvents = await Event.find(query);

        res.json(filteredEvents);
}


const getFormFilterEvents = async(req: Request, res: Response, next: NextFunction) => {

    res.render('eventFilter',{
        data:{
            eventName: EventName,
            eventStatus: EventStatus
        }
    });
}

const getCreateEvent = async(req: Request, res: Response, next: NextFunction) => {

    res.render('createEvent',{
        data:{
            eventName: EventName
        }
    });
}



export { createEvent, getAllEvents, getOneEvent, updateOneEvent, deleteOneEvent, getfilterEvents, getFormFilterEvents, getCreateEvent };


