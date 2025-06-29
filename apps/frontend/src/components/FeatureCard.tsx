interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  iconColor: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  iconColor,
}: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
      <div
        className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center mb-4`}
      >
        <span
          className={`${
            iconColor.includes("blue")
              ? "text-blue-600 dark:text-blue-400"
              : iconColor.includes("green")
                ? "text-green-600 dark:text-green-400"
                : "text-purple-600 dark:text-purple-400"
          } text-xl`}
        >
          {icon}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
