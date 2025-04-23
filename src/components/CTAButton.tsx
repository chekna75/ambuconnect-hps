import React from "react";
import { useNavigate } from "react-router-dom";

export interface Props {
  /** Button text */
  children: React.ReactNode;
  /** Optional classname to customize the button */
  className?: string;
  /** Path to navigate to */
  to?: string;
  /** On click handler */
  onClick?: () => void;
  /** Optional variant */
  variant?: "primary" | "secondary";
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

export const CTAButton = ({ 
  children, 
  className = "", 
  to, 
  onClick, 
  variant = "primary",
  size = "md"
}: Props) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (to) {
      navigate(to);
    }
    if (onClick) {
      onClick();
    }
  };

  const baseClasses = "rounded-lg font-medium transition-colors flex items-center justify-center shadow-sm";
  
  const variantClasses = {
    primary: "bg-ambu-blue text-white hover:bg-ambu-blue-dark",
    secondary: "bg-white text-ambu-dark border border-ambu-dark hover:bg-gray-50"
  };

  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
