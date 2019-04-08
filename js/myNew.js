// new 的实现
function myNew(fn,...args){
	var obj = Object.create(fn.prototype);
	var newobj = fn.call(obj,...args);
	return newobj?newobj:obj;
}

function Person(name){
	this.name = name;
}

var a = myNew(Person,"1111");
console.dir(a);