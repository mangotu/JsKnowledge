function Promise(fn){
	let that = this;
	that.status = "pending"; //记录 promise 的状态  三种状态 1.pending 2.fulfilled 3.rejected
	that.value = undefined ; //promise 成功状态的 参数
	that.reason = undefined; //promise 失败状态的 参数
    that.onfulfilledCallback = []; //异步缓存成功的回掉
    that.onrejectedCallback = [];  //异步缓存失败的回掉
	function resolve(value){//成功
		that.status = "fulfilled";//更改 promise 状态
        that.value = value; //缓存参数
        that.onfulfilledCallback.forEach(fn => fn());
	}
     
	function reject(reason){//失败
		that.status = "rejected";//更改 promise 状态
        that.reason = reason;//缓存参数
        that.onrejectedCallback.forEach(fn => fn());
	}
    try {
        fn(resolve,reject); //执行器执行
    } catch (error) {
        reject(error)
    }
	
}

Promise.prototype.then = function(onfulfilled,onrejected){

    onfulfilled = typeof onfulfilled === "function" ? onfulfilled : x => x; //判断 then函数有没有成功的回掉函数 没有的话将上一个返回的参数返回
    onrejected = typeof onrejected === "function" ? onrejected : y => { throw y };//判断 then函数有没有失败的回掉函数 没有的话将上一个返回的参数返回

    // then 函数返回的是一个新的promise 
    let promise2 = new Promise((resolve,reject)=>{
        if(this.status === "fulfilled"){ // 成功状态
            setTimeout(()=>{ // 利用定时器 获取 promise2
                try{
                    let x = onfulfilled(this.value); //将上一个promise的返回值保存 x
                    promiseResolve(promise2,x,resolve,reject) //判断 x 到底是什么
                }catch(error){
                    reject(error)//如果失败走 reject
                }
            })
        }
        if(this.status === "rejected"){ // 失败状态
            setTimeout(()=>{
                try {
                    let x = onrejected(this.reason);
                    promiseResolve(promise2,x,resolve,reject) 
                } catch (error) {
                    reject(error)
                }
            })
        }
    
        if(this.status === "pending"){//异步缓存promise的回掉
            this.onfulfilledCallback.push(()=>{
                setTimeout(()=>{
                    try {
                        let x = onfulfilled(this.value)
                        promiseResolve(promise2,x,resolve,reject) 
                    } catch (error) {
                        reject(error)
                    }
                })
               
            })
            this.onrejectedCallback.push(()=>{ 
                setTimeout(()=>{
                    try {
                        let x = onrejected(this.reason)
                        promiseResolve(promise2,x,resolve,reject) 
                    } catch (error) {
                        reject(error)
                    }
                })
            })
        }
    })
	return promise2
};

function promiseResolve(promise2,x,resolve,reject){
    if(promise2 === x){ // x和promise2 不能相等
        return  reject(new TypeError("重复调用"))
    }
    let called = false; //创建一个变量 用于判读是否调用过这个函数
    if((x != null && typeof x === "object")||typeof x === "function"){//判断x是否是promise 或者 是对象
        let then = x.then//如果是pormise 肯定会有then函数
        if(typeof then === "function"){ //如果then是函数
            try {//执行then函数 如果有错catch捕获
                then.call(x,y=>{ 
                    if(called) return; //防止重复调用
                    called = true;
                    promiseResolve(promise2,y,resolve,reject) //递归判断 resolve 返回的值是否是普通值
                },r=>{
                    if(called) return; //防止重复调用
                    called = true;
                    reject(r)   //失败
                })
            } catch (error) {
                reject(err)//失败
            }
        }else{
            if(called) return; //防止重复调用
            called = true;
            resolve(x) //如果是对象值 直接返回
        }

    }else{
        resolve(x)
    }
}
Promise.resolve = function(data){
    return new Promise((resolve,reject)=>{
        resolve(data)
    })
}
Promise.reject = function(error){
    return new Promise((resolve,reject)=>{
        reject(error)
    })
}
    


Promise.all = function(arr){
    return new Promise((resolve,reject)=>{
        if(!(arr instanceof Array)){
            throw new TypeError("prmose must be Array!")
        }
        let len = arr.length; 
        let count = 0;
        let reslut = [];
        for(let i = 0; i < len; i++){
           ((i)=>{
                Promise.resolve(arr[i]).then(data=>{
                    count ++;
                    reslut.push(data);
                    if(count === len){
                        resolve(reslut)
                    }
                },err=>{
                    return reject(err);
                })
           })(i)
        }
    })
   
}

Promise.all([1,3]).then(data=>{
    console.log("prmoseall :" + data)
},err=>{
  console.log("all err :"+err)  
})
var p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("err")
    },0)
})
p.then(data=>{
    console.log("异步:"+ data)
    throw new Error("错误！！")
},error=>{  
    console.log("异步error:"+ error)
    return 111
}).then(data=>{
    console.log("then2:"+data)
},err=>{
    console.log("then2err:"+err)
    return new Promise((resolve,reject)=>{
        reject("88888")
    })
}).then().then(data=>{
    console.log("then3 :"+data)
},err=>{
    console.log("then 3 :" + err)
})
