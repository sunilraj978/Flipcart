import React,{useEffect} from 'react'
import './style.css'
import {useDispatch,useSelector} from 'react-redux'
import {  getProductById } from '../../../action/slugAction';
import { addToCart } from '../../../action/CartAction';
import Layout from '../../Layout';
import { 
    IoIosArrowForward, 
    IoIosStar, 
    IoMdCart 
  } from 'react-icons/io';
  import { BiRupee } from 'react-icons/bi';
  import { AiFillThunderbolt } from 'react-icons/ai';
import { CategoryList } from '../../../action/CategoryAction';
import { Link } from 'react-router-dom';


function ProductDes(props) {
  

    const product = useSelector(state=>state.product)

    const dispatch = useDispatch();

    useEffect(()=>{
        const {productId} = props.match.params

        const payload = {
            params:{
                productId
            }
        }
        dispatch(getProductById(payload))
    },[])


    if(Object.keys(product.productDetails).length === 0){
        return null;
      }


      return (
        <Layout>
          {/* <div>{product.productDetails.name}</div> */}
          <div className="productDescriptionContainer">
            <div className="flexRow">
              <div className="verticalImageStack">
                {
                  product.productDetails.productImg.map((thumb, index) => 
                  <div className="thumbnail">
                    <img  src={`http://localhost:2000/public/${thumb.img}`} alt={thumb.img} />
                  </div>
                  )
                }
                {/* <div className="thumbnail active">
                  {
                    product.productDetails.productPictures.map((thumb, index) => 
                    <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />)
                  }
                </div> */}
              </div>
              <div className="productDescContainer" style={{marginTop:'-200px'}}>
                <div className="productDescImgContainer">
                  <img src={`http://localhost:2000/public/${product.productDetails.productImg[0].img}`} alt={`${product.productDetails.productImg[0].img}`} />
                </div>
    
                {/* action buttons */}
                <div className="flexRow" style={{display:"flex",justifyContent:'space-between'}}>
                  <Link to='/cart'>
                  <button style={{width:"240px",borderRadius:"10px",padding:'10px',outline:'none',backgroundColor:"yellow"}} onClick={()=>{
                     const { _id, name, price } = product.productDetails;
                     const img = product.productDetails.productImg[0].img;
                    dispatch(addToCart({_id,name,price,img}))
                  }}><IoMdCart/>ADD TO CART</button>
                  </Link>
                  
                  <button style={{width:"240px",borderRadius:"10px",padding:'10px',outline:'none',backgroundColor:"orange"}} onClick={()=>{
                    dispatch(CategoryList())
                  }}><AiFillThunderbolt/>BUY NOW</button>
                </div>
              </div>
            </div>
            <div>
    
              {/* home > category > subCategory > productName */}
              <div className="breed">
                <ul>
                  <li><a href>Home</a><IoIosArrowForward /></li>
                  <li><a href>Mobiles</a><IoIosArrowForward /></li>
                  <li><a href>Samsung</a><IoIosArrowForward /></li>
                  <li><a href>{product.productDetails.name}</a></li>
                </ul>
              </div>
              {/* product description */}
              <div className="productDetails">
                  <p className="productTitle">{product.productDetails.name}</p>
                <div>
                  <span className="ratingCount">4.3 <IoIosStar /></span>
                  <span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews</span>
                </div>
                <div className="extraOffer">Extra <BiRupee />4500 off </div>
                <div className="flexRow priceContainer">
                  <span className="price"><BiRupee />{product.productDetails.price}</span>
                  <span className="discount" style={{ margin: '0 10px' }}>22% off</span>
                  {/* <span>i</span> */}
                  </div>
                <div>
                  <p style={{ 
                    color: '#212121', 
                    fontSize: '14px',
                    fontWeight: '600' 
                    }}>Available Offers</p>
                  <p style={{ display: 'flex' }}>
                    <span style={{
                      width: '100px',
                      fontSize: '12px',
                      color: '#878787',
                      fontWeight: '600',
                      marginRight: '20px'
                  }}>Description</span>
                  <span style={{
                    fontSize: '12px',
                    color: '#212121',
                  }}>{product.productDetails.description}</span>
                  </p>
                </div>
              </div>
              
    
            </div>
          </div>
        </Layout>
      )
}

export default ProductDes
