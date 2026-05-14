import { useState, useEffect } from 'react';
import apiClient from '../../../core/api/apiClient';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: '',
    status: 'Available',
    publishedYear: ''
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await apiClient.get('/books');
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch books', error);
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
      await apiClient.post('/books', formData);
      setIsModalOpen(false);
      setFormData({ title: '', author: '', isbn: '', category: '', status: 'Available', publishedYear: '' });
      fetchBooks(); // Refresh list
    } catch (error) {
      console.error('Failed to add book', error);
      alert('Error adding book: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await apiClient.delete(`/books/${id}`);
        fetchBooks();
      } catch (error) {
        console.error('Failed to delete book', error);
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    return <span className={`badge badge-${statusLower}`}>{status}</span>;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Books Management</h1>
          <p className="text-muted">Manage your library's collection of books.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Add New Book
        </button>
      </div>

      {isModalOpen && (
        <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--primary-color)' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Add New Book</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label>Title</label>
              <input type="text" name="title" className="input-field" value={formData.title} onChange={handleInputChange} required />
            </div>
            <div className="input-group">
              <label>Author</label>
              <input type="text" name="author" className="input-field" value={formData.author} onChange={handleInputChange} required />
            </div>
            <div className="input-group">
              <label>ISBN</label>
              <input type="text" name="isbn" className="input-field" value={formData.isbn} onChange={handleInputChange} required />
            </div>
            <div className="input-group">
              <label>Category</label>
              <input type="text" name="category" className="input-field" value={formData.category} onChange={handleInputChange} required />
            </div>
            <div className="input-group">
              <label>Published Year</label>
              <input type="number" name="publishedYear" className="input-field" value={formData.publishedYear} onChange={handleInputChange} />
            </div>
            <div className="input-group">
              <label>Status</label>
              <select name="status" className="input-field" value={formData.status} onChange={handleInputChange}>
                <option value="Available">Available</option>
                <option value="Borrowed">Borrowed</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Book</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading books...</div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>ISBN</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? books.map((book) => (
                  <tr key={book._id}>
                    <td style={{ fontWeight: 500 }}>{book.title}</td>
                    <td className="text-muted">{book.author}</td>
                    <td>{book.category}</td>
                    <td className="text-muted">{book.isbn}</td>
                    <td>{getStatusBadge(book.status)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn" style={{ padding: '0.25rem', color: 'var(--text-secondary)', background: 'transparent' }}>
                          <Edit2 size={16} />
                        </button>
                        <button className="btn" onClick={() => handleDelete(book._id)} style={{ padding: '0.25rem', color: 'var(--danger)', background: 'transparent' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                      No books found. Add a new book to get started.
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

export default BooksPage;
