##   按钮组件  


### 一 : 介绍



### 二、组件特点

该组件内部实现以uni-app`Button`组件为基础，进行二次封装，主要区别在于：

- 按钮`roundValue` 圆角度数可以自定义
- 按钮 background  可自定义 支持渐变色
- 按钮 dorderColor 可自定义
- 按钮 添加 超出部分范围 字体隐藏功能
- 按钮`font`  字体样式可以自定义
- 按钮`isShadow`  自带阴影 可选配
- 按钮`isCardButton`  特殊样式 卡片Button 可选配



###  四、使用方式

文字内容通过`text`传入

```jsx
import React from "react";
import {Button} from "../../ayongUI/index.ts";


const ButtonPage = () => {

    return (
        <div>
            <h1>button</h1>
            <Button text={'ces'}   />
        </div>
    )
}
export default ButtonPage
```





####  Props(属性)


| 属性名         | 说明                                                         | 类型              | 默认值  | 单位 | 可选值                                      | 平台差异说明 |
| :------------- | :----------------------------------------------------------- | :---------------- | :------ | ---- | :------------------------------------------ | :----------- |
| type           | 按钮的样式类型 (注意! : 在设置type 后将无法设置背景颜色)     | String            | -       | -    | primary / error/ warning /success           | -            |
| plain          | 按钮是否镂空，背景色透明                                     | Boolean           | false   | -    | true                                        |              |
| background     | 按钮颜色<br />单个颜色字符为单底色色, 两个色值的数组为渐变色 | String \| Array   | #14C893 | -    | -                                           | -            |
| dorderColor    | 边框颜色                                                     | String            | -       | -    |                                             |              |
| roundValue     | 圆角值                                                       | String \|Number   | 60      | rpx  | 0 -100<br />(0:为直角)                      |              |
| width          | 按钮宽度  (注意: 若只设置宽度 输出 以宽为主的正方形)         | String  \|Number  | 328     | Rex  | -                                           |              |
| height         | 按钮高度  (注意: 若只设置宽度 输出 以高为主的正方形)         | String \|Number   | 96      | rpx  | -                                           |              |
| fontSize       | 文字 大小                                                    | String, \|Number, | 32      | rpx  | mini_Value: 24                              |              |
| fontFamily     | 文字 类型                                                    | String\|Number    | "黑体"  | -    | 支持所有系统字体 Windows\|Mac\|Ios\|Android |              |
| fontColor      | 字体颜色                                                     | String            | #fff    | -    |                                             |              |
| fontWeight     | 字体宽度                                                     | String            | 500     | -    | 100 -500 \| bold                            |              |
| text           | 按钮文字，(注意 在字体整体宽度范围超出按钮显示范围隐藏)      | String \| Number  | -       | -    | -                                           | -            |
| isShadow       | 是否显示阴影                                                 | Boolean           | True    | -    | false                                       |              |
| sizeType       | 按钮的大小                                                   | String            | normal  | -    | large / mini                                | -            |
| icon           | 按钮图标                                                     | String            | -       | -    | -                                           | -            |
| disabled       | 是否禁用 (禁用按钮无法触发点击事件@o nClick)                 | Boolean           | false   | -    | true                                        | -            |
| loading        | 是否为加载状态                                               | Boolean           | false   | -    | true                                        | -            |
| loadingText    | 加载中提示文字                                               | String            | -       | -    | -                                           | -            |
| isCardButton   | 是否为卡片按钮                                               | Boolean           | false   | -    | true                                        | -            |
| throttleTime   | 节流，一定时间内只能触发一次，单位毫秒                       | String \| Number  | 0       | -    | -                                           | -            |
| hoverStartTime | 按住后多久出现点击态，单位毫秒                               | String \| Number  | 0       | -    | -                                           | -            |
| hoverStayTime  | 手指松开后点击态保留时间，单位毫秒                           | String \| Number  | 200     | -    | -                                           | -            |

#### Events(事件)

**说明**：目前经测试(Hbuilder X 2.6.8)，在H5，APP，等同组件内部发出的`onClick`事件效果，

| 属性名  | 说明       | 类型    | 默认值 | 可选值 | 平台差异说明 |
| :------ | :--------- | :------ | :----- | :----- | :----------- |
| onClick | 按钮点击， | Handler | -      | -      | -            |
