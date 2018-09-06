/**
 * @file custom.js 自定义方法
 */

$(function () {
    //初始化样式
    initStyle();

    //初始化事件
    initEvent();

    //初始化jqGrid
    initJqGrid();

    //初始化bootstrapTable
    initBootstrapTable();

    var w2 = parseInt($('.ui-jqgrid-labels>th:eq(2)').css('width')) - 3;
    $('.ui-jqgrid-lables>th:eq(2)').css('width', w2);
    $('#grid-table tr').find("td:eq(2)").each(function () {
        $(this).css('width', w2);
    });

});

/**
 * 初始化样式
 */
function initStyle() {
    //所有的input[type='text'][type='password'][type='email']、select、textarea加样式form-control
    $("input[type='text'],input[type='password'],input[type='email'],select,textarea").addClass('form-control').attr("data-toggle", "tooltip").attr("data-placement", "top");

    $("input[required]").addClass('mustinput');
}

/**
 * 初始化事件
 */
function initEvent() {
    //点击[查询区域]->[高级]事件
    clickSearchMore();

    //点击[标题区域]->[按钮]事件
    clickTitleToolsBtn();

    //初始化提示框
    $('[data-toggle="tooltip"]').tooltip();
}

/**
 * 初始化jqGrid
 */
function initJqGrid() {
    if ($.jgrid != undefined) {
        var width = $("#gridWrapper").width();
        $("#grid").setGridWidth(width);

        //当调整浏览器窗口的大小时，改变grid大小
        $(window).bind("resize", function () {
            var width = $("#gridWrapper").width();
            $("#grid").setGridWidth(width);
        });

        //jqGrid初始化
        $.jgrid.defaults = {
            styleUI: "Bootstrap",
            datatype: "json", //从服务器端返回的数据类型，默认xml。可选类型：xml，local，json，jsonnp，script，xmlstring，jsonstring，clientside
            mtype: "GET",    //ajax提交方式。POST或者GET，默认GET
            pager: "#gridPager",//定义翻页用的导航栏，必须是有效的html元素。翻页工具栏可以放置在html页面任意位置
            height: "auto", //mixed   表格高度，可以是数字，像素值或者百分比 150 否
            autowidth: true, //如果为ture时，则当表格在首次被创建时会根据父元素比例重新调整表格宽度。如果父元素宽度改变，为了使表格宽度能够自动调整则需要实现函数：setGridWidth
            caption: "", //表格名称
            emptyrecords: "抱歉，没有找到符合条件的数据", //string  当返回的数据行数为0时显示的信息。只有当属性 viewrecords 设置为ture时起作用      是
            viewrecords: true, //定义是否要显示总记录数
            altRows: true, //设置表格 zebra-striped 值
            altclass: "ui-priority-secondary", //用来指定行显示的css，可以编辑自己的css文件，只有当altRows设为 ture时起作用
            shrinkToFit: true, //boolean 此属性用来说明当初始化列宽度时候的计算类型，如果为ture，则按比例初始化列宽度。如果为false，则列宽度使用colModel指定的宽度   true    否
            forceFit: true, //boolean 当为ture时，调整列宽度不会改变表格的宽度。当shrinkToFit 为false时，此属性会被忽略 false   否
            loadtext: "加载中", //string  当请求或者排序时所显示的文字内容    Loading.... 否
            multikey: "",    //string  只有在multiselect设置为ture时起作用，定义使用那个key来做多选。shiftKey，altKey，ctrlKey 空值  是
            multiboxonly: false,     //boolean 只有当multiselect = true.起作用，当multiboxonly 为ture时只有选择checkbox才会起作用 false   是
            multiselect: false, //boolean 定义是否可以多选    false   否
            multiselectWidth: 20,    //integer 当multiselect为true时设置multiselect列宽度  20  否
            rowNum: 10, //在grid上显示记录条数，这个参数是要被传递到后台
            rowList: [10, 20, 30, 100],//一个下拉选择框，用来改变显示记录数，当选择时会覆盖rowNum参数传递到后台
            rownumbers: false, //boolean 如果为ture则会在表格左边新增一列，显示行顺序号，从1开始递增。此列名为'rn'.  false   否
            rownumWidth: 25, //integer 如果rownumbers为true，则可以设置column的宽度    25  否sortname: "OrderNo", //默认的排序列。可以是列名称或者是一个数字，这个参数会被提交到后台
            loadComplete: function () {
                $(this).closest(".ui-jqgrid-bdiv").css({ 'overflow-x': 'hidden' });
            }
        };
    }
}

