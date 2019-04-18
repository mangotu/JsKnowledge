//set集合  map映射 

//set 不能方重复的

let a = new Set([1,1,1,1,3,3,3,4])
console.log(a)
console.log(typeof a)
console.log(Object.prototype.toString.call([...a])) //转数组  Array.from(obj)
console.log(Object.prototype.toString.call(Array.from(a)))

//set 方法
a.add("5")
a.delete(1) // 无序添加删除
console.log(a.has(3))

console.log(a)
console.log(a.values()) //Object.values 取对象中的值并以数组返回

//map 是有key的 且不能重复 
let b = new Map();

b.set("name",111)
console.log(b)


//Weakmap 的 key 必须好似对象类型  引用对象不会暂用内存空间 会销毁 map 就会一直占用对象的地址 不会销毁

{
    let m = new WeakMap()
    m.set({name:1},"xxxx")
    console.log(m)
}