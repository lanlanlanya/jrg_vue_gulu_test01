"# jrg_vue_gulu_test01" 一个VUE Ui组件
[![Build Status](https://travis-ci.org/lanlanlanya/jrg_vue_gulu_test01.svg?branch=master)](https://travis-ci.org/lanlanlanya/jrg_vue_gulu_test01)

## 介绍
这是我在学习 Vue 过程中做的一个UI 框架，希望对你有用
## 开始使用
1. ## 安装
   使用本框架前，请在 CSS 中开启 border-box

   ```
    *,*::after, *::befor{box-sizing:border-box;}

   ```
   IE 8 及以上浏览器都支持此样式。
   你还需要设置默认颜色等变量（后续会改为scss变量）

   ```
   html{
               --button-height:32px;
               --font-size:14px;
               --button-bg:white;
               --button-active-bg:#eee;
               --border-radius:4px;
               --color:#333;
               --border-color:#999;
               --border-color-hover:#666;
           }
     ```
IE 15 及以上浏览器都支持此样式。
2. 安装lanlanlanya-1-1

     ```
     npm install --save lanlanlanya-1-1

     ```
3. 引入 lanlanlanlya-1-1
    ```
    import {Button,ButtonGroup,Icon}  from 'lanlanlanya-1-1'
    import 'lanlanlanya-1-1/dist/index.css'

    export default {
      name: 'app',
      components: {
        HelloWorld,
        'g-button':Button

      }
    }

    ```
    4. 引入 svg symbols

    ```
    <script src="//at.alicdn.com/t/font_748722_eoa6hdwtcy5.js"></script>

    ```
## 文档
## 提问
## 变更记录
## 联系方式
## 贡献代码

```