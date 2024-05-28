const express = require('express')
const mongoose = require('mongoose');
const app = express();
const path = require('path')
const cors = require('cors')
app.use(express.json());




//mongoose connection:
mongoose.connect('mongodb+srv://sunilraj:sunildon@cluster0.ve0kk.mongodb.net/flipcart?retryWrites=true&w=majority',{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>{
    console.log('Connected');
}).catch((e)=>{
    console.log(e)
})


app.use(cors())
//middleWare
const addCart = require('../src/routes/cart')
const cateRoute = require('../src/routes/category')
const adminAuth = require('../src/routes/admin/admin')
const userSignedIn = require('./routes/userPost')
const getCart = require('./routes/cart')
const address = require('./routes/address')
const order = require('./routes/order')
const productRoute = require('./routes/product');

app.use(userSignedIn)
app.use(adminAuth)
app.use(cateRoute)
app.use(productRoute)
app.use(address)
app.use(addCart)
app.use(order)
app.use(getCart)

//convert category url to work
app.use('/public',express.static(path.join(__dirname,'uploads')))


app.listen(2000,()=>{
    console.log('Connected to the port 2000')
})