/**
 * 省市区三级联动
 */

let EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false)
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

}
let optionKinds = {
    "province": {
        "湖北省": ['武汉市', '十堰市', '襄樊市', '荆门市', '孝感市', '黄冈市', '鄂州市', '黄石市', '咸宁市', '荆州市', '宜昌市', '随州市', '省直辖县级行政单位', '恩施土家族苗族自治州']
    },
    "city": {
        "武汉市": ['江岸区', '江汉区', '硚口区', '汉阳区', '武昌区', '青山区', '洪山区', '东西湖区', '汉南区', '蔡甸区', '江夏区', '黄陂区', '新洲区'],
        "十堰市": ['茅箭区', '张湾区', '郧县', '郧西县', '竹山县', '竹溪县', '房县', '丹江口市'],
        "襄樊市": ['襄城区', '樊城区', '襄阳区', '南漳县', '谷城县', '保康县', '老河口市', '枣阳市', '宜城市'],
        "荆门市": ['东宝区', '掇刀区', '京山县', '沙洋县', '钟祥市'],
        "孝感市": ['孝南区', '孝昌县', '大悟县', '云梦县', '应城市', '安陆市', '汉川市'],
        "黄冈市": ['黄州区', '团风县', '红安县', '罗田县', '英山县', '浠水县', '蕲春县', '黄梅县', '麻城市', '武穴市'],
        "鄂州市": ['梁子湖区', '华容区', '鄂城区'],
        "黄石市": ['黄石港区', '西塞山区', '下陆区', '铁山区', '阳新县', '大冶市'],
        "咸宁市": ['咸安区', '嘉鱼县', '通城县', '崇阳县', '通山县', '赤壁市'],
        "荆州市": ['沙市区', '荆州区', '公安县', '监利县', '江陵县', '石首市', '洪湖市', '松滋市'],
        "宜昌市": ['西陵区', '伍家岗区', '点军区', '猇亭区', '夷陵区', '远安县', '兴山县', '秭归县', '长阳土家族自治县', '五峰土家族自治县', '宜都市', '当阳市', '枝江市'],
        "随州市": ['曾都区', '广水市'],
        "省直辖县级行政单位": ['仙桃市', '潜江市', '天门市', '神农架林区'],
        "恩施土家族苗族自治州": ['恩施市', '利川市', '建始县', '巴东县', '宣恩县', '咸丰县', '来凤县', '鹤峰县'],
    },
};

function turn_arr(oJsonArr) {
    let iCount = 0;
    let turn_json_arr = [];
    for (key in oJsonArr) {
        turn_json_arr.push(key);
    }
    return turn_json_arr;
}

function init(which_select, keyWord, which_select_son) {
    let placeOption = '';
    let option_arr = turn_arr(optionKinds[keyWord]);
    for (let i = 0; i < option_arr.length; i++) {
        placeOption += "<option value='" + option_arr[i] + "'>" + option_arr[i] + "</option>";
    }
    which_select.innerHTML = placeOption;
    relevance_place(which_select, keyWord, which_select_son); //初始化与之相关联的子列表
}

function relevance_place(which_select, keyWord, which_select_son) {
    let placeOption_son = '';
    for (let i = 0; i < which_select.length; i++) {
        if (which_select[i].selected) {
            for (key in optionKinds[keyWord]) {
                if (key == which_select[i].value) {
                    for (let i = 0; i < optionKinds[keyWord][key].length; i++) {
                        placeOption_son += "<option value='" + optionKinds[keyWord][key][i] + "'>" + optionKinds[
                            keyWord][key][i] + "</option>"
                    }
                    which_select_son.innerHTML = placeOption_son
                }
            }
        }
    }
}
init(document.getElementById('province'), "province", document.getElementById('city'));
init(document.getElementById('city'), "city", document.getElementById('town'));
EventUtil.addHandler(document.getElementById('province'), 'change', function () {
    relevance_place(document.getElementById('province'), "province", document.getElementById('city'));
    relevance_place(document.getElementById('city'), 'city', document.getElementById('town'));
});
EventUtil.addHandler(document.getElementById('city'), 'change', function () {
    relevance_place(document.getElementById('city'), 'city', document.getElementById('town'));
})