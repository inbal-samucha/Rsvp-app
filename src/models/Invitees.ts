import mongoose, {  Schema } from "mongoose";

export enum ArrivalConfirmed {
    YES = 'yes', 
    NO = 'no', 
    MAYBE = 'maybe', 
    INITIAL = 'initial'
}

const InviteesSchema: Schema = new Schema(
    {
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String},
    phone: { type: String,unique: true, required: true }, 
    arrival_confirmed: { type: String, enum: ArrivalConfirmed , default: ArrivalConfirmed.INITIAL },
    number_of_people_arriving: { type: Number, default: 1}, //TODO: check if defult = 1
    event_id: { type: Schema.Types.ObjectId, required: true, ref: 'events'}
    },
    {
        timestamps: true
    }
);

export default mongoose.model('invitees', InviteesSchema);