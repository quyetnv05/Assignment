import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  ScrollView,
  Animated,
  Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200; // Chiều cao tối đa của header + banner
const HEADER_MIN_HEIGHT = 70; // Chiều cao tối thiểu của header sau khi thu gọn
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const PlantShopApp = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Tính toán các giá trị animation dựa trên scrollY
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 0.8, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.2, 1],
    extrapolate: 'clamp',
  });

  const headerSubtitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 0.5, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });

  const bannerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  const headerPaddingVertical = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [16, 8],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header animatable container */}
      <Animated.View 
        style={[
          styles.headerContainer, 
          { 
            height: headerHeight,
          }
        ]}
      >
        {/* Base header content */}
        <Animated.View 
          style={[
            styles.header, 
            { 
              paddingVertical: headerPaddingVertical,
              zIndex: 10, // Ensure it stays on top
            }
          ]}
        >
          <Animated.View style={{ 
            transform: [{ scale: titleScale }],
            opacity: headerTitleOpacity,
          }}>
            <Text style={styles.headerTitle}>Planta - toả sáng</Text>
            <Animated.Text style={[
              styles.headerSubtitle,
              { opacity: headerSubtitleOpacity }
            ]}>
              không gian nhà bạn
            </Animated.Text>
          </Animated.View>
          <TouchableOpacity style={styles.cartButton}>
            <Feather name="shopping-cart" size={24} color="black" />
          </TouchableOpacity>
        </Animated.View>
        
        {/* New Products Banner - fades out on scroll */}
        <Animated.View 
          style={[
            styles.newProductsBanner,
            { opacity: bannerOpacity }
          ]}
        >
          <Text style={styles.newProductsText}>Xem hàng mới về</Text>
          <Feather name="arrow-right" size={18} color="green" />
        </Animated.View>
      </Animated.View>
      
      {/* Main scrollable content */}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Featured Product */}
        <View style={styles.featuredContainer}>
          <Image
            source={{ uri: 'https://s3-alpha-sig.figma.com/img/3084/d533/3c5e831f02921d6fe59087cc1e9b8e20?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Xv6mHn5vPwdpISQZSg7Rc~~tSKxuEV3rzEEEnzxDo-v0NDWIjcOshzngadVlrlIUmDZR4kqF-C1m9pV4-3sHUElfcTPyYcDnwtTEQ-mc6OklD~O5ocKEGH~trt9g-Fzq9OALyDAAnyI43zq3tYMxAF6CiG3SDTqNGsLeBEL8-bjeZzSfU8PbuZfGsjeN7svlzVgWs5NOXcWYXda6AibYHhyasdm8dG8Sx5OQlZBstCfPqcOTZ2noQBMhnVyWkeDT3WJYtsmDW5MGZLmy9kyoE3psjYen5DrM-XR3~GtyJHIIOWWF5ZBXfnyRaiz4aeC1wufmrsZUggvwxaFSzFqiJQ__' }}
            style={styles.featuredImage}
            resizeMode="cover"
          />
        </View>
        
        {/* Category Title */}
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Cây trồng</Text>
        </View>
        
        {/* Products Grid */}
        <View style={styles.productsContainer}>
          <View style={styles.row}>
            {/* Product 1 */}
            <TouchableOpacity style={styles.productCard}>
              <Image
                source={{ uri: 'https://s3-alpha-sig.figma.com/img/8dc1/c3fd/4c79faa42e885c9a92c6e6b29666fdf3?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=F1Q9MaLi2FBzdEzZtaxjJ-72KFkZepdtEWFQCZ-twn6XEGY35g2ArCdliPnNi6l5wrI2BaJULtpgf~HjoLfFpDdV9eqav4SNmqNxVAd5A0HAIq4P195MY2V1jbqd3OhDgQJsvz8vfxu0cixzP~HcuC-eWP91TlR6hHfrOPOeO4VRjz2araeGhdOuNDA0Rf2gsrJcd7Q6VFfhp-yPGpkNRqCZHDLM7y6N-Sey-ww~ZjzWhVB0fn9gewVBSQQLB~gTX0pC8HsT9aQdfuywDNZXdihtPJbycLg1Rn5k9DtAbDc9ztR6MnFIe37vSn8ytjk8jGkk8tK1zUioCuG2ekI-xA__' }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productName}>Spider Plant</Text>
              <Text style={styles.productTag}>Ưa bóng</Text>
              <Text style={styles.productPrice}>250.000đ</Text>
            </TouchableOpacity>
            
            {/* Product 2 */}
            <TouchableOpacity style={styles.productCard}>
              <Image
                source={{ uri: 'https://s3-alpha-sig.figma.com/img/28d9/bffb/22f7b1d90b3a956129c0034bc73180a5?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pBtXxwkmmLlcM7tML8D8mgMqrYyZLAr~~RWunVAq-lgJzsGQh6xHyz4wXkykieNVatPaa~mGFTh5bHrFeaRjCkxiqO35oyguOW2VJu1MSgjZBzc-tDUPw2ElOjRHjRNF5qwUQP6eJAAB2pxYD-Da04dF2PCAAvWf-9d5l8c4clx5Wfzfu47LTEknxu~QkwDQ3b8lNy5P~~R2EGr-rtmHOQFF-INc74fpO73EM7DOUWRXIheHz7Vdr~ZGhqz9yq7e0pgPnNCHVZRfKL2036CIkD6W9gH-GeU5mYhmHccfYB6qyHfZiLaGaloMpK-8wQulRZVPkiVCu03~0Bj5SLR7Yw__' }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productName}>Song of India</Text>
              <Text style={styles.productTag}>Ưa sáng</Text>
              <Text style={styles.productPrice}>250.000đ</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.row}>
            {/* Product 3 */}
            <TouchableOpacity style={styles.productCard}>
            <Image
                source={{ uri: 'https://s3-alpha-sig.figma.com/img/28d9/bffb/22f7b1d90b3a956129c0034bc73180a5?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pBtXxwkmmLlcM7tML8D8mgMqrYyZLAr~~RWunVAq-lgJzsGQh6xHyz4wXkykieNVatPaa~mGFTh5bHrFeaRjCkxiqO35oyguOW2VJu1MSgjZBzc-tDUPw2ElOjRHjRNF5qwUQP6eJAAB2pxYD-Da04dF2PCAAvWf-9d5l8c4clx5Wfzfu47LTEknxu~QkwDQ3b8lNy5P~~R2EGr-rtmHOQFF-INc74fpO73EM7DOUWRXIheHz7Vdr~ZGhqz9yq7e0pgPnNCHVZRfKL2036CIkD6W9gH-GeU5mYhmHccfYB6qyHfZiLaGaloMpK-8wQulRZVPkiVCu03~0Bj5SLR7Yw__' }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productName}>Anthurium</Text>
              <Text style={styles.productTag}>Ưa bóng</Text>
              <Text style={styles.productPrice}>250.000đ</Text>
            </TouchableOpacity>
            
            {/* Product 4 */}
            <TouchableOpacity style={styles.productCard}>
            <Image
                source={{ uri: 'https://s3-alpha-sig.figma.com/img/28d9/bffb/22f7b1d90b3a956129c0034bc73180a5?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pBtXxwkmmLlcM7tML8D8mgMqrYyZLAr~~RWunVAq-lgJzsGQh6xHyz4wXkykieNVatPaa~mGFTh5bHrFeaRjCkxiqO35oyguOW2VJu1MSgjZBzc-tDUPw2ElOjRHjRNF5qwUQP6eJAAB2pxYD-Da04dF2PCAAvWf-9d5l8c4clx5Wfzfu47LTEknxu~QkwDQ3b8lNy5P~~R2EGr-rtmHOQFF-INc74fpO73EM7DOUWRXIheHz7Vdr~ZGhqz9yq7e0pgPnNCHVZRfKL2036CIkD6W9gH-GeU5mYhmHccfYB6qyHfZiLaGaloMpK-8wQulRZVPkiVCu03~0Bj5SLR7Yw__' }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productName}>Monstera</Text>
              <Text style={styles.productTag}>Ưa bóng</Text>
              <Text style={styles.productPrice}>250.000đ</Text>
            </TouchableOpacity>
          </View>
          
          {/* Thêm nhiều sản phẩm hơn để cho phép cuộn */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.productCard}>
            <Image
                source={{ uri: 'https://s3-alpha-sig.figma.com/img/28d9/bffb/22f7b1d90b3a956129c0034bc73180a5?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pBtXxwkmmLlcM7tML8D8mgMqrYyZLAr~~RWunVAq-lgJzsGQh6xHyz4wXkykieNVatPaa~mGFTh5bHrFeaRjCkxiqO35oyguOW2VJu1MSgjZBzc-tDUPw2ElOjRHjRNF5qwUQP6eJAAB2pxYD-Da04dF2PCAAvWf-9d5l8c4clx5Wfzfu47LTEknxu~QkwDQ3b8lNy5P~~R2EGr-rtmHOQFF-INc74fpO73EM7DOUWRXIheHz7Vdr~ZGhqz9yq7e0pgPnNCHVZRfKL2036CIkD6W9gH-GeU5mYhmHccfYB6qyHfZiLaGaloMpK-8wQulRZVPkiVCu03~0Bj5SLR7Yw__' }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productName}>Peace Lily</Text>
              <Text style={styles.productTag}>Ưa bóng</Text>
              <Text style={styles.productPrice}>280.000đ</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.productCard}>
            <Image
                source={{ uri: 'https://s3-alpha-sig.figma.com/img/28d9/bffb/22f7b1d90b3a956129c0034bc73180a5?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pBtXxwkmmLlcM7tML8D8mgMqrYyZLAr~~RWunVAq-lgJzsGQh6xHyz4wXkykieNVatPaa~mGFTh5bHrFeaRjCkxiqO35oyguOW2VJu1MSgjZBzc-tDUPw2ElOjRHjRNF5qwUQP6eJAAB2pxYD-Da04dF2PCAAvWf-9d5l8c4clx5Wfzfu47LTEknxu~QkwDQ3b8lNy5P~~R2EGr-rtmHOQFF-INc74fpO73EM7DOUWRXIheHz7Vdr~ZGhqz9yq7e0pgPnNCHVZRfKL2036CIkD6W9gH-GeU5mYhmHccfYB6qyHfZiLaGaloMpK-8wQulRZVPkiVCu03~0Bj5SLR7Yw__' }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productName}>Snake Plant</Text>
              <Text style={styles.productTag}>Ưa sáng</Text>
              <Text style={styles.productPrice}>230.000đ</Text>
            </TouchableOpacity>
          </View>
          

                    <View style={styles.link}> 
                    <Text>
                        <Text style={styles.link}>xem thêm cây trồng</Text>
                    </Text>
                    </View>
          <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Chậu Cây trồng</Text>
        </View>
        <View style={styles.row}>
            {/* Product 1 */}
            <TouchableOpacity style={styles.productCard}>
              <Image
                source={{ uri: 'https://s3-alpha-sig.figma.com/img/2513/c966/834221fbc31c808dfbb9ba52ad5ef5e4?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VT~LdqR5UCkBiB5Rqdw2g5ykeuh1QuxRKhIbhhUHPigncWztuu5Q2Uc~P~9v3bVBWGrutX10AylewxUb4W27uaA05kossGJDKjnrtZE2yfLm2oTCb-U6CnBNoQYDGnuBBXGmrJd5vJlPg3jf1Ony-lDMHJMDiASPZr9Viy7A7tJ5ZKaM4N0zGdBEQu9ru4dxHl7xgGP0eZWoziRVkFWKFBFcbEFTv0l18VdstYLYN1BwdsdGAweLTlFojnwThpJItuAtUksjsXzzsz9JaJkAoCC-QOfRd25g3kF7RYGV3z2xG7kZ1~P54HWuQEw~eN0hpxYz0YH~QzR5iVIjvLA4uw__' }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productName}>Plant Trắng</Text>
              
              <Text style={styles.productPrice}>250.000đ</Text>
            </TouchableOpacity>
            
            {/* Product 2 */}
            <TouchableOpacity style={styles.productCard}>
              <Image
                source={{ uri: 'https://s3-alpha-sig.figma.com/img/740c/be92/30d0e9ed9212eaa46291bb0045a45840?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TnA2srrIK24miQ7AICqdsdb5fda8VuBG87MDeQPVQZlTG5gqQxykBvcxEo-87FuXZnJGFjWDT3-axySQ1JRi6NNFapOsg~77Z3ZR8cz12ATOA93Gwb05DHiVIlyzt9ptAjHmXAkv8IWhkUykRCjDeic1BGlh4fPaNfqUJ7OgpOQWss2fompVN9F4hqVcQKf8KG2ru3AUv3x6fQS91VdWeDcr4~a08cFGvDo94Qn3d60OQ1ylMVa5~TaiyCPT3paMwILhpBM-ajSiiBZGE58cUwpoWlJNDxZqjPQDoMoyY2BpjDY0iihiRwitL2AoSq~E1HT1tw4KOSePDpF928Smsw__' }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productName}>Planta lemon Balm</Text>
              
              <Text style={styles.productPrice}>250.000đ</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            {/* Product 1 */}
            <TouchableOpacity style={styles.productCard}>
            <Image
                source={{ uri: 'https://s3-alpha-sig.figma.com/img/ff1e/1ba8/1d4b4a5e1f83ad7d7c6a746d9c7677b8?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dxP-VGlBMiiuZ2ChMlo2Eh8J1UPMuaWxQZN9VjEXPRmvo-Y5pItG23ZSGg--UkjuRbAqYCb9p73~W87efdTQtCfh5quuOd8~Wu44R6BrL14-PLRh2K6tuElHC9dRgW~jkzQatd0kwC0e8VfmSr3DKyPnyJmrhHKnPHAU-ZINYDJhYgX2UEUYZmohyq~lKO~KGuTrVB9gBXZQR0bn3ZeoHcnjQNj-FE6csYtxvq2f0~edAxLJrBAVm9dQSLkxURsg5UYgnhIVeZoW9I1e7GxD2adP2H8Z0~yrzjtvUOrB9KlCF4LCTll0cRsP9oexbut6ghIjKkVGptcZhumaFzK5hg__' }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productName}>Plant Rosewood</Text>
              
              <Text style={styles.productPrice}>250.000đ</Text>
            </TouchableOpacity>
            
            {/* Product 2 */}
            <TouchableOpacity style={styles.productCard}>
            <Image
                source={{ uri: 'https://s3-alpha-sig.figma.com/img/bfe9/b5e0/6bcc9eb160347c1e1dc9c9c768361182?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jzsL0gqvokPIKQW-HT4HjCbwLhCD2EBSMH0SOvvM8FZshRB8~BiXu3s2alnclbKaojyX0SpwD06ZAvGCVtF9EH75xNUh0Isj6iiVdQx1ZLkK6X-uurVGHaaXWNwiOpqk6jGbVAC-IeZJEsHglXPAeJ6-ETjpMds0qolfxbFODVtydzyKGh5GU9Tv0-4jVbutsaNBGkvMV-X7L3AWIWiUuZPkaJda6-Ctc0AHsOTuRtmUY3Gh~0n1PX7RqMMEUpDeA1msHHAhRTHmurRgIQxT-CpiWCs6LX3qWdg5WML0P1OTM4hfMX1vEpqpafEmpYHfZSDNWoXuYkC~eJFIW2HZ1Q__' }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productName}>Planta Dove Grey</Text>
             
              <Text style={styles.productPrice}>250.000đ</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.link}> 
                    <Text>
                        <Text style={styles.link}>xem thêm chậu cây trồng</Text>
                    </Text>
                    </View>
                    <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Phụ Kiện</Text>
        </View>
        <View style={styles.row}>
            {/* Product 1 */}
            <TouchableOpacity style={styles.productCard}>
            <Image
                source={{ uri: 'https://s3-alpha-sig.figma.com/img/ff1e/1ba8/1d4b4a5e1f83ad7d7c6a746d9c7677b8?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dxP-VGlBMiiuZ2ChMlo2Eh8J1UPMuaWxQZN9VjEXPRmvo-Y5pItG23ZSGg--UkjuRbAqYCb9p73~W87efdTQtCfh5quuOd8~Wu44R6BrL14-PLRh2K6tuElHC9dRgW~jkzQatd0kwC0e8VfmSr3DKyPnyJmrhHKnPHAU-ZINYDJhYgX2UEUYZmohyq~lKO~KGuTrVB9gBXZQR0bn3ZeoHcnjQNj-FE6csYtxvq2f0~edAxLJrBAVm9dQSLkxURsg5UYgnhIVeZoW9I1e7GxD2adP2H8Z0~yrzjtvUOrB9KlCF4LCTll0cRsP9oexbut6ghIjKkVGptcZhumaFzK5hg__' }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productName}>Plant Rosewood</Text>
              
              <Text style={styles.productPrice}>250.000đ</Text>
            </TouchableOpacity>
            
            {/* Product 2 */}
            <TouchableOpacity style={styles.productCard}>
            <Image
                source={{ uri: 'https://s3-alpha-sig.figma.com/img/bfe9/b5e0/6bcc9eb160347c1e1dc9c9c768361182?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jzsL0gqvokPIKQW-HT4HjCbwLhCD2EBSMH0SOvvM8FZshRB8~BiXu3s2alnclbKaojyX0SpwD06ZAvGCVtF9EH75xNUh0Isj6iiVdQx1ZLkK6X-uurVGHaaXWNwiOpqk6jGbVAC-IeZJEsHglXPAeJ6-ETjpMds0qolfxbFODVtydzyKGh5GU9Tv0-4jVbutsaNBGkvMV-X7L3AWIWiUuZPkaJda6-Ctc0AHsOTuRtmUY3Gh~0n1PX7RqMMEUpDeA1msHHAhRTHmurRgIQxT-CpiWCs6LX3qWdg5WML0P1OTM4hfMX1vEpqpafEmpYHfZSDNWoXuYkC~eJFIW2HZ1Q__' }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productName}>Planta Dove Grey</Text>
             
              <Text style={styles.productPrice}>250.000đ</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            {/* Product 1 */}
            <TouchableOpacity style={styles.productCard}>
            <Image
                source={{ uri: 'https://s3-alpha-sig.figma.com/img/ff1e/1ba8/1d4b4a5e1f83ad7d7c6a746d9c7677b8?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dxP-VGlBMiiuZ2ChMlo2Eh8J1UPMuaWxQZN9VjEXPRmvo-Y5pItG23ZSGg--UkjuRbAqYCb9p73~W87efdTQtCfh5quuOd8~Wu44R6BrL14-PLRh2K6tuElHC9dRgW~jkzQatd0kwC0e8VfmSr3DKyPnyJmrhHKnPHAU-ZINYDJhYgX2UEUYZmohyq~lKO~KGuTrVB9gBXZQR0bn3ZeoHcnjQNj-FE6csYtxvq2f0~edAxLJrBAVm9dQSLkxURsg5UYgnhIVeZoW9I1e7GxD2adP2H8Z0~yrzjtvUOrB9KlCF4LCTll0cRsP9oexbut6ghIjKkVGptcZhumaFzK5hg__' }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productName}>Plant Rosewood</Text>
              
              <Text style={styles.productPrice}>250.000đ</Text>
            </TouchableOpacity>
            
            {/* Product 2 */}
            <TouchableOpacity style={styles.productCard}>
            <Image
                source={{ uri: 'https://s3-alpha-sig.figma.com/img/bfe9/b5e0/6bcc9eb160347c1e1dc9c9c768361182?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jzsL0gqvokPIKQW-HT4HjCbwLhCD2EBSMH0SOvvM8FZshRB8~BiXu3s2alnclbKaojyX0SpwD06ZAvGCVtF9EH75xNUh0Isj6iiVdQx1ZLkK6X-uurVGHaaXWNwiOpqk6jGbVAC-IeZJEsHglXPAeJ6-ETjpMds0qolfxbFODVtydzyKGh5GU9Tv0-4jVbutsaNBGkvMV-X7L3AWIWiUuZPkaJda6-Ctc0AHsOTuRtmUY3Gh~0n1PX7RqMMEUpDeA1msHHAhRTHmurRgIQxT-CpiWCs6LX3qWdg5WML0P1OTM4hfMX1vEpqpafEmpYHfZSDNWoXuYkC~eJFIW2HZ1Q__' }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <Text style={styles.productName}>Planta Dove Grey</Text>
             
              <Text style={styles.productPrice}>250.000đ</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.link}> 
                    <Text>
                        <Text style={styles.link}>xem thêm phụ kiện</Text>
                    </Text>
                    </View>
                    <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Combo chăm sóc (mới)</Text>
        </View>
        <View style={styles.featuredContainer}>
          <Image
            source={{ uri: 'https://s3-alpha-sig.figma.com/img/3084/d533/3c5e831f02921d6fe59087cc1e9b8e20?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Xv6mHn5vPwdpISQZSg7Rc~~tSKxuEV3rzEEEnzxDo-v0NDWIjcOshzngadVlrlIUmDZR4kqF-C1m9pV4-3sHUElfcTPyYcDnwtTEQ-mc6OklD~O5ocKEGH~trt9g-Fzq9OALyDAAnyI43zq3tYMxAF6CiG3SDTqNGsLeBEL8-bjeZzSfU8PbuZfGsjeN7svlzVgWs5NOXcWYXda6AibYHhyasdm8dG8Sx5OQlZBstCfPqcOTZ2noQBMhnVyWkeDT3WJYtsmDW5MGZLmy9kyoE3psjYen5DrM-XR3~GtyJHIIOWWF5ZBXfnyRaiz4aeC1wufmrsZUggvwxaFSzFqiJQ__' }}
            style={styles.featuredImage}
            resizeMode="cover"
          />
        </View>
        </View>
      </Animated.ScrollView>
      
      {/* Bottom Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="home" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="bell" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="user" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    zIndex: 1000,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#333',
    marginTop: 2,
  },
  cartButton: {
    padding: 8,
  },
  newProductsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  newProductsText: {
    color: 'green',
    marginRight: 6,
    fontSize: 14,
  },
  scrollViewContent: {
    paddingTop: HEADER_MAX_HEIGHT, // Thêm padding-top bằng chiều cao của header
    paddingBottom: 20,
  },
  featuredContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  featuredImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  categoryHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productsContainer: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 4,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  productTag: {
    fontSize: 12,
    color: '#666',
    marginVertical: 2,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    height: 60,
    backgroundColor: '#ffffff',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link:{
    color:'#333',
    left:200,
    textDecorationLine: 'underline',
  }
});

export default PlantShopApp;