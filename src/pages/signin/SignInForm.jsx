import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../../auth/AuthContext';
import { validateField } from '../../utils/validation';
import {Input,Button} from '../../components';
import '../../App.css';

function SignInForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    emailInp: '',
    passInp: ''
  });

  const errors = {
    emailInp: validateField("emailInp", formData.emailInp, formData).message,
    passInp: validateField("passInp", formData.passInp, formData).message,
  };

  const isFormValid = 
    errors.emailInp === "" && 
    errors.passInp === "" && 
    formData.emailInp.trim() !== "" && 
    formData.passInp.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const result = login(formData.emailInp, formData.passInp);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      alert(result.message);
    }
  };

  return (
    <div className='container'>
      <div className='formContainer'>
        <form className='form' onSubmit={handleSignIn}>
          <h2>Sign In</h2>

          <Input 
            label="Email" 
            name="emailInp" 
            type="email" 
            value={formData.emailInp} 
            onChange={handleChange} 
            error={errors.emailInp} 
            required={true}
          />
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
          <Button type="submit" disabled={!isFormValid}>
            Sign In
          </Button>
          <p>Not a member? <Link to="/signup">Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;