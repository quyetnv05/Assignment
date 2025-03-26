import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp, Plant, RootStackParamList } from './navigation-types';


const plantData: Plant[] = [
  {
    id: 1,
    name: 'Spider Plant',
    category: 'Ưa bóng',
    price: '250.000đ',
    image: require('../assets/images/1.png')
  },
  {
    id: 2,
    name: 'Song of India',
    category: 'Ưa sáng',
    price: '250.000đ',
    image: require('../assets/images/1.png')
  },
  {
    id: 3,
    name: 'Pink Anthurium',
    category: 'Ưa bóng',
    price: '250.000đ',
    image: require('../assets/images/1.png')
  },
  {
    id: 4,
    name: 'Black Love Anthurium',
    category: 'Ưa bóng',
    price: '250.000đ',
    image: require('../assets/images/1.png')
  },
  {
    id: 5,
    name: 'Grey Star Calarthea',
    category: 'Ưa sáng',
    price: '250.000đ',
    image: require('../assets/images/1.png')  },
  {
    id: 6,
    name: 'Banana Plant',
    category: 'Ưa sáng',
    price: '250.000đ',
    image: require('../assets/images/1.png') }
];

const PlantsListTrees: React.FC = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const filters = ['Tất cả', 'Hàng mới về', 'Ưa sáng', 'Ưa bóng'];

  const filteredPlants = activeFilter === 'Tất cả' 
    ? plantData 
    : plantData.filter(plant => 
        activeFilter === 'Hàng mới về' 
        ? true 
        : plant.category === activeFilter
      );

  const navigateToPlantDetail = (plant: Plant) => {
    navigation.navigate('PlantDetail', { plant });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CÂY TRỒNG</Text>
        <TouchableOpacity>
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity 
            key={filter} 
            style={[
              styles.filterButton, 
              activeFilter === filter && styles.activeFilterButton
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[
              styles.filterText, 
              activeFilter === filter && styles.activeFilterText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        contentContainerStyle={styles.plantGrid}
        showsVerticalScrollIndicator={false}
      >
        {filteredPlants.map((plant) => (
          <TouchableOpacity 
            key={plant.id} 
            style={styles.plantItem}
            onPress={() => navigateToPlantDetail(plant)}
          >
            <Image source={plant.image} style={styles.plantImage} />
            <Text style={styles.plantName}>{plant.name}</Text>
            <Text style={styles.plantCategory}>{plant.category}</Text>
            <Text style={styles.plantPrice}>{plant.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  backIcon: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  cartIcon: {
    fontSize: 24
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0'
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  activeFilterButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'green'
  },
  filterText: {
    color: 'gray'
  },
  activeFilterText: {
    color: 'green',
    fontWeight: 'bold'
  },
  plantGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10
  },
  plantItem: {
    width: '48%',
    marginBottom: 15,
    alignItems: 'center'
  },
  plantImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 10
  },
  plantName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  plantCategory: {
    color: 'gray',
    marginTop: 5
  },
  plantPrice: {
    marginTop: 5,
    fontWeight: 'bold',
    color: 'green'
  }
});

export default PlantsListTrees;