# preload
html5图片预加载插件。

（！！！仅支持图片！！！）

提供的回调和预加载完成后的回调

预加载界面和过场动画需要自行完成。

## 1.使用

```javascript
new preload({
  items: []               // 需要加载的图片列表
, prefix: ''              // 如有需要可以更改图片路径的前缀
, dev: false              // 开发模式为true时会跳过加载过程，直接执行callback
, callback: function() {
    // 加载所有图片后执行的回调
  }
, process: function(val) {
    // 进度变化时执行的回调
  }
});

```
