import mongoose, {  Schema } from "mongoose";


const InviteesSchema: Schema = new Schema(
    {
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String},
    phone: { type: String, required: true }, //TODO: make this field unique
    arrival_confirmed: { type: Boolean, default: false },//TODO: change to enum: yes,no,maybe???
    number_of_people_arriving: { type: Number, default: 1}, //TODO: check if defult = 1
    event_id: { type: Schema.Types.ObjectId, required: true, ref: 'events'}
    },
    {
        timestamps: true
    }
);

export default mongoose.model('invitees', InviteesSchema);