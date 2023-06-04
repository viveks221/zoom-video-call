const obj ={
    id : {
        o:1234,
        1:12345,
        2:12345678
    },
    date:{
        o:0909,
        1: 57568,
        2:87907
    }

}

Object.keys(obj).forEach(val=>{
    console.log(Object.keys(obj[val]))
})