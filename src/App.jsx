import { useEffect, useRef } from 'react';

function App() {

  const audioMap = useRef({});

  const playSound = (note) => {
    if (!audioMap.current[note]) {
      audioMap.current[note] = new Audio(`/sounds/${note}.wav`);
    }

    audioMap.current[note].currentTime = 0;
    audioMap.current[note].play();
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
        if (e.repeat) return; // Prevent multiple triggers on key hold
        const note = keyMap[e.key];
        if (note) playSound(note);
      };

      const handleKeyUp = (e) => {
        const note = keyMap[e.key];
        if (note) stopSound(note);
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
    <p>Press 1 to 8 keys</p>
  </div>
)

};

export default App;