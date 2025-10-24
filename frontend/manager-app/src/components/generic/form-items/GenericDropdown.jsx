import PropTypes from "prop-types";

const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-200",
  danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",
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
  placeholder = "Seleccionar...",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  persistence = null
}) => {

  const value = form.values[name];

  const handleChange = (e) => {
    form.setFieldValue(name, e.target.value);
    if(!persistence) return;
    persistence(e.target.value);
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
        className={`rounded-2xl border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none cursor-pointer transition-all duration-150 ${variants[variant]} ${sizes[size]} ${className}`}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option.id} value={option.id ?? option}>
            {option.name || 'No Name'}
          </option>
        ))}
      </select>
    </div>
  );
};

GenericDropdown.propTypes = {
  form: PropTypes.shape({
      values: PropTypes.object.isRequired,
      errors: PropTypes.object,
      touched: PropTypes.object,
      handleChange: PropTypes.func.isRequired,
      handleBlur: PropTypes.func.isRequired,
      setFieldValue: PropTypes.func,
      setFieldTouched: PropTypes.func,
    }).isRequired,
    name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ])
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  persistence: PropTypes.func,
};

export default GenericDropdown;