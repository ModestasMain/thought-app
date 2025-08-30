import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Sparkles } from 'lucide-react';
import InfiniteScroll from './components/InfiniteScroll';
import CreateThought from './components/CreateThought';
import { Thought, CreateThoughtData } from './types';

const App: React.FC = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    loadSampleThoughts();
  }, []);

  const loadSampleThoughts = () => {
    const sampleThoughts: Thought[] = [
      {
        id: '1',
        content: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        timestamp: new Date('2024-01-15'),
        likes: 42,
        tags: ['motivation', 'work', 'passion'],
        isLiked: false
      },
      {
        id: '2',
        content: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
        author: 'Winston Churchill',
        timestamp: new Date('2024-01-14'),
        likes: 38,
        tags: ['success', 'failure', 'courage'],
        isLiked: false
      },
      {
        id: '3',
        content: 'Believe you can and you\'re halfway there.',
        author: 'Theodore Roosevelt',
        timestamp: new Date('2024-01-13'),
        likes: 56,
        tags: ['belief', 'confidence', 'mindset'],
        isLiked: false
      },
      {
        id: '4',
        content: 'The future belongs to those who believe in the beauty of their dreams.',
        author: 'Eleanor Roosevelt',
        timestamp: new Date('2024-01-12'),
        likes: 34,
        tags: ['dreams', 'future', 'belief'],
        isLiked: false
      },
      {
        id: '5',
        content: 'Don\'t watch the clock; do what it does. Keep going.',
        author: 'Sam Levenson',
        timestamp: new Date('2024-01-11'),
        likes: 29,
        tags: ['persistence', 'time', 'motivation'],
        isLiked: false
      }
    ];
    setThoughts(sampleThoughts);
  };

  const handleCreateThought = (data: CreateThoughtData) => {
    const newThought: Thought = {
      id: Date.now().toString(),
      content: data.content,
      author: data.author,
      timestamp: new Date(),
      likes: 0,
      tags: data.tags,
      isLiked: false
    };
    setThoughts([newThought, ...thoughts]);
    setShowCreateModal(false);
  };

  const handleLike = (id: string) => {
    setThoughts(thoughts.map(thought => 
      thought.id === id 
        ? { ...thought, likes: thought.isLiked ? thought.likes - 1 : thought.likes + 1, isLiked: !thought.isLiked }
        : thought
    ));
  };

  const handleShare = (thought: Thought) => {
    if (navigator.share) {
      navigator.share({
        title: 'Thought App',
        text: `"${thought.content}" - ${thought.author}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`"${thought.content}" - ${thought.author}`);
    }
  };

  const handleLoadMore = () => {
    const moreThoughts: Thought[] = [
      {
        id: (Date.now() + 1).toString(),
        content: 'The only limit to our realization of tomorrow is our doubts of today.',
        author: 'Franklin D. Roosevelt',
        timestamp: new Date('2024-01-10'),
        likes: 23,
        tags: ['doubt', 'tomorrow', 'realization'],
        isLiked: false
      },
      {
        id: (Date.now() + 2).toString(),
        content: 'What you get by achieving your goals is not as important as what you become by achieving your goals.',
        author: 'Zig Ziglar',
        timestamp: new Date('2024-01-09'),
        likes: 31,
        tags: ['goals', 'growth', 'achievement'],
        isLiked: false
      }
    ];
    setThoughts(prev => [...prev, ...moreThoughts]);
  };

  const filteredThoughts = thoughts.filter(thought => {
    if (!showSearch) return true;
    const matchesSearch = thought.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thought.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => thought.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const allTags = Array.from(new Set(thoughts.flatMap(thought => thought.tags)));

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <header className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-900/80 to-transparent pt-6 pb-4 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Thought App</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary p-2 rounded-full"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="space-y-4 animate-slide-down">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search thoughts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 bg-white/90 backdrop-blur-sm"
              />
            </div>

            {allTags.length > 0 && (
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                <Filter className="w-5 h-5 text-white flex-shrink-0" />
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTags(prev => 
                      prev.includes(tag) 
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    )}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-primary-600 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      <main className="h-full pt-20">
        <InfiniteScroll
          thoughts={filteredThoughts}
          onLike={handleLike}
          onShare={handleShare}
          onLoadMore={handleLoadMore}
          hasMore={true}
        />
      </main>

      <CreateThought
        isVisible={showCreateModal}
        onSubmit={handleCreateThought}
        onCancel={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default App;
