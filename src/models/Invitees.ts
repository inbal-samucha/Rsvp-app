import mongoose, {  Schema } from "mongoose";

export enum ArrivalConfirmed { //TODO: change it to: arrived, not arrived, maybey, false(initial)
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
    phone: { type: String,unique: true, required: true }, //TODO: when the client write the phone number you need to change it to +972 for sending to him sms. //TODO: i cant send the same phone for 2 difference events, fix it.
    arrival_confirmed: { type: String, enum: ArrivalConfirmed , default: ArrivalConfirmed.INITIAL },
    number_of_people_arriving: { type: Number, default: 1}, //TODO: check if defult = 1
    event: { type: Schema.Types.ObjectId, required: true, ref: 'events'}
    },
    {
        timestamps: true
    }
);

export default mongoose.model('invitees', InviteesSchema);