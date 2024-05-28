import React from 'react'
import Layout from '../Layout'
import ProductStore from '../ProductScreen/ProductStore/index'
import splitParams from '../Util/splitParams'
import ProductPage from './productPage/ProductPage'

function ProductScreen(props) {

 
   

    const renderProducts = ()=>{
        console.log(props)
        const Params = splitParams(props.location.search)
        console.log(Params.cid)
        let content = null;
        switch(Params.type){
            case 'store':
                content = <ProductStore {...props} />
                break;
            case 'undefined':
                content = <ProductStore {...props} />
                break;
            case 'Page':
                content = <ProductPage {...props} />
                break;    
            default:    
        }
        return content
    }
    
    return (
        <div>
            <Layout>

               {renderProducts()}
            </Layout>
        </div>
    )
}

export default ProductScreen
