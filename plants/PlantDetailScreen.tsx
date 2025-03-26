import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList, Plant } from './types';

type PlantDetailScreenRouteProp = RouteProp<RootStackParamList, 'PlantDetail'>;

const PlantDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<PlantDetailScreenRouteProp>();
  const { plant } = route.params;

  const [quantity, setQuantity] = useState<number>(0);

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{plant.name}</Text>
        <TouchableOpacity>
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Image source={plant.image} style={styles.plantImage} />
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTag}>Cây trồng</Text>
        <Text style={styles.categoryTag}>{plant.category}</Text>
      </View>
      <Text style={styles.priceText}>{plant.price}</Text>

      <View style={styles.detailSection}>
        <Text style={styles.detailTitle}>Chi tiết sản phẩm</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Kích cỡ</Text>
          <Text style={styles.detailValue}>Nhỏ</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Xuất xứ</Text>
          <Text style={styles.detailValue}>Châu Phi</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Tình trạng</Text>
          <Text style={styles.detailValue}>Còn 156 sp</Text>
        </View>
      </View>

      <View style={styles.quantityContainer}>
        <Text>Đã chọn {quantity} sản phẩm</Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tạm tính</Text>
        <Text style={styles.totalAmount}>
          {(Number(plant.price.replace('.000đ', '')) * quantity).toLocaleString()}đ
        </Text>
      </View>

      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>CHỌN MUA</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    top:-10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 10,
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
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  top:-30
  },
  navButton: {
    padding: 10
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  plantImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  categoryTag: {
    backgroundColor: 'green',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5
  },
  priceText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 10
  },
  detailSection: {
    padding: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0'
  },
  detailTitle: {
    fontWeight: 'bold',
    marginBottom: 3
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  detailLabel: {
    color: 'gray'
  },
  detailValue: {
    fontWeight: 'bold'
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 18
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  totalText: {
    fontSize: 16
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  buyButton: {
    backgroundColor: 'green',
    padding: 15,
    margin: 15,
    borderRadius: 5,
    alignItems: 'center',
    top:-20
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default PlantDetailScreen;