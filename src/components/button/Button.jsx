const Button = ({ children, type = "button", disabled, onClick, className="" }) => {
  return (
    <button 
      type={type} 
      disabled={disabled} 
      onClick={onClick}
      className={`custom-button ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;