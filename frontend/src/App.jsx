import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLayout from './shared/components/layout/PageLayout';
import Dashboard from './features/dashboard/pages/Dashboard';
import BooksPage from './features/books/pages/BooksPage';
import UsersPage from './features/users/pages/UsersPage';

/* 
 * Dammika's Note: 
 * This is the heart of the frontend routing. I'm using React Router here to map URLs 
 * to their specific pages (Dashboard, Books, Users). I also wrapped everything inside 
 * the <PageLayout> component so we get a consistent sidebar and topbar everywhere.
 */
function App() {
  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<div><h1 style={{ marginBottom: '0.5rem' }}>Settings</h1><p className="text-muted">Configuration options</p></div>} />
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;
