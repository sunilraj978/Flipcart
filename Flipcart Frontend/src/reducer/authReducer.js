const { LOGIN_REQUEST,LOGIN_SUCCESS, SIGN_OUT_REQUEST, SIGN_OUT_SUCCESS} = require("../action/constant")

const initialState ={
    token : null,
    user:{
        firstName:'',
        lastName:''
    },
    authenticating:false,
    authenticated:false,
    loading:false,
    message:''
}


const Auth =  (state=initialState,action)=>{
    
    switch(action.type){
        case LOGIN_REQUEST:
            state = {
                ...state,
                authenticating:true
            }
            break;
            case LOGIN_SUCCESS:
                state={
                    ...state,
                    user:action.payload.user,
                    token:action.payload.token,
                    authenticated:true,
                    authenticating:false
                }
                break;
            case SIGN_OUT_REQUEST:
                state={
                    ...state
                }  
            break;
            case SIGN_OUT_SUCCESS:
                state={
                    ...state
                }
                break;            
        default:
            
    }
    return state
}


export default Auth;