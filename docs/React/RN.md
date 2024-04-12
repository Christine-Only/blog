---
sidebarDepth: 2
---

# RN

## 项目部署在 iOS 模拟器

1. 在项目的根目录下，进入到 ios 文件夹：

```shell
cd ios
pod install // 安装项目的 iOS 依赖
```

2.编译并运行 React Native 应用，在项目的根目录下，运行以下命令：

```shell
npx react-native run-ios
```

## 项目部署在 Android 模拟器

1. 启动 Android 模拟器。您可以通过 Android Studio 的 AVD Manager 来启动模拟器，或者通过命令行工具启动。
2. 编译并运行应用。在项目的根目录下，执行以下命令：

```shell
npx react-native run-android
```

## 项目打包发布

1. 创建应用签名
2. 编写打包脚本
3. 打release 包并安装发布

## LayoutAnimation

>LayoutAnimation 用于在下一次布局发生变化时自动对视图进行动画处理。比如，当你调用 setState 之前调用 LayoutAnimation ，它将会在新的 state 造成的布局改变生效时产生动画效果。

LayoutAnimation.easeInEaseOut() 它用来对界面布局的改变进行动画过渡效果的配置。这种效果可以应用到视图创建、更新和删除三种场景上。

LayoutAnimation.easeInEaseOut() 方法的效果是视图改变时展示“先慢后快再慢”的动画效果，也就是所谓的"平滑进入、平滑退出"动画效果。

```jsx
import { useState } from 'react';
import { UIManager, LayoutAnimation, Platform, View, TouchableOpacity, Text } from 'react-native';

// 由于Android 需要开启以下标志才能使用 LayoutAnimation
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MyApp = () => {
  const [size, setSize] = useState(100);

  const toggleSize = () => {
    LayoutAnimation.easeInEaseOut(); //要在状态改变之前调用
    // setSize(prevSize => (prevSize === 100 ? 200 : 100));
    setSize(size === 100 ? 200 : 100);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: 'tomato',
        }}
      />
      <TouchableOpacity onPress={toggleSize}>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>Toggle Size</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyApp;
```

## KeyboardAvoidingView

KeyboardAvoidingView 是 React Native 中用来避免键盘遮住输入框的一个组件。当键盘弹出时，KeyboardAvoidingView 组件可以自动地将其他组件向上移动，以保证用户能够看见输入内容。

:::warning 警告
behavior 在Android 和 iOS上表现并不一致。但我们建议在两个平台上都明确设置此属性。
:::

```jsx
<KeyboardAvoidingView
  style={styles.root}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
  <View style={styles.content}>
    {renderTitle()}
    {renderAccountType()}
    {renderAccountInfo()}
    <TouchableOpacity style={styles.saveBtn} onPress={handleSaveBtn}>
      <Text style={styles.saveTxt}>保存</Text>
    </TouchableOpacity>
  </View>
</KeyboardAvoidingView>
```
