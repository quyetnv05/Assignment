// Login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';

type LoginScreenNavigationProp = StackNavigationProp<ParamListBase, 'Login'>;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
}

const { width, height } = Dimensions.get('window');

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const handleLogin = () => {
    // Kiểm tra thông tin đăng nhập
    if (email === '' || password === '') {
      Alert.alert('Lỗi', 'Vui lòng nhập email và mật khẩu!');
    } else {
      Alert.alert('Thông báo', 'Đăng nhập thành công!', [
        {
          text: 'OK',
          onPress: () => {
            // Điều hướng đến màn hình chính (Home) sau khi đăng nhập thành công
            navigation.replace('Home');
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image style={styles.image} source={require('@/assets/images/logo_login.png')} />

      {/* Nội dung */}
      <View style={styles.content}>
        <Text style={styles.text}>CHÀO MỪN BẠN</Text>
        <Text style={styles.textLogin}>Đăng nhập tài khoản</Text>

        {/* Input Email */}
        <TextInput
          style={[styles.input, isFocusedEmail && styles.inputFocused]}
          placeholder="Nhập email hoặc số điện thoại"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setIsFocusedEmail(true)}
          onBlur={() => setIsFocusedEmail(false)}
          value={email}
          onChangeText={setEmail}
        />

        {/* Input Mật khẩu */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, isFocusedPassword && styles.inputFocused]}
            placeholder="Nhập mật khẩu"
            placeholderTextColor="#666"
            secureTextEntry={!showPass}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setIsFocusedPassword(true)}
            onBlur={() => setIsFocusedPassword(false)}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.toggleButton}>
            <Ionicons name={showPass ? 'eye' : 'eye-off'} size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Nút Đăng nhập */}
        <TouchableOpacity onPress={handleLogin} activeOpacity={0.8}>
          <LinearGradient colors={["#007537", "#4CAF50"]} style={styles.button}>
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Dòng "Hoặc" */}
        <View style={styles.lineWrapper}>
          <View style={styles.line} />
          <Text style={styles.or}>Hoặc</Text>
          <View style={styles.line} />
        </View>

        {/* Đăng nhập qua Google và Facebook */}
        <View style={styles.socialLogin}>
          <Image style={styles.Logo} source={require('@/assets/images/google_icon-icons.webp')} />
          <Image style={styles.Logo} source={require('@/assets/images/facebook_logo_icon_147291.webp')} />
        </View>

        {/* Tạo tài khoản */}
        <View>
          <Text style={styles.texttext}>
            Bạn chưa có tài khoản?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Tạo tài khoản</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top: -40,
  },
  content: {
    top: 120,
  },
  image: {
    width: 550,
    height: 400,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 100,
    transform: [{ rotate: '-30deg' }],
    position: 'absolute',
    top: -200,
    left: -150,
    overflow: 'hidden',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    left: 30,
  },
  textLogin: {
    fontSize: 20,
    color: '#666',
    marginBottom: 20,
    left: 60,
    top: -10,
  },
  input: {
    height: 50,
    width: width * 0.8,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: '#ccc',
    top: -20,
  },
  inputFocused: {
    borderColor: '#009245',
  },
  passwordContainer: {
    position: 'relative',
    width: width * 0.8,
  },
  toggleButton: {
    position: 'absolute',
    right: 15,
    top: -9,
  },
  button: {
    width: width * 0.8,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    top: -20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  lineWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#000',
    flex: 1,
  },
  or: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  Logo: {
    width: 40,
    height: 40,
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  socialLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: 'blue',
    top: 4,
  },
  texttext: {
    top: 20,
    textAlign: 'center',
  },
});
