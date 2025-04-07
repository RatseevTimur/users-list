import { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserList from './pages/UserList';
import UserDetails from './pages/UserDetails';
import Loading from './components/Loading';
import { translations } from './locales/translations';
import { FaGithub } from '@react-icons/all-files/fa/FaGithub'; // Импорт конкретной иконки
import { FaTelegramPlane } from '@react-icons/all-files/fa/FaTelegramPlane';
import { FaGlobe } from '@react-icons/all-files/fa/FaGlobe';
import './styles/global.scss';

const queryClient = new QueryClient();

function App() {
  const [theme, setTheme] = useState('system');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app-container">
          <header className="app-header">
            <h1>{translations[language as keyof typeof translations].title}</h1>
            <div className="header-controls">
              <div className="theme-switcher">
                <label htmlFor="theme">Theme:</label>
                <select id="theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div className="lang-switcher">
                <label htmlFor="lang">Language:</label>
                <select id="lang" value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="en">English</option>
                  <option value="ru">Русский</option>
                </select>
              </div>
            </div>
          </header>
          <main>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route
                  path="/"
                  element={<UserList language={language} translations={translations[language as keyof typeof translations]} />}
                />
                <Route path="/user/:id" element={<UserDetails />} />
              </Routes>
            </Suspense>
          </main>
          <footer className="app-footer">
            <p>© 2025 Timur Ratseev. All rights reserved.</p>
            <div className="social-links">
              <a href="https://github.com/RatseevTimur/users-list" target="_blank" rel="noopener noreferrer" title="GitHub">
                <FaGithub className="social-icon" />
              </a>
              <a href="https://t.me/TimurRatseev" target="_blank" rel="noopener noreferrer" title="Telegram">
                <FaTelegramPlane className="social-icon" />
              </a>
              <a href="https://3d-timsite.netlify.app" target="_blank" rel="noopener noreferrer" title="Website">
                <FaGlobe className="social-icon" />
              </a>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;