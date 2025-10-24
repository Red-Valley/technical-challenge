import PropTypes from "prop-types";

const GenericListItem = ({ title, subtitle, provider, status, action, onClick }) => {
  return (
    <li
      onClick={onClick}
      className="grid grid-cols-[2fr_2fr_2fr_1fr_auto] gap-4 items-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer"
    >
      <span className="text-gray-800 font-medium">{title}</span>
      <span className="text-gray-500 text-sm">{subtitle}</span>
      <span className="text-gray-700">{provider || "-"}</span>
      <span className="text-green-600 font-medium">{status || "-"}</span>
      <div className="flex items-center gap-2">{action}</div>
    </li>
  );
};

GenericListItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  provider: PropTypes.string,
  status: PropTypes.string,
  action: PropTypes.node,
  onClick: PropTypes.func,
};

export default GenericListItem;