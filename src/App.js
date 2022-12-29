import { useState, useEffect } from 'react';
import Snake from './components/Snake';
import Food from './components/Food';
import Scoreboard from './components/Scoreboard';

function App() {
  const [posX, setPosX] = useState(randomPositionX());
  const [posY, setPosY] = useState(randomPositionY());
  const [foodPosition, setFoodPosition] = useState({x: randomPositionX(), y: randomPositionY()});
  const [score, setScore] = useState(0);

  const handlePosition = (event) => {
    if((posX >= 0) && (posY >= 0)){
      if(event.key === 'ArrowRight')
        setPosX(posX + 20);

      if(event.key === 'ArrowLeft')
        setPosX(posX - 20);

      if(event.key === 'ArrowDown')
        setPosY(posY + 20);

      if(event.key === 'ArrowUp')
        setPosY(posY - 20);
    }
  }

  function previousMutiple(number, multipler){
    const numberMod = number % multipler;
    return number - numberMod;
  }

  function randomPositionGenerator(position){
    return previousMutiple(parseInt(position), 20);
  }

  function randomPositionX(){
    return randomPositionGenerator(Math.random() * window.innerWidth);
  }

  function randomPositionY(){
    return randomPositionGenerator(Math.random() * window.innerHeight);
  }

  // Adiciona e remove a duplicidade do evento "keydown"
  useEffect(() => {
    window.addEventListener('keydown', handlePosition);
    return () => {
      window.removeEventListener('keydown', handlePosition);
    }
  }, [posX, posY]);

  // Verifica se a comida foi encontrada
  useEffect(() => {
    if(posX === foodPosition.x && posY === foodPosition.y){
      setScore(score+10);
      setFoodPosition({
        x: randomPositionX(), 
        y: randomPositionY()
      })
    }
  }, [posX, posY]);

  return (
    <div className="w-screen h-screen bg-[#4F4F4F]">
      <Scoreboard score={score} />
      <Snake position={{left: posX, top: posY}}/>
      <Food position={{left: foodPosition.x, top: foodPosition.y}} />
    </div>
  );
}

export default App;
