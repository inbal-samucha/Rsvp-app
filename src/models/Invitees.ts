import mongoose, {  Schema } from "mongoose";

import libphonenumber from 'google-libphonenumber';

export enum ArrivalConfirmed { //TODO: change it to: arrived, not arrived, maybey, false(initial)
    YES = 'yes', 
    NO = 'no', 
    MAYBE = 'maybe', 
    INITIAL = 'initial'
}

export type InviteeDocument = mongoose.Document & {
    first_name: string;
    last_name: string;
    email?: string;
    phone: string;
    arrival_confirmed?: string;
    number_of_people_arriving?: number;
    event: object;
  };

const InviteesSchema: Schema = new Schema(
    {
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    email: { type: String},
    phone: { type: String, required: true }, //TODO: when the client write the phone number you need to change it to +972 for sending to him sms. //TODO: i cant send the same phone for 2 difference events, fix it.
    arrival_confirmed: { type: String, enum: ArrivalConfirmed , default: ArrivalConfirmed.INITIAL },
    number_of_people_arriving: { type: Number, default: 1}, //TODO: check if defult = 1
    event: { type: Schema.Types.ObjectId, required: true, ref: 'events'}
    },
    {
        timestamps: true
    }
);


InviteesSchema.index({phone: 1, event: 1}, {unique: true});


const modifyPhone = function (doc: any, type: string) {
    var phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

    if(type === 'save'){
        doc.phone = phoneUtil.format(phoneUtil.parse(doc.phone, 'IL'), libphonenumber.PhoneNumberFormat.INTERNATIONAL);

    }else if(type === 'findOneAndUpdate'){
            if (doc && '$set' in doc && typeof doc.$set === 'object') {
                if(Object.keys(doc.$set).includes('phone')){
                    const updatePhone = phoneUtil.format(phoneUtil.parse(doc.$set.phone, 'IL'), libphonenumber.PhoneNumberFormat.INTERNATIONAL);
                    doc.$set.phone = updatePhone;
                }
            }
    }
};


InviteesSchema.pre('findOneAndUpdate', async function changePhone(next) {
    console.log('In pre findOneAndUpdate');
    modifyPhone(this.getUpdate(), 'findOneAndUpdate');
    next();
});

InviteesSchema.pre('save', async function changePhone(next) {
    console.log('In pre save');
    modifyPhone(this, 'save');
    next();
});

export default mongoose.model('invitees', InviteesSchema);