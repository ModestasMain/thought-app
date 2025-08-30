import React, { useState } from 'react';
import { Plus, X, Hash } from 'lucide-react';
import { CreateThoughtData } from '../types';

interface CreateThoughtProps {
  onSubmit: (data: CreateThoughtData) => void;
  onCancel: () => void;
  isVisible: boolean;
}

const CreateThought: React.FC<CreateThoughtProps> = ({ onSubmit, onCancel, isVisible }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && author.trim()) {
      onSubmit({ content: content.trim(), author: author.trim(), tags });
      resetForm();
    }
  };

  const resetForm = () => {
    setContent('');
    setAuthor('');
    setTags([]);
    setTagInput('');
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Share a Thought</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="input-field"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Thought
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input-field min-h-[120px] resize-none"
              placeholder="Share your motivational thought..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (optional)
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input-field flex-1"
                placeholder="Add a tag..."
              />
              <button
                type="button"
                onClick={addTag}
                className="btn-secondary px-4"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                  >
                    <Hash className="w-4 h-4 mr-1" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-primary-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={!content.trim() || !author.trim()}
            >
              Share Thought
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateThought;
