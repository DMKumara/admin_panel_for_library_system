import { Bell, Search, UserCircle } from 'lucide-react';

const Topbar = () => {
  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '300px' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search..." 
            style={{
              width: '100%',
              padding: '0.5rem 1rem 0.5rem 2.5rem',
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid var(--border-color)',
              borderRadius: '9999px',
              color: 'var(--text-primary)',
              outline: 'none'
            }} 
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative' }}>
          <Bell size={20} />
          <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', backgroundColor: 'var(--danger)', borderRadius: '50%' }}></span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <UserCircle size={24} color="var(--text-secondary)" />
          <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
