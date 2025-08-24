import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import imageCompression from 'browser-image-compression';

const ProfilePage = () => {
    const { user, authFetch, setUser } = useAuth();
    const [username, setUsername] = useState(user?.username || '');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(user?.avatar || '');
    const [loading, setLoading] = useState(false);

    const handleAvatarChange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 512,
                    useWebWorker: true,
                };
                const compressedFile = await imageCompression(file, options);
                setAvatar(compressedFile);
                setPreview(URL.createObjectURL(compressedFile));
            } catch (err) {
                toast.error('Image compression failed.');
                console.error('Compression error:', err);
            }
        }
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('username', username);
            if (password) formData.append('password', password);
            if (avatar) formData.append('avatar', avatar);

            const response = await authFetch('http://localhost:4000/api/auth/update-profile', {
                method: 'PUT',
                body: formData,
            });

            setUser((prev) => ({
                ...prev,
                username: response.user.username,
                avatar: response.user.avatar,
            }));

            toast.success('✅ Profile updated successfully!');
            setPassword('');
        } catch (error) {
            toast.error(`❌ ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-emerald-50 pt-24 px-4">
            <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Edit Profile</h2>

                {preview && (
                    <div className="flex justify-center mb-4">
                        <img
                            src={preview}
                            alt="Avatar Preview"
                            className="w-24 h-24 rounded-full object-cover ring-2 ring-blue-400 shadow"
                        />
                    </div>
                )}

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Avatar</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                    file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Leave blank to keep current password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        onClick={handleUpdate}
                        disabled={loading}
                        className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}


                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
