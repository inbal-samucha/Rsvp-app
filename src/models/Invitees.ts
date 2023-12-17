import mongoose, {  Schema } from "mongoose";

const InviteesSchema: Schema = new Schema(
    {
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String},
    phone: { type: String, required: true },
    arrival_confirmed: { type: Boolean, default: false },
    arrival_declined: { type: Boolean, default: false },//TODO: if update to true then change the number_of_people_arriving to 0
    number_of_people_arriving: { type: Number, default: 1}, //TODO: check if defult = 1
    event_id: { type: Schema.Types.ObjectId, required: true, ref: 'events'}
    },
    {
        timestamps: true
    }
);

export default mongoose.model('invitees', InviteesSchema);