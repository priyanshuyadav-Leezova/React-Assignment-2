import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../../auth/AuthContext';
import { validateField } from '../../utils/validation';
import {Input,Button} from '../../components';
import '../../App';

function SignUpForm() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [showConfrmPass, setShowConfrmPass] = useState(false);
  const [formData, setFormData] = useState({
    nameInp: '', phoneInp: '', emailInp: '', passInp: '', confirmInp: '' 
  });

  const errors = {
    nameInp: validateField("nameInp", formData.nameInp, formData).message,
    phoneInp: validateField("phoneInp", formData.phoneInp, formData).message,
    emailInp: validateField("emailInp", formData.emailInp, formData).message,
    passInp: validateField("passInp", formData.passInp, formData).message,
    confirmInp: validateField("confirmInp", formData.confirmInp, formData).message,
  };

  const isFormValid = Object.values(errors).every(msg => msg === "") && 
                     Object.values(formData).every(val => val.trim() !== "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSignup = (e) => {
  e.preventDefault();
  
  const newUser = { 
    name: formData.nameInp, 
    email: formData.emailInp, 
    phone: formData.phoneInp, 
    password: formData.passInp 
  };

  const result = register(newUser);

  if (result.success) {
    navigate('/signin');
  } else {
    alert(result.message); 
  }
};

  return (
    <div className='container'>
      <div className='formContainer'>
        <form className='form' onSubmit={handleSignup}>
          <h2>Sign Up</h2>

          <Input required={true} label="Name" name="nameInp" value={formData.nameInp} onChange={handleChange} error={errors.nameInp} />
          <Input required={true} label="Mobile" name="phoneInp" value={formData.phoneInp} onChange={handleChange} error={errors.phoneInp} />
          <Input required={true} label="Email" name="emailInp" type="email" value={formData.emailInp} onChange={handleChange} error={errors.emailInp} />
          <Input 
            label="Password" 
            name="passInp" 
            isPassword 
            showPassword={showPass} 
            togglePassword={() => setShowPass(!showPass)} 
            value={formData.passInp} 
            onChange={handleChange} 
            error={errors.passInp} 
            required={true}
          />
          <Input 
            label="Confirm Password" 
            name="confirmInp" 
            isPassword 
            showPassword={showConfrmPass} 
            togglePassword={() => setShowConfrmPass(!showConfrmPass)} 
            value={formData.confirmInp} 
            onChange={handleChange} 
            error={errors.confirmInp}
            required={true} 
          />
          <Button type="submit" disabled={!isFormValid}>Sign Up</Button>
          <p>Already have an Account <Link to="/signin">Login Now</Link></p>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;