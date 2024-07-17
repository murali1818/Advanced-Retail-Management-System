const express=require('express');
const {registerUser, login, logout, forgetpassword, resetpassword, myprofile, changepassword,getAllUsers,editUserRole} = require('../controllers/authController');
const { isauthenticateuser } = require('../middleware/authenticate');
const { addProducts, getsingleProduct, updateProduct, deleteProduct, getUserProducts } = require('../controllers/productController');
const allprice = require('../controllers/scrapePrices');
const router=express.Router();
//user routes
router.route('/register').post(registerUser);
router.route('/login').post (login);
router.route('/logout').post(logout);
router.route('/password/forgot').post(forgetpassword);
router.route('/password/reset/:token').post(resetpassword);
router.route('/myprofile').get(isauthenticateuser,myprofile);
router.route('/changepassword').post(isauthenticateuser,changepassword);
router.route('/users').get(getAllUsers);
router.route('/edit-role').put(editUserRole);
//product route
router.route('/addproduct').post(isauthenticateuser, addProducts);
router.route('/getproduct/:id').get(isauthenticateuser, getsingleProduct);
router.route('/updateproduct/:id').put(isauthenticateuser, updateProduct);
router.route('/deleteproduct/:id').delete(isauthenticateuser, deleteProduct);
router.route('/myproduct').get(isauthenticateuser, getUserProducts);
router.route('/getprice/:id').get(allprice);

module.exports=router