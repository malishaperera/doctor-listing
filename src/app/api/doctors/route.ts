import { NextResponse } from 'next/server';
import { connectDB } from "@/app/lib/mongodb";
import Doctor from "@/app/models/Doctor";

// Define interface for MongoDB query
interface QueryParams {
    location?: string;
    experience?: { $gte?: number; $lte?: number };
    fee?: { $gte?: number; $lte?: number };
    availability?: { $in: string[] };
}

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

    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'An error occurred'
        }, { status: 400 });
    }
}

export async function GET(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const query: QueryParams = {};

        // Location filter
        const location = searchParams.get('location');
        if (location) query.location = location;

        // Experience range filter
        const experienceRange = searchParams.get('experience');
        if (experienceRange) {
            const [minExp, maxExp] = experienceRange.split('-').map(Number);
            query.experience = {};

            if (!isNaN(minExp)) query.experience.$gte = minExp;
            if (!isNaN(maxExp)) query.experience.$lte = maxExp;
        }

        // Fee range filter
        const feeRange = searchParams.get('fee');
        if (feeRange) {
            const [minFee, maxFee] = feeRange.split('-').map(Number);
            query.fee = {};

            if (!isNaN(minFee)) query.fee.$gte = minFee;
            if (!isNaN(maxFee)) query.fee.$lte = maxFee;
        }

        // Availability filter
        const availability = searchParams.get('availability');
        if (availability) {
            query.availability = { $in: [availability] };
        }

        // Pagination
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        // Fetch data
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

    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'An error occurred'
        }, { status: 500 });
    }
}