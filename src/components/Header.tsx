import { useTheme } from "../contexts/ThemeContext";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <div className="flex items-center space-x-4">
          <img
            src="/logo.png"
            alt="TaskFlow Logo"
            className="h-12 w-10  shadow-lg"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Task Flow
          </h1>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Stay organized, stay productive
        </p>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}

export default Header;
