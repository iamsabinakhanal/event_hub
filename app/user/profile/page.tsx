"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/action/admin_action";
import Navbar from "@/app/components/navbar";
import { Upload, Camera } from "lucide-react";

export default function UserProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [userData, setUserData] = useState<any>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        // Get user data from localStorage or cookies
        const userDataString = localStorage.getItem("user_data");
        if (userDataString) {
            const user = JSON.parse(userDataString);
            setUserData(user);
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                password: "",
                confirmPassword: "",
            });
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        // Validate passwords match if password is being updated
        if (formData.password && formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const data = new FormData();
            data.append("firstName", formData.firstName);
            data.append("lastName", formData.lastName);
            data.append("email", formData.email);
            
            // Only include password if it's being updated
            if (formData.password) {
                data.append("password", formData.password);
            }

            // Add image if selected
            if (imageFile) {
                data.append("image", imageFile);
            }

            const result = await updateProfile(userData._id, data);

            if (result.success) {
                setMessage("Profile updated successfully!");
                // Update local storage with new data
                localStorage.setItem("user_data", JSON.stringify(result.data));
                setUserData(result.data);
                // Clear password fields
                setFormData((prev) => ({
                    ...prev,
                    password: "",
                    confirmPassword: "",
                }));
            } else {
                setMessage(result.message || "Failed to update profile");
            }
        } catch (error) {
            setMessage("An error occurred while updating profile");
        } finally {
            setLoading(false);
        }
    };

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="h-10 w-10 mx-auto rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
                    <p className="mt-4 text-sm text-gray-600">Loading your profile...</p>
                </div>
            </div>
        );
    }

    const initials = `${userData.firstName?.[0] || "U"}${userData.lastName?.[0] || ""}`;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-3 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        Back
                    </button>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${message.includes("success") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                        {message}
                    </div>
                )}

                {/* User Info Section */}
                <section className="bg-white rounded-lg shadow p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome Back, {userData.firstName}!</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="border-l-4 border-blue-500 pl-4">
                            <p className="text-sm text-gray-600 mb-2">First Name</p>
                            <p className="text-lg font-semibold text-gray-900">{userData.firstName || 'N/A'}</p>
                        </div>
                        <div className="border-l-4 border-indigo-500 pl-4">
                            <p className="text-sm text-gray-600 mb-2">Last Name</p>
                            <p className="text-lg font-semibold text-gray-900">{userData.lastName || 'N/A'}</p>
                        </div>
                        <div className="border-l-4 border-purple-500 pl-4">
                            <p className="text-sm text-gray-600 mb-2">Email</p>
                            <p className="text-lg font-semibold text-gray-900">{userData.email || 'N/A'}</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                            <p className="text-sm text-gray-600 mb-2">Status</p>
                            <p className="text-lg font-semibold text-green-600">✓ Authenticated</p>
                        </div>
                    </div>
                </section>

                <form id="profile-form" onSubmit={handleSubmit} className="space-y-8">
                    {/* Profile Picture Section */}
                    <div className="bg-white border border-gray-200 rounded-lg p-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Picture</h2>
                        <div className="flex flex-col sm:flex-row gap-8">
                            <div className="flex flex-col items-center">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                                    />
                                ) : userData.image ? (
                                    <img
                                        src={`http://localhost:5000/${userData.image}`}
                                        alt="Current"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border-4 border-gray-200">
                                        <span className="text-4xl font-bold text-blue-600">
                                            {initials}
                                        </span>
                                    </div>
                                )}
                                <p className="mt-3 text-sm text-gray-600 font-medium">
                                    {userData.firstName} {userData.lastName}
                                </p>
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2">
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            <Camera className="w-8 h-8 text-gray-400" />
                                            <p className="text-sm font-medium text-gray-700">
                                                Click to upload or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    </div>
                                </label>
                                {imagePreview && (
                                    <p className="text-sm text-green-600 font-medium">
                                        ✓ New image selected
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Personal Information Section */}
                    <div className="bg-white border border-gray-200 rounded-lg p-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Security Section */}
                    <div className="bg-white border border-gray-200 rounded-lg p-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Security</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Leave blank"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Repeat"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 transition flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Upload size={16} />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
