Array.prototype.reduce = function(callback,prev){
    for(let i =  0; i++ ;i < this.length){
        if(prev === "undefined"){
                prev = callback(this[i],this[i+1],i+1,this)
                i++;
        }else{
            callback(prev,this[i],i,this)
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