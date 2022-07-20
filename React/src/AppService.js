


//rest api call 
export function fetchPost(url,param){
    return fetch(url,{
        method:"POST",
        headers:{
            'Content-type':"application/json"
        },
        body:JSON.stringify(param)
    }).then(res=>{
            if(!res.ok){
               let err = res.json();
                throw err;
            }
            return res.json();
        }
    )
}


export function fetchFileUpload(url,param){
    return fetch(url,{
        method:"POST",
        body:param
    }).then(res=>{
            if(!res.ok){
               let err = res.json();
                throw err;
            }
            return res.json();
        }
    )
}
export function fetchPut(url,param){
    return fetch(url,{
        method:"PUT",
        headers:{
            'Content-type':"application/json"
        },
        body:JSON.stringify(param)
    }).then(res=>{
            if(!res.ok){
               let err = res.json();
                throw err;
            }
            return res.json();
        }
    )
}
export function fetchPatch(url,param){
    return fetch(url,{
        method:"PATCH",
        headers:{
            'Content-type':"application/json"
        },
        body:JSON.stringify(param)
    }).then(res=>{
            if(!res.ok){
               let err = res.json();
                throw err;
            }
            return res.json();
        }
    )
}
export function fetchDelete(url){
    return fetch(url,{
        method:"DELETE",
        headers:{
            'Content-type':"application/json"
        }
    }).then(res=>{
            if(!res.ok){
               let err = res.json();
                throw err;
            }
            return res.json();
        }
    )
}

export function fetchGet(url){
    return fetch(url).then(res=>res.json());
}

export function isLogin(){
    let token = localStorage.getItem("token");
    if(token == undefined || token == ""){
        return false;
    }else{
        return true;
    }
}
export function getUserId(){
    let user_id = localStorage.getItem("user_id");
    if(user_id == undefined || user_id == ""){
        return 1;
    }else{
        return user_id;
    }
}
export function logout(){
    
    localStorage.setItem("token","");//clear the token
}