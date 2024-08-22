import React, {Component} from 'react';
import {
  ViewProps,
  Text,
  StatusBar,
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info'; // 导入 DeviceInfo
import theme from '../action/theme'; // 导入你的主题色配置

const NAV_BAR_HEIGHT_IOS = 44; // 导航栏在 iOS 中的高度
const NAV_BAR_HEIGHT_ANDROID = 50; // 导航栏在 Android 中的高度
const NAV_BAR_HEIGHT =
  Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID;
const STATUS_BAR_HEIGHT =
  Platform.OS === 'ios' && DeviceInfo.hasNotch() ? 44 : 20; // 状态栏的高度
const StatusBarShape = {
  // 设置状态栏所接受的属性
  barStyle: PropTypes.oneOf(['light-content', 'default']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
};
export const NAVIGATION_BAR_HEIGHT = NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT;

interface NavigationBarProps extends ViewProps {
  style?: object;
  title?: string;
  titleView?: React.ReactNode;
  titleLayoutStyle?: object;
  hide?: boolean;
  statusBar?: {
    barStyle: 'light-content' | 'default';
    hidden: boolean;
    backgroundColor?: string;
  };
  rightButton?: React.ReactNode;
  leftButton?: React.ReactNode;
}

export default class NavigationBar extends Component<NavigationBarProps> {
  // 提供属性的类型检查
  static propTypes = {
    style: PropTypes.object,
    title: PropTypes.string,
    titleView: PropTypes.element,
    titleLayoutStyle: PropTypes.object,
    hide: PropTypes.bool,
    statusBar: PropTypes.shape(StatusBarShape),
    rightButton: PropTypes.element,
    leftButton: PropTypes.element,
  };

  // 设置默认属性
  static defaultProps = {
    statusBar: {
      barStyle: 'light-content',
      hidden: false,
    },
  };

  render() {
    const statusBar = !this.props.statusBar?.hidden ? (
      <View style={styles.statusBar}>
        <StatusBar {...this.props.statusBar} />
      </View>
    ) : null;

    const titleView = this.props.titleView ? (
      this.props.titleView
    ) : (
      <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
        {this.props.title}
      </Text>
    );

    const content = this.props.hide ? null : (
      <View style={styles.navBar}>
        {this.getButtonElement(this.props.leftButton)}
        <View
          style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
          {titleView}
        </View>
        {this.getButtonElement(this.props.rightButton)}
      </View>
    );

    return (
      <View style={[styles.container, this.props.style]}>
        {statusBar}
        {content}
      </View>
    );
  }

  getButtonElement(
    data:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | null
      | undefined
  ) {
    if (
      typeof data === 'string' ||
      typeof data === 'number' ||
      typeof data === 'boolean'
    ) {
      return (
        <View style={styles.navBarButton}>
          <Text>{String(data)}</Text>
        </View>
      );
    }
    return <View style={styles.navBarButton}>{data ? data : null}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary, // 使用主题色
  },
  navBarButton: {
    alignItems: 'center',
    justifyContent: 'center', // 添加垂直居中对齐
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: NAV_BAR_HEIGHT,
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: 20,
    color: theme.colors.text, // 使用主题色
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
  },
});
