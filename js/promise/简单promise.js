function Promise(fn){
	var that = this;
	that.status = "pending"; //记录 promise 的状态  三种状态 1.pending 2.fulfilled 3.rejected
	that.value = undefined ; //promise 成功状态的 参数
	that.reason = undefined; //promise 失败状态的 参数
    
	function resolve(value){//成功
		that.status = "fulfilled";
		that.value = value;
	}
     
	function reject(reason){//成功
		that.status = "rejected";
		that.reason = reason;
	}

	fn(resolve,reject);
}

Promise.prototype.then = function(onfulfilled,onrejected){
	if(this.status === "fulfilled"){
		onfulfilled(this.value);
	}

	if(this.status === "rejected"){
		onfulfilled(this.reason);
	}

};


var p = new Promise(function(resolve,reject){
		resolve(333)
})
p.then(data=>{
	console.log(data +"111111")
},error=>{
	console.log(data +"222222")
})