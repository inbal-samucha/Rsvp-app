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
        timestamps: true
    }
);

schema.pre('save', async function(next) { 
    this.password = await bcrypt.hash(this.password, 12);
});

schema.static('comparePasswords', async function comparePasswords(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);;
  });
  

const UserSchema = mongoose.model<IUser, UserModel>('users', schema);

export default UserSchema;