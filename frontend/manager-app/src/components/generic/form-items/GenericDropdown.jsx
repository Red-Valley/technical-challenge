import PropTypes from "prop-types";

const variants = {
  primary:
    "bg-white border-blue-300 text-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 hover:border-blue-400 disabled:bg-gray-100 disabled:text-gray-400",
  secondary:
    "bg-gray-50 border-gray-300 text-gray-800 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 hover:border-gray-400 disabled:bg-gray-100 disabled:text-gray-400",
  danger:
    "bg-white border-red-300 text-gray-800 focus:border-red-400 focus:ring-2 focus:ring-red-200 hover:border-red-400 disabled:bg-gray-100 disabled:text-gray-400",
};

const sizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const GenericDropdown = ({
  form,
  name,
  label,
  options = [],
  placeholder = "Please select...",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  persistence = null,
}) => {
  const value = form.values[name];

  const handleChange = (e) => {
    form.setFieldValue(name, e.target.value);
    if (persistence) persistence(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
          aria-label={label}
        >
          {label}
        </label>
      )}

      <select
        value={value ?? ""}
        onChange={handleChange}
        disabled={disabled}
        className={`rounded-lg border outline-none cursor-pointer transition-all duration-150 ${variants[variant]} ${sizes[size]} ${className}`}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.id ?? option} value={option.id ?? option}>
            {option.name || option.label || "Sin nombre"}
          </option>
        ))}
      </select>
    </div>
  );
};

GenericDropdown.propTypes = {
  form: PropTypes.shape({
    values: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        label: PropTypes.string,
      }),
    ])
  ).isRequired,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  persistence: PropTypes.func,
};

export default GenericDropdown;