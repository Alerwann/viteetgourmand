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

  // Styles selon la variante (primaire en terracotta, secondaire en anthracite/clair)
  const baseStyle =
    'px-6 py-3 rounded-xl font-medium text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer bg-[#2C2C2C] text-white hover:bg-[#1a1a1a] shadow-md hover:shadow-lg disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyle} `}
    >
      {label}
    </button>
  );
};

export default CustomButton;
