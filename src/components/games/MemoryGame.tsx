import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Lock } from 'lucide-react';
import { playMatchCard, canPlayGame } from '../../services/gamePromoService';

interface PromoCode {
  code: string;
  discount: number;
  description: string;
}

interface MemoryGameProps {
  onWin: (promoCode: PromoCode) => void;
  onBack: () => void;
}

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onWin, onBack }) => {
  const MOVE_LIMIT = 20;
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [canFlip, setCanFlip] = useState(true);
  const [wonPrize, setWonPrize] = useState<PromoCode | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canPlay, setCanPlay] = useState<boolean | null>(null);
  const [eligibilityMsg, setEligibilityMsg] = useState<string>('');

  const emojis = ['🎁', '🎯', '⭐', '🎪', '🎨', '🎭', '🎪', '🎨'];

  useEffect(() => {
    const checkEligibility = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setCanPlay(false);
        setEligibilityMsg('You must be logged in to play.');
        return;
      }
      try {
        const res = await canPlayGame(token, 'match-card');
        setCanPlay(!!res.can_play);
        setEligibilityMsg(res.message || (res.can_play ? '' : 'You cannot play this game today.'));
      } catch {
        setCanPlay(false);
        setEligibilityMsg('Failed to check eligibility.');
      }
    };
    checkEligibility();
  }, []);

  useEffect(() => {
    (async () => { await initializeGame(); })();
  }, []);

  const initializeGame = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setWonPrize(null);
      setError('You must be logged in to play.');
      return;
    }
    // Check if user can play today
    try {
      const canPlay = await canPlayGame(token, 'match-card');
      if (!canPlay.can_play) {
        setError(canPlay.message || 'You cannot play this game today.');
        return;
      }
    } catch (e) {
      setError('Failed to check play eligibility.');
      return;
    }
    const gameCards: Card[] = [];
    const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    shuffledEmojis.forEach((emoji, index) => {
      gameCards.push({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      });
    });
    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setGameWon(false);
    setCanFlip(true);
    setWonPrize(null);
    setCopySuccess(false);
    setError(null);
  };

  const handleCardClick = (cardId: number) => {
    if (!canFlip || cards[cardId].isFlipped || cards[cardId].isMatched) return;
    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    if (newFlippedCards.length === 2) {
      setCanFlip(false);
      setMoves(prev => {
        const newMoves = prev + 1;
        return newMoves;
      });
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards[firstId];
      const secondCard = newCards[secondId];
      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        newCards[firstId].isMatched = true;
        newCards[secondId].isMatched = true;
        setCards(newCards);
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
        setCanFlip(true);
        // Check if game is won
        if (matchedPairs + 1 === emojis.length) {
          setTimeout(async () => {
            setGameWon(true);
            if (moves + 1 <= MOVE_LIMIT) {
              const token = localStorage.getItem('access_token');
              if (!token) {
                setWonPrize(null);
                setError('You must be logged in to play.');
                return;
              }
              try {
                const result = await playMatchCard(token);
                if (result && result.promotion) {
                  const promo = {
                    code: result.promotion.code,
                    discount: result.promotion.discount_value,
                    description: result.promotion.description
                  };
                  setWonPrize(promo);
                  onWin(promo);
                } else {
                  setWonPrize(null);
                  setError(result?.error || 'Failed to get promo code.');
                }
              } catch (e) {
                setWonPrize(null);
                setError('Failed to connect to server.');
              }
            } else {
              setWonPrize(null);
            }
          }, 500);
        }
      } else {
        // No match
        setTimeout(() => {
          newCards[firstId].isFlipped = false;
          newCards[secondId].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

  const handleCopy = () => {
    if (wonPrize) {
      navigator.clipboard.writeText(wonPrize.code);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
    }
  };

  // Moves left calculation
  const movesLeft = Math.max(0, MOVE_LIMIT - moves);
  const outOfMoves = movesLeft === 0 && !gameWon;

  // Animation keyframes (inject into page)
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes cardFlip {
        0% { transform: rotateY(0deg); }
        80% { transform: rotateY(180deg) scale(1.08); }
        100% { transform: rotateY(180deg) scale(1); }
      }
      @keyframes cardPulse {
        0% { box-shadow: 0 0 0 0 rgba(242,99,31,0.5); }
        70% { box-shadow: 0 0 16px 8px rgba(242,99,31,0.15); }
        100% { box-shadow: 0 0 0 0 rgba(242,99,31,0); }
      }
      @keyframes fadeInBoard {
        0% { opacity: 0; transform: translateY(40px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes confettiBurst {
        0% { opacity: 0; transform: scale(0.7); }
        40% { opacity: 1; transform: scale(1.1); }
        100% { opacity: 0; transform: scale(1.3); }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // Confetti burst state
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    if (gameWon && wonPrize) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1200);
    }
  }, [gameWon, wonPrize]);

  return (
    <div className="min-h-screen flex items-center justify-center font-['Work_Sans'] bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden py-12">
      {/* Floating confetti background (SVGs) */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10 z-0" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10%" cy="20%" r="30" fill="#F2631F" />
        <circle cx="80%" cy="10%" r="20" fill="#FF8A4C" />
        <circle cx="50%" cy="80%" r="25" fill="#FF6B35" />
        <circle cx="90%" cy="60%" r="15" fill="#E55A2B" />
      </svg>
      {/* Confetti Burst on Win */}
      {showConfetti && (
        <svg className="absolute left-1/2 top-1/2 z-50" style={{ transform: 'translate(-50%, -60%)', animation: 'confettiBurst 1.2s both' }} width="220" height="120">
          <g>
            <circle cx="30" cy="60" r="8" fill="#F2631F" />
            <circle cx="60" cy="30" r="6" fill="#FF8A4C" />
            <circle cx="110" cy="20" r="10" fill="#FF6B35" />
            <circle cx="170" cy="40" r="7" fill="#E55A2B" />
            <circle cx="200" cy="80" r="8" fill="#F2631F" />
            <circle cx="120" cy="100" r="6" fill="#FF8A4C" />
            <circle cx="80" cy="90" r="7" fill="#FF6B35" />
          </g>
        </svg>
      )}
      {/* Out of Moves Modal */}
      {outOfMoves && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative bg-gradient-to-br from-white via-orange-50 to-orange-100 rounded-3xl shadow-2xl p-8 max-w-sm w-full border-4 border-yellow-300 animate-fadeIn">
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-2">⏳</span>
              <h2 className="text-2xl font-bold text-yellow-700 mb-2 font-['Work_Sans']">Your Moves Are Over!</h2>
              <p className="text-gray-700 mb-4 font-['Work_Sans']">You have used all your moves. Try again to win a promo code!</p>
              <button
                onClick={() => initializeGame()}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow hover:from-yellow-500 hover:to-orange-600 transition-all font-['Work_Sans'] mb-2 mt-2"
              >
                <RefreshCw className="w-5 h-5 inline mr-2" />
                Try Again
              </button>
              <button
                onClick={onBack}
                className="w-full py-2 px-4 rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors font-['Work_Sans']"
              >
                <ArrowLeft className="w-4 h-4 inline mr-1" />
                Back to Games
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl max-w-xl w-full mx-4 border border-orange-100 z-10 relative" style={{ animation: 'fadeInBoard 0.7s cubic-bezier(.4,0,.2,1) both' }}>
        {/* Lock overlay if not eligible */}
        {canPlay === false && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-30 rounded-3xl">
            <Lock className="w-16 h-16 text-white mb-4" />
            <div className="text-white text-lg font-bold text-center px-4 drop-shadow-lg">{eligibilityMsg}</div>
          </div>
        )}
        {/* Reset Button */}
        <button
          onClick={() => canPlay !== false && initializeGame()}
          title="Reset Game"
          className={`absolute top-7 right-[270px] z-20 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg hover:from-orange-500 hover:to-orange-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-300 ${canPlay === false ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={canPlay === false}
        >
          <RefreshCw className="w-5 h-5" />
        </button>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors font-['Work_Sans'] text-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Games</span>
          </button>
          <h1 className="text-2xl font-extrabold text-orange-700 font-['Work_Sans'] tracking-tight drop-shadow-sm">Memory Match</h1>
        </div>

        {/* Game Stats */}
        <div className="flex justify-between items-center mb-4 gap-1 text-xs">
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white/60 backdrop-blur rounded-full px-3 py-1 shadow border border-orange-100 flex items-center gap-1">
              <span className="text-orange-500 text-base">🔢</span>
              <span className="text-orange-800 font-semibold">Moves: {moves}</span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white/60 backdrop-blur rounded-full px-3 py-1 shadow border border-yellow-100 flex items-center gap-1">
              <span className="text-yellow-500 text-base">🧩</span>
              <span className="text-yellow-800 font-semibold">Pairs: {matchedPairs}/{emojis.length}</span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className={`bg-white/60 backdrop-blur rounded-full px-3 py-1 shadow border ${moves > MOVE_LIMIT ? 'border-red-200' : 'border-orange-100'} flex items-center gap-1`}>
              <span className="text-orange-500 text-base">⏳</span>
              <span className={`font-semibold ${moves > MOVE_LIMIT ? 'text-red-600' : 'text-orange-800'}`}>Moves Left: {Math.max(0, MOVE_LIMIT - moves)}</span>
            </div>
          </div>
        </div>
        {/* Game Board */}
        <div className="grid grid-cols-4 gap-2 mb-8 mt-8 ml-12" style={{ animation: 'fadeInBoard 0.8s 0.2s both' }}>
          {cards.map((card, idx) => (
            <div
              key={card.id}
              onClick={() => canPlay !== false && handleCardClick(card.id)}
              className={`aspect-square rounded-xl cursor-pointer transition-all duration-300 transform shadow-md relative group perspective-1000
                ${!canFlip && !card.isFlipped && !card.isMatched ? 'pointer-events-none' : ''}
                ${card.isMatched ? 'animate-[cardPulse_0.7s]' : ''}`}
              style={{
                perspective: 1000,
                width: 56,
                height: 56,
                minWidth: 56,
                minHeight: 56,
                maxWidth: 64,
                maxHeight: 64,
                animation: `fadeInBoard 0.7s ${0.2 + idx * 0.03}s both`
              }}
            >
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                  card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
                } group-hover:scale-105 group-hover:shadow-lg`}
                style={{
                  transform: (card.isFlipped || card.isMatched)
                    ? 'rotateY(180deg)'
                    : 'rotateY(0deg)',
                  transformStyle: 'preserve-3d',
                  animation: card.isFlipped && !card.isMatched ? 'cardFlip 0.5s' : undefined
                }}
              >
                {/* Card Back (Question Mark) */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-xl font-bold font-['Work_Sans'] backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                  ❓
                </div>
                {/* Card Front (Emoji) */}
                <div className="absolute inset-0 rounded-xl bg-white/80 border-2 border-orange-200 flex items-center justify-center text-2xl font-extrabold font-['Work_Sans'] backface-hidden" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                  {card.emoji}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Win Modal */}
        <div className="text-center space-y-4">
          {gameWon ? (
            wonPrize ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="relative bg-gradient-to-br from-white via-orange-50 to-orange-100 rounded-3xl shadow-2xl p-8 max-w-sm w-full border-4 border-orange-200 animate-fadeIn">
                  <div className="flex flex-col items-center">
                    <span className="text-5xl mb-2 animate-bounce">🎉</span>
                    <h2 className="text-2xl font-bold text-orange-700 mb-2 font-['Work_Sans']">Congratulations!</h2>
                    <p className="text-gray-700 mb-4 font-['Work_Sans']">You've completed the memory game and won:</p>
                    <div className="bg-white rounded-xl shadow p-4 mb-4 w-full text-center border border-orange-200">
                      <div className="text-3xl font-extrabold text-orange-600 mb-1 font-['Work_Sans']">{wonPrize.discount}% OFF</div>
                      <div className="text-lg font-semibold text-gray-800 mb-1 font-['Work_Sans']">Code: <span className="bg-orange-100 px-2 py-1 rounded font-mono text-orange-700">{wonPrize.code}</span></div>
                      <div className="text-sm text-gray-600 mb-2 font-['Work_Sans']">{wonPrize.description}</div>
                      <button
                        onClick={handleCopy}
                        className="mt-2 px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg font-semibold shadow hover:from-orange-500 hover:to-orange-700 transition-all font-['Work_Sans']"
                      >
                        {copySuccess ? 'Copied!' : 'Copy Code'}
                      </button>
                    </div>
                    {error && <div className="text-red-600 font-semibold mb-2">{error}</div>}
                    <button
                      onClick={() => initializeGame()}
                      className="w-full py-3 px-6 rounded-xl bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors font-['Work_Sans'] mb-2 mt-2"
                    >
                      <RefreshCw className="w-5 h-5 inline mr-2" />
                      Play Again
                    </button>
                    <button
                      onClick={onBack}
                      className="w-full py-2 px-4 rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors font-['Work_Sans']"
                    >
                      <ArrowLeft className="w-4 h-4 inline mr-1" />
                      Back to Games
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="relative bg-gradient-to-br from-white via-orange-50 to-orange-100 rounded-3xl shadow-2xl p-8 max-w-sm w-full border-4 border-red-200 animate-fadeIn">
                  <div className="flex flex-col items-center">
                    <span className="text-5xl mb-2">😅</span>
                    <h2 className="text-2xl font-bold text-red-700 mb-2 font-['Work_Sans']">No Prize This Time</h2>
                    <p className="text-gray-700 mb-4 font-['Work_Sans']">You exceeded the move limit of {MOVE_LIMIT}. Try again to win a promo code!</p>
                    <button
                      onClick={() => initializeGame()}
                      className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-red-400 to-orange-500 text-white font-semibold shadow hover:from-red-500 hover:to-orange-600 transition-all font-['Work_Sans'] mb-2 mt-2"
                    >
                      <RefreshCw className="w-5 h-5 inline mr-2" />
                      Try Again
                    </button>
                    <button
                      onClick={onBack}
                      className="w-full py-2 px-4 rounded-xl bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors font-['Work_Sans']"
                    >
                      <ArrowLeft className="w-4 h-4 inline mr-1" />
                      Back to Games
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : null}
        </div>
        {/* Instructions */}
        <div className="mt-4 p-3 bg-white/60 rounded-xl font-['Work_Sans'] shadow border border-orange-100 text-xs">
          <h3 className="font-semibold text-orange-700 mb-2 font-['Work_Sans'] flex items-center gap-2 text-base">
            <span className="inline-block text-xl">📝</span> Game Rules:
          </h3>
          <ul className="text-sm text-gray-700 space-y-2 font-['Work_Sans']">
            <li className="flex items-center gap-2"><span className="text-orange-500">🃏</span> Click cards to flip them</li>
            <li className="flex items-center gap-2"><span className="text-orange-500">🔍</span> Find matching pairs of emojis</li>
            <li className="flex items-center gap-2"><span className="text-orange-500">🏆</span> Complete all pairs to win</li>
            <li className="flex items-center gap-2"><span className="text-orange-500">⏳</span> Complete within <span className="font-bold">{MOVE_LIMIT} moves</span> to win a promo code</li>
            <li className="flex items-center gap-2"><span className="text-orange-500">🎁</span> Win promotional codes from up to<span className="font-bold"> 20% off</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;