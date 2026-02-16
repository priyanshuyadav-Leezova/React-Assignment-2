
const Input = ({ label, name, type, value, onChange, error, isPassword, showPassword, togglePassword, required,onKeyDown }) => {
  return (
    <div className='fieldGroup'>
      <label htmlFor={name}>
        {label} 
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>
      
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <input
          id={name}
          name={name}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={label}
          onChange={onChange}
          value={value}
          onKeyDown={onKeyDown}
        />
        
{isPassword && (
  <button 
    type="button" 
    onClick={togglePassword}
  > 
    <i className={showPassword ?  "fa-solid fa-eye": "fa-solid fa-eye-slash"}></i>
  </button>
)}
      </div>
      <span className="errorText">{value ? error : ""}</span>
    </div>
  );
};

export default Input;