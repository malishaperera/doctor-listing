// components/DoctorCard.tsx
import Image from 'next/image';

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

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
    const getImageSrc = () => {
        if (!doctor.photo) {
            return '/default-doctor.jpg';
        }
        // Check if it's an absolute URL
        if (doctor.photo.startsWith('http://') || doctor.photo.startsWith('https://')) {
            return doctor.photo;
        }
        // Prepend slash for local images if missing
        return doctor.photo.startsWith('/') ? doctor.photo : `/${doctor.photo}`;
    };
    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
                {/* Doctor Image */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    <Image
                        src={getImageSrc()}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={false}
                    />
                </div>

                {/* Doctor Details */}
                <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-blue-700">Dr.{doctor.name}</h3>
                    <p className="text-gray-700">{doctor.specialty}</p>

                    <div className="mt-2 flex items-center gap-4">
                        <span className="text-yellow-500">⭐ {doctor.rating}</span>
                        <span className="text-gray-700">Experience: {doctor.experience} years</span>
                    </div>

                    {/* Availability */}
                    <div className="mt-2 flex gap-2 flex-wrap">
                        {doctor.availability.map((time, index) => (
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
                        <span className="text-xl font-bold text-gray-800">₹ {doctor.fee}</span>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}