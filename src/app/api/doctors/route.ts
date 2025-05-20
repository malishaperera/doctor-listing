import { NextResponse } from 'next/server';
// import connectDB from '@/app/lib/mongodb';
import Doctor from '@/app/models/Doctor';

interface QueryParams {
    location?: string;
    experience?: { $gte?: number; $lte?: number };
    fee?: { $gte?: number; $lte?: number };
    availability?: { $in: string[] };
}

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
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('POST Error:', errorMessage);
        return NextResponse.json({
            success: false,
            error: 'Failed to create doctor'
        }, { status: 400 });
    }
}

export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);

        const query: QueryParams = {};
        const page = parseInt(searchParams.get('page') || '1');
        const limit = 10;
        const skip = (page - 1) * limit;

        // Build filters
        const location = searchParams.get('location');
        if (location) query.location = location;

        const experienceRange = searchParams.get('experience');
        if (experienceRange) {
            const [minExp, maxExp] = experienceRange.split('-').map(Number);
            query.experience = {
                ...(!isNaN(minExp) && { $gte: minExp }),
                ...(!isNaN(maxExp) && { $lte: maxExp })
            };
        }

        const feeRange = searchParams.get('fee');
        if (feeRange) {
            const [min, max] = feeRange.split('-');
            const minFee = parseInt(min);
            const maxFee = max ? parseInt(max) : null;

            query.fee = {
                ...(!isNaN(minFee) && { $gte: minFee }),
                ...(maxFee && !isNaN(maxFee) && { $lte: maxFee })
            };
        }

        const availability = searchParams.get('availability');
        if (availability) {
            query.availability = { $in: [availability] };
        }

        const [doctors, total] = await Promise.all([
            Doctor.find(query).skip(skip).limit(limit),
            Doctor.countDocuments(query)
        ]);

        return NextResponse.json({
            success: true,
            data: doctors,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('GET Error:', errorMessage);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch doctors'
        }, { status: 500 });
    }
}