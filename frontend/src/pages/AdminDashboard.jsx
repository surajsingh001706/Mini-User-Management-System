import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Button from '../components/Button';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/users/admin/users?page=${page}&limit=10`);
            setUsers(data.data);
            setTotalPages(data.pagination?.pages || 1); // Adjust based on API
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const toggleUserStatus = async (userId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        if (!window.confirm(`Are you sure you want to make this user ${newStatus}?`)) return;

        try {
            await api.put(`/users/admin/users/${userId}/status`, { status: newStatus });
            toast.success(`User marked as ${newStatus}`);
            fetchUsers(); // Refresh list
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Admin Dashboard</h1>
                <Button onClick={fetchUsers} variant="secondary" style={{ width: 'auto' }}>Refresh</Button>
            </div>

            <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: 'var(--shadow)',
                overflow: 'hidden'
            }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)' }}>Name</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)' }}>Email</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)' }}>Role</th>
                                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, color: 'var(--text-muted)' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</td></tr>
                            ) : users.length === 0 ? (
                                <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>No users found</td></tr>
                            ) : (
                                users.map(user => (
                                    <tr key={user._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontWeight: 500 }}>{user.fullName}</div>
                                        </td>
                                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{user.email}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.875rem',
                                                backgroundColor: user.role === 'admin' ? '#e0e7ff' : '#f1f5f9',
                                                color: user.role === 'admin' ? '#4338ca' : '#64748b',
                                                fontWeight: 500
                                            }}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.875rem',
                                                backgroundColor: user.status === 'active' ? '#dcfce7' : '#fee2e2',
                                                color: user.status === 'active' ? '#15803d' : '#b91c1c',
                                                fontWeight: 500
                                            }}>
                                                {user.status === 'active' ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            {user.role !== 'admin' && (
                                                <Button
                                                    onClick={() => toggleUserStatus(user._id, user.status)}
                                                    variant={user.status === 'active' ? "danger" : "primary"}
                                                    style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}
                                                >
                                                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div style={{ padding: '1rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <Button
                        variant="secondary"
                        style={{ width: 'auto' }}
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                    >
                        Previous
                    </Button>
                    <span style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', fontWeight: 500 }}>
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        variant="secondary"
                        style={{ width: 'auto' }}
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
