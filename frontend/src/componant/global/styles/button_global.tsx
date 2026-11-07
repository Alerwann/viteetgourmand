/** @format */

import { useNavigate as useReactRouterNavigate } from 'react-router-dom';

interface ButtonProps {
  label: string;
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const CustomButton: React.FC<ButtonProps> = ({
  label,
  to,
  onClick,
  type = 'button',
  disabled,
}) => {
  const navigate = useReactRouterNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className="
      max-w-md
      px-6 py-3 
      rounded-xl 
      font-medium text-sm 
      transition-all 
      gap-2 cursor-pointer 
      bg-[#6c2a2a] text-white hover:bg-[#1a1a1a] 
      shadow-md hover:shadow-lg 
      disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
};

export default CustomButton;
