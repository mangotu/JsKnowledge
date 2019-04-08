
funtion isType(type){
    return function(params){
        return Object.prototype.toString.call(params) ==`[object ${type}]`;
    }
}
