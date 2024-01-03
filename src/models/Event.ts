import mongoose, {  Schema } from "mongoose";

export enum EventName {
    WEDDING = 'wedding', //חתונה
    BARMITZVAH = 'barmitzvah', //בר מצווה
    BATMITZVAH = 'batmitzvah', //בת מצווה
    CIRCUMCISION = 'circumcision', //ברית מילה
    ALLIANCE = 'alliance', //בריתה
    BIRTHDAY = 'birthday' //יום הולדת
}

export enum EvenStatus {
    UPCOMING = 'upcoming', 
    PAST = 'past', 
    CANCELED = 'canceled', 
}

const EventSchema: Schema = new Schema(//TODO: add image for event
    {
    type: { type: String, enum: EventName, required: true}, 
    date: { type: Date, required: true},//TODO: put only date without hours and minutes //format: 'DD/MM/YYYY'
    hosts_name:{ type: String, required: true},
    location: { type: String },
    description: { type: String },
    status: { type: String, enum: EvenStatus, default:EvenStatus.UPCOMING }//TODO: after the date of the event coming change the staus to past
    },
    { 
        timestamps: true
    }
);


export default mongoose.model('events', EventSchema);