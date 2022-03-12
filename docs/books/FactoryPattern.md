# 工厂模式

## 工场模式介绍
> 所谓工厂模式就是像工厂一样重复的产生类似的产品，工厂模式只需要我们传入正确的参数，就能生产类似的产品；
> 工厂模式根据抽象程度依次分为简单工厂模式、工厂方法模式、抽象工厂模式。

## 简单工厂模式

在我们的生活中很多时候就有这样的场景，像在网站中有的页面是需要根据账号等级来决定是否有浏览权限的；账号等级越高可浏览的就越多，反之就越少。

```js
// JS设计模式之简单工厂
function Factory(role){
  function SuperAdmin(){
    this.name="超级管理员";
    this.viewPage=["首页","发现页","通讯录","应用数据","权限管理"];
  }

  function Admin(){
    this.name="管理员";
    this.viewPage=["首页","发现页","通讯录","应用数据"];
  }

  function User(){
    this.name="普通用户";
    this.viewPage=["首页","发现页","通讯录"];
  }

  switch(role){
    case "superAdmin":
        return new SuperAdmin();
        break;

    case "admin":
        return new Admin();
        break;

    case "user":
        return new User();
        break;
  }
}

let superAdmin = Factory("superAdmin");
console.log(superAdmin);
let admin = Factory("admin");
console.log(admin);
let user = Factory("user");
console.log(user);
```

上述代码中，Factory就是一个工厂，Factory有三个函数分别是对应不同的产品，switch中有三个选项，这三个选项相当于三个模具，当匹配到其中的模具之后，将会new一个构造函数去执行生产工厂中的function；但是我们发现上面的简单工厂模式会有一定的局限性，就是如果我们需要去添加新的产品的时候，我们需要去修改两处位置（需要修改function和switch）才能达到添加新产品的目的。

**下面我们将简单工厂模式进行改良：**
```js
// JS设计模式之简单工厂改良版
function Factory(role){
  function User(opt){
    this.name = opt.name;
    this.viewPage = opt.viewPage;
  }

  switch(role){
    case "superAdmin":
        return new User({name:"superAdmin",viewPage:["首页","发现页","通讯录","应用数据","权限管理"]});
        break;

    case "admin":
        return new User({name:"admin",viewPage:["首页","发现页","通讯录","应用数据"]});
        break;

    case "normal":
        return new User({name:"normal",viewPage:["首页","发现页","通讯录"]});
  }
}

let superAdmin = Factory("superAdmin");
console.log(superAdmin);
let admin = Factory("admin");
console.log(admin);
let normal = Factory("normal");
console.log(normal);
```

经过上面的修改之后，我们工厂里面的函数相当于一个万能模具，switch里面给我什么，我就加工成什么样的；自然就解决了添加商品需要修改两处代码的问题.

**优点**
* 调用者创建对象时只要知道其名称即可；
* 扩展性高，如果要新增一个产品，直接扩展一个工厂类即可；
* 隐藏产品的具体实现，只关心产品的接口。

**缺点**
* 每次增加一个产品时，都需要增加一个具体类，这无形增加了系统内存的压力和系统的复杂度，也增加了具体类的依赖。



## 工厂方法模式
> 工厂方法模式是将创建对象的工作推到子类中进行；也就是相当于工厂总部不生产产品了，交给下辖分工厂进行生产；但是进入工厂之前，需要有个判断来验证你要生产的东西是否是属于我们工厂所生产范围，如果是，就丢给下辖工厂来进行生产，如果不行，那么要么新建工厂生产要么就生产不了。
