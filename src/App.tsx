import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Sparkles } from 'lucide-react';
import ThoughtCard from './components/ThoughtCard';
import CreateThought from './components/CreateThought';
import { Thought, CreateThoughtData } from './types';

const App: React.FC = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  const filteredThoughts = thoughts.filter(thought => {
    const matchesSearch = thought.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thought.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => thought.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const allTags = Array.from(new Set(thoughts.flatMap(thought => thought.tags)));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mobile-container">
        <header className="safe-area-top pt-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Thought App</h1>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary p-3 rounded-xl"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search thoughts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {allTags.length > 0 && (
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
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
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        <main className="pb-20">
          {filteredThoughts.length === 0 ? (
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No thoughts found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredThoughts.map(thought => (
                <ThoughtCard
                  key={thought.id}
                  thought={thought}
                  onLike={handleLike}
                  onShare={handleShare}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <CreateThought
        isVisible={showCreateModal}
        onSubmit={handleCreateThought}
        onCancel={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default App;
