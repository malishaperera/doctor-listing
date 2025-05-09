"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DoctorCard from "@/app/components/DoctorCard";

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

export default function SpecialtyPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [filters, setFilters] = useState({
        location: '',
        experience: '',
        page: 1
    });
    const [totalPages, setTotalPages] = useState(1);
    const searchParams = useSearchParams();

    // Fetch Doctors
    const fetchDoctors = async () => {
        const query = new URLSearchParams({
            ...filters,
            page: filters.page.toString()
        }).toString();

        try {
            const res = await fetch(`/api/doctors?${query}`);
            const data = await res.json();

            if (data.success) {
                setDoctors(data.data);
                setTotalPages(data.totalPages);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, [filters]);

    return (
        <div>
            {/* Filters Section */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Location Filter */}
                        <select
                            className="p-2 border rounded"
                            value={filters.location}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value, page: 1 })}
                        >
                            <option value="">All Locations</option>
                            <option value="Colombo">Colombo</option>
                            <option value="Kandy">Kandy</option>
                        </select>

                        {/* Experience Filter */}
                        <select
                            className="p-2 border rounded"
                            value={filters.experience}
                            onChange={(e) => setFilters({ ...filters, experience: e.target.value, page: 1 })}
                        >
                            <option value="">All Experience Levels</option>
                            <option value="5">5+ years</option>
                            <option value="10">10+ years</option>
                        </select>

                        {/* Availability Filter (Static UI) */}
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="availableToday" />
                            <label htmlFor="availableToday">Available Today</label>
                        </div>
                    </div>
                </div>

                {/* Doctors List */}
                <div className="space-y-6">
                    {doctors.map(doctor => (
                        <DoctorCard key={doctor._id} doctor={doctor} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setFilters({ ...filters, page: i + 1 })}
                            className={`px-4 py-2 rounded ${
                                filters.page === i + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
