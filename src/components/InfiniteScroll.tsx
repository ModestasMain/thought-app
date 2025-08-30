import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Thought } from '../types';
import ThoughtCard from './ThoughtCard';

interface InfiniteScrollProps {
  thoughts: Thought[];
  onLike: (id: string) => void;
  onShare: (thought: Thought) => void;
  onLoadMore: () => void;
  hasMore: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  thoughts,
  onLike,
  onShare,
  onLoadMore,
  hasMore
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSwipeUp = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const handleSwipeDown = useCallback(() => {
    if (currentIndex < thoughts.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (hasMore && !isLoading) {
      setIsLoading(true);
      onLoadMore();
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [currentIndex, thoughts.length, hasMore, isLoading, onLoadMore]);

  const swipeHandlers = useSwipeable({
    onSwipedUp: handleSwipeUp,
    onSwipedDown: handleSwipeDown,
    preventScrollOnSwipe: true,
    trackMouse: false,
    delta: 50,
    swipeDuration: 500,
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleSwipeUp();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleSwipeDown();
    }
  }, [handleSwipeUp, handleSwipeDown]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);



  if (thoughts.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No thoughts yet</h3>
          <p className="text-gray-500">Be the first to share a thought!</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="h-screen overflow-hidden relative"
      {...swipeHandlers.ref}
    >
      <div 
        className="h-full transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`
        }}
      >
        {thoughts.map((thought, index) => (
          <div key={thought.id} className="h-screen">
            <ThoughtCard
              thought={thought}
              onLike={onLike}
              onShare={onShare}
              isActive={index === currentIndex}
            />
          </div>
        ))}
        
        {hasMore && (
          <div className="h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Loading more thoughts...</p>
            </div>
          </div>
        )}
      </div>

      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={handleSwipeUp}
            disabled={currentIndex <= 0}
            className="p-2 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 transition-all disabled:opacity-50"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          
          <button
            onClick={handleSwipeDown}
            disabled={currentIndex >= thoughts.length - 1 && !hasMore}
            className="p-2 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 transition-all disabled:opacity-50"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {thoughts.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary-500 w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
