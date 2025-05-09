import { Schema, model, models } from 'mongoose';
import { IDoctor } from "@/app/types/doctor";

const DoctorSchema = new Schema<IDoctor>({
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    fee: { type: Number, required: true },
    availability: {
        type: [String],
        enum: ['Available Today', 'Available Tomorrow'],
        default: ['Available Today']
    },
    rating: { type: Number, default: 4.5 }
});

export default models.Doctor || model<IDoctor>('Doctor', DoctorSchema);