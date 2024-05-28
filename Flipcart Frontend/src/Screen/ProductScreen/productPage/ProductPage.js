import React,{useEffect} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {useDispatch,useSelector} from 'react-redux'
import { getProductSlug } from '../../../action/slugAction'
import splitParams from '../../Util/splitParams'

function ProductPage(props) {


    const dispatch = useDispatch()
    const product = useSelector(state=>state.product)

    useEffect(()=>{
        const params = splitParams(props.location.search)
        const payload = {
            params
        }
        dispatch(getProductSlug(payload))
    },[])

    return (
        <div>
            <h3>{product.Page.title}</h3>
            <Carousel>
                   {
                   product.Page.banners&&
                   product.Page.banners.map((banner,index)=>
                           <a style={{display:'block'}} href={banner.navigateTo}>
                               <img src={banner.img}  alt="" /> 
                           </a>          
                )}
                
            </Carousel>
            <div style={{width:'40px',height:'30px',display:'flex'}}>
                   {
                   product.Page.products&&
                   product.Page.products.map((pro,index)=>
                       <div style={{marginLeft:'auto',marginRight:'auto'}}>
                           <img src={pro.img} style={{width:'510px'}}  alt="" />
                           </div>
                )}
                </div>
        
        </div>
    )
}

export default ProductPage
