import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false); // Trạng thái focus cho email
  const [isFocusedPassword, setIsFocusedPassword] = useState(false); // Trạng thái focus cho password

  return (
    <View>
      <View>
        <Image style={styles.image} source={require('@/assets/images/logo_login.png')} />
      </View>
      <View>
        <Text style={styles.text}>CHÀO MỪNG BẠN</Text>
        <Text style={styles.textLogin}>Đăng nhập tài khoản</Text>
      </View>

      <View>
        <TextInput
          style={[styles.input, isFocusedEmail && styles.inputFocused]} // Áp dụng khi email được focus
          placeholder="Nhập email hoặc số điện thoại"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setIsFocusedEmail(true)} // Khi focus vào email, thay đổi trạng thái
          onBlur={() => setIsFocusedEmail(false)}  // Khi mất focus, quay lại trạng thái cũ
          value={email}
          onChangeText={setEmail}
        />

        <View>
          <TextInput
            style={[styles.input, isFocusedPassword && styles.inputFocused]} // Áp dụng khi password được focus
            placeholder="Nhập mật khẩu"
            placeholderTextColor="#666"
            secureTextEntry={!showPass}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setIsFocusedPassword(true)} // Khi focus vào password, thay đổi trạng thái
            onBlur={() => setIsFocusedPassword(false)} // Khi mất focus, quay lại trạng thái cũ
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.toggleButton}>
            <Ionicons name={showPass ? 'eye' : 'eye-off'} size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  image: {
    width: 550,
    height: 400, // Điều chỉnh chiều cao ảnh
    borderBottomLeftRadius: 200, // Tạo đường cong
    borderBottomRightRadius: 100,
    transform: [{ rotate: '-30deg' }], // Xoay ảnh 30 độ
    position: 'absolute',
    top: -200,
    left: -150,
    overflow: 'hidden',
  },
  text: {
    width: 250,
    height: 50,
    top: 230,
    left: 80,
    fontSize: 30,
    fontWeight: 'bold',
  },
  textLogin: {
    width: 240,
    height: 50,
    top: 215,
    left: 110,
    fontSize: 20,
  },
  input: {
    height: 50,
    width: 300,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 30,
    marginBottom: 15,
    top: 210,
    fontSize: 16,
    left: 35,
    borderWidth: 2, // Thêm border để có viền
    borderColor: '#ccc', // Màu viền mặc định
  },
  inputFocused: {
    borderColor: '#009245', // Màu viền khi focus
  },
  toggleButton: {
    top: 160,
    left: 300,
  },
});
