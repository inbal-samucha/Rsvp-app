import mongoose, { Document, Schema } from "mongoose";

const InviteesSchema: Schema = new Schema(
    {
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String},
    phone: { type: String, required: true },
    arrival_confirmed: { type: Boolean, default: false },
    arrival_declined: { type: Boolean, default: false },
    number_of_peopleArriving: { type: Number, default: 1}, //TODO: check if defult = 1
    event_id: { type: Schema.Types.ObjectId, required: true, ref: 'events'}
    },
    {
        timestamps: true
    }
);

export default mongoose.model('invitees', InviteesSchema);