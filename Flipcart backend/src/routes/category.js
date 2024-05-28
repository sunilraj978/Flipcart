const express = require('express');
const { requireSignIn } = require('../controller/admin/auth');
const { addCategory, fetchCategory } = require('../controller/category');
const { adminAuth } = require('../middleWare/applyMiddleware');
const router = express.Router()
const multer = require('multer')
const path = require('path')
const shortId = require('shortid')
const Category = require('../model/category')
const Product = require('../model/product');




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


//create category:
router.post('/create/cat',requireSignIn,adminAuth,upload.single('categoryImg'),addCategory)

router.get('/get/category',fetchCategory);

//multiple category
function createCat(category,parentId=null){
  const categoryList = [];
  let cat;
  if(parentId === null){
      cat = category.filter(item=>item.parentId == undefined)
  }
  else{
      cat = category.filter(item=>item.parentId == parentId)
  }

  for(let product of cat){
      categoryList.push({
          _id:product._id,
          name:product.name,
          slug:product.slug,
          type:product.type,
          children:createCat(category,product._id)
      })
  }
  return categoryList
}



//get category 
router.post('/getCatPro', async (req,res)=>{
  const category = await Category.find({}).exec();
  const Products = await Product.find({})
  .select('_id name price quantity slug description productImg category')
  .populate({path:'category' , select:'_id name'})
  .exec();
  res.status(200).json({
    category:createCat(category),Products
  })
})




//update Category
router.post('/category/update', upload.array('categoryImg'), async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updateCategories: updatedCategories });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
})

module.exports = router