import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Alert,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Thought, CreateThoughtData } from '../src/types';
import ThoughtCard from '../src/components/ThoughtCard';
import CreateThought from '../src/components/CreateThought';

export default function App() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    console.log('App mounted, loading thoughts...');
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
    console.log('Setting thoughts:', sampleThoughts.length);
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

  const handleShare = async (thought: Thought) => {
    try {
      await Share.share({
        message: `"${thought.content}" - ${thought.author}`,
        title: 'Thought App'
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share thought');
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

  const renderThought = ({ item }: { item: Thought }) => (
    <ThoughtCard
      thought={item}
      onLike={handleLike}
      onShare={handleShare}
    />
  );

  console.log('Render - thoughts count:', thoughts.length, 'filtered:', filteredThoughts.length);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1f2937" />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Ionicons name="sparkles" size={20} color="white" />
            </View>
            <Text style={styles.title}>Thought App</Text>
          </View>
          
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setShowSearch(!showSearch)}
            >
              <Ionicons name="search" size={20} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowCreateModal(true)}
            >
              <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {showSearch && (
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search thoughts..."
                placeholderTextColor="#9ca3af"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {allTags.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsContainer}>
                <Ionicons name="filter" size={20} color="white" style={styles.filterIcon} />
                {allTags.map(tag => (
                  <TouchableOpacity
                    key={tag}
                    style={[
                      styles.tagButton,
                      selectedTags.includes(tag) && styles.tagButtonSelected
                    ]}
                    onPress={() => setSelectedTags(prev => 
                      prev.includes(tag) 
                        ? prev.filter(t => t !== tag)
                        : [...prev, tag]
                    )}
                  >
                    <Text style={[
                      styles.tagText,
                      selectedTags.includes(tag) && styles.tagTextSelected
                    ]}>
                      {tag}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        )}
      </View>

      <View style={styles.debugContainer}>
        <Text style={styles.debugText}>Debug: {thoughts.length} thoughts loaded</Text>
        <Text style={styles.debugText}>Filtered: {filteredThoughts.length}</Text>
      </View>

      {thoughts.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading thoughts...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredThoughts}
          renderItem={renderThought}
          keyExtractor={(item) => item.id}
          style={styles.thoughtsList}
          contentContainerStyle={styles.thoughtsContent}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No thoughts found</Text>
            </View>
          }
        />
      )}

      <CreateThought
        isVisible={showCreateModal}
        onSubmit={handleCreateThought}
        onCancel={() => setShowCreateModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#1f2937',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    backgroundColor: '#6366f1',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'System',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    marginRight: 8,
  },
  addButton: {
    padding: 8,
    backgroundColor: '#6366f1',
    borderRadius: 20,
  },
  searchContainer: {
    gap: 16,
  },
  searchInputContainer: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 44,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterIcon: {
    marginRight: 8,
  },
  tagButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    marginRight: 8,
  },
  tagButtonSelected: {
    backgroundColor: '#6366f1',
  },
  tagText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  tagTextSelected: {
    color: 'white',
  },
  debugContainer: {
    backgroundColor: '#fef3c7',
    padding: 8,
    alignItems: 'center',
  },
  debugText: {
    fontSize: 12,
    color: '#92400e',
    fontFamily: 'System',
  },
  thoughtsList: {
    flex: 1,
  },
  thoughtsContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#6b7280',
    fontFamily: 'System',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    fontFamily: 'System',
  },
});
