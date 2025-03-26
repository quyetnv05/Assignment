// Định nghĩa interface cho đối tượng cây trồng
export interface Plant {
    id: number;
    name: string;
    category: string;
    price: string;
    image: number; // Đối với require('./path/to/image')
    description?: string;
    size?: string;
    origin?: string;
    stock?: number;
  }
  
  // Định nghĩa kiểu cho route params
  export type RootStackParamList = {
    PlantDetail: { plant: Plant };
  };