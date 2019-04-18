// object.defineProperty 是不支持 数组更新的

let arr = [1,2,3]
let p = new Proxy(arr,{
    set(){
        console.log(arguments)
    },
    get(){

    }
})
p[0] = 1;