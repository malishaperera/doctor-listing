// components/AddDoctorButton.tsx
"use client";

import { useState } from 'react';
import mediaUpload from '../utils/mediaUpload';

interface DoctorForm {
    name: string;
    specialty: string;
    experience: number;
    location: string;
    fee: number;
    availability: string[];
    rating: number;
    photo: string;
}

export default function AddDoctorButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [formData, setFormData] = useState<DoctorForm>({
        name: '',
        specialty: 'General Physician',
        experience: 0,
        location: 'Colombo',
        fee: 0,
        availability: [],
        rating: 4.5,
        photo: '',
    });
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                setIsUploading(true);
                const publicUrl = await mediaUpload(file);
                setFormData({ ...formData, photo: publicUrl });
                setPreviewImage(publicUrl);
                setIsUploading(false);
            } catch (error) {
                console.error("Error uploading file:", error);
                alert("Failed to upload image. Please try again.");
                setIsUploading(false);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/doctors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Doctor added successfully!');
                setIsModalOpen(false);
                setFormData({
                    name: '',
                    specialty: 'General Physician',
                    experience: 0,
                    location: 'Colombo',
                    fee: 0,
                    availability: [],
                    rating: 4.5,
                    photo: '',
                });
                setPreviewImage(null);
            } else {
                alert('Failed to add doctor. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="fixed bottom-8 right-8">
            {/* Add Doctor Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
            >
                + Add Doctor
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Add New Doctor</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label>Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full p-2 border rounded"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>

                            <div>
                                <label>Specialty</label>
                                <select
                                    className="w-full p-2 border rounded"
                                    value={formData.specialty}
                                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                                >
                                    <option value="General Physician">General Physician</option>
                                    <option value="Cardiologist">Cardiologist</option>
                                </select>
                            </div>

                            <div>
                                <label>Experience (Years)</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full p-2 border rounded"
                                    value={formData.experience}
                                    onChange={(e) => setFormData({...formData, experience: Number(e.target.value)})}
                                />
                            </div>

                            <div>
                                <label>Location</label>
                                <select
                                    className="w-full p-2 border rounded"
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                >
                                    <option value="Colombo">Colombo</option>
                                    <option value="Kandy">Kandy</option>
                                </select>
                            </div>

                            <div>
                                <label>Fee (LKR)</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full p-2 border rounded"
                                    value={formData.fee}
                                    onChange={(e) => setFormData({...formData, fee: Number(e.target.value)})}
                                />
                            </div>

                            <div>
                                <label>Profile Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full p-2 border rounded"
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                />
                                {previewImage && (
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="mt-2 w-full h-48 object-cover rounded-lg border"
                                    />
                                )}
                                {isUploading && <p className="text-sm text-gray-500">Uploading...</p>}
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className={`px-4 py-2 rounded ${isUploading ? 'bg-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                >
                                    {isUploading ? 'Saving...' : 'Save'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
// Ar4V7PjUu0Jh1oYg