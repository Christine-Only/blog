---
sidebar: auto
---

# 随手记

## less文件引入
::: tip 注意
在less文件中使用@import引用src内的文件时需要这样引入，因为 `CSS loader` 会把非根路径的url解释为相对路径， 加~前缀才会解释成模块路径。
:::
a.less 文件中引入公共文件 b.less
* 使用@import引入文件
* 语句末尾要加; 否则会报错
```less
@import '../../config';

@import "~@/assets/style/_mixin";

.ceshi{
  //文件引入后可以直接使用公共变量
  color: @themeColor;  
}
```
## antd
### Select

场景： 最多选三个值，最少选中一个。删除每一个值的时候都要弹窗并且Select组件下拉框支持选中。
```jsx
import { useState, useEffect, useMemo } from 'react';
import { Form, Tag, Select, Checkbox, message } from 'antd';

const data = [
  {
    label: 'A',
    checked: false,
    disabled: false,
  },
  {
    label: 'B',
    checked: true,
    disabled: false,
  },
  {
    label: 'C',
    checked: false,
    disabled: false,
  },
  {
    label: 'D',
    checked: false,
    disabled: false,
];

const Index = () => {
  const [form] = Form.useForm();
  const [selectOptions, setSelectOptions] = useState(data);

  const handleChangeChecked = (name) => {
    const newSelectOptions = selectOptions.map((item) => {
      let { checked } = item;
      const { label, disabled } = item;
      if (item.label === name) {
        checked = !checked;
      }
      return { label, checked, disabled };
    });
    setSelectOptions(newSelectOptions);
  };

  const propertyIndustryList = useMemo(() => (form.getFieldValue('values') ? form.getFieldValue('values') : []), [
    form.getFieldValue('values'),
  ]);
  const selectOptionsEqualOne = useMemo(() => {
    const list = selectOptions.filter((item) => item.checked);
    return list.length === 1;
  }, [selectOptions]);

  const onChange = (e, name) => {
    if (selectOptionsEqualOne && !e.target.checked) {
      message.warning('至少保留一个值');
    } else {
      handleChangeChecked(name);
      if (e.target.checked) {
        form.setFieldsValue({ values: [...propertyIndustryList, name] });
      } else {
        form.setFieldsValue({ values: propertyIndustryList.filter((item) => item !== name) });
      }
    }
  };

  useEffect(() => {
    const list = selectOptions.map((item) => {
      let { disabled } = item;
      const { label, checked } = item;
      if (!propertyIndustryList.includes(label) && propertyIndustryList.length > 2) {
        disabled = true;
      } else {
        disabled = false;
      }
      return { label, checked, disabled };
    });
    setSelectOptions(list);
  }, [propertyIndustryList]);

  // 至少选中2个值
  const onMoreThanOneOk = (label: string) => {
    const idx = propertyIndustryList.indexOf(label);
    const newProList = [...propertyIndustryList];
    newProList.splice(idx, 1);
    handleChangeChecked(label);
    form.setFieldsValue({ values: newProList });
  };

  const tagRender = ({ label, closable }) => {
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const onCloseChange = (e) => {
      e.preventDefault();
      if (propertyIndustryList.length > 1) {
        ModalConfirm({
          title: '确定要删除该值吗？',
          content: '删除该值将清空所有与其相关的数据。',
          onOk: () => onMoreThanOneOk(label),
          type: 'confirm',
        });
      } else {
        message.warning('至少保留一个值');
      }
    };
    return (
      <Tag onMouseDown={onPreventMouseDown} closable={closable} onClose={onCloseChange} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  };

  const dropdownRender = () => (
    <div>
      {selectOptions.map((item) => {
        const { label, checked, disabled } = item;
        return (
          <div key={label} style={{ padding: '4px 8px' }}>
            <Checkbox disabled={disabled} checked={checked} onChange={(e) => onChange(e, label)}>
              {label}
            </Checkbox>
          </div>
        );
      })}
    </div>
  );

  return (
    <Form form={form}>
      <Form.Item label="值" name="values" rules={[{ required: true, message: '' }]}>
        <Select
          mode="multiple"
          style={{ width: 352 }}
          tagRender={tagRender}
          dropdownRender={dropdownRender}
          showArrow
        />
      </Form.Item>
    </Form>
  );
};

export default Index;
```

## antd Form.Item
> `Form.Item`中的tooltip替换icon
```jsx
<Form.Item
  label="替换icon"
  name="replace"
  tooltip={{ title: '成功替换', icon: <InfoCircleOutlined /> }}
>
```

## antd Anchor
```jsx
<div style={{ display: 'flex' }}>
  <div style={{ width: '80vw' }}>
    <div id="first" style={{ height: 800, border: '1px solid red' }}>
      第一行
    </div>
    <div id="second" style={{ height: 600, border: '1px solid green' }}>
      第二行
    </div>
    <div id="third" style={{ height: 480, border: '1px solid blue' }}>
      第三行
    </div>
    <div id="fourth" style={{ height: 100, border: '1px solid pink' }}>
      第四行
    </div>
  </div>
  <Anchor>
    <Link href="#first" title="第一行" />
    <Link href="#second" title="第二行" />
    <Link href="#third" title="第三行" />
    <Link href="#fourth" title="第四行" />
  </Anchor>
</div>
```
## box-shadow
> `box-shadow`: h-shadow, v-shadow, blur, spread, color, inset;

