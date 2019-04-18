//数组新方法
 let arr = [1,3,4]

 //es5



 // 常见 foreach  reduce  map filter  some(有一个符合条件就返回 true)  every 
//reduce 求和  
 let c = arr.reduce((a,b)=>{
    return a + b
 })
 console.log(c)

 // reduce 使用场景：多条数据合成一个数据

 {
     let keys = ['name','age']
     let values = ['sd',18]  // = > {name:"sd",age:18}

   let obj =  keys.reduce((a,b,index,current)=>{
            // a[b] = values[index];
            // return a;
           return (a[b] = values[index],a) //简写 ，运算符  返回，后面的结果
        //a 前一个
        //b 当前的
        //index 索引
        //当前的值
     },{})
     console.log(obj)
 }

 //reduec  实现
 Array.prototype.reduce = function(callback,prev){
    for(let i = 0;i < this.length;i++ ){
        if(prev === "undefined"){
            prev = callback(this[i],this[i+1],i+1,this)
            i++;
        }else{
            prev = callback(prev,this[i],i,this)
        }
    }
        return prev
 }

 let reslut = [1,3,2].reduce((a,b,index,arr)=>{
     console.log(index)
     console.log(arr)
        return a + b 
 })
 console.log(reslut)

 // map 映射
       let a = [1,2,3].map(item=>item*2)
       console.log(a) // 返回新的数组
// filter 过滤
        let a = [1,2,3].filter(item=>item!=2)
        console.log(a)// 返回过滤后的新数组

//some 有一项正确就返回 true 
        let flag = [1,2,3].some(item=>item == 2)
        console.log(flag)
//every 与some 相反 
        let flag = [1,2,3].every(item=>item == 1)
        console.log(flag)
//es6 find  findIndex

//find 

 let a = [1,3,2].find(item=>item == 1) // 找到对应条件的 那一项 并返回 找不到返回 undefined
 console.log(a)