/**
 * 初始化bootstrapTable
 */
function initBootstrapTable() {
    //bootstrapTable初始化
    if ($.fn.bootstrapTable != undefined) {
        var btDefaults = $.fn.bootstrapTable.defaults;
        btDefaults.method = "post"; //服务器数据的请求方式 'get' or 'post'
        btDefaults.dataType = "json"; //服务器返回的数据类型
        btDefaults.cache = false; //设置为 false 禁用 AJAX 数据缓存
        btDefaults.striped = true; //隔行变色效果
        btDefaults.pagination = true; //表格底部显示分页条
        btDefaults.pageNumber = 1; //如果设置了分页，首页页码
        btDefaults.pageSize = 10; //如果设置了分页，页面数据条数
        btDefaults.pageList = [10, 20, 30]; //如果设置了分页，设置可供选择的页面数据条数
        btDefaults.sidePagination = 'client'; //设置在哪里进行分页，可选值为 'client' 或者 'server'。设置 'server'时，必须设置 服务器数据地址（url）或者重写ajax方法
        btDefaults.clickToSelect = true; //在点击行时，自动选择rediobox 和 checkbox

        btDefaults.classes = 'table table-hover'; //表格的类名称。默认情况下，表格是有边框的，你可以添加 'table-no-bordered' 来删除表格的边框样式。
        btDefaults.showHeader = true; //是否显示列头
        btDefaults.showFooter = false; //是否显示列脚
        btDefaults.showColumns = true; //是否显示 内容列下拉框
        btDefaults.singleSelect = false; //设置True 将禁止多选
        btDefaults.checkboxHeader = true; //设置false 将在列头隐藏check-all checkbox .
    }
}

/**
 * 点击[查询区域]->[高级]事件
 */
function clickSearchMore() {
    $(".ibox-search .search-collapse-link").click(function () {
        var o = $(this).closest("div.ibox"),
            e = $(this).find("i"),
            i = o.find("div.ibox-search-more");

        i.slideToggle(200), e.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"), o.toggleClass(""), setTimeout(function () {
            o.resize(), o.find("[id^=map-]").resize()
        }, 50)
    });
}

/**
 * 点击[标题区域]->[按钮]事件
 */
function clickTitleToolsBtn() {
    $(".collapse-link").click(function () {
        var o = $(this).closest("div.ibox"),
            e = $(this).find("i"),
            i = o.find("div.ibox-content");

        i.slideToggle(200), e.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"), o.toggleClass("").toggleClass("border-bottom"), setTimeout(function () {
            o.resize(), o.find("[id^=map-]").resize()
        }, 50);
    });

    $(".close-link").click(function () {
        var o = $(this).closest("div.ibox");
        o.remove();
    });
}

/**
 * 阻止冒泡
 */
function searchClose(e) {
    e ? e.stopPropagation() : event.cancelBubble = true;
}

/******************************Dialog Start***********************************/
/**
 * 普通信息框
 * @param {number} type 信息类型
 *        1:成功提醒
 *        2:错误提醒
 *        6:信息提醒
 * @param {string} content 信息提示内容
 * @param {number=} time 可选参数，设置自动关闭的时间(秒)，默认不自动关闭
 * @param {(string|boolean)=} title 可选参数，标题，默认不显示标题
 *        string：标题内容
 *        boolean: 是否显示标题
 */
