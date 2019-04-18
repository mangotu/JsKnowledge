// let 和 const 

// var 导致的问题

// 1.声明变量会污染全局作用域

    // var a = 1;
    // console.log(window.a)

// 2.变量提升的问题 

    // console.log(a) undefined
    // var a = 1;

// 3.可以被重复声明  
    
    // var a = 1; 
    // var a = 12; 
    // var a = 2; 

// 4.作用域问题，代码块外可以被访问 (常见的作用域 全局 函数)

    // {
    //     var a = 1
    // }
    // console.log(a)

    //let  会存在暂时性死区

    console.log(a)
    let a = 1;

// const 常量不可更改的

    const a = {
        r:1
    }
    a.r = 2 // 但是也存在特例 复杂类型 不更改地址 也能更改