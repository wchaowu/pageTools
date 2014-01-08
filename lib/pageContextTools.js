/**
 * Created by cwwu on 14-1-7.
 */


(function () {
    var divMask = '<div  id="_mask" ' +
        'style="display: none;  position: absolute;   top: 0;  left: 0;  width: 100%;  background-color: black;  z-index:101;  -moz-opacity: 0.2;  opacity:.20;  filter: alpha(opacity=20);"' +
        ' ></div>' +
        '<div id="_loadFrom" style="z-index: 1000;  display: none; color:Black; background-color:White;position: absolute;height:60px; left: 40%; top: 40%; width:340px; height: auto;">' +
        '<div id="_loadImg">' +
        '<div style=" font-size:14px;margin:20px 0 10px 10px;float:left; width:260px;"><h3>>系统工具</h3><br /><ul  id="_jsTools"><li>关于我们</li></ul>' +
        '</div> </div></div>';
		doucment.open();
        document.write(divMask);
	    doucment.close()
    var MaskTool = function () {
        var maskObj = document.getElementById("_mask");
        var loadFrom = document.getElementById("_loadFrom");
        var jsTools = document.getElementById("_jsTools");
        var _that = this;
        this.pageScroll = function () {
            loadFrom.style.top = (document.documentElement.scrollTop +
                (document.documentElement.clientHeight - maskObj.offsetHeight) / 2 - 40) + "px";
            loadFrom.style.left = (document.documentElement.scrollLeft +
                (document.documentElement.clientWidth - maskObj.offsetWidth) / 2 - 100) + "px";
        };
        this.show = function () {
            _that.pageScroll();
            var b = document.documentElement.clientHeight ? document.documentElement : document.body;
            maskObj.style.height = (b.scrollHeight > b.clientHeight ? b.scrollHeight : b.clientHeight)+"px";
            maskObj.style.display= "";
            loadFrom.style.display = "";

        };
        this.hide = function () {
            _that.pageScroll();
            maskObj.style.display = "none";
            loadFrom.style.display = "none";
        };
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
        this.initTool = function (){
            var formToolsElement = document.createElement("li");
            formToolsElement.onclick = function (){
                var forms = document.getElementsByTagName("form");
                for(var i=0;i<forms.length;i++){
                    alert(_that.getFormObject(forms[i]));
                }
            }
            formToolsElement.innerHTML = "得到表单内容";
            jsTools.appendChild(formToolsElement);
        };

    };
    var pageContextTools= new MaskTool();
    pageContextTools.show();
    pageContextTools.initTool();
    window.pageContextTools = pageContextTools;

})();
