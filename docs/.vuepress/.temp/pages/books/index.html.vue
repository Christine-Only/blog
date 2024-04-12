<template><div><h1 id="javascript设计模式" tabindex="-1"><a class="header-anchor" href="#javascript设计模式"><span>JavaScript设计模式</span></a></h1>
<h2 id="什么是设计模式" tabindex="-1"><a class="header-anchor" href="#什么是设计模式"><span>什么是设计模式</span></a></h2>
<p>设计模式是解决问题的一种思想，和语言无关。在面向对象软件设计工程中，针对特定的问题简洁优雅的一种解决方案。通俗一点的说，设计模式就是符合某种场景下某个问题的解决方案，通过设计模式可以增加代码的可重用性，可扩展性，可维护性，最终使得我们的代码高内聚、低耦合。</p>
<h2 id="设计模式五大设计原则" tabindex="-1"><a class="header-anchor" href="#设计模式五大设计原则"><span>设计模式五大设计原则</span></a></h2>
<ul>
<li>单一职责：
<ul>
<li>一个程序只需要做好一件事；</li>
<li>如果功能过于复杂就拆分开，保证每个部分的独立。</li>
</ul>
</li>
<li>开放/封闭原则：
<ul>
<li>对扩展开放，对修改封闭；</li>
<li>增加需求时，扩展新代码，而不是修改源代码。这是软件设计的终极目标。</li>
</ul>
</li>
<li>里氏代换原则：
<ul>
<li>子类能覆盖父类；</li>
<li>父类能出现的地方子类也能出现。</li>
</ul>
</li>
<li>接口隔离原则：
<ul>
<li>保持接口的单一独立，避免出现“胖接口”。这点目前在TS中运用到；</li>
<li>类似单一职责原则，这里更关注接口。</li>
</ul>
</li>
<li>依赖倒转原则：
<ul>
<li>面向接口编程，依赖于抽象而不依赖于具体；</li>
<li>使用方只专注接口而不用关注具体类的实现。俗称“鸭子类型”。</li>
</ul>
</li>
</ul>
<h2 id="设计模式的类型" tabindex="-1"><a class="header-anchor" href="#设计模式的类型"><span>设计模式的类型</span></a></h2>
<blockquote>
<p>总共有23中设计模式。这些模式可以分为三大类：创建型模式、结构型模式、行为性模式。</p>
</blockquote>
<h2 id="创建型模式" tabindex="-1"><a class="header-anchor" href="#创建型模式"><span>创建型模式</span></a></h2>
<blockquote>
<p>这些设计模式提供了一种在创建对象的同时隐藏创建逻辑的方式，而不是使用 new 运算符直接实例化对象。这使得程序在判断针对某个给定实例需要创建哪些对象时更加灵活。</p>
</blockquote>
<ul>
<li>创建型模式：
<ul>
<li>工厂模式（Factory Pattern）</li>
<li>抽象工厂模式（Abstract Factory Pattern）</li>
<li>单例模式（Singleton Pattern）</li>
<li>建造者模式（Builder Pattern）</li>
<li>原型模式（Prototype Pattern）</li>
</ul>
</li>
</ul>
<h2 id="结构型模式" tabindex="-1"><a class="header-anchor" href="#结构型模式"><span>结构型模式</span></a></h2>
<blockquote>
<p>这些设计模式关注类和对象的组合。继承的概念被用来组合接口和定义组合对象获得新功能的方式。</p>
</blockquote>
<ul>
<li>结构型模式：
<ul>
<li>适配器模式（Adapter Pattern）</li>
<li>桥接模式（Bridge Pattern）</li>
<li>过滤器模式（Filter、Criteria Pattern）</li>
<li>组合模式（Composite Pattern）</li>
<li>装饰器模式（Decorator Pattern）</li>
<li>外观模式（Facade Pattern）</li>
<li>享元模式（Flyweight Pattern）</li>
<li>代理模式（Proxy Pattern）</li>
</ul>
</li>
</ul>
<h2 id="行为型模式" tabindex="-1"><a class="header-anchor" href="#行为型模式"><span>行为型模式</span></a></h2>
<blockquote>
<p>这些设计模式特别关注对象之间的通信。</p>
</blockquote>
<ul>
<li>行为型模式
<ul>
<li>责任链模式（Chain of Responsibility Pattern）</li>
<li>命令模式（Command Pattern）</li>
<li>解释器模式（Interpreter Pattern）</li>
<li>迭代器模式（Iterator Pattern）</li>
<li>中介者模式（Mediator Pattern）</li>
<li>备忘录模式（Memento Pattern）</li>
<li>观察者模式（Observer Pattern）</li>
<li>状态模式（State Pattern）</li>
<li>空对象模式（Null Object Pattern）</li>
<li>策略模式（Strategy Pattern）</li>
<li>模板模式（Template Pattern）</li>
<li>访问者模式（Visitor Pattern）</li>
</ul>
</li>
</ul>
</div></template>


