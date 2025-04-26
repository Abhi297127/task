const validateSignup = (data) => {
    const errors = {};
  
    if (!data.name || data.name.length < 20 || data.name.length > 60) {
      errors.name = 'Name must be between 20 and 60 characters';
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.email = 'Invalid email format';
    }
  
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    if (!data.password || !passwordRegex.test(data.password)) {
      errors.password = 'Password must be 8-16 characters with at least one uppercase letter and one special character';
    }
  
    if (!data.address || data.address.length > 400) {
      errors.address = 'Address must not exceed 400 characters';
    }
  
    return errors;
  };
  
  module.exports = { validateSignup }; // Exporting validateSignup