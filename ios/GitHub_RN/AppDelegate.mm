#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h"

#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>
#import <AppCenterReactNativeShared/AppCenterReactNativeShared.h>

// 1. 导入 CodePush
#import <CodePush/CodePush.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"GitHub_RN";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  BOOL didFinish = [super application:application didFinishLaunchingWithOptions:launchOptions];
  
  [RNSplashScreen show];  // 添加此行，确保在 didFinish 后调用

  // App Center 初始化代码
  [AppCenterReactNativeShared setStartAutomatically:YES];
  [AppCenterReactNativeShared setAppSecret:@"7dddbd43-f4dd-4511-a585-992688bd4068"];
  [AppCenterReactNative register];
  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];

  return didFinish;
}

// 修改 sourceURLForBridge 方法
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

// 修改 bundleURL 方法，让 CodePush 决定加载哪个 JS 文件
- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [CodePush bundleURL];  // 使用 CodePush 的 bundle URL
#endif
}

@end
