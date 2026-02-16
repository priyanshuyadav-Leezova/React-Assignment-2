const Button = ({ children, type = "button", disabled, onClick }) => {
  return (
    <button 
      type={type} 
      disabled={disabled} 
      onClick={onClick}
      className="custom-button"
    >
      {children}
    </button>
  );
};

export default Button;