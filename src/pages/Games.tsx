import { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Trophy, 
  CreditCard, 
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
  Rocket,
  Orbit,
  Cpu,
  ArrowLeft,
  RotateCcw,
  Pause
} from 'lucide-react';

const Games = () => {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'welcome' | 'main' | 'joki' | 'games' | 'topup' | 'snake' | 'blocks' | 'memory'>('splash');
  const [bootingProgress, setBootingProgress] = useState(0);
  const [bootingText, setBootingText] = useState('');
  const [welcomeText, setWelcomeText] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Snake Game States
  const [snakeGame, setSnakeGame] = useState({
    snake: [{x: 10, y: 10}],
    food: {x: 15, y: 15},
    direction: {x: 0, y: -1},
    gameOver: false,
    score: 0,
    isPlaying: false,
    isPaused: false
  });

  // Blocks Game States
//   const [blocksGame, setBlocksGame] = useState({
//     blocks: Array(20).fill(null).map(() => Array(10).fill(0)),
//     currentPiece: null,
//     score: 0,
//     gameOver: false,
//     isPlaying: false
//   });

  // Memory Game States
  const [memoryGame, setMemoryGame] = useState({
    cards: [] as number[],
    flipped: [] as number[],
    matched: [] as number[],
    score: 0,
    gameOver: false,
    isPlaying: false
  });

  // Splash Screen Boot Up Effect
  useEffect(() => {
    if (currentScreen === 'splash') {
      const bootMessages = [
        'INITIALIZING WAZZI GAMING SYSTEMS...',
        'LOADING QUANTUM PROCESSORS...',
        'CONNECTING TO GALACTIC NETWORK...',
        'CALIBRATING HOLOGRAPHIC DISPLAY...',
        'ACTIVATING NEURAL INTERFACE...',
        'SYSTEM READY FOR OPERATIONS...'
      ];

      let messageIndex = 0;
      let progress = 0;

      const bootInterval = setInterval(() => {
        if (messageIndex < bootMessages.length) {
          setBootingText(bootMessages[messageIndex]);
          progress += 100 / bootMessages.length;
          setBootingProgress(Math.min(progress, 100));
          messageIndex++;
        } else {
          clearInterval(bootInterval);
          setTimeout(() => setCurrentScreen('welcome'), 500);
        }
      }, 800);

      return () => clearInterval(bootInterval);
    }
  }, [currentScreen]);

  // Welcome Screen Effect
  useEffect(() => {
    if (currentScreen === 'welcome') {
      const welcomeMessage = 'WELCOME PLAYERS TO THE WAZZI GAMING HUB';
      let charIndex = 0;

      const welcomeInterval = setInterval(() => {
        if (charIndex < welcomeMessage.length) {
          setWelcomeText(welcomeMessage.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(welcomeInterval);
          setTimeout(() => setCurrentScreen('main'), 2000);
        }
      }, 100);

      return () => clearInterval(welcomeInterval);
    }
  }, [currentScreen]);

  // Space particles for background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const particles: Array<{x: number, y: number, vx: number, vy: number, size: number, opacity: number}> = [];
    const particleCount = window.innerWidth < 768 ? 50 : 100; // Fewer particles on mobile
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2,
        opacity: Math.random()
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  // Initialize Memory Game
  const initMemoryGame = () => {
    const numbers = [...Array(8)].map((_, i) => i).flatMap(i => [i, i]);
    const shuffled = numbers.sort(() => Math.random() - 0.5);
    setMemoryGame({
      cards: shuffled,
      flipped: [],
      matched: [],
      score: 0,
      gameOver: false,
      isPlaying: true
    });
  };

  // Memory Game Logic
  const flipCard = (index: number) => {
    if (memoryGame.flipped.length === 2 || memoryGame.flipped.includes(index) || memoryGame.matched.includes(index)) return;

    const newFlipped = [...memoryGame.flipped, index];
    setMemoryGame(prev => ({ ...prev, flipped: newFlipped }));

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryGame.cards[first] === memoryGame.cards[second]) {
        setTimeout(() => {
          setMemoryGame(prev => ({
            ...prev,
            matched: [...prev.matched, first, second],
            flipped: [],
            score: prev.score + 10
          }));
        }, 500);
      } else {
        setTimeout(() => {
          setMemoryGame(prev => ({ ...prev, flipped: [] }));
        }, 1000);
      }
    }
  };

  // Initialize Snake Game
  const initSnakeGame = () => {
    setSnakeGame({
      snake: [{x: 10, y: 10}],
      food: {x: 15, y: 15},
      direction: {x: 0, y: -1},
      gameOver: false,
      score: 0,
      isPlaying: true,
      isPaused: false
    });
  };

  // Snake Game Logic
  useEffect(() => {
    if (!snakeGame.isPlaying || snakeGame.gameOver || snakeGame.isPaused) return;

    const gameLoop = setInterval(() => {
      setSnakeGame(prev => {
        const newSnake = [...prev.snake];
        const head = { 
          x: newSnake[0].x + prev.direction.x, 
          y: newSnake[0].y + prev.direction.y 
        };

        // Check boundaries
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
          return { ...prev, gameOver: true };
        }

        // Check self collision
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          return { ...prev, gameOver: true };
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === prev.food.x && head.y === prev.food.y) {
          return {
            ...prev,
            snake: newSnake,
            food: {
              x: Math.floor(Math.random() * 20),
              y: Math.floor(Math.random() * 20)
            },
            score: prev.score + 10
          };
        } else {
          newSnake.pop();
          return { ...prev, snake: newSnake };
        }
      });
    }, 200);

    return () => clearInterval(gameLoop);
  }, [snakeGame.isPlaying, snakeGame.gameOver, snakeGame.isPaused, snakeGame.direction]);

  const services = [
    {
      id: 1,
      title: 'Galactic Joki Services',
      description: 'Professional gaming assistance across the universe',
      icon: <Trophy className="w-8 h-8 md:w-12 lg:w-16" />,
      color: 'from-cyan-400 to-blue-600',
      screen: 'joki' as const
    },
    {
      id: 2,
      title: 'Space Games',
      description: 'Play classic games with cosmic twist',
      icon: <Gamepad2 className="w-8 h-8 md:w-12 lg:w-16" />,
      color: 'from-purple-400 to-pink-600',
      screen: 'games' as const
    },
    {
      id: 3,
      title: 'Quantum Top Up',
      description: 'Instant energy and currency transfer',
      icon: <Cpu className="w-8 h-8 md:w-12 lg:w-16" />,
      color: 'from-green-400 to-teal-600',
      screen: 'topup' as const
    }
  ];

  const games = [
    { id: 'snake', name: 'Cosmic Snake', description: 'Navigate through space debris', screen: 'snake' as const },
    { id: 'blocks', name: 'Quantum Blocks', description: 'Arrange falling space blocks', screen: 'blocks' as const },
    { id: 'memory', name: 'Memory Matrix', description: 'Match alien patterns', screen: 'memory' as const }
  ];

  // Splash Screen
  if (currentScreen === 'splash') {
    return (
      <div className="min-h-screen bg-black text-cyan-400 flex flex-col items-center justify-center p-4">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />
        <div className="relative z-10 text-center max-w-md w-full">
          <Rocket className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-8 animate-pulse" />
          <h1 className="text-2xl md:text-4xl font-bold mb-8 font-mono">WAZZI GAMING HUB</h1>
          
          <div className="mb-8">
            <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${bootingProgress}%` }}
              ></div>
            </div>
            <p className="text-sm md:text-base font-mono text-cyan-300 min-h-[2rem]">
              {bootingText}
            </p>
          </div>
          
          <div className="text-xs text-gray-500 font-mono">
            SYSTEM VERSION 2.5.25 • LOADING...
          </div>
        </div>
      </div>
    );
  }

  // Welcome Screen
  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-20" />
        <div className="relative z-10 text-center max-w-2xl">
          <Orbit className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-8 animate-spin text-cyan-400" style={{ animationDuration: '4s' }} />
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold font-mono mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {welcomeText}
            </span>
            <span className="animate-pulse">█</span>
          </h1>
          <div className="flex justify-center space-x-2 mt-8">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Snake Game Screen
  if (currentScreen === 'snake') {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentScreen('games')}
              className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <div className="text-cyan-400 font-mono">Score: {snakeGame.score}</div>
          </div>

          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 font-mono mb-2">COSMIC SNAKE</h2>
            {snakeGame.gameOver && (
              <div className="text-red-400 font-mono mb-2">GAME OVER!</div>
            )}
          </div>

          <div className="flex justify-center mb-4">
            <div className="grid grid-cols-20 gap-0 border-2 border-cyan-400 bg-gray-900 p-2 max-w-md w-full">
              {Array(400).fill(0).map((_, i) => {
                const x = i % 20;
                const y = Math.floor(i / 20);
                const isSnake = snakeGame.snake.some(segment => segment.x === x && segment.y === y);
                const isFood = snakeGame.food.x === x && snakeGame.food.y === y;
                const isHead = snakeGame.snake[0]?.x === x && snakeGame.snake[0]?.y === y;

                return (
                  <div
                    key={i}
                    className={`w-3 h-3 md:w-4 md:h-4 ${
                      isHead ? 'bg-cyan-300' : 
                      isSnake ? 'bg-cyan-500' : 
                      isFood ? 'bg-pink-500 animate-pulse' : 
                      'bg-gray-800'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-4">
            {!snakeGame.isPlaying ? (
              <button
                onClick={initSnakeGame}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-mono transition-colors"
              >
                <Play className="w-4 h-4 inline mr-2" />
                START
              </button>
            ) : (
              <button
                onClick={() => setSnakeGame(prev => ({ ...prev, isPaused: !prev.isPaused }))}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-mono transition-colors"
              >
                <Pause className="w-4 h-4 inline mr-2" />
                {snakeGame.isPaused ? 'RESUME' : 'PAUSE'}
              </button>
            )}
            
            <button
              onClick={() => {
                setSnakeGame({
                  snake: [{x: 10, y: 10}],
                  food: {x: 15, y: 15},
                  direction: {x: 0, y: -1},
                  gameOver: false,
                  score: 0,
                  isPlaying: false,
                  isPaused: false
                });
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-mono transition-colors"
            >
              <RotateCcw className="w-4 h-4 inline mr-2" />
              RESET
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto md:hidden">
            <div></div>
            <button
              onClick={() => setSnakeGame(prev => ({ ...prev, direction: {x: 0, y: -1} }))}
              className="bg-cyan-500 hover:bg-cyan-600 text-white p-4 rounded-lg font-mono text-center"
            >
              ↑
            </button>
            <div></div>
            <button
              onClick={() => setSnakeGame(prev => ({ ...prev, direction: {x: -1, y: 0} }))}
              className="bg-cyan-500 hover:bg-cyan-600 text-white p-4 rounded-lg font-mono text-center"
            >
              ←
            </button>
            <div></div>
            <button
              onClick={() => setSnakeGame(prev => ({ ...prev, direction: {x: 1, y: 0} }))}
              className="bg-cyan-500 hover:bg-cyan-600 text-white p-4 rounded-lg font-mono text-center"
            >
              →
            </button>
            <div></div>
            <button
              onClick={() => setSnakeGame(prev => ({ ...prev, direction: {x: 0, y: 1} }))}
              className="bg-cyan-500 hover:bg-cyan-600 text-white p-4 rounded-lg font-mono text-center"
            >
              ↓
            </button>
            <div></div>
          </div>
        </div>
      </div>
    );
  }

  // Memory Game Screen
  if (currentScreen === 'memory') {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-10" />
        <div className="relative z-10 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentScreen('games')}
              className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <div className="text-cyan-400 font-mono">Score: {memoryGame.score}</div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-purple-400 font-mono mb-2">MEMORY MATRIX</h2>
            {!memoryGame.isPlaying && (
              <button
                onClick={initMemoryGame}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-mono transition-colors"
              >
                <Play className="w-4 h-4 inline mr-2" />
                START GAME
              </button>
            )}
          </div>

          {memoryGame.isPlaying && (
            <div className="grid grid-cols-4 gap-2 mb-4">
              {memoryGame.cards.map((card, index) => (
                <button
                  key={index}
                  onClick={() => flipCard(index)}
                  className={`aspect-square rounded-lg font-bold transition-all duration-300 ${
                    memoryGame.flipped.includes(index) || memoryGame.matched.includes(index)
                      ? 'bg-gradient-to-br from-purple-400 to-pink-500 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {(memoryGame.flipped.includes(index) || memoryGame.matched.includes(index)) && (
                    <span className="text-2xl">
                      {['🌟', '🚀', '🌙', '⭐', '🛸', '🌍', '☄️', '🌌'][card]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {memoryGame.matched.length === memoryGame.cards.length && memoryGame.isPlaying && (
            <div className="text-center text-green-400 font-mono text-xl">
              MISSION COMPLETE! 🎉
            </div>
          )}
        </div>
      </div>
    );
  }

  // Games List Screen
  if (currentScreen === 'games') {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentScreen('main')}
              className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Hub
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg border ${soundEnabled ? 'border-green-400 text-green-400' : 'border-gray-600 text-gray-600'}`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-400 font-mono mb-2">SPACE GAMES</h2>
            <p className="text-gray-400 font-mono">Choose your cosmic adventure</p>
          </div>

          <div className="grid gap-6 max-w-2xl mx-auto">
            {games.map((game) => (
              <div
                key={game.id}
                onClick={() => setCurrentScreen(game.screen)}
                className="bg-gray-900/50 border-2 border-purple-500/30 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-purple-400 hover:bg-purple-500/10 hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white font-mono mb-1">{game.name}</h3>
                    <p className="text-gray-400 text-sm font-mono">{game.description}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Joki Services Screen
  if (currentScreen === 'joki') {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentScreen('main')}
              className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Hub
            </button>
          </div>

          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 font-mono mb-2">JOKI SERVICES</h2>
            <p className="text-gray-400 font-mono">Professional gaming assistance</p>
          </div>

          <div className="grid gap-4 max-w-2xl mx-auto">
            {['Rank Boosting', 'Achievement Unlock', 'Campaign Complete', '24/7 Support'].map((service) => (
              <div key={service} className="bg-gray-900/50 border border-cyan-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-cyan-300 font-mono">{service}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-bold py-3 px-8 rounded-full font-mono hover:scale-105 transition-transform">
              CONTACT JOKI MASTER
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Top Up Screen
  if (currentScreen === 'topup') {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentScreen('main')}
              className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Hub
            </button>
          </div>

          <div className="text-center mb-8">
            <CreditCard className="w-16 h-16 mx-auto mb-4 text-green-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-green-400 font-mono mb-2">QUANTUM TOP UP</h2>
            <p className="text-gray-400 font-mono">Instant currency transfer</p>
          </div>

          <div className="grid gap-4 max-w-2xl mx-auto">
            {['Instant Processing', 'Secure Payment', 'Best Rates', 'Auto Delivery'].map((feature) => (
              <div key={feature} className="bg-gray-900/50 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 font-mono">{feature}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-green-400 to-teal-600 text-black font-bold py-3 px-8 rounded-full font-mono hover:scale-105 transition-transform">
              START TOP UP
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Menu Screen
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-20" />
      
      {/* Neon Grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 p-4 mt-10">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="w-8 h-8 md:w-12 md:h-12 text-cyan-400 animate-bounce mr-2" />
            <span className="text-2xl md:text-4xl font-bold font-mono bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            WAZZI GAMING HUB
            </span>
            </div>
            <p className="text-gray-400 font-mono">Welcome to the ultimate cosmic gaming experience</p>
            </header>

            {/* Services Cards */}
            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto mb-12">
            {services.map((service) => (
            <div
            key={service.id}
            onClick={() => setCurrentScreen(service.screen)}
            className={`cursor-pointer bg-gradient-to-br ${service.color} rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300 border-2 border-cyan-400/10 hover:border-cyan-400/40`}
            >
            <div className="flex flex-col items-center">
                {service.icon}
                <h3 className="text-xl md:text-2xl font-bold font-mono text-white mt-4 mb-2 text-center">{service.title}</h3>
                <p className="text-cyan-100 text-center font-mono">{service.description}</p>
            </div>
            </div>
            ))}
            </div>

            {/* Footer */}
            <footer className="text-center mt-12 text-xs text-cyan-400 font-mono opacity-70">
            &copy; {new Date().getFullYear()} WAZZI Gaming Hub &mdash; Powered by Wazzi Team's 🚀
            </footer>
            </div>
            </div>
            );
            };

            export default Games;