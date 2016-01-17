/* ==========================================================
 * preload.js v20151217
 * ==========================================================
 * Copyright shihua
 * 359529568@qq.com
 * 移动端图片预加载模块
 * ========================================================== */

(function() {
  var p = function(option) {
    if (!option.items || !Array.isArray(option.items) || !option.items.length || option.dev){
      typeof option.callback === 'function' && option.callback.call(this);
      return;
    }
    this.items = option.items;
    this.prefix = option.prefix || '';
    this.callback = option.callback || null;
    this.process = option.process || null;
    this.bFinish = false;
    this.timer = null;
    this.percent = 0;
    this.despercent = 0;
    this.nCurIndex = 0;
    this.dev = option.dev || false;
    this.timeout = option.timeout || 60;
    this.startLoad();
    window.preload_one = this;
  };
  p.prototype.startLoad = function() {
    var sf = this;
    sf.percent = 0;
    sf.load();
    setTimeout(function() {
      sf.bFinish = true;
    }, sf.timeout * 1000);
    return this;
  };
  p.prototype.load = function() {
    var sf = this;
    this.items.forEach(function(url) {
      if (url == '') {
        sf._loadError();
      } else if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(url)) {
        sf._loadImg(url);
      } else {      
        sf._loadBuffer(url);
      }
    });
    sf.timer = setInterval(function() {
      sf.countNum();
    }, 30);
  };
  p.prototype._loadError = function(url) {
    var sf = this;
    !sf.bFinish && (sf.despercent = Math.floor((++sf.nCurIndex / nTotal) * 100));
  }
  p.prototype._loadImg = function(url) {
    var sf = this;
    var nTotal = sf.items.length;
    var img = new Image;
    img.onload = img.onerror = img.onabort = function() {
      !sf.bFinish && (sf.despercent = Math.floor((++sf.nCurIndex / nTotal) * 100));
    };
    img.src = sf.prefix + url;
  }
  p.prototype._loadBuffer = function(url) {
    var sf = this;
    url = sf.prefix + url;
    var nTotal = sf.items.length;
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arrayBuffer';
    request.onload = request.onerror = request.onabort = function() {
      !sf.bFinish && (sf.despercent = Math.floor((++sf.nCurIndex / nTotal) * 100));
    };
    request.send();
  }
  p.prototype.countNum = function() {
    var sf = this;
    if (sf.bFinish) {
      sf.despercent = 100;
    }
    if (sf.percent == sf.despercent && sf.despercent < 100) return;
    sf.percent < sf.despercent && sf.percent++;
    typeof sf.process == 'function' && sf.process(sf.percent);
    sf.percent == 100 && sf.loadFinish();
  }
  p.prototype.loadFinish = function() {
    var sf = this;
    clearInterval(sf.timer);
    var r = this.callback;
    if (typeof r === "function") {
      r.call(sf);
    }
  };
  window.preload = p;
})(this);