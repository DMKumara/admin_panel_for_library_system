import { useState, useEffect } from 'react';
import apiClient from '../../../core/api/apiClient';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Member',
    status: 'Active'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get('/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch users', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/users', formData);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', role: 'Member', status: 'Active' });
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error('Failed to add user', error);
      alert('Error adding member: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await apiClient.delete(`/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Failed to delete user', error);
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Members Management</h1>
          <p className="text-muted">Manage library members and staff.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Add New Member
        </button>
      </div>

      {isModalOpen && (
        <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--secondary-color)' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Add New Member</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" name="name" className="input-field" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" name="email" className="input-field" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="input-group">
              <label>Role</label>
              <select name="role" className="input-field" value={formData.role} onChange={handleInputChange}>
                <option value="Member">Member</option>
                <option value="Librarian">Librarian</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="input-group">
              <label>Status</label>
              <select name="status" className="input-field" value={formData.status} onChange={handleInputChange}>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Member</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading members...</div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? users.map((user) => (
                  <tr key={user._id}>
                    <td style={{ fontWeight: 500 }}>{user.name}</td>
                    <td className="text-muted">{user.email}</td>
                    <td>
                      <span style={{ 
                        padding: '0.25rem 0.5rem', 
                        borderRadius: '4px', 
                        fontSize: '0.75rem',
                        backgroundColor: user.role === 'Admin' ? 'rgba(236, 72, 153, 0.1)' : 'rgba(79, 70, 229, 0.1)',
                        color: user.role === 'Admin' ? '#ec4899' : '#818cf8'
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${user.status === 'Active' ? 'available' : 'reserved'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn" style={{ padding: '0.25rem', color: 'var(--text-secondary)', background: 'transparent' }}>
                          <Edit2 size={16} />
                        </button>
                        <button className="btn" onClick={() => handleDelete(user._id)} style={{ padding: '0.25rem', color: 'var(--danger)', background: 'transparent' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                      No members found. Add a new member to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
