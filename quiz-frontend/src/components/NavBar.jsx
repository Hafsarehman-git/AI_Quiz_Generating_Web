import '../App.css';

function NavBar({ darkMode, onToggleTheme, user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🧠</span>
        <span className="navbar-title">AI Quiz Generator</span>
      </div>

      <div className="navbar-actions">
        <button className="theme-toggle" onClick={onToggleTheme}>
          {darkMode ? '☀️' : '🌙'}
        </button>
       <button className="logout-btn" onClick={onLogout}>
      Logout
    </button>
    </div>
    </nav>
    
  );
}

export default NavBar;