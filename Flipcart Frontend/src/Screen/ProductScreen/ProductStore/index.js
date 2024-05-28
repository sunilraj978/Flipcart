import React,{useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import { productSlug } from '../../../action/slugAction'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import './style.css'


function ProductStore(props){
    
    const dispatch = useDispatch()
    const [price] = useState({
        under5k:5000,
        under10k:10000,
        under15k:15000,
        under20k:20000,
        under30k:30000
    })
    const product = useSelector(state=>state.product)

    useEffect(()=>{
        
        const {match} = props
        dispatch(productSlug(match.params.slug))
    })

    return (
        <div>
             <div className="card">
                {
                  Object.keys(product.productByPrice).map((keys,index)=>{
                     
                      return(
                          <div>
                              <div style={{display:'flex',justifyContent:'space-between',padding:'20px'}}>
                                  {props.match.params.slug} Mobile under {price[keys]} 
                              <button>Show More</button>
                              </div>
                              <div style={{display:'flex',justifyContent:'space-evenly'}} className="card" >
                              {
                                  
                                  product.productByPrice[keys].map(product=>
                                        <Link to={`/${product.slug}/${product._id}/p`}>
                                            <div style={{display:'flex',alignContent:'center'}}>
                                        <img style={{width:'70px'}} src={`http://localhost:2000/public/${product.productImg[0].img}`} alt="" />
                                         </div>   
                                        <div style={{width:'160px',fontSize:'12px'}}>
                                            {product.name}
                                        </div>
                                        <div>
                                       <strong> ₹{product.price}</strong>
                                          </div> 
                                            </Link> 
                                    
                                        
                                        )
                              }
                              </div>
                              <br/>
                          </div>
                      )
                  })
              }
                </div>
        </div>
    )
}

export default ProductStore
