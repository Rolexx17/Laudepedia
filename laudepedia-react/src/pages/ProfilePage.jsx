import React from 'react';
import BottomNav from '../components/BottomNav';
import { useProfile } from '../js/profile';
import '../css/Profile.css';

const Profile = () => {
  const {
    user, balance, isEditing, setIsEditing,
    showLogoutConfirm, setShowLogoutConfirm,
    formData, message, navigate,
    handleChange, handleUpdateProfile, handleLogout
  } = useProfile();

  if (!user) return null;

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* POP-UP KONFIRMASI LOGOUT */}
      {showLogoutConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div className="bg-white p-4 rounded shadow-lg text-center" style={{ width: '80%', maxWidth: '300px' }}>
            <h6 className="mb-3">Are you sure you want to logout?</h6>
            <div className="d-flex gap-2">
              <button onClick={handleLogout} className="btn btn-danger btn-sm w-50">Logout</button>
              <button onClick={() => setShowLogoutConfirm(false)} className="btn btn-light btn-sm w-50 border">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="header">
        <span>My Profile</span>
        <i className="bi bi-gear" onClick={() => setIsEditing(!isEditing)}></i>
      </div>

      {/* PROFILE CARD */}
      <div className="profile-card">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png" 
          alt="Profile" 
          className="profile-avatar"
          style={{ cursor: 'pointer' }}
        />
        <h3 style={{ margin: '10px 0 5px', color: '#333' }}>{user.fullname}</h3>
        <div className="mt-3">
          <span className="badge bg-gold text-white fs-6 px-3 py-2 rounded-pill">
            Balance: {balance} Coins
          </span>
        </div>
      </div>

      {/* ORDER ICONS */}
      <div className="order-icons">
        <div className="order-item" onClick={() => navigate('/history')} style={{ cursor: 'pointer' }}>
          <i className="bi bi-clock-history"></i>
          <div><small>History</small></div>
        </div>
      </div>

      {/* MENU LIST / EDIT FORM */}
      <div className="menu-list mt-4">
        {message.text && (
          <div className={`alert ${message.type === 'error' ? 'alert-danger' : 'alert-success'} m-3`} style={{ fontSize: '12px' }}>
            {message.text}
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleUpdateProfile} className="p-3">
            <h5 className="mb-3 gold-text">Edit Profile</h5>
            <div className="mb-3">
              <label className="form-label" style={{ fontSize: '12px' }}>Full Name</label>
              <input type="text" id="fullname" className="form-control" value={formData.fullname} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ fontSize: '12px' }}>Email Address</label>
              <input type="email" id="email" className="form-control" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ fontSize: '12px' }}>New Password (Min. 8 chars)</label>
              <input type="password" id="newPassword" className="form-control" placeholder="Leave blank to keep current" value={formData.newPassword} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ fontSize: '12px', color: '#bfa76a', fontWeight: 'bold' }}>Confirm with Old Password *</label>
              <input type="password" id="oldPassword" className="form-control" placeholder="Required to save changes" value={formData.oldPassword} onChange={handleChange} required />
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-sm bg-gold text-white w-50">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn btn-sm btn-outline-secondary w-50">Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <div className="menu-item">
              <i className="bi bi-person"></i>
              <div className="flex-grow-1">Full Name</div>
              <div className="text-muted" style={{ fontSize: '12px' }}>{user.fullname}</div>
            </div>
            <div className="menu-item">
              <i className="bi bi-envelope"></i>
              <div className="flex-grow-1">Email</div>
              <div className="text-muted" style={{ fontSize: '12px' }}>{user.email}</div>
            </div>
            <div className="menu-item">
              <i className="bi bi-lock"></i>
              <div className="flex-grow-1">Password</div>
              <div className="text-muted" style={{ fontSize: '12px' }}>••••••••</div>
            </div>
            <div className="menu-item" onClick={() => setShowLogoutConfirm(true)}>
              <i className="bi bi-box-arrow-right text-danger"></i>
              <div className="flex-grow-1 text-danger">Logout</div>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;