function layerAlert(type, content, time, title) {
    time = (time || 0) * 1000;
    title = title || false;

    layer.alert(content, {
        icon: type,
        time: time,
        title: title
    });
}

/**
 * 成功提醒
 * @param {string} content 信息提示内容
 * @param {number=} time 可选参数，设置自动关闭的时间(秒)，默认不自动关闭
 * @param {(string|boolean)=} title 可选参数，标题，默认不显示标题
 *        string：标题内容
 *        boolean: 是否显示标题
 */
function layerSuccess(content, time, title) {
    layerAlert(1, content, time, title);
}

/**
 * 错误提醒
 * @param {string} content 信息提示内容
 * @param {number=} time 可选参数，设置自动关闭的时间(秒)，默认不自动关闭
 * @param {(string|boolean)=} title 可选参数，标题，默认不显示标题
 *        string：标题内容
 *        boolean: 是否显示标题
 */
function layerDanger(content, time, title) {
    layerAlert(2, content, time, title);
}

/**
 * 信息提醒
 * @param {string} content 信息提示内容
 * @param {number=} time 可选参数，设置自动关闭的时间(秒)，默认不自动关闭
 * @param {(string|boolean)=} title 可选参数，标题，默认不显示标题
 *        string：标题内容
 *        boolean: 是否显示标题
 */
function layerInfo(content, time, title) {
    layerAlert(6, content, time, title);
}

/**
 * 确认提醒框
 * @param {string} content 信息提示内容
 * @param {Function} funYes 点“确定”时候的事件
 */
function layerConfirm(content, funYes) {
    funYes = funYes || function () { };

    layer.confirm(content, { icon: 3, title: false },
        function (index) {
            funYes();
            layer.close(index);
        }
    );
}

/**
 * 打开加载层
 * @param {number=} time 可选参数，设置自动关闭的时间(秒)，默认不自动关闭
 * @return {number} 返回层的index
 */
function layerLoad(time) {
    time = (time || 0) * 1000;

    var index = layer.load(1, {
        time: time,
        shade: [0.3, '#000']
    });

    return index;
}

/**
 * 关闭加载层
 * @param {number=} index 加载层的index
 */
function layerLoadClose(index) {
    layer.close(index);
}

/**
 * 弹出页面
 * @param {string} id 用于控制弹层唯一标识
 * @param {string} title 标题
 * @param {string} url 标题
 * @param {number} width 标题
 * @param {number} height 标题
 * @param {Function=} callback 可选参数，回调方法
 */
function layerOpen(id, title, url, width, height, callback) {
    height = height + "px";
    width = width + "px";
    //callback = callback || function () { };

    parent.layer.open({
        id: id,
        type: 2, //iframe层
        title: title,
        content: url,
        area: [width, height], //宽高
        //offset: [top, left], //坐标
        closeBtn: 1, //右上角关闭按钮
        shade: [0.3, '#000'], //阴影
        time: 0, //自动关闭时间
        anim: 0, //动画
        maxmin: true, //最大最小化
        fixed: false, //是否固定
        resize: true, //是否允许拉伸
        scrollbar: true, //是否允许浏览器出现滚动条
        moveOut: true, //是否允许拖拽到窗口外
        zIndex: parent.layer.zIndex, //设置新弹出的窗口在最上层
        success: function (layero, index) {
            parent.layer.setTop(layero);
        }
    });

    //保存callback，根据子窗口的index来索引
    if (callback && typeof (callback) === "function") {
        share.data(parent.layer.index, callback);
    }
}

/**
 * 关闭页面
 */
function layerClose(data) {
    data = data || "";

    //先得到当前iframe层的索引
    var index = parent.layer.getFrameIndex(window.name);

    //取得callback
    var callback = share.remove(index);
    if (callback && typeof (callback) === "function") {
        //callback初始是由父窗口创建的，所以此时回调时，仍然是父窗口执行的。
        callback(data);
    }

    //关闭窗口
    parent.layer.close(index);
}


