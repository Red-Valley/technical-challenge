import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

const navItems = [
  { to: "patient", label: "Patient" },
  { to: "provider", label: "Provider" },
  { to: "patient-list", label: "Patient List" },
  { to: "provider-list", label: "Provider List" },
  { to: "patient-update-control", label: "Update Control" },
  { to: "patient-history", label: "History" },
];

const DashboardPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            
            <div className="flex-shrink-0 text-xl font-bold text-gray-800">
                Manager
            </div>

            <div className="hidden lg:flex lg:space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out ${
                      isActive
                        ? "bg-blue-500 text-white shadow-sm"
                        : "text-white hover:bg-gray-100 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </nav>
        </div>

        <div
          className={`lg:hidden w-full ${isOpen ? 'block' : 'hidden'}`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 bg-gray-50">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ease-in-out ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-200 hover:text-blue-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      <main className="w-full">
          <Outlet />
      </main>
    </div>
  );
};

DashboardPage.propTypes = {};

export default DashboardPage;