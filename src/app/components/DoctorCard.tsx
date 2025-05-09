import React from 'react';

interface Doctor {
    _id: string;
    name: string;
    specialty: string;
    experience: number;
    location: string;
    fee: number;
    availability: string[];
    rating: number;
}

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
                {/* Doctor Image (Placeholder) */}
                <div className="w-24 h-24 bg-gray-300 rounded-full"></div>

                {/* Doctor Details */}
                <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-blue-700">{doctor.name}</h3>
                    <p className="text-gray-700">{doctor.specialty}</p>

                    <div className="mt-2 flex items-center gap-4">
                        <span className="text-yellow-500">⭐ {doctor.rating}</span>
                        <span className="text-gray-700">Experience: {doctor.experience} years</span>
                    </div>

                    {/* Availability */}
                    <div className="mt-2 flex gap-2 flex-wrap">
                        {(Array.isArray(doctor.availability) ? doctor.availability : []).map((time, index) => (
                            <span
                                key={index}
                                className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-sm"
                            >
                        {time}
                    </span>
                        ))}
                    </div>

                    {/* Consultation Fee */}
                    <div className="mt-4 flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-800">LKR {doctor.fee}</span>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}