var share = {
    /**
     * 跨框架数据共享接口
     * @param {string} 存储的数据名
     * @param {Object} 将要存储的任意数据(无此项则返回被查询的数据)
     */
    data: function (name, value) {
        var top = window.top,
            cache = top['_CACHE'] || {};
        top['_CACHE'] = cache;

        return value !== undefined ? cache[name] = value : cache[name];
    },

    /**
     * 数据共享删除接口
     * @param {string} 删除的数据名
     */
    remove: function (name) {
        var cache = window.top['_CACHE'];
        var value = null;
        if (cache && cache[name]) {
            value = cache[name];
            delete cache[name];
        }
        return value;
    }
};
/******************************Dialog End***********************************/

/******************************常用验证 Start***********************************/
function trim(str) {
    str = str.replace(/^(\s|\u00A0)+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}

/*
 * 根据身份证设置生日
 */
function setBirthday() {
    var birthdayValue;
    var val = trim($("#idCertNum").val());

    if (val.length == 0) return;

    if (18 != val.length) {
        layerDanger("证件号不是合法的！");
        return;
    }

    if (!checkIDCard(val)) {
        layerDanger("证件号不是合法的！");
        return;
    }

    if (15 == val.length) { //15位身份证号码
        birthdayValue = val.charAt(6) + val.charAt(7);
        if (parseInt(birthdayValue) < 10) {
            birthdayValue = '20' + birthdayValue;
        }
        else {
            birthdayValue = '19' + birthdayValue;
        }
        birthdayValue = birthdayValue + '-' + val.charAt(8) + val.charAt(9) + '-' + val.charAt(10) + val.charAt(11);

        if (parseInt(val.charAt(14) / 2) * 2 != val.charAt(14)) {
            $("#sex").val('1');
        }
        else {
            $("#sex").val('2');
        }
        $("#birthday").val(birthdayValue);
    }
    if (18 == val.length) { //18位身份证号码
        birthdayValue = val.charAt(6) + val.charAt(7) + val.charAt(8) + val.charAt(9) + '-' + val.charAt(10) + val.charAt(11)
            + '-' + val.charAt(12) + val.charAt(13);
        if (parseInt(val.charAt(16) / 2) * 2 != val.charAt(16)) {
            $("#sex").val('1');
        }
        else {
            $("#sex").val('2');
        }
        $("#birthday").val(birthdayValue);
    }

    $("#birthday").val(birthdayValue);
}

// 18位身份证号最后一位校验
function IDCard(Num) {
    if (Num.length != 18)
        return false;
    var x = 0;
    var y = '';

    for (i = 18; i >= 2; i--)
        x = x + (square(2, (i - 1)) % 11) * parseInt(Num.charAt(19 - i - 1));
    x %= 11;
    y = 12 - x;
    if (x == 0)
        y = '1';
    if (x == 1)
        y = '0';
    if (x == 2)
        y = 'X';
    return y;
}

// 求得x的y次方
function square(x, y) {
    var i = 1;
    for (j = 1; j <= y; j++)
        i *= x;
    return i;
}

/**
 * 验证身份证号合法性
 * @param  {[type]} idcard [description]
 */
function checkIDCard(idcard) {
    console.log(idcard);
    var Errors = new Array(
        "验证通过!",
        "身份证号码位数不对!",
        "身份证号码出生日期超出范围或含有非法字符!",
        "身份证号码校验错误!",
        "身份证地区非法!"
    );
    var area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }

    var idcard, Y, JYM;
    var S, M;
    var idcard_array = new Array();
    idcard_array = idcard.split("");
    //地区检验   
    if (area[parseInt(idcard.substr(0, 2))] == null)
        return false; //return Errors[4];   
    //身份号码位数及格式检验   
    switch (idcard.length) {
        case 15:
            if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                //测试出生日期的合法性   
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
            }
            else {
                //测试出生日期的合法性   
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
            }
            if (ereg.test(idcard))
                return true; //return Errors[0];   
            else
                return false; //return Errors[2];   
            break;
        case 18:
            //18位身份号码检测   
            //出生日期的合法性检查    
            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))   
            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))   
            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                //闰年出生日期的合法性正则表达式   
                ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
            }
            else {
                //平年出生日期的合法性正则表达式   
                ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
            }
            if (ereg.test(idcard)) {
                //测试出生日期的合法性   
                //计算校验位   
                S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                    + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                    + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                    + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                    + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                    + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                    + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                    + parseInt(idcard_array[7]) * 1
                    + parseInt(idcard_array[8]) * 6
                    + parseInt(idcard_array[9]) * 3;
                Y = S % 11;
                M = "F";
                JYM = "10X98765432";
                M = JYM.substr(Y, 1); //判断校验位   
                if (M == idcard_array[17])
                    return true; //return Errors[0]; //检测ID的校验位   
                else
                    return false; //return Errors[3];   
            }
            else
                return false; //return Errors[2];   
            break;
        default:
            return false; //return Errors[1];   
            break;
    }
}

