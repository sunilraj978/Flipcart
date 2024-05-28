import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../action/user.action'
import Layout from './Layout'
import './style.css'


function Order() {

 const dispatch = useDispatch()

 const user = useSelector(state=>state.user)
 
 useEffect(()=>{
     dispatch(getOrders())
 },[])

    return (
        <div>
            <Layout>
            <div >
                {
                    user.orders.map(order=>
                        <div>
                            <style>{'body { background-color: #f1f3f6; }'}</style>
                            {
                                order.items.map((item)=>
                                <table>
                                    <tr>
                                    <th>Product Img</th>
                                        <th>Product Name</th>
                                        <th style={{paddingLeft:'40px'}}>Ratings</th>
                                        <th style={{paddingLeft:'40px'}}>Payment Status</th>
                                        
                                    </tr>
                                    <tr >
                                        <td><img style={{width:'50px'}}  src={`http://localhost:2000/public/${item.productId.productImg[0].img}`} alt={item.productId.productImg[0].img} /></td>
                                        <td>{item.productId.name}</td>
                                        <td style={{paddingLeft:'40px'}}></td>
                                        <td style={{paddingLeft:'40px'}}>{order.paymentStatus}</td>
                                    </tr>
                                </table>
                                )
                            }
                           </div> 
                        )
                }
            </div>
            </Layout>
        </div>
    )
}

export default Order
