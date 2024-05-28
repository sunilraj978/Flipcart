import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import Layout from './Layout'
import {Link} from 'react-router-dom'


function CartPage(props) {

    const [products,setProducts] = useState([])
    const cart = useSelector(state=>state.cart)
   
    
    
    useEffect(()=>{
        
        setProducts(Object.keys(cart.cartItems).map((key,index)=>
            cart.cartItems[key]
        ))
    },[cart.cartItems])
   
    const h = localStorage.getItem('cart',JSON.stringify(cart))
   

    const setItem = (name)=>{
        const pro = products.filter(prd=>prd.name !== name) 
        setProducts(pro)
        
        if(h.length === 0){
            localStorage.removeItem('cart')
        }
        else{
            localStorage.setItem('cart',JSON.stringify(pro))
           console.log("Hello")
        }

    }
   
    

    return (
    
        <>
        <Layout>
            
           {
               Object.keys(products).map((key,index)=>
               <div style={{marginLeft:"50px",padding:'30px'}} key={index}>
                   <div style={{display:'flex',padding:'4px'}}>
                   <img style={{width:'50px'}}  src={`http://localhost:2000/public/${products[key].img}`} alt={products[key].img} />
                   <div style={{display:'flex',flexDirection:'column'}}>
                   <strong>Name:</strong> {products[key].name}
                   <strong>Price:</strong>{products[key].price * products[key].qty }
                   <strong>Quantity:</strong>{ products[key].qty }
                   <button onClick={()=>setItem(products[key].name)} style={{padding:"10px",width:"180px",backgroundColor:"orange",border:"none"}}>Remove</button>
                   </div>
                   </div>
               </div>
               )
           }
           <Link to='/checkout'><button  style={{padding:"10px",width:"180px",backgroundColor:"orange",border:"none"}}>Check Out</button></Link>
        </Layout>
        </>
    )
}

export default CartPage
