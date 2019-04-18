//特点 没有this 和 arguments (this指向外存的this指向

function a(x){}

let a = x =>x+1;


//this  1. .前面是谁 就指向谁

let obj = {
    a:1,
    fn:()=>{
        console.log(this.a)
    }
}

obj.fn()