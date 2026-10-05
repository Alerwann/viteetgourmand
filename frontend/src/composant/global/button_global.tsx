/** @format */

import { useNavigate } from "react-router-dom";

interface ButtonProps {
  label: string;
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const CustomButton: React.FC<ButtonProps> = ({
  label,
  to,
  onClick,
  type = "button",
}) => {
  const navigate = useNavigate();

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
      className="p-3 bg-[#69e68c] border-black shadow-[0px_0px_10px_#10860c] rounded-xl"
    >
      {label}
    </button>
  );
};

export default CustomButton;
