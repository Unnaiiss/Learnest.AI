import React from 'react';
import { gsap } from 'gsap';

const Button = React.memo(({ children, variant = 'primary', className = '', onClick }) => {
  const buttonRef = React.useRef(null);

  React.useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, { scale: 1.05, duration: 0.2, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(button, { scale: 1, duration: 0.2, ease: 'power2.out' });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const baseStyle = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 shadow-sm",
    secondary: "border-transparent text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500",
    outline: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500"
  };

  return (
    <button 
      ref={buttonRef}
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;

