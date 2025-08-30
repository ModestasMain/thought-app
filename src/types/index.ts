export interface Thought {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  likes: number;
  tags: string[];
  isLiked?: boolean;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface CreateThoughtData {
  content: string;
  author: string;
  tags: string[];
}

export interface AppState {
  thoughts: Thought[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}
