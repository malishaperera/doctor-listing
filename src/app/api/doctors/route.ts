import { NextResponse } from 'next/server';
import {connectDB} from "@/app/lib/mongodb";
import Doctor from "@/app/models/Doctor";

// POST: Add Doctor
export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        const newDoctor = new Doctor(body);
        const savedDoctor = await newDoctor.save();

        return NextResponse.json({
            success: true,
            data: savedDoctor
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 400 });
    }
}

// GET: List Doctors
// export async function GET() {
//     try {
//         await connectDB();
//         const doctors = await Doctor.find({});
//
//         return NextResponse.json({
//             success: true,
//             data: doctors
//         }, { status: 200 });
//
//     } catch (error: any) {
//         return NextResponse.json({
//             success: false,
//             error: error.message
//         }, { status: 500 });
//     }
// }

export async function GET(request: Request) {
    try {
        await connectDB();

        // URL query parameters
        const { searchParams } = new URL(request.url);
        const location = searchParams.get('location');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        // MongoDB Query
        const query: any = {};
        if (location) query.location = location;


        const skip = (page - 1) * limit;


        const [doctors, total] = await Promise.all([
            Doctor.find(query).skip(skip).limit(limit),
            Doctor.countDocuments(query)
        ]);

        return NextResponse.json({
            success: true,
            data: doctors,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
