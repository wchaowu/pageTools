/**
 * Created by cwwu on 14-1-7.
 */


;(function (_win) {
    var h = document,
        m = h.documentElement,
       e =  {};
    // e._URL = "http://localhost/ubtcheck/";
    e._URL = "http://wchaowu.github.io/pageTools/";
    e._CSS = '<link rel="stylesheet" type="text/css" href="' + e._URL + 'stylesheets/sidebar.css" media="all" />';
    e.getElem = function(a) {
        return document.getElementById(a)
    };
    e.getValue = function(a) {
        return (a = e.getElem(a)) && a.value || ""
    };
    e.on = function() {
        return (h.addEventListener ?
            function(a, b, c, k) {
                a.addEventListener(b, c, k || !1)
            } : (h.attachEvent ? function(a, b, c) {
            a.attachEvent("on" + b, c)
        }:null));
    }();

    var MaskTool = function () {
        var _that = this;
        this._createToolbar = function () {
            var a = h.createElement("iframe");
            a.src = "about:blank";
            a.scrolling = "no";
            a.allowtransparency = !0;
            h.body.appendChild(a);
            a.style.cssText = " opacity: 0.7; filter:alpha(opacity=70); width:170px;height:200px;overflow:hidden;position: fixed;right:0;top:100px;color:#000000;font-size:12px;letter-spacing:0;";
            var b = a.contentWindow.document,
                c;
            c = "<!DOCTYPE html><html><head>" + e._CSS;
            c += '</head><body>'
                + '<div class="context"  id="contentId" >'
                + '<div class="pageTool" id="pageTool" onfocus="this.blur();">开发工具</div>'
                + '<ul id="K1">'
                + '<li >脚本检查</li>'
                + '<li id="_formJsonValue">得到表单的值</li>'
                + '<li > UBT统计信息</li>'
                + '<li id="_toolDoc">工具文档</li>'
                + '<li id="_close">关闭工具</li>'
                + '</ul> </div></div>';
            c += "</body>";
            b.open();
            b.write(c);
            b.close();
            e.on(b.body, "click", function(a) {
                a = a || f.event;
                a = a.target || a.srcElement;
                if ("li" == a.nodeName.toLowerCase() && (a = a.id && a.id.substring(1), _that[a])) _that[a]()
            });
            e.on(b.body, "keyup", function(a) {
                a = a || f.event;
                27 == a.keyCode && _that.hide()
            });
            e.on(_win, "keyup", function(a) {
                a = a || f.event;
                27 == a.keyCode && _that.hide()
            });
            _that.sidebar = a

        };
       this._getView= function() {
            return {
                w: m.clientWidth || h.body.clientWidth,
                h: m.clientHeight || h.body.clientHeight
            }
        };
        this.show= function(html) {
            html = '<div class="modal"><div class="modal-dialog"><a id="_hide" href="javascript:;" class="close">\u00d7</a>' +
                html;
            html += "</div>";
            html += '<p class="f"><a href="' + e._URL + 'doc.html" target="_blank">\u91c7\u96c6\u811a\u672c\u90e8\u7f72\u6587\u6863</a></p>';
            html += "</div>";
            this.dialogBody.innerHTML = html;
            this.dialog.style.display = "block"
        };
        this.toolDoc = function (){
            var html = "<div><a href='https://github.com/wchaowu/pageTools/' target='_blank'>开源地址</a> <a href='http://vbooking.github.io/'  target='_blank'>博客</a> </div>";
         _that.show(html);
        };
        this._initTpl= function() {
            var a = this._getView(),
                b = document.createElement("iframe");
            b.src = "about:blank";
            // b.width = a.w;
            // b.height = Math.max(a.h, 750);
            b.scrolling = "no";
            b.allowtransparency = !0;
            h.body.appendChild(b);
            b.style.cssText = "position:fixed;_position:absolute;left:50%;border:0;overflow:hidden;z-index:10000;width:800px;height:400px;top:30px;margin-left:-400px;box-shadow: 0 0 10px rgba(0,0,0,.4);border-radius:6px 6px 0 0";
            b.style.display = "none";
            a = b.contentWindow.document;
            a.open();
            a.write("<!DOCTYPE html><head>" + e._CSS + '</head><body class="ifr_d"></body></html>');
            a.close();
            var c = this;
            e.on(a.body, "keyup", function(a) {
                a = a || f.event;
                27 == a.keyCode && c.hide()
            });
            e.on(a.body, "click", function(b) {
                b = b || f.event;
                b = b.target || b.srcElement;
                if ((b = b.id && b.id.substring(1), _that[b])) _that[b]()
            });
            this.dialog = b;
            this.dialogBody = a.body
        };
        this.hide = function () {
            if( _that.dialog){
            _that.dialog.style.display = "none"
            }
        };
        this.close = function() {
            _win.confirm("\u786e\u5b9a\u8981\u5173\u95edUBT\u68c0\u6d4b\u5de5\u5177\n\u5173\u95ed\u540e\u53ef\u4ee5\u901a\u8fc7\u70b9\u51fb\u6807\u7b7e\u680f\u201cUBT\u811a\u672c\u68c0\u6d4b\u201d\u518d\u6b21\u6253\u5f00\uff01") && (_that.hide(),
                _that.sidebar.style.display = "none")
        };
        this.formJsonValue = function (){
            var arrFormObj = h.getElementsByTagName("form");
            for(var i = 0;i<arrFormObj.length;i++){
              var formValue=  _that.getFormObject(arrFormObj[i]);
                var html = "";
                 for(var j = 0;j<formValue.length;j++){
                        html+=formValue[j]+"<br />";
                 }
                _that.show(html);

            }
        }
        this.getFormObject =  function (argForm)
        {
            var formObj = {};
            if(typeof argForm=="string"){
                formObj = document.getElementById(argForm);
            }else{
                formObj = argForm;
            }
            var i,queryString = "", and = "";
            var item; // for each form's object
            var itemValue;// store each form object's value
           var formValue = [];
            for( i=0;i<formObj.length;i++ ){
                item = formObj[i];// get form's each object
                if( item.name!='' ){
                    if( item.type == 'select-one' ){
                        itemValue = item.options[item.selectedIndex].value;
                    }else if( item.type=='checkbox' || item.type=='radio') {
                        if ( item.checked == false ){
                            continue;
                        }
                        itemValue = item.value;

                    }else if( item.type == 'button' || item.type == 'submit' || item.type == 'reset' || item.type == 'image'){// ignore this type
                        continue;
                    }else{
                        itemValue = item.value;
                    }
                    // itemValue = encodeURIComponent(itemValue);
                    //queryString += and + item.name + '=' + itemValue;
                   // and="&";
                    formValue.push(item.name+ " : "+ itemValue);
                }
            }
            return formValue;
        };
        this.initTool = function (){
            _that._createToolbar();
            _that._initTpl();

        };

    };
    var pageContextTools= new MaskTool();
    pageContextTools.initTool();
    window.pageContextTools = pageContextTools;

})(window);