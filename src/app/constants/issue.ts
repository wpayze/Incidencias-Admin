import { Category } from './category';
import { Status } from './status';
import { User } from './user';

export interface Comment {
  _id: string;
  issueId: number;
  userId: number;
  content: string;
  createdAt: Date;
  parentId?: string | null;
  user: User;
}

export interface Issue {
  id: number;
  comments: Comment[];
  title: string;
  description: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  user: User;
  category: Category;
  status: Status;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
