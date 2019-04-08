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

	fn(resolve,reject); //执行器执行
}

Promise.prototype.then = function(onfulfilled,onrejected){
    // then 函数返回的是一个新的promise 
    let promise2 = new Promise((resolve,reject)=>{
        if(this.status === "fulfilled"){ // 成功状态
            try{
                let x = onfulfilled(this.value); //将上一个promise的返回值保存 x
                resolve(x) //传入上一个的值
            }catch(error){
                reject(error)//如果失败走 reject
            }
          
        }
        if(this.status === "rejected"){ // 失败状态
            try {
                let x = onrejected(this.reason);
                resolve(x)
            } catch (error) {
                reject(error)
            }
        }
    
        if(this.status === "pending"){
            this.onfulfilledCallback.push(()=>{
                try {
                    let x = onfulfilled(this.value)
                    resolve(x)
                } catch (error) {
                    reject(error)
                }
              
            })
            this.onrejectedCallback.push(()=>{
                try {
                    let x = onrejected(this.reason)
                    resolve(x)
                } catch (error) {
                    reject(error)
                }
               
            })
        }
    })
	return promise2
};


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
})