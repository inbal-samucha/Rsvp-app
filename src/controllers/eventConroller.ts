import { NextFunction, Request, Response } from "express";
import moment from 'moment';
import { convertObjToLowerCase } from "../utils/handlerFunction.ts";

import Event, {EventName, EventStatus} from "../models/Event.ts";

import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

import { UploadedFile } from 'express-fileupload';
import Invitees from "../models/Invitees.ts";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    let payload = {...req.body}

    try{
        if (!req.files || !req.files.image) { //TODO: this is not need to be required, if user not upload image put defualt image
                  return res.status(400).json({ error: 'No file uploaded.' });
        }
            
        const imageFile: UploadedFile = req.files.image as UploadedFile;
        const fileBuffer: Buffer = imageFile.data as Buffer;

        const cloudinaryUpload = () => {
            
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({ folder: 'RSVP' }, (error, result) => {

                    if (error) {
                        console.error('Error uploading to Cloudinary:', error);
                        reject(error);
                    } else {       
                        resolve(result);
                    }
                });

                uploadStream.end(fileBuffer);

            });
        };

        const imageUploadResult: any  = await cloudinaryUpload();

        payload = {
            ...payload,
            image:{
                public_id: imageUploadResult.public_id, //TODO: change the public id using the optins in cloudinary
                img_url: imageUploadResult.secure_url
            }
        }

        if(req.body.date && moment(req.body.date, 'YYYY-MM-DD').isValid()){
            if(moment(req.body.date, 'YYYY-MM-DD').isValid()){
                var momentDate = moment.utc(req.body.date, "YYYY-MM-DD").format();
                var newDate = new Date(momentDate)
                req.body.date = newDate;
            }else{
                return res.status(400).json({ error: 'Invalid date format' });
    
            }
        }
    
        
        convertObjToLowerCase(payload); 

        const event = await Event.create(payload);

        return res.status(200).json(event);
        
    }catch(err){
        console.log(err);
        
       return res.status(500).json({ error: 'Failed to upload to Cloudinary.', err });
    }
}

//get all events with option to filter in query
const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
    let filterObj = { ...req.query }

    convertObjToLowerCase(filterObj); //Note: just if the app in english

    const events = await Event.find({...filterObj}); 

    return res.status(200).json(events);
}

const getOneEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.id;
    
    const event = await Event.findById(eventId); 
    if(!event){ //TODO: error handling
        throw new Error('No such event id')
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
            return res.status(400).json({ error: 'Invalid date format' });

        }
    }
  
    
    const event = await Event.findByIdAndUpdate(eventId, {$set:req.body}, {new:true});

    return res.status(200).json(event);
}

const deleteOneEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.id;

    await Event.findByIdAndDelete(eventId);

    return res.status(200).json({message: 'event was deleted'});
}

const getfilterEvents = async(req: Request, res: Response, next: NextFunction) => {
    try {
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
      } catch (error) {
        res.status(500).json({ error });
      }
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


