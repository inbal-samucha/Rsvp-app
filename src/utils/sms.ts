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

export function sendWhatsappWithTwilio(){
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioNumber = process.env.TWILIO_PHONE_NUMBER_USA;
  const client = Twilio(accountSid, authToken);

  const number = '+972523187314';

  client.messages
      .create({
         from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER_WHATSAPP}`,
         body: 'Hello there!',
         to: `whatsapp:${number}`
       })
      .then(message => console.log(message.sid));
}

export function sendWhatsappWithMetaCloudApi(){
  const PhoneNumberID = '192729653925668';
  const ACCESS_TOKEN = 'EAAUpNh9l4vcBO1UTbFrBfQlaoN88KY4odnqHQKWR79DL5ZBw1FcyqO1xKTEZBLGUpCeMe4BIRU7SbuH7ou85zg6ixum0XrgMlPdxyV9ASRcXZA4AdncTZAYGOeRGTxbnlcaYMSjzhpbGnDrZC8IbLgeu0TWZCV4U0pWdrkgmX9iJOTIflYLhtIyJTyx2OSnJZCPXAYkSrL1JjXg6qzr';
  const RecipientPhoneNumber = '972523187314'

  const sendMessage = async () => {
    const messagePayload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: RecipientPhoneNumber,
      type: "text",
      text: { // the text object
        preview_url: false,
        body: "hi how are you?"
        }
    };
  
    try {
      const response = await fetch(`https://graph.facebook.com/v17.0/${PhoneNumberID}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messagePayload)
      });
  
      const data = await response.json();
      console.log('Message sent successfully:', data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  sendMessage();
  
}


