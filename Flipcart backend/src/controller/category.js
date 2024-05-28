const Category = require('../model/category')
const slugify = require('slugify')









exports.addCategory = (req,res)=>{
    const categoryObj = {
        name:req.body.name,
        type:req.body.type,
        slug:slugify(req.body.name)
    }

    if(req.file){
        categoryObj.categoryImg = '/public/'+ req.file.filename
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId
    }

    const cat = new Category(categoryObj)

    cat.save((error,category)=>{
        if(error){
            return res.status(400).json({
                error
            })
        }
        if(category){
            res.status(200).json({
                category:category
            })
        }
    })

}




//add multiple product inside cateogry
function createCat(category,parentId=null){
    const categoryList = [];
    let cat;
    let mat;
    if(parentId === null){
        cat = category.filter(item=>item.parentId == undefined)
    }
    else{
        mat = category.filter(item=>item.parentId == parentId)
    }

    if(cat!=null){
        for(let product of cat){
            categoryList.push({
                _id:product._id,
                name:product.name,
                slug:product.slug,
                type:product.type,
                children:createCat(category,product._id)
            })
        }
    }
   
   if(mat!=null){
    for(let product of mat){
        categoryList.push({
            _id:product._id,
            name:product.name,
            parentId:product.parentId,
            type:product.type,
            slug:product.slug,
            children:createCat(category,product._id)
        })
    }
   }
    return categoryList
}


exports.fetchCategory = (req,res)=>{
    Category.find({})
    .exec((error,category)=>{
        if(error){
            return res.status(404).json({error})
        }
        if(category){
          const categoryList = createCat(category)
            res.status(200).json({
                categories:categoryList
            })
        }
    })
}