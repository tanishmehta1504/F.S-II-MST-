export type Screen = 'explore-and-nearby' | 'live-tracking' | 'order-help-and-issues' | 'auth';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  calories?: string;
  isPopular?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  tags: string[];
  rating: number;
  deliveryTime: string;
  distance: string;
  deliveryFee: number;
  freeDeliveryThreshold?: number;
  perks?: string[];
  trending: string;
  image: string;
  badge?: string;
  isFavorite?: boolean;
  menu: MenuItem[];
}

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

export interface ChatMessage {
  id: string;
  sender: 'courier' | 'user';
  name: string;
  text: string;
  time: string;
  status?: 'Sent' | 'Read' | 'Delivered';
}

export interface IssueProofPhoto {
  id: string;
  name: string;
  size: string;
  status: string;
  url: string;
}
