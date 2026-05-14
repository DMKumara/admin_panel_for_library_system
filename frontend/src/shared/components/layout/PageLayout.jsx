import Sidebar from './Sidebar';
import Topbar from './Topbar';

const PageLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <main className="page-container">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
