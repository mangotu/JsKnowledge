// 通过 Object.defineProperty 可以增加拦截器

let obj = {};
let other = ""
Object.defineProperty(obj,'name',{
    value:"hello",
    enumerable:true,// 可枚举 可见的 如果没这熟悉就是隐藏熟悉  obj 还是 {}
    configurable:true,//是否可配置  删除  
    writable:true,// 是否可以重写
    get(){ //获取  当有 get set 时 writable 不可以设置 
        return other;
    },
    set(val){ //设置
        other = val
    }
})
console.log(obj.name)

console.log(obj)
{
    // 对象的 getter setter 
    let obj = {
        other : "123",
        get name(){
            return this.other
        },
        set name(val){
            this.other = val
        }
    }
    obj.name = "456";
    console.log(obj.name)
}


// vue 的数据劫持 （把所有的属性改成 get set 方法

 {
     function update(){
         console.log("更新视图")
     }
     let data = {
         name:"",
         age:18,
         location:{
             address:"1esdfa"
         }
     }

     function observe(obj){ // object.defineProperty  只能用 objcet 不识别数组
        if(typeof obj !== "object") return obj;

        for(let key in obj){
            defineReactive(obj,key,obj[key]) //vue 内部定义的一个函数
            // Object.defineProperty(obj,key,{
            //     get(){
            //         return obj[key]
            //     }
            // })
        }
     }

     function defineReactive(obj,key,value){
                observe(value) // 如果value 是对象在 绑定一次
                Object.defineProperty(obj,key,{
                    get(){
                        return value
                    },
                    set(val){
                        if(value !== val){
                            update()
                            value = val
                        }
                       
                    }
                })
     }

     observe(data);
     data.name = "asdfa";
     //vue 不支持数组操作的方法 所有重写了 vue的 数组操作方法

     let methods = ["push","pop","shift","unshift","sort","reverse","slice"]

    methods.forEach(method=>{
        let oldMethod = Array.prototype[method];
        Array.prototype[method] = function(){

            update();
            oldMethod.call(this,...arguments);
        }

    })

 }