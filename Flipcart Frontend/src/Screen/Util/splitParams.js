const splitParams = (query)=>{
    if(query){
        const queryObj = query.split("?")[1];
        if(queryObj.length > 0){
            const Params = queryObj.split("&");

            const ParamsObj = {};

            Params.forEach(param=>{
                const keyValue = param.split('=');
                ParamsObj[keyValue[0]] = keyValue[1];
                console.log(ParamsObj)
            })
            return ParamsObj;
        }
        
    }
    return {}
}


export default splitParams;