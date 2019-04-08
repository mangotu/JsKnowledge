function Promise(fn){
	var that = this;
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
	if(this.status === "fulfilled"){ // 成功状态
		onfulfilled(this.value); 
	}

	if(this.status === "rejected"){ // 失败状态
		onrejected(this.reason);
	}

    if(this.status === "pending"){
        this.onfulfilledCallback.push(()=>{
            return onfulfilled(this.value)
        })
        this.onrejectedCallback.push(()=>{
            return onrejected(this.reason)
        })
    }
};


var p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject("err")
    },0)
})
p.then(data=>{
    console.log("异步:"+ data)
},error=>{  
    console.log("异步error:"+ error)
})