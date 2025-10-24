import PropTypes from 'prop-types'

const GenericButton = ({
  children,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
  onClick = () => {}
}) => {
  const baseStyle =
    "px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none shadow-md active:scale-95";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 disabled:from-blue-200 disabled:to-blue-300",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-200",
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 disabled:from-red-300 disabled:to-red-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

GenericButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  className: PropTypes.string,
};

export default GenericButton;