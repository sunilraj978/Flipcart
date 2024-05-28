import { ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, CATEGORY_FETCH, FETCH_SUCCESS,ADD_CATEGORY_ERROR} from "../action/constant"

const initialState ={
    categories:[],
    loading:false
}


const Categoryreducer = (state=initialState,action)=>{
    
    switch(action.type){
        
        case FETCH_SUCCESS:
            state = {
                ...state,
                loading:false,
                categories:action.payload.categories
            }
            break;
        case ADD_CATEGORY_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case ADD_CATEGORY_SUCCESS:
            state={
                ...state,
                loading:false
            }
            break;
        case ADD_CATEGORY_ERROR:
            state ={
                ...initialState
            }
            break;                
        default:    
    }
    return state
}


export default Categoryreducer;