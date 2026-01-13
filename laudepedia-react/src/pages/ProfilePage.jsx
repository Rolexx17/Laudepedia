import React, { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import '../css/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  
  // State untuk form edit
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '', // Tambahan untuk Nama
    email: '',
    oldPassword: '',
    newPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // 1. Ambil data user yang sedang login
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // 2. Jika tidak ada user login, lempar ke login page
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }

    setUser(currentUser);
    // Isi form dengan data saat ini
    setFormData({ 
      fullname: currentUser.fullname, 
      email: currentUser.email,
      oldPassword: '',
      newPassword: ''
    });

    // 3. SYNC BALANCE
    const savedBalance = localStorage.getItem(`balance_${currentUser.email}`);
    setBalance(savedBalance ? parseInt(savedBalance) : 100);

  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validasi Password Lama
    if (formData.oldPassword !== user.password) {
      setMessage({ type: 'error', text: 'Old password is incorrect!' });
      return;
    }

    // Ambil database semua user
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Siapkan object user baru
    const updatedUser = {
      ...user,
      fullname: formData.fullname, // Update Nama
      email: formData.email,       // Update Email
      password: formData.newPassword ? formData.newPassword : user.password // Update Password
    };

    // 1. Update di list 'users' (Database simulasi)
    const updatedUsersList = allUsers.map(u => 
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsersList));

    // 2. Update session 'currentUser'
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // 3. Pindahkan saldo ke key email baru jika email berubah
    if (user.email !== updatedUser.email) {
       const currentBal = localStorage.getItem(`balance_${user.email}`);
       localStorage.setItem(`balance_${updatedUser.email}`, currentBal);
       localStorage.removeItem(`balance_${user.email}`);
    }

    // Update state UI
    setUser(updatedUser);
    setIsEditing(false);
    
    // Reset form tapi pertahankan data baru di inputan
    setFormData({ 
      fullname: updatedUser.fullname, 
      email: updatedUser.email, 
      oldPassword: '', 
      newPassword: '' 
    });
    
    setMessage({ type: 'success', text: 'Profile updated successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  };

  if (!user) return null;

  return (
    <div style={{ paddingBottom: '80px' }}> 
      
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
        
        {/* Nama User Tampil Disini */}
        <h3 style={{ margin: '10px 0 5px', color: '#333' }}>{user.fullname}</h3>
        
        <div className="mt-3">
          <span className="badge bg-gold text-white fs-6 px-3 py-2 rounded-pill">
            Balance: {balance} Coins
          </span>
        </div>
      </div>

      {/* ORDER ICONS */}
      {/* <div className="order-icons">
        <div className="order-item">
          <i className="bi bi-wallet2"></i>
          <div><small>Top Up</small></div>
        </div>
        <div className="order-item">
          <i className="bi bi-clock-history"></i>
          <div><small>History</small></div>
        </div>
        <div className="order-item">
          <i className="bi bi-star"></i>
          <div><small>Premium</small></div>
        </div>
        <div className="order-item">
          <i className="bi bi-gift"></i>
          <div><small>Voucher</small></div>
        </div>
      </div> */}

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
             
             {/* INPUT FULL NAME */}
             <div className="mb-3">
               <label className="form-label" style={{fontSize: '12px'}}>Full Name</label>
               <input 
                 type="text" 
                 id="fullname" 
                 className="form-control" 
                 value={formData.fullname} 
                 onChange={handleChange}
                 required
               />
             </div>

             {/* INPUT EMAIL */}
             <div className="mb-3">
               <label className="form-label" style={{fontSize: '12px'}}>Email Address</label>
               <input 
                 type="email" 
                 id="email" 
                 className="form-control" 
                 value={formData.email} 
                 onChange={handleChange}
                 required
               />
             </div>

             {/* INPUT NEW PASSWORD */}
             <div className="mb-3">
               <label className="form-label" style={{fontSize: '12px'}}>New Password (Optional)</label>
               <input 
                 type="password" 
                 id="newPassword" 
                 className="form-control" 
                 placeholder="Leave blank to keep current"
                 value={formData.newPassword} 
                 onChange={handleChange}
               />
             </div>

             {/* CONFIRM OLD PASSWORD */}
             <div className="mb-3">
               <label className="form-label" style={{fontSize: '12px', color: '#bfa76a', fontWeight: 'bold'}}>
                 Confirm with Old Password *
               </label>
               <input 
                 type="password" 
                 id="oldPassword" 
                 className="form-control" 
                 placeholder="Required to save changes"
                 value={formData.oldPassword} 
                 onChange={handleChange}
                 required
               />
             </div>

             <div className="d-flex gap-2">
               <button type="submit" className="btn btn-sm bg-gold text-white w-50">Save Changes</button>
               <button type="button" onClick={() => setIsEditing(false)} className="btn btn-sm btn-outline-secondary w-50">Cancel</button>
             </div>
          </form>
        ) : (
          /* TAMPILAN MENU STANDAR */
          <>
            <div className="menu-item">
              <i className="bi bi-person"></i>
              <div className="flex-grow-1">Full Name</div>
              <div className="text-muted" style={{fontSize: '12px'}}>{user.fullname}</div>
            </div>

            <div className="menu-item">
              <i className="bi bi-envelope"></i>
              <div className="flex-grow-1">Email</div>
              <div className="text-muted" style={{fontSize: '12px'}}>{user.email}</div>
            </div>
            
            <div className="menu-item">
              <i className="bi bi-lock"></i>
              <div className="flex-grow-1">Password</div>
              <div className="text-muted" style={{fontSize: '12px'}}>••••••••</div>
            </div>

            <div className="menu-item" onClick={handleLogout}>
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