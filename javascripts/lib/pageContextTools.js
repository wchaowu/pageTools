/**
 * Created by cwwu on 14-1-7.
 */


(function () {
    var h = document;
    var e =  {};
    // e._URL = "http://localhost/ubtcheck/";
    e._URL = "http://cdataportal.sh.ctripcorp.com/fx/ubtcheck/";
    e._CSS = '<link rel="stylesheet" type="text/css" href="' + e._URL + 'misc/common.css?v=1.0.3" media="all" />';
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
            a.width = 120;
            a.height = 170;
            a.scrolling = "no";
            a.allowtransparency = !0;
            h.body.appendChild(a);
            a.style.cssText = "position:fixed;_position:absolute;bottom:120px;left:0;z-index:10001;border:0";
            var b = a.contentWindow.document,
                c;
            c = "<!DOCTYPE html><html><head>" + e._CSS;
            c += '</head><body><ul class="sidebar">';
            c += '<li><a href="javascript:;" id="_checkUBTScript"><i class="icon icon-tasks"></i> \u811a\u672c\u68c0\u6d4b</a></li>';
            c += '<li><a href="javascript:;" id="_tracelogSearch"><i class="icon icon-search"></i> Tracklog\u67e5\u8be2</a></li>';
            c += '<li><a href="javascript:;" id="_performanceData"><i class="icon icon-time"></i> \u6027\u80fd\u6570\u636e</a></li>';
            c += '<li><a href="' + e._URL + 'doc.html" target="_blank"><i class="icon icon-book"></i> UBT\u6587\u6863</a></li>';
            c += '<li><a href="javascript:;" id="_close"><i class="icon icon-off"></i> \u5173\u95ed\u5de5\u5177</a></li>';
            c += "</ul>";
            c += "</body></html>";
            b.open();
            b.write(c);
            b.close();
            var k = this;
            e.on(b.body, "click", function(a) {
                a = a || f.event;
                a = a.target || a.srcElement;
                if ("a" == a.nodeName.toLowerCase() && (a = a.id && a.id.substring(1), _that[a])) _that[a]()
            });
            e.on(b.body, "keyup", function(a) {
                a = a || f.event;
                27 == a.keyCode && _that.hide()
            });
            e.on(f, "keyup", function(a) {
                a = a || f.event;
                27 == a.keyCode && _that.hide()
            });
            this.sidebar = a

        };
        this.hide = function () {
            this.dialog.style.display = "none"
        };
        this.close = function() {
            f.confirm("\u786e\u5b9a\u8981\u5173\u95edUBT\u68c0\u6d4b\u5de5\u5177\n\u5173\u95ed\u540e\u53ef\u4ee5\u901a\u8fc7\u70b9\u51fb\u6807\u7b7e\u680f\u201cUBT\u811a\u672c\u68c0\u6d4b\u201d\u518d\u6b21\u6253\u5f00\uff01") && (this.hide(),
                this.sidebar.style.display = "none")
        },
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
                    formValue.push(item.name+ "  "+ itemValue);
                }
            }
            return formValue;
        };
        this.initEvent = function (){
            var formToolsElement = document.createElement("li");
            formToolsElement.onclick = function (){
                var forms = document.getElementsByTagName("form");
                for(var i=0;i<forms.length;i++){
                    alert(_that.getFormObject(forms[i]));
                }
            }
            formToolsElement.innerHTML = "得到表单内容";
        };
        this.initTool = function (){
            _that._createToolbar();

        }

    };
    var pageContextTools= new MaskTool();
    pageContextTools.initTool();
    window.pageContextTools = pageContextTools;

})();
