import mongoose, { Schema, Model } from "mongoose";
import bcrypt from 'bcrypt';

interface IUser {
    name: string,
    email: string,
    password: string,
    phone: string,
    role: string
  }
  
  interface UserModel extends Model<IUser> {
    comparePasswords(candidatePassword: string, hashedPassword: string): boolean;
  }

  
export enum UserRole { 
    ADMIN = 'admin', 
    USER = 'user'
}

const schema = new Schema <IUser, UserModel> (
    {
        name: { type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true },
        phone: { type: String },
        role: { type: String, enum: UserRole, default: UserRole.USER, required: true},
    },
    {
        timestamps: true,
        // statics:{
        //     async comparePasswords (candidatePassword, hashedPassword) {
        //         return await bcrypt.compare(candidatePassword, hashedPassword);
        //       }
        // }
    }
);

schema.pre('save', async function(next) { 
    this.password = await bcrypt.hash(this.password, 12);
});

// schema.statics.comparePasswords = async function (candidatePassword, hashedPassword) {
//     return await bcrypt.compare(candidatePassword, hashedPassword);
// }
schema.static('comparePasswords', async function comparePasswords(candidatePassword, hashedPassword) {
    console.log('candidatePassword ', candidatePassword);
    console.log('hashedPassword ', hashedPassword);
    
    const t = await bcrypt.compare(candidatePassword, hashedPassword);
    console.log(t);
    return t;
  });
  

const UserSchema = mongoose.model<IUser, UserModel>('users', schema);

export default UserSchema;