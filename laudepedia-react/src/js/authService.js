export const registerUser = (formData) => {
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  
  // Validasi minimal 8 karakter
  if (formData.password.length < 8) {
    return { success: false, message: "Password must be at least 8 characters long!" };
  }

  const userExists = existingUsers.some(user => user.email.toLowerCase() === formData.email.toLowerCase());
  if (userExists) {
    return { success: false, message: "This email is already registered!" };
  }

  const updatedUsers = [...existingUsers, formData];
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  return { success: true, message: "Account created successfully!" };
};

export const loginUser = (credentials) => {
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const user = storedUsers.find(u => 
    u.email.toLowerCase() === credentials.email.toLowerCase() && u.password === credentials.password
  );

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return { success: true };
  }
  
  const emailExists = storedUsers.some(u => u.email.toLowerCase() === credentials.email.toLowerCase());
  return { 
    success: false, 
    message: emailExists ? "Incorrect password." : "Email not registered." 
  };
};