//验证统一社会信用代码
function checkSocialCreditCode(Code) {
    var patrn = /^[0-9A-Z]+$/;
    //18位校验及大写校验
    if ((Code.length != 18) || (patrn.test(Code) == false)) {
        console.info("不是有效的统一社会信用编码！");
        return false;
    }
    else {
        var Ancode;//统一社会信用代码的每一个值
        var Ancodevalue;//统一社会信用代码每一个值的权重 
        var total = 0;
        var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];//加权因子 
        var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
        //不用I、O、S、V、Z 
        for (var i = 0; i < Code.length - 1; i++) {
            Ancode = Code.substring(i, i + 1);
            Ancodevalue = str.indexOf(Ancode);
            total = total + Ancodevalue * weightedfactors[i];
            //权重与加权因子相乘之和 
        }
        var logiccheckcode = 31 - total % 31;
        if (logiccheckcode == 31) {
            logiccheckcode = 0;
        }
        var Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
        var Array_Str = Str.split(',');
        logiccheckcode = Array_Str[logiccheckcode];


        var checkcode = Code.substring(17, 18);
        if (logiccheckcode != checkcode) {
            console.info("不是有效的统一社会信用编码！");
            return false;
        } else {
            console.info("yes");
        }
        return true;
    }
}

//验证组织机构代码
function checkOrganCode(organCode) {

    if (organCode == null) {
        return false;
    }

    // 长度校验
    if (organCode.length != 10 && organCode.length != 9) {
        return false;
    }

    if (organCode.length == 10 && organCode.charAt(8) != '-') {
        return false;
    }

    // 统一格式
    if (organCode.length == 10 && organCode.charAt(8) == '-') {
        organCode = organCode.substring(0, 8) + organCode.substring(9);
    }

    // 格式校验
    var regex = /^([0-9ABCDEFGHJKLMNPQRTUWXY]{8})([0-9X])$/;
    if (!regex.test(organCode)) {
        return false;
    }

    // 循环计算校验位
    var sum = 0;
    for (var i = 0; i < organCode.length - 1; i++) {
        var c = organCode.charAt(i);
        sum += Constant.ORGAN_CONTAIN_CHARS.indexOf(c) * Constant.ORGAN_WEIGHT[i];
    }
    var c9 = (11 - sum % 11) == 11 ? 0 : 11 - sum % 11;
    var checkCode = c9 == 10 ? "X" : new Number(c9).toString();


    if (checkCode === organCode.substring(8)) {
        return true;
    }

    return false;
}
/******************************常用验证 End***********************************/
/**
 * 绑定日期控件
 * @type {String}
 */
$('.date').datetimepicker({
    language: 'zh-CN',
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    forceParse: 0,
    showMeridian: false,
    autoclose: true,
    startView: 2,
    minView: 2
});

/**
 * 绑定时间控件
 * @type {String}
 */
$('.time').datetimepicker({
    language: 'zh-CN',
    weekStart: 1,
    todayBtn: 1,
    autoclose: true
});