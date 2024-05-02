import React from 'react';
import { Link } from 'react-router-dom';
import './AdminHeader.css';


const AdminHeader = () => {
  return (
    <div className="admin-header">
      <div className="header-buttons">
        <Link to="/admin/dashboard">
          <button>Dashboard</button>
        </Link>
        <Link to="/admin/dashboard/insights" >
          <button>Insights</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
