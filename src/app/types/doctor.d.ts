// types/doctor.d.ts
import { Document } from 'mongoose';

export interface IDoctor extends Document {
    name: string;
    specialty: string;
    experience: number;
    location: string;
    fee: number;
    availability:  string[];
    rating: number;
    photo: string;
}