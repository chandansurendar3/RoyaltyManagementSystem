import React, { useState, useEffect } from 'react';


import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { introdata, meta } from "../../content_option";
import gifImage from '../../assets/images/my-gif.gif';
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Offload = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [speed, setSpeed] = useState(200);
  const [gameOver, setGameOver] = useState(false);
  const boardSize = 20;
 
  
  const moveSnake  = () => {
    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };
      
      if (
        head.x < 0 ||
        head.x >= boardSize ||
        head.y < 0 ||
        head.y >= boardSize ||
        newSnake.some(seg => seg.x === head.x && seg.y === head.y)
      ) {
        setGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setFood({ x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) });
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [snake, direction, speed, gameOver]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction]);

  return (   
    
    <HelmetProvider>
    <section id="home" className="home">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>

      <div className="intro_sec d-block d-lg-flex align-items-center">

        <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
          <div className="align-self-center">
            <div className="intro mx-auto">
    <div className="game-container">
      <h1>Snake Game</h1>
      {gameOver ? <h2>Game Over</h2> : (
        <div className="board">
          {Array.from({ length: boardSize }, (_, y) =>
            Array.from({ length: boardSize }, (_, x) => (
              <div
                key={`${x}-${y}`}
                className="cell"
                style={{
                  backgroundColor: snake.some(seg => seg.x === x && seg.y === y)
                    ? 'black'
                    : food.x === x && food.y === y
                    ? 'red'
                    : 'lightgray',
                }}
              />
            ))
          )}
        </div>
      )}
      <button onClick={() => window.location.reload()}>Restart</button>
    </div>
    </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};

export default Offload;
