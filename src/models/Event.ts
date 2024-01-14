import mongoose, {  Schema } from "mongoose";

export enum EventName {
    WEDDING = 'wedding', //חתונה
    BARMITZVAH = 'barmitzvah', //בר מצווה
    BATMITZVAH = 'batmitzvah', //בת מצווה
    CIRCUMCISION = 'circumcision', //ברית מילה
    ALLIANCE = 'alliance', //בריתה
    BIRTHDAY = 'birthday' //יום הולדת
}

export enum EventStatus {
    UPCOMING = 'upcoming', 
    PAST = 'past', 
    CANCELED = 'canceled', 
}

const EventSchema: Schema = new Schema(//TODO: add image for event
    {
    type: { type: String, enum: EventName, required: true}, 
    date: { type: Date, required: true},//TODO: put only date without hours and minutes //format: '"YYYY-MM-DD"'
    hosts_name:{ type: String, required: true},
    location: { type: String },
    description: { type: String },
    status: { type: String, enum: EventStatus, default:EventStatus.UPCOMING },//TODO: after the date of the event coming change the staus to past
    image: {
        public_id: { type: String, default: 'save_the_date_defualt'},
        img_url: { type: String, default: 'https://res.cloudinary.com/dc44zxbf0/image/upload/v1705219965/RSVP/save_the_date_defualt.jpg' }
    }
    },
    { 
        timestamps: true
    }
);


export default mongoose.model('events', EventSchema);