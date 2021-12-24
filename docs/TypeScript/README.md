# TypeScript介绍

## 为什么要使用TypeScript?

::: tip
简单来说就是因为JavaScript是弱类型，很多错误只有在运行时才会被发现，而TypeScript提供了一套静态检测机制，可以帮助我们在编译时发现错误。
:::

## TypeScript的特点
::: tip
支持最新的JavaScript新特性
支持代码静态检查
支持诸如C，C++，Java，Go等后端语言中的特性 (枚举、泛型、类型转换、命名空间、声明文件、类、接口等)
:::

## 搭建TypeScript学习环境
::: tip 注意
TypeScript版本：V4.5.3

JavaScript版本：ES2020
:::

### 安装最新版TypeScript
```shell
npm i -g typescript
```
### 安装ts-node
```shell
npm i -g ts-node
```
### 创建一个 tsconfig.json 文件
```shell
tsc --init
```
然后新建index.ts，输入相关练习代码后，执行`ts-node index.ts`即可。
