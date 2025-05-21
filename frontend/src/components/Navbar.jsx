import { useAuth } from "../utils/auth";

export default function Navbar() {
  const { logout, user } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow mb-6">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <span className="text-lg font-bold text-gray-800 dark:text-white">
          Link Saver
        </span>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {user?.email}
          </span>

          <button
            onClick={logout}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>

          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}

function DarkModeToggle() {
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleDark}
      className="text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 px-3 py-1 rounded"
    >
      🌓
    </button>
  );
}
