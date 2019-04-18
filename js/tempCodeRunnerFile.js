
 {
     function update(){
         console.log("更新视图")
     }
     let data = {
         name:"",
         age:18,
         location:{
             address:"1esdfa"
         }
     }

     function observe(obj){ // object.defineProperty  只能用 objcet 不识别数组
        if(typeof obj !== "object") return obj;

        for(let key in obj){
            defineReactive(obj,key,obj[key]) //vue 内部定义的一个函数
            // Object.defineProperty(obj,key,{
            //     get(){
            //         return obj[key]
            //     }
            // })
        }
     }

     function defineReactive(obj,key,value){

                Object.defineProperty(obj,key,{
                    get(){
                        return value
                    },
                    set(val){
                        update()
                       return value = val
                    }
                })
     }

     observe(data);
     data.name = "asdfa";
     
 }