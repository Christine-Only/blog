---
sidebar: auto
---

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
