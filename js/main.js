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

var newsTags = func.$a(".p-jumbotron > a");
var newsNum = newsTags.length;
var newDisCount = 2;
var newsTagsHeight = [];
var pHeight = 0;
var newsAddBtn = func.$(".p-divide");

var init = function() {
        for(var i=0;i<newsNum;i++) {
                newsTagsHeight[i] = newsTags[i].offsetHeight;
        }
        pHeight = newsTagsHeight[0] + newsTagsHeight[1];
        newsTags[0].parentNode.style.height = pHeight + "px";

        var teamBox = func.$a(".p-team-box");
        var teamBoxNum = teamBox.length;
        for(var j=0;j<teamBoxNum;j++) {
                func.addEvent(teamBox[j], "click", function() {
                        this.lastElementChild.style.transform = "scale3d(1, 1, 1)";
                });
                func.addEvent(teamBox[j].lastElementChild, "click", function() {
                        this.style.transform = "scale3d(0, 0, 0)";
                        event.cancelBubble = true;//禁止起泡事件，防止div点击事件往上一级传递
                });
        }
};
function newsBtnClick(ele) {
        newsTagsHeight = [];
        for(var i=0;i<newsNum;i++) {
                newsTagsHeight[i] = newsTags[i].offsetHeight;
        }
        if(newDisCount == 2){
                pHeight = newsTagsHeight[0] + newsTagsHeight[1];
                newsTags[0].parentNode.style.height = pHeight + "px";
        }
        if(newsNum - newDisCount >= 2){
                pHeight = pHeight + newsTagsHeight[newDisCount] + newsTagsHeight[newDisCount + 1];
                newsTags[0].parentNode.style.height = pHeight + "px";
                newDisCount = newDisCount + 2;
        }else if(newsNum - newDisCount == 1){
                pHeight = pHeight + newsTagsHeight[newDisCount];
                newsTags[0].parentNode.style.height = pHeight + "px";
                newDisCount = newDisCount + 1;
                ele.firstChild.className = "glyphicon glyphicon-minus";
        }else{
                pHeight = newsTagsHeight[0] + newsTagsHeight[1];
                newsTags[0].parentNode.style.height = pHeight + "px";
                ele.firstChild.className = "glyphicon glyphicon-plus";
                newDisCount = 2;
        }
}
function setTiTitle(){
        var currentItem = func.$("#home-ti-carousel .active");
        var tiItems = func.$a("#home-ti-carousel .item");
        var tiItemsTitle = func.$("#home-ti-carousel .p-carousel-title");
        for(var i=0;i<tiItems.length;i++) {
                if(currentItem == tiItems[i]){
                        tiItemsTitle.innerHTML = "<a href='#' data-toggle='modal' data-target='#ti-list" + i +"'>TI" + (i+1) + " <span class='glyphicon glyphicon-link'></span></a>";
                        break;
                }
        }
}
init();
