import React,{useEffect, useState} from 'react'
import Layout from '../Layout'
import AddressForm from '../checkOut/AddressForm'
import './style.css'
import { addOrder, getOrders } from "../../action/user.action";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from '../../action/user.action';

function Index() {
    const auth = useSelector((state) => state.auth);
    const user = useSelector((state)=>state.user);
    const cart = useSelector(state=>state.cart)
    const [address,setAddress] = useState([]);
    const [selectedAddress,setSelectedAddress] = useState(null)
    const [delivery,setDelivery] = useState(null);
    const [confirm,setConfirm] = useState(false);
    const [orderSummery,setOrder] = useState(false)
    const dispatch = useDispatch();



    useEffect(()=>{
      dispatch(getAddress());
    }, [auth.authenticated]);

    useEffect(()=>{
        dispatch(getOrders());
    },[])


    useEffect(()=>{
        const displayAddress = user.address.map(adr=>({...adr,selected:false,edit:false}))
        setAddress(displayAddress)
        
    },[user.address])

    const selectAdd = (adr)=>{
        const updatedAddress = address
        .map(add=>add._id === adr._id?{...add,selected:true}:{...add,selected:false})
        setAddress(updatedAddress)
    } 


    const Delivery = (add)=>{
        setDelivery(add);
        setConfirm(true);
        setSelectedAddress(add)
        setOrder(true)
    }


    const onConfirmOrder = () => {
        const totalAmount = Object.keys(cart.cartItems).reduce(
          (totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          },
          0
        );
        const items = Object.keys(cart.cartItems).map((key) => ({
          productId: key,
          payablePrice: cart.cartItems[key].price,
          purchasedQty: cart.cartItems[key].qty,
        }));
        const payload = {
          addressId: selectedAddress._id,
          totalAmount,
          items,
          paymentStatus: "pending",
          paymentType: "cod",
        };
    
        console.log(payload);
        dispatch(addOrder(payload));
        
      };

      console.log(selectedAddress)

    return (
        <div style={{backgroundColor:'#f1f3f6',width:'100%'}}>
            <Layout>
                <div style={{width:"800px",paddingLeft:"50px",paddingTop:"10px"}} className="Step1">
                    <div>
                    <div style={{display:'flex',height:'50px'}} className={`${!auth.user.firstName?'Background':'Coloe'}`}>
                        <p style={{textAlign:"center",height:'20px',width:'16px',backgroundColor:'white',padding:'2px',marginLeft:'40px'}}>1</p>
                    <h4 style={{paddingLeft:"5px",color:'white',alignContent:'center'}}>LOGIN</h4><h4 style={{paddingLeft:"5px",color:'white'}}>OR</h4><h4 style={{paddingLeft:"5px",color:'white'}}>SIGNUP</h4></div>
                    </div >
                    {
                        auth.user.firstName&&
                        <div style={{backgroundColor:"white",display:'flex',justifyContent:"space-between"}}>
                            <p><strong>Name</strong>:{auth.user.firstName+auth.user.lastName}</p> <p style={{paddingLeft:'5px'}}><strong>Email</strong>:{auth.user.email}</p>
                            </div>
                    }
                </div>
                <div style={{width:"800px",paddingLeft:"50px",paddingTop:"10px"}} className="Step1">
                    <div>
                    <div style={{display:'flex',height:'50px'}} className={`${confirm?'Coloe':'Background'}`}>
                        <p style={{textAlign:"center",height:'20px',width:'16px',backgroundColor:'white',padding:'2px',marginLeft:'40px'}}>2</p>
                    <h4 style={{paddingLeft:"5px",color:'white'}}>DELIVERY ADDRESS</h4></div>
                    {
                        confirm&&
                        <div style={{backgroundColor:"white",display:'flex',justifyContent:'space-between'}}>
                            <p><strong>Customer</strong>:{delivery.name}</p> <p style={{paddingLeft:'5px'}}><strong>Address</strong>:{delivery.address}</p>
                            <button onClick={()=>setConfirm(false)} style={{marginTop:'10px',border:'none',outline:'0',backgroundColor:'orangered',color:"white",height:'30px'}}>Change Address</button>
                            </div>
                    }
                    </div >
                    
                    {
                      confirm ? '': (address||[]).map(adr=>
                            <div style={{paddingTop:"20px",backgroundColor:'white'}}>
                               <div style={{display:''}}>
                               <input name="address" onClick={()=>selectAdd(adr)} type='radio' />
                               <div style={{display:'flex',flexDirection:'column'}}>{adr.name}{adr.mobileNumber}</div>
                                {adr.address}<br/>
                               {adr.selected &&<button onClick={()=>Delivery(adr)} style={{border:'none',backgroundColor:'orange',width:'100px',outline:'0',height:'30px'}}>Delivery Here</button>}
                                   </div>
                                </div>
                            )
    
                    }<br/>
                   {confirm?'':<AddressForm />}

                </div>
                <div style={{width:"800px",paddingLeft:"50px",paddingTop:"10px"}} className="Step1">
                    <div>
                    <div style={{display:'flex',height:'50px'}} className={`${orderSummery===true?'Coloe':'Background'}`}>
                        <p style={{textAlign:"center",height:'20px',width:'16px',backgroundColor:'white',padding:'2px',marginLeft:'40px'}}>3</p>
                    <h4 style={{paddingLeft:"5px",color:'white'}}>ORDER SUMMARY </h4></div>
                    <div style={{backgroundColor:'white'}}>
                    {
                        orderSummery&&(
                            Object.keys(cart.cartItems).map((key,index)=>
                            <div style={{marginLeft:"50px",padding:'30px'}} key={index}>
                                <div style={{display:'flex',padding:'4px'}}>
                                <img style={{width:'50px'}}  src={`http://localhost:2000/public/${cart.cartItems[key].img}`} alt={cart.cartItems[key].img} />
                                <div style={{display:'flex',flexDirection:'column'}}>
                                <strong>Name:</strong> {cart.cartItems[key].name}
                                <strong>Price:</strong> {cart.cartItems[key].price * cart.cartItems[key].qty }
                                <strong>Quantity:</strong>{ cart.cartItems[key].qty } 
                                </div>
                                </div>
                            </div>
                            )
                        )
                    }
                    </div>
                    </div >
                    
                   <button onClick={()=>onConfirmOrder()}>Place Order</button>
                </div>
                <br/><br/>
            </Layout>
        </div>
    )
}

export default Index
