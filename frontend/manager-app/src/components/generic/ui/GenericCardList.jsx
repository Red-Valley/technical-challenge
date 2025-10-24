import PropTypes from "prop-types";
import GenericCard from "./GenericCard";

const GenericCardList = ({
  title= '',
  items = [],
  actions = null
}) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {title} List
      </h2>

      {items.length === 0 ? (
        <div className="text-gray-500 text-center py-10 border border-dashed rounded-xl">
          There are no {title} available.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => (
            <GenericCard
              key={item.id}
              title={item.title}
              subtitle={item.subtitle || "Not specified"}
              actions={actions}
            />
          ))}
        </div>
      )}
    </div>
  );
};

GenericCardList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
    })
  ),
  actions: PropTypes.arrayOf(PropTypes.node)
};

export default GenericCardList;
