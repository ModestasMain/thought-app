import React from 'react';
import { format } from 'date-fns';
import { Heart, MessageCircle, Share2, Tag, MoreVertical } from 'lucide-react';
import { Thought } from '../types';

interface ThoughtCardProps {
  thought: Thought;
  onLike: (id: string) => void;
  onShare: (thought: Thought) => void;
  onLongPress?: (thought: Thought) => void;
}

const ThoughtCard: React.FC<ThoughtCardProps> = ({ 
  thought, 
  onLike, 
  onShare, 
  onLongPress 
}) => {
  const handleLongPress = () => {
    if (onLongPress) {
      onLongPress(thought);
    }
  };

  return (
    <div 
      className="card mb-4 animate-fade-in touch-manipulation"
      onTouchStart={handleLongPress}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {thought.author.charAt(0).toUpperCase()}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900 text-base">{thought.author}</span>
              <span className="text-sm text-gray-500">
                {format(thought.timestamp, 'MMM d')}
              </span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          <p className="text-gray-800 text-lg leading-relaxed mb-4 font-serif">
            "{thought.content}"
          </p>
          
          {thought.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
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
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => onLike(thought.id)}
                className="flex items-center space-x-2 text-gray-500 hover:text-red-500 active:scale-95 transition-all duration-200"
              >
                <Heart className={`w-6 h-6 ${thought.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                <span className="text-sm font-medium">{thought.likes}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 active:scale-95 transition-all duration-200">
                <MessageCircle className="w-6 h-6" />
                <span className="text-sm font-medium">0</span>
              </button>
            </div>
            
            <button
              onClick={() => onShare(thought)}
              className="flex items-center space-x-2 text-gray-500 hover:text-green-500 active:scale-95 transition-all duration-200"
            >
              <Share2 className="w-6 h-6" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThoughtCard;
