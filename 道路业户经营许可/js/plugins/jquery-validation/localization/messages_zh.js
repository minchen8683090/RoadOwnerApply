(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "../jquery.validate"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
 */
$.extend( $.validator.messages, {
	required: "这是必填字段",
	remote: "请修正此字段",
	email: "请输入有效的电子邮件地址",
	url: "请输入有效的网址",
	date: "请输入有效的日期",
	dateISO: "请输入有效的日期 (YYYY-MM-DD)",
	number: "请输入有效的数字",
	digits: "请输入有效的整数",
	creditcard: "请输入有效的信用卡号码",
	equalTo: "你的输入不相同",
	extension: "请输入有效的后缀",
	maxlength: $.validator.format( "最多可以输入 {0} 个字符" ),
	minlength: $.validator.format( "最少要输入 {0} 个字符" ),
	rangelength: $.validator.format( "请输入长度在 {0} 到 {1} 之间的字符" ),
	range: $.validator.format( "请输入范围在 {0} 到 {1} 之间的数值" ),
	max: $.validator.format( "请输入不大于 {0} 的数值" ),
	min: $.validator.format( "请输入不小于 {0} 的数值" ),
	time: "请输入有效的时间,在 00:00 到 23:59 之间",
	mobile: "请输入有效的手机号码",
	phone: "请输入有效的电话号码",
	postcode: "请输入有效的邮政编码",
	qq:"请输入有效的QQ号码",
	ip:"请输入有效的IP地址",
	chrnum:"只能输入数字和字母(字符A-Z, a-z, 0-9)",
	chinese:"只能输入中文"
} );
return $;
}));