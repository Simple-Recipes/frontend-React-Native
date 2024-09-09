module.exports = {
  assets: ['./assets/fonts'], // 如果你有自定义字体，可以添加到此处
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null, // iOS自动配置，不需要手动link
        android: null, // 安卓自动配置
      },
    },
  },
};
