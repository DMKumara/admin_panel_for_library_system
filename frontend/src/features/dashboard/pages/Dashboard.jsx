import { useState, useEffect } from 'react';
import apiClient from '../../../core/api/apiClient';
import { BookOpen, Users, BookMarked, Activity } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: 0,
    borrowedBooks: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [booksRes, usersRes] = await Promise.all([
          apiClient.get('/books'),
          apiClient.get('/users')
        ]);
        
        const books = booksRes.data;
        const users = usersRes.data;
        
        setStats({
          totalBooks: books.length,
          totalMembers: users.length,
          borrowedBooks: books.filter(b => b.status === 'Borrowed').length
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };
    
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Books', value: stats.totalBooks, icon: BookOpen, color: '#4f46e5' },
    { title: 'Total Members', value: stats.totalMembers, icon: Users, color: '#10b981' },
    { title: 'Borrowed Books', value: stats.borrowedBooks, icon: BookMarked, color: '#f59e0b' },
    { title: 'Active Today', value: '24', icon: Activity, color: '#ec4899' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>Dashboard Overview</h1>
        <p className="text-muted">Welcome back, Admin. Here is what's happening today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ padding: '1rem', borderRadius: '12px', backgroundColor: `${stat.color}20`, color: stat.color }}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>{stat.title}</p>
                <h2 style={{ margin: 0, fontSize: '1.75rem' }}>{stat.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          <Activity size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3>Activity Chart Placeholder</h3>
          <p>Chart implementation goes here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
