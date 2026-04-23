import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  const audioMap = useRef({});
  const [activeKeys, setActiveKeys] = useState(new Set());

  const playSound = (note) => {
    if (!audioMap.current[note]) {
      audioMap.current[note] = new Audio(`/sounds/${note}.wav`);
    }

    const audio = audioMap.current[note];

    if (audio.paused) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  const stopSound = (note) => {
    const audio = audioMap.current[note];
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  useEffect(() => {

      const keyMap = {
        '1': "sa",
        '2': 're',
        '3': 'ga',
        '4': 'ma',
        '5': 'pa',
        '6': 'dha',
        '7': 'ni',
        '8': 'sa_high'
      };

      const handleKeyDown = (e) => {
        if (e.repeat) return;

        const note = keyMap[e.key];
        if (note) {
          setActiveKeys(prev => {
            const newSet = new Set(prev);
            newSet.add(note);
            return newSet;
          });

          playSound(note);
        }
      };

      const handleKeyUp = (e) => {
        const note = keyMap[e.key];
        if (note) {
          setActiveKeys(prev => {
            const newSet = new Set(prev);
            newSet.delete(note);
            return newSet;
          });
          stopSound(note);
        }
      };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => { 
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  
}, []);

return (
  <div>
    <h1>Harmonium 🎹</h1>

    <div className="keyboard">
      <div className={`white-key ${activeKeys.has("sa") ? "active" : ""}`}>1</div>
      <div className={`white-key ${activeKeys.has("re") ? "active" : ""}`}>2</div>
      <div className={`white-key ${activeKeys.has("ga") ? "active" : ""}`}>3</div>
      <div className={`white-key ${activeKeys.has("ma") ? "active" : ""}`}>4</div>
      <div className={`white-key ${activeKeys.has("pa") ? "active" : ""}`}>5</div>
      <div className={`white-key ${activeKeys.has("dha") ? "active" : ""}`}>6</div>
      <div className={`white-key ${activeKeys.has("ni") ? "active" : ""}`}>7</div>
      <div className={`white-key ${activeKeys.has("sa_high") ? "active" : ""}`}>8</div>

      <div className="black-key k1"></div>
      <div className="black-key k2"></div>
      <div className="black-key k4"></div>
      <div className="black-key k5"></div>
      <div className="black-key k6"></div>
    </div>
  </div>
);

};

export default App;