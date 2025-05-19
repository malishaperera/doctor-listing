"use client";
import {useCallback, useEffect, useState} from 'react';
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
    photo: string;
}

export default function SpecialtyPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [filters, setFilters] = useState({
        location: '',
        experience: '',
        availability: '',
        fee: '',
        page: 1
    });
    const [totalPages, setTotalPages] = useState(1);


    // const fetchDoctors = async () => {
    //     const query = new URLSearchParams({
    //         location: filters.location,
    //         experience: filters.experience,
    //         availability: filters.availability,
    //         fee: filters.fee,
    //         page: filters.page.toString()
    //     }).toString();
    const fetchDoctors = useCallback(async () => {
        const query = new URLSearchParams({
            location: filters.location,
            experience: filters.experience,
            availability: filters.availability,
            fee: filters.fee,
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
    }, [filters]);

    useEffect(() => {
        fetchDoctors();
    }, [fetchDoctors, filters]);

    // const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const isChecked = e.target.checked;
    //     const today = new Date().toISOString().split('T')[0];
    //     setFilters(prev => ({
    //         ...prev,
    //         availability: isChecked ? today : '',
    //         page: 1
    //     }));
    // };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Filters Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Location Filter */}
                        <select
                            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            value={filters.location}
                            onChange={(e) => setFilters(prev => ({
                                ...prev,
                                location: e.target.value,
                                page: 1
                            }))}
                        >
                            <option value="">All Locations</option>
                            <option value="Colombo">Colombo</option>
                            <option value="Kandy">Kandy</option>
                            <option value="Galle">Galle</option>
                            <option value="Jaffna">Jaffna</option>
                            <option value="Matara">Matara</option>
                            <option value="Kurunegala">Kurunegala</option>
                            <option value="Anuradhapura">Anuradhapura</option>
                            <option value="Batticaloa">Batticaloa</option>
                            <option value="Trincomalee">Trincomalee</option>
                            <option value="Negombo">Negombo</option>
                        </select>

                        {/* Experience Filter */}
                        <select
                            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            value={filters.experience}
                            onChange={(e) => setFilters(prev => ({
                                ...prev,
                                experience: e.target.value,
                                page: 1
                            }))}
                        >
                            <option value="">All Experience</option>
                            <option value="0-5">0-5 years</option>
                            <option value="6-10">6-10 years</option>
                            <option value="11-16">11-16 years</option>
                        </select>

                        {/* Availability Filter */}
                        {/*<div className="flex items-center gap-2 p-2">*/}
                        {/*    <input*/}
                        {/*        type="checkbox"*/}
                        {/*        id="availableToday"*/}
                        {/*        checked={filters.availability !== ''}*/}
                        {/*        onChange={handleAvailabilityChange}*/}
                        {/*        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"*/}
                        {/*    />*/}
                        {/*    <label htmlFor="availableToday" className="text-gray-700">*/}
                        {/*        Available Today*/}
                        {/*    </label>*/}
                        {/*</div>*/}
                        <select
                            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            value={filters.fee}
                            onChange={(e) => setFilters(prev => ({
                                ...prev,
                                fee: e.target.value,
                                page: 1
                            }))}
                        >
                            <option value="">All Fees</option>
                            <option value="100-500">100-500 LKR</option>
                            <option value="500-1000">500-1000 LKR</option>
                            <option value="1000-">1000+ LKR</option>
                        </select>
                    </div>
                </div>

                {/* Doctors List */}
                <div className="space-y-4">
                    {doctors.length > 0 ? (
                        doctors.map(doctor => (
                            <DoctorCard key={doctor._id} doctor={doctor} />
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No doctors found matching your criteria
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => setFilters(prev => ({ ...prev, page: pageNum }))}
                                className={`px-4 py-2 rounded-md ${
                                    filters.page === pageNum
                                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                } transition-colors`}
                            >
                                {pageNum}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}