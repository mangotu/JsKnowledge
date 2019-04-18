// ... 展开运算符
let arr = [1,3,4]
console.log(...arr)

// 把两个数组 合并

let arrA = [1,2,3]
let arrB = [4,5,6]

console.log(arrA.concat(arrB))
console.log([...arrA,...arrB])

//对象

let obj1 = {
    a:1
}
let obj2 = {
    v:2
}
console.log({...obj1,...obj2})


// 深浅拷贝

// 浅拷贝  Object.assign  展开运算符 ... 
// 浅拷贝只解决了第一层的问题
    let a = {
        c:1
    }
    let b = Object.assign({},a)
    console.log(b)

    let c = {...a}
    console.log(c)

//深拷贝  JSON.parse(JSON.stringify(object))   递归函数
{
    let a = {
        c:1,
        b:function(){
            console.log(1111)
        },
        d:undefined,
        v:{
            a:2
        },
        e:null
    }

    let b = JSON.parse(JSON.stringify(a))

    a.v.a = 4
    console.log(b)

    //忽略了 函数 和 undefined  symbol
}
    


// 掌握类型判断 typeof instanceof  ObjectObject.prototype.toString.call()  constructor
function deepclone(obj){ //深拷贝解决  问题循环引用 内存泄漏
    if(!obj){
        return;
    }
    if(obj instanceof Date)return new Date(obj);
    if(obj instanceof RegExp)return new RegExp(obj);
    if(typeof obj !== "object")return obj;
    let cloneObj = new obj.constructor;// 利用构造函数 声明的就是数组 对象就是对象
    for(let key in obj){
        obj.hasOwnProperty(key)&& (cloneObj[key] =  deepclone(obj[key]));
    }
    return cloneObj;
}