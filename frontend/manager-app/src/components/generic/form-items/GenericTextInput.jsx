import PropTypes from "prop-types";

const variants = {
  primary:
    "border-gray-300 focus:border-blue-500 focus:ring-blue-400 text-gray-900",
  secondary:
    "border-gray-200 bg-gray-50 text-gray-700 focus:border-gray-400 focus:ring-gray-300",
  danger:
    "border-red-300 text-red-700 focus:border-red-500 focus:ring-red-400",
};

const sizes = {
  sm: "px-2 py-1 text-sm rounded-lg",
  md: "px-3 py-2 text-base rounded-xl",
  lg: "px-4 py-3 text-lg rounded-2xl",
};

const GenericTextInput = ({
  name,
  label = "",
  dataType = "text",
  form,
  placeholder,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  persistence = null
}) => {
  const value = form.values[name];
  const error = form.touched[name] && form.errors[name];

  const handleOnChange = (e) => {
    form.setFieldValue(name, e.target.value);
    if(!persistence) return;
    persistence(e.target.value);
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          name={name}
          type={dataType || "text"}
          value={value ?? ""}
          onChange={(e) => handleOnChange(e)}
          onBlur={form.handleBlur}
          placeholder={placeholder || ""}
          disabled={disabled}
          autoComplete="off"
          className={`w-full border bg-transparent focus:outline-none focus:ring-2 transition-all duration-150 ${variants[variant]} ${sizes[size]} ${
            error ? "border-red-500 ring-red-200" : ""
          } ${dataType === "percentage" ? "pr-8" : ""} ${className}`}
        />
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{form.errors[name]}</p>}
    </div>
  );
};

GenericTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  dataType: PropTypes.string,
  placeholder: PropTypes.string,
  form: PropTypes.shape({
    values: PropTypes.object.isRequired,
    errors: PropTypes.object,
    touched: PropTypes.object,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func,
    setFieldTouched: PropTypes.func,
  }).isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default GenericTextInput;
