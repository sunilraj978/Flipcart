const express = require('express');
const { requireSignIn } = require('../controller/admin/auth');
const { adminAuth } = require('../middleWare/applyMiddleware');
const router = express.Router()
const shortId = require('shortid')
const path = require('path')
const multer = require('multer')
const Product = require('../model/product')
const slugify = require('slugify')
const Page = require('../model/pageModal');
const Category = require('../model/category')


//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortId.generate() + '-' + file.originalname)
    }
  })
   
  const upload = multer({ storage: storage })
  


router.post('/product/create',requireSignIn,adminAuth,upload.array('productImg'),(req,res)=>{
    const {
        name,price,description,category,createdBy,quantity
    } = req.body;

    let productImg

    if(req.files.length > 0){
        productImg = req.files.map(file=>{
            return{img:file.filename}
        })
    }

    const product = new Product({
        name:name,
        slug:slugify(name),
        price,
        description,
        quantity,
        productImg,
        category,
        createdBy:req.user._id
    })

    product.save((error,pro)=>{
        if(error){
            return res.json({error})
        }
        if(pro){
            res.json({product:pro})
        }
    })
})

router.get('/product/:slug',(req,res)=>{
    const {slug} = req.params;
    Category.findOne({slug:slug})
    .select('_id')
    .exec((error,category)=>{
        if(error){
            res.status(400).json({error})
        }
        if(category){
            Product.find({category:category._id})
            .exec((error,products)=>{
                if(error){
                    res.status(400).json({error})
                }
                if(products.length>0){
                    res.status(200).json({
                        products,
                        productByPrice:{
                            under5k: products.filter((product) => product.price <= 5000),
                            under10k: products.filter(
                              (product) => product.price > 5000 && product.price <= 10000
                            ),
                            under15k: products.filter(
                              (product) => product.price > 10000 && product.price <= 15000
                            ),
                            under20k: products.filter(
                              (product) => product.price > 15000 && product.price <= 20000
                            ),
                            under30k: products.filter(
                              (product) => product.price > 20000 && product.price <= 30000
                            ),
                        }
                    })
                }
            })
        }
    })

})



//create new Page:
router.post('/createPage',requireSignIn,adminAuth,upload.fields([
    {name:'banners'},
    {name:'products'}
]),(req,res)=>{
    const {banners,products} = req.files

    if(banners.length > 0){
        req.body.banners = banners.map((banner,index)=>({
            img:`/public/'${banner.filename}`,
            navigateTo:`/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))
    }

    if(products.length > 0){
        req.body.products = products.map((product,index)=>({
            img:`/public/'${product.filename}`,
            navigateTo:`/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }))
    }
    

    req.body.createdBy = req.user._id

    Page.findOne({category:req.body.category})
    .exec((error,result)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(result){
            Page.findOneAndUpdate({category:req.body.category},req.body)
            .exec((error,result)=>{
                if(result){
                    return res.status(200).json({page:result})
                }
            })
        }
        else{
            const page = new Page(req.body)

    page.save((error,page)=>{
        if(error){
            return res.status(400).json({error})
        }
        if(page){
            return res.status(200).json({page})
        }
    })
        }
    })


}
)



//get page by category and type[ex:apple,samsung,realMe]

router.get('/page/:category/:type',(req, res) => {
    const { category, type } = req.params;
    if(type == "Page"){
        Page.findOne({ category: category })
        .exec((error, page) => {
            if(error) return res.status(400).json({ error });
            if(page) return res.status(200).json({ page })
        })
    }

})


//get individual product Id:
router.get('/:productId', (req, res) => {
    const {productId}  = req.params
    console.log(req.params)
    if (productId) {
        console.log(productId)
      Product.findOne({ _id: productId }).exec((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
          res.status(200).json({ product });
        }
        else{
            return res.json({p:'Eror'})
        }
      });
    } else {
      return res.status(400).json({ error: "Params required" });
    }
  })
  




module.exports = router