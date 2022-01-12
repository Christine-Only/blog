# 随手记

## less文件引入
a.less 文件中引入公共文件 b.less
* 使用@import引入文件
* 语句末尾要加; 否则会报错
```less
@import '../../config';

.ceshi{
  //文件引入后可以直接使用公共变量
  color: @themeColor;  
}

```