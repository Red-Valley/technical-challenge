import PropTypes from "prop-types";

const GenericCard = ({
  title,
  subtitle,
  children,
  actions,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 border border-gray-100">
      <h2 className="text-lg font-medium text-gray-800">{title}</h2>

      {subtitle && <div className="mt-2 text-sm text-gray-500">{subtitle}</div>}

      {children && <div className="mt-4">{children}</div>}

      {actions && <div className="mt-4 flex justify-end">{actions}</div>}
    </div>
  );
};

GenericCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  actions: PropTypes.node,
};

export default GenericCard;
