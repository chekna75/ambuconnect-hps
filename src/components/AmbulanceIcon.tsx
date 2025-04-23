import React from "react";

export interface Props {
  /** Optional classname to customize the icon */
  className?: string;
  /** Size of the icon */
  size?: number;
}

export const AmbulanceIcon = ({ className = "", size = 40 }: Props) => {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 15H6V17H4V15Z" fill="currentColor" />
      <path d="M18 15H20V17H18V15Z" fill="currentColor" />
      <path 
        d="M19 9L17.75 6.25C17.5154 5.69555 16.9764 5.31318 16.37 5.25H11V9H3C2.44772 9 2 9.44772 2 10V15C2 15.5523 2.44772 16 3 16H4C4 17.6569 5.34315 19 7 19C8.65685 19 10 17.6569 10 16H14C14 17.6569 15.3431 19 17 19C18.6569 19 20 17.6569 20 16H21C21.5523 16 22 15.5523 22 15V12C22 10.3431 20.6569 9 19 9ZM7 17C6.44772 17 6 16.5523 6 16C6 15.4477 6.44772 15 7 15C7.55228 15 8 15.4477 8 16C8 16.5523 7.55228 17 7 17ZM11 11V7H14V11H11ZM17 17C16.4477 17 16 16.5523 16 16C16 15.4477 16.4477 15 17 15C17.5523 15 18 15.4477 18 16C18 16.5523 17.5523 17 17 17ZM20 11H16V9H19C19.5523 9 20 9.44772 20 10V11Z" 
        fill="currentColor" 
      />
    </svg>
  );
};
