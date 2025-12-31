import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import Input from '../components/Input';
import Button from '../components/Button';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user } = useContext(AuthContext);

    const [profileData, setProfileData] = useState({
        fullName: '',
        email: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setProfileData({
                fullName: user.fullName,
                email: user.email
            });
        }
    }, [user]);

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put('/users/updatedetails', profileData);
            toast.success('Profile updated successfully');
            setIsEditing(false);
            // Optional: Refresh user context specific if needed, but usually simpler to just notify
            // window.location.reload(); // Quick way to fresh user data in context if context doesn't auto-fetch
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            return toast.error("New passwords don't match");
        }
        setLoading(true);
        try {
            await api.put('/users/updatepassword', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            toast.success('Password changed successfully');
            setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
            <h1 style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>My Profile</h1>

            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr' }}>

                {/* Profile Info Section */}
                <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0 }}>Personal Information</h3>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--primary-color)',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >Edit</button>
                        )}
                    </div>

                    <form onSubmit={handleUpdateProfile}>
                        <Input
                            label="Full Name"
                            name="fullName"
                            value={profileData.fullName}
                            onChange={handleProfileChange}
                            disabled={!isEditing}
                            required
                        />
                        <Input
                            label="Email Address"
                            name="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            disabled={!isEditing}
                            type="email"
                            required
                        />

                        {isEditing && (
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <Button type="submit" disabled={loading}>
                                    Save Changes
                                </Button>
                                <Button variant="secondary" onClick={() => setIsEditing(false)} disabled={loading}>
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </form>
                </div>

                {/* Change Password Section */}
                <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow)'
                }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Change Password</h3>
                    <form onSubmit={handleChangePassword}>
                        <Input
                            label="Current Password"
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                        <Input
                            label="New Password"
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                        <Input
                            label="Confirm New Password"
                            type="password"
                            name="confirmNewPassword"
                            value={passwordData.confirmNewPassword}
                            onChange={handlePasswordChange}
                            required
                        />

                        <Button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
                            Update Password
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
