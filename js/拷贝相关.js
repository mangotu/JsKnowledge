
//浅拷贝
//Object.assign()

//深拷贝
// JSON.parse(JSON.stringify)
// 递归

var a = {
    a :1,
    c:{
        a:{
            a :2
        }
    }
}

// var b = JSON.parse(JSON.stringify(a))
// a.a = 2
// console.log(b)

function deepClone(obj,result){
    var result = result || {};
        for(var item in obj){
            if(obj.hasOwnProperty(item)){
                if(typeof obj[item] === "object"){
                    if(obj[item] instanceof Array){
                      result[item] = deepClone(obj[item],[])
                    }else{
                      result[item] = deepClone(obj[item])
                    }
                }else{
                    result[item] = obj[item]
                }
            }
        }
    return result;
}

var c = deepClone(a)
a.c.a.a = 11;

console.log(c)