/**
 * 一些基础功能
 * @type {{$, $a, addEvent}}
 */
var func = (function() {
        // 返回模块
        return {
                //获取单个元素
                $: function(x) {
                        return document.querySelector(x);
                },
                //获取指定全部元素
                $a: function(xa) {
                        return document.querySelectorAll(xa);
                },
                //添加事件函数
                addEvent: function(element, event, listener) {
                        if (element.addEventListener) { //标准
                                element.addEventListener(event, listener, false);
                        } else if (element.attachEvent) { //低版本ie
                                element.attachEvent("on" + event, listener);
                        } else { //都不行的情况
                                element["on" + event] = listener;
                        }
                },
                //移除事件函数
                removeEvent: function(element, event, listener) {
                        if (element.addEventListener) { //标准
                                element.removeEventListener(event, listener, false);
                        } else if (element.attachEvent) { //低版本ie
                                element.detachEvent("on" + event, listener);
                        } else { //其他情况
                                element["on" + event] = "";
                        }
                }
        };
})();
