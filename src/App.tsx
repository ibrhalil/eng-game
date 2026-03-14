import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { GuestProvider } from './context/GuestContext';
import { ProgressProvider } from './context/ProgressContext';
import Header from './components/Header';
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import Listening from './pages/Listening';
import Phrases from './pages/Phrases';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <GuestProvider>
        <ProgressProvider>
          <BrowserRouter>
            <div className="app">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/flashcards" element={<Flashcards />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/listening" element={<Listening />} />
                  <Route path="/phrases" element={<Phrases />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </ProgressProvider>
      </GuestProvider>
    </ThemeProvider>
  );
}

export default App;
