interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TC</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Technical Challenge
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "home"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "features"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              Características
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "about"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              Acerca de
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
