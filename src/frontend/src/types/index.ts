export interface Project {
  id: string;
  title: string;
  category: string;
  year: number;
  tags: string[];
  description: string;
  fullDescription: string;
  imageUrl: string;
  awardsCount: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
}

export interface CultureTrip {
  id: string;
  year: number;
  location: string;
  description: string;
  imageUrl: string;
}

export interface StoreItem {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}
