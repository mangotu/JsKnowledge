// new 的实现
function myNew(fn,...args){
	var obj = Object.create(fn.prototype); //创建新的对象讲对象的 __proto__ 指向 构造函数的prototype
	var newobj = fn.call(obj,...args); //执行构造函数 并传入 对应参数
	return newobj?newobj:obj; //将新的对象返回
}

function Person(name){
	this.name = name;
}

var a = myNew(Person,"1111");
console.dir(a);