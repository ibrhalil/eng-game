import { Link } from 'react-router-dom';
import {
  HiOutlineBookOpen,
  HiOutlineChatBubbleLeftRight,
  HiOutlinePencilSquare,
} from 'react-icons/hi2';
import { FiHeadphones } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Eng-Game</h1>
      <p className="home-subtitle">İngilizce Öğrenme Platformu</p>
      
      <div className="cards-grid">
        <Link to="/flashcards" className="card">
          <div className="card-icon">
            <HiOutlineBookOpen aria-hidden="true" />
          </div>
          <h2>Flashcards</h2>
          <p>Kelime kartları ile yeni kelimeler öğren</p>
        </Link>

        <Link to="/quiz" className="card">
          <div className="card-icon">
            <HiOutlinePencilSquare aria-hidden="true" />
          </div>
          <h2>Quiz</h2>
          <p>Bilgini test et</p>
        </Link>

        <Link to="/listening" className="card">
          <div className="card-icon">
            <FiHeadphones aria-hidden="true" />
          </div>
          <h2>Listening</h2>
          <p>Dinleme alıştırmaları</p>
        </Link>

        <Link to="/phrases" className="card">
          <div className="card-icon">
            <HiOutlineChatBubbleLeftRight aria-hidden="true" />
          </div>
          <h2>Phrases</h2>
          <p>Günlük konuşma kalıpları</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
