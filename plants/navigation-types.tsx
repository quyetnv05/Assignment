import { NavigationProp, RouteProp } from '@react-navigation/native';

// Định nghĩa Plant interface
export interface Plant {
  id: number;
  name: string;
  category: string;
  price: string;
  image: any;
  description?: string;
  size?: string;
  origin?: string;
  stock?: number;
}

// Định nghĩa RootStackParamList
export type RootStackParamList = {
  PlantsList: undefined;
  PlantDetail: { plant: Plant };
};

// Kiểu navigation cho toàn bộ ứng dụng
export type AppNavigationProp = NavigationProp<RootStackParamList>;

// Kiểu route cho PlantDetail
export type PlantDetailRouteProp = RouteProp<RootStackParamList, 'PlantDetail'>;
