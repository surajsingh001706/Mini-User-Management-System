import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { toast } from 'react-toastify';

const UserTasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDesc, setNewTaskDesc] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/tasks');
            setTasks(data.data);
        } catch (error) {
            toast.error('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        try {
            if (editingTaskId) {
                // Update existing task
                await api.put(`/tasks/${editingTaskId}`, {
                    title: newTaskTitle,
                    description: newTaskDesc
                });
                toast.success('Task updated!');
                setEditingTaskId(null);
            } else {
                // Create new task
                await api.post('/tasks', {
                    title: newTaskTitle,
                    description: newTaskDesc
                });
                toast.success('Task created!');
            }
            setNewTaskTitle('');
            setNewTaskDesc('');
            fetchTasks();
        } catch (error) {
            toast.error(editingTaskId ? 'Failed to update task' : 'Failed to create task');
        }
    };

    const startEditing = (task) => {
        setEditingTaskId(task._id);
        setNewTaskTitle(task.title);
        setNewTaskDesc(task.description || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEditing = () => {
        setEditingTaskId(null);
        setNewTaskTitle('');
        setNewTaskDesc('');
    };

    const handleToggleStatus = async (taskId, currentStatus) => {
        const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
        try {
            await api.put(`/tasks/${taskId}`, { status: newStatus });
            fetchTasks();
        } catch (error) {
            toast.error('Failed to update task');
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('Delete this task?')) return;
        try {
            await api.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter(t => t._id !== taskId));
            if (editingTaskId === taskId) cancelEditing();
            toast.success('Task deleted');
        } catch (error) {
            toast.error('Failed to delete task');
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
            <h1 style={{ marginBottom: '2rem', color: 'var(--text-color)' }}>My Tasks</h1>

            {/* Create/Edit Task Form */}
            <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: 'var(--shadow)',
                marginBottom: '2rem'
            }}>
                <h3 style={{ marginBottom: '1rem' }}>{editingTaskId ? 'Edit Task' : 'Add New Task'}</h3>
                <form onSubmit={handleSubmit}>
                    <Input
                        placeholder="Task Title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        required
                    />
                    <Input
                        placeholder="Description (Optional)"
                        value={newTaskDesc}
                        onChange={(e) => setNewTaskDesc(e.target.value)}
                    />
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <Button type="submit" disabled={!newTaskTitle.trim()} style={{ width: 'auto' }}>
                            {editingTaskId ? 'Update Task' : 'Add Task'}
                        </Button>
                        {editingTaskId && (
                            <Button type="button" variant="secondary" onClick={cancelEditing} style={{ width: 'auto' }}>
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>
            </div>

            {/* Tasks List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {loading ? (
                    <p>Loading tasks...</p>
                ) : tasks.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No tasks found. Create one above!</p>
                ) : (
                    tasks.map(task => (
                        <div key={task._id} style={{
                            backgroundColor: 'white',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            boxShadow: 'var(--shadow)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderLeft: `5px solid ${task.status === 'completed' ? '#22c55e' : '#f59e0b'}`
                        }}>
                            <div style={{ flex: 1, marginRight: '1rem' }}>
                                <h4 style={{
                                    margin: '0 0 0.5rem 0',
                                    textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                                    color: task.status === 'completed' ? 'var(--text-muted)' : 'var(--text-color)'
                                }}>{task.title}</h4>
                                {task.description && <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{task.description}</p>}
                                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                                    {new Date(task.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="secondary"
                                    onClick={() => handleToggleStatus(task._id, task.status)}
                                    style={{
                                        width: 'auto',
                                        padding: '0.5rem',
                                        fontSize: '0.8rem',
                                        backgroundColor: task.status === 'completed' ? '#f1f5f9' : '#dcfce7',
                                        color: task.status === 'completed' ? '#64748b' : '#15803d'
                                    }}
                                >
                                    {task.status === 'completed' ? 'Mark Pending' : 'Mark Done'}
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => startEditing(task)}
                                    style={{ width: 'auto', padding: '0.5rem', fontSize: '0.8rem' }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteTask(task._id)}
                                    style={{ width: 'auto', padding: '0.5rem', fontSize: '0.8rem' }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UserTasks;
