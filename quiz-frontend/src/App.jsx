import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UploadForm from "./components/UploadForm";
import QuizPage from "./components/QuizPage";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import { getdata, uploadfile } from "./api.js";
import api from "./api.js";
import myImg from './assets/myImg.png';
import './App.css';

function QuizGeneratorHome({ darkMode, toggleTheme, user, onLogout }) {
  const [text, setText] = useState([]);
  const [busy, setBusy] = useState(false);
  const [quizId, setQuizId] = useState(null);

  const load = () => getdata().then(setText).catch(console.error);

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (file) => {
    setBusy(true);
    try {
      const savedQuiz = await uploadfile(file);
      setQuizId(savedQuiz._id);
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <NavBar darkMode={darkMode} onToggleTheme={toggleTheme} user={user} onLogout={onLogout} />

      <div className="main-section">
        <header>
          <div className="main-box">
            <h1>AI Quiz Generator</h1>
            <p>
              ✨ Turn any topic into a quiz. Just upload the file <br />
              & let AI create an engaging quiz within seconds!<br />
              Happy Learning ☺️
            </p>
          </div>
          <img src={myImg} alt="Quiz illustration" className="header-image" />
        </header>
      </div>

      <span className="filearea">{text.length} files selected</span>
      <UploadForm onUpload={handleUpload} busy={busy} />

      {quizId && <QuizPage quizId={quizId} />}
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => setDarkMode(prev => !prev);

  useEffect(() => {
    api.get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  if (loading) return <div className="center">Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login onLogin={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register onLogin={setUser} />}
        />
        <Route
          path="/"
          element={
            user ? (
              <QuizGeneratorHome darkMode={darkMode} toggleTheme={toggleTheme} user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}