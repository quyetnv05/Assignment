import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack'; // Import kiểu navigation
import { ParamListBase } from '@react-navigation/native'; // Import kiểu param list

// Khai báo kiểu navigation cho màn hình Register
type RegisterScreenNavigationProp = StackNavigationProp<ParamListBase, 'Register'>;

interface RegisterProps {
  navigation: RegisterScreenNavigationProp; // Khai báo navigation với kiểu đúng
}

const { width, height } = Dimensions.get('window');

const Register: React.FC<RegisterProps> = ({ navigation }) => { // Nhận navigation từ props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedConfirmPassword, setIsFocusedConfirmPassword] = useState(false);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp!");
      return;
    }
    Alert.alert("Thông báo", "Đăng ký thành công!");
    // Thực hiện đăng ký ở đây
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image style={styles.image} source={require('@/assets/images/logo_login.png')} />

      {/* Tiêu đề */}
      <View style={styles.content}>
        <Text style={styles.text}>CHÀO MỪN BẠN</Text>
        <Text style={styles.textLogin}>Đăng ký tài khoản</Text>

        {/* Input Email */}
        <TextInput
          style={[styles.input, isFocusedEmail && styles.inputFocused]}
          placeholder="Nhập email"
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

        {/* Input Xác nhận Mật khẩu */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, isFocusedConfirmPassword && styles.inputFocused]}
            placeholder="Xác nhận mật khẩu"
            placeholderTextColor="#666"
            secureTextEntry={!showConfirmPass}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setIsFocusedConfirmPassword(true)}
            onBlur={() => setIsFocusedConfirmPassword(false)}
          />
          <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)} style={styles.toggleButton}>
            <Ionicons name={showConfirmPass ? 'eye' : 'eye-off'} size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Nút Đăng ký */}
        <TouchableOpacity onPress={handleRegister} activeOpacity={0.8}>
          <LinearGradient colors={["#007537", "#4CAF50"]} style={styles.button}>
            <Text style={styles.buttonText}>Đăng ký</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <View style={styles.lineWrapper}>
          <View style={styles.line} />
          <Text style={styles.or}>Hoặc</Text>
          <View style={styles.line} />
        </View>
        
        <View style={styles.socialLogin}>
          <Image style={styles.Logo} source={require('@/assets/images/google_icon-icons.webp')} />
          <Image style={styles.Logo} source={require('@/assets/images/facebook_logo_icon_147291.webp')} />
        </View>

        <View>
          <Text style={styles.texttext}>
            Bạn đã có tài khoản?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>Đăng nhập</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top:-40
  },
  content: {
    top: 100,
  },
  image: {
    width: 550,
    height: 400,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 100,
    transform: [{ rotate: '-30deg' }],
    position: 'absolute',
    top: -255,
    left: -100,
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
    color: "#666",
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
    position: "relative",
    width: width * 0.8,
  },
  toggleButton: {
    position: "absolute",
    right: 15,
    top: -9,
  },
  button: {
    width: width * 0.8,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    top: -20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  lineWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#000', // Màu đường kẻ
    flex: 1,
  },
  or: {
    marginHorizontal: 10, // Khoảng cách giữa chữ và đường kẻ
    fontSize: 16,
    fontWeight: 'bold',
  },
  Logo: {
    width: 40,
    height: 40,
    top: 10,
    justifyContent: 'center', // Căn giữa hai logo
    alignItems: 'center',
    marginHorizontal: 10,
  },
  socialLogin: {
    flexDirection: 'row',
    justifyContent: 'center', // Căn giữa hai logo
    alignItems: 'center',
  },
  link: {
    color: 'blue', // Màu xanh cho chữ "Đăng nhập"
    top: 4,
  },
  texttext: {
    top: 20,
    textAlign:"center"
  },
});
