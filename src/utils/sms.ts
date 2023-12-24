import Twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();


export function sendSmsTwilio(){
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER_USA;

    const numbers = ['+972526080166', '+972523187314'];

    const client = Twilio(accountSid, authToken);
    const newMessageContent = 'בדיקה בדיקה';

    numbers.forEach(async number => {
        const message = await client.messages.create({
          body: newMessageContent,
          from: twilioNumber,
          to: number
        }).then((message) =>console.log(message.sid))
    });
}



