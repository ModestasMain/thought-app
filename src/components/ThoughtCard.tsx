import React from 'react';
import { format } from 'date-fns';
import { Heart, MessageCircle, Share2, Tag, MoreVertical } from 'lucide-react';
import { Thought } from '../types';

interface ThoughtCardProps {
  thought: Thought;
  onLike: (id: string) => void;
  onShare: (thought: Thought) => void;
  onLongPress?: (thought: Thought) => void;
  isActive?: boolean;
}

const ThoughtCard: React.FC<ThoughtCardProps> = ({ 
  thought, 
  onLike, 
  onShare, 
  onLongPress,
  isActive = false
}) => {
  const handleLongPress = () => {
    if (onLongPress) {
      onLongPress(thought);
    }
  };

  return (
    <div 
      className={`w-full h-screen flex flex-col justify-between p-6 bg-gradient-to-br from-gray-50 to-gray-100 animate-fade-in touch-manipulation ${
        isActive ? 'opacity-100' : 'opacity-90'
      }`}
      onTouchStart={handleLongPress}
    >
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            {thought.author.charAt(0).toUpperCase()}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{thought.author}</h3>
          <p className="text-sm text-gray-500">{format(thought.timestamp, 'MMM d, yyyy')}</p>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-gray-800 text-2xl leading-relaxed font-serif px-4">
            "{thought.content}"
          </p>
        </div>
        
        {thought.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {thought.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
              >
                <Tag className="w-4 h-4 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onLike(thought.id)}
            className="flex flex-col items-center space-y-1 text-gray-500 hover:text-red-500 active:scale-95 transition-all duration-200"
          >
            <Heart className={`w-8 h-8 ${thought.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            <span className="text-sm font-medium">{thought.likes}</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 text-gray-500 hover:text-blue-500 active:scale-95 transition-all duration-200">
            <MessageCircle className="w-8 h-8" />
            <span className="text-sm font-medium">0</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onShare(thought)}
            className="flex flex-col items-center space-y-1 text-gray-500 hover:text-green-500 active:scale-95 transition-all duration-200"
          >
            <Share2 className="w-8 h-8" />
            <span className="text-sm font-medium">Share</span>
          </button>
          
          <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <MoreVertical className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThoughtCard;
