import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Thought } from '../types';

interface ThoughtCardProps {
  thought: Thought;
  onLike: (id: string) => void;
  onShare: (thought: Thought) => void;
}

const { width } = Dimensions.get('window');

export default function ThoughtCard({ thought, onLike, onShare }: ThoughtCardProps) {
  console.log('Rendering ThoughtCard for:', thought.author, thought.content.substring(0, 30));
  
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.author}>{thought.author}</Text>
        <Text style={styles.timestamp}>
          {format(thought.timestamp, 'MMM d, yyyy')}
        </Text>
      </View>
      
      <Text style={styles.content}>{thought.content}</Text>
      
      <View style={styles.tagsContainer}>
        {thought.tags.map(tag => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onLike(thought.id)}
        >
          <Ionicons
            name={thought.isLiked ? 'heart' : 'heart-outline'}
            size={20}
            color={thought.isLiked ? '#ef4444' : '#6b7280'}
          />
          <Text style={[
            styles.actionText,
            thought.isLiked && styles.likedText
          ]}>
            {thought.likes}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onShare(thought)}
        >
          <Ionicons name="share-outline" size={20} color="#6b7280" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  author: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    fontFamily: 'System',
  },
  timestamp: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'System',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 16,
    fontFamily: 'System',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  tag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
    fontFamily: 'System',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'System',
  },
  likedText: {
    color: '#ef4444',
  },
});
