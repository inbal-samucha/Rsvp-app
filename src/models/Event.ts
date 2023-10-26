import mongoose, { Document, Schema } from "mongoose";

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

const EventSchema: Schema = new Schema(
    {
    name: { type: String, enum: EventName, required: true}, //TODO: if i change to something that not in the enum it is still work
    date: { type: Date, required: true},
    location: { type: String },
    description: { type: String },
    status: { type: String, enum: EvenStatus, default:EvenStatus.UPCOMING }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('events', EventSchema);