::: details 属性值详细介绍
h-shadow：必需的。水平阴影的位置。允许负值
v-shadow：必需的。垂直阴影的位置。允许负值
blur：可选。模糊距离
spread：可选。阴影的大小
color：可选。阴影的颜色。
inset可选。默认外侧阴影，写入inset后默认内侧阴影。
:::
```css
设置左边阴影：
box-shadow：10px 0px 8px -8px darkgrey;

设置右边阴影
box-shadow：-6px 0px 5px -5px darkgrey;

设置上方阴影：
box-shadow：0px 6px 5px -5px darkgrey;

设置下方阴影：
box-shadow：0px -8px 5px -5px darkgrey;
```

## 修改光标颜色
```css
input{
  caret-color: red;
}
```

## stylelint警告
::: tip 注意
sans-serif是一个通用字体关键字
:::
```css
a { font-family: Helvetica; } // 报错禁止在字体名称列表中缺少通用字体关键字。

a { font-family: Helvetica, sans-serif; } // ok
```

## 前端项目引入自定义字体包
1. 在public文件放入第三方字体文件
2. 在样式文件中引入自定义字体
```css
@font-face {
  font-family: "PingFangSC Light";
  src: url('@/assets/css/fonts/PingFang/PingFang-Light.ttf');
}

/* 引入多个自定义字体 */
@font-face {
  font-family: "PingFangSC Dark";
  src: url('@/assets/css/fonts/PingFang/PingFang-Dark.ttf');
}
```
3. 使用方式
```css
a { font-family: "PingFangSC Light", sans-serif; }
```
## Ant Design Pro中打包与加载otf自定义字体
:::tip 注意
使用 Webpack 打包字体文件的时候需要使用 file-loader 来处理打包文件，在ant design pro中可通过配置文件中的 chainWebpack 函数来自定义 Webpack 的配置。
:::
1. 安装 file-loader
```shell
npm install --save-dev file-loader
```
2. 编辑ant design pro的配置文件 `config/config.ts` 中的 `chainWebpack`
```ts
export default defineConfig({
  // ...
  chainWebpack(config){
    config.module // 配置 file-loader
      .rule('otf')
      .test(/.otf$/)
      .use('file-loader')
      .loader('file-loader');
  },
});
```

## css文字垂直居中
1. 使用`line-height`属性使文字垂直居中
```css
.box{
  width: 300px;
  height: 300px;
  background: #ddd;
  line-height:300px;
}
```
2. 将外部块格式化为表格单元格
```css
.box{
  width: 400px;
  height: 200px;
  background: #ddd;
  display: table-cell;
  vertical-align: middle;
}
```
3. flex布局
```css
.box{
  width: 300px;
  height: 200px;
  background: #ddd;
  display: flex;
  align-items: center;
}
```

## antd tabs 闪动
> 记得查看是否是自己写的样式覆盖了自带的样式导致的！！！

## umi中的request二次封装
```ts
type Method = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export function Request<T, Res>(url: string, method: Method = 'GET') {
  return (params?: T, options?: Record<string, unknown>) => {
    const key = method === 'GET' ? 'params' : 'data';

    return request<
      Promise<{
        code: string;
        ext: string;
        msg: string;
        result: Res;
      }>
    >(url, {
      method,
      [key]: params,
      ...options,
    });
  };
}
```

## useState
```tsx
interface IObject {
  num: number;
}

第一种写法
const [count, setCount] = useState<IObject | null>(null);

第二种写法
const [count, setCount] = useState<IObject>({} as IObject);

第三种写法
const [count, setCount] = useState<IObject>({num: 0});
```
:::tip
如果没有初始值,那么可以使用联合属性将初始值设置为null，例如`<number | null>`，但是在这里需要注意，后续使用state的时候需要进行空值判断,通常使用可选链来进行访问 a?.b -> a && a.b
:::

## useRef
```ts
const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    if (inputEl.current) {
      inputEl.current.focus()  // Works!
    }
    // ref?.current?.focus()
    // inputEl.current!.focus() 或者用这种写法也可以解决编译报错的问题
  };
```

## tsconfig.json
typeRoots: 用来指定默认的类型声明文件查找路径，默认为node_modules/@types, 指定typeRoots后，TypeScript 编译器会从指定的路径去引入声明文件，而不是node_modules/@types, 比如以下配置会从typings路径下去搜索声明
```json
{
  "compilerOptions": {
    "typeRoots": ["./typings"]
  }
}
```
**总结**
* typeRoots 是 tsconfig 中 compilerOptions 的一个配置项，typeRoots 下面的包会被 ts 编译器自动包含进来，typeRoots 默认指向 node_modules/@types。
* @types 是 scoped packages，和@babel 类似。@types 下的所有包会默认被引入，你可以通过修改 compilerOptions 来修改默认策略。
* types 和 typeRoots 一样也是 compilerOptions 的配置，指定 types 后，typeRoots 下只有被指定的包才会被引入。
