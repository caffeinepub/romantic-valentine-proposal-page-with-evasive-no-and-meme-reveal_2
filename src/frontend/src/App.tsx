import { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function App() {
  const [answered, setAnswered] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize No button position to center-right
  useEffect(() => {
    if (noButtonRef.current && containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const button = noButtonRef.current.getBoundingClientRect();
      setNoButtonPosition({
        x: container.width / 2 + 60,
        y: container.height / 2 - button.height / 2
      });
    }
  }, []);

  const handleYesClick = () => {
    setAnswered(true);
  };

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    // Generate random position within container bounds with padding
    const padding = 20;
    const maxX = container.width - button.width - padding;
    const maxY = container.height - button.height - padding;

    const newX = Math.random() * maxX + padding;
    const newY = Math.random() * maxY + padding;

    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleNoInteraction = (e: React.PointerEvent | React.MouseEvent) => {
    e.preventDefault();
    moveNoButton();
  };

  if (answered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-romantic-light via-white to-romantic-lighter p-4">
        <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <Heart className="w-20 h-20 mx-auto text-romantic-primary animate-pulse" fill="currentColor" />
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-romantic-primary">
            <img 
              src="/assets/generated/valentine-good-choice-meme.dim_1200x800.png" 
              alt="Good Choice"
              className="w-full h-auto"
            />
          </div>

          <p className="text-xl md:text-2xl text-romantic-dark font-medium">
            I knew you'd say yes! ❤️
          </p>
        </div>

        <footer className="mt-12 text-center text-sm text-romantic-muted">
          <p>© {new Date().getFullYear()} · Built with <Heart className="inline w-4 h-4 text-romantic-primary" fill="currentColor" /> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'valentine-app')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-romantic-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-romantic-light via-white to-romantic-lighter p-4">
      <div className="max-w-4xl w-full text-center space-y-12 animate-fade-in">
        <div className="space-y-6">
          <div className="flex justify-center gap-2 animate-float">
            <Heart className="w-12 h-12 text-romantic-primary" fill="currentColor" />
            <Heart className="w-16 h-16 text-romantic-accent" fill="currentColor" />
            <Heart className="w-12 h-12 text-romantic-primary" fill="currentColor" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-romantic-primary font-display leading-tight">
            Will you be my Valentine?
          </h1>
          
          <p className="text-xl md:text-2xl text-romantic-dark font-medium">
            Choose wisely... 💖
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative h-64 md:h-80 w-full max-w-2xl mx-auto"
        >
          {/* Yes Button - Fixed position */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -ml-32">
            <button
              onClick={handleYesClick}
              className="px-12 py-6 text-2xl md:text-3xl font-bold text-white bg-romantic-primary rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 border-4 border-white min-w-[140px] touch-manipulation"
            >
              Yes! 💕
            </button>
          </div>

          {/* No Button - Dynamic position */}
          <button
            ref={noButtonRef}
            onPointerEnter={handleNoInteraction}
            onPointerDown={handleNoInteraction}
            onMouseEnter={handleNoInteraction}
            onClick={handleNoInteraction}
            style={{
              position: 'absolute',
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
              transition: 'all 0.3s ease-out'
            }}
            className="px-12 py-6 text-2xl md:text-3xl font-bold text-romantic-primary bg-white rounded-full shadow-xl hover:shadow-2xl border-4 border-romantic-primary min-w-[140px] touch-manipulation cursor-pointer"
          >
            No
          </button>
        </div>

        <p className="text-lg text-romantic-muted italic">
          Hint: There's only one right answer... 😉
        </p>
      </div>

      <footer className="mt-12 text-center text-sm text-romantic-muted">
        <p>© {new Date().getFullYear()} · Built with <Heart className="inline w-4 h-4 text-romantic-primary" fill="currentColor" /> using{' '}
          <a 
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'valentine-app')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-romantic-primary hover:underline font-medium"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
