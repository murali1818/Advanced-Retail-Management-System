import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formType, setFormType] = useState('add'); // 'add' or 'edit'

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = Cookies.get('token');
            const res = await axios.get('http://localhost:8000/myproduct', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const token = Cookies.get('token');
            await axios.delete(`http://localhost:8000/deleteproduct/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchProducts(); // Refresh the list after deletion
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (formType === 'add') {
            try {
                const token = Cookies.get('token');
                await axios.post('http://localhost:8000/addproduct', currentProduct, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                console.log(currentProduct)
            } catch (err) {
                console.error(err);
            }
        } else if (formType === 'edit') {
            try {
                const token = Cookies.get('token');
                await axios.put(`http://localhost:8000/updateproduct/${currentProduct._id}`, currentProduct, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } catch (err) {
                console.error(err);
            }
        }
        fetchProducts();
        setModalOpen(false);
    };

    const openAddProductModal = () => {
        setFormType('add');
        setCurrentProduct({
            productname: '',
            description: '',
            price: 0,
            category: '',
            image: '',
            color:'',
            sizes:'',
            brand: '',
            quantity: 0,
            storePrice: 0
        });
        setModalOpen(true);
    };

    const openEditProductModal = (product) => {
        setFormType('edit');
        setCurrentProduct(product);
        setModalOpen(true);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Products</h2>
            <button onClick={openAddProductModal} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 mb-4">Add Product</button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
                <div key={product._id} className="border p-4 rounded-lg shadow">
                    <div className="flex items-center">
                        <img src={product.image} alt={product.productname} className="w-16 h-16 mr-4" />
                        <div>
                            <h3 className="text-xl font-semibold">{product.productname}</h3>
                            <p>{product.description}</p>
                            <p>Price: {product.price}</p>
                            <p>Category: {product.category}</p>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button onClick={() => openEditProductModal(product)} className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600">Edit</button>
                        <button onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600">Delete</button>
                    </div>
                </div>
            ))}
            </div>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg h-3/4 overflow-y-auto">
                        <h2 className="text-2xl font-semibold mb-4">{formType === 'add' ? 'Add Product' : 'Edit Product'}</h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Product Name</label>
                                <input type="text" name="productname" value={currentProduct.productname} onChange={handleInputChange} className="mt-1 p-2 border rounded-lg w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Description</label>
                                <textarea name="description" value={currentProduct.description} onChange={handleInputChange} className="mt-1 p-2 border rounded-lg w-full"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Price</label>
                                <input type="number" name="price" value={currentProduct.price} onChange={handleInputChange} className="mt-1 p-2 border rounded-lg w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Category</label>
                                <input type="text" name="category" value={currentProduct.category} onChange={handleInputChange} className="mt-1 p-2 border rounded-lg w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Image URL</label>
                                <input type="text" name="image" value={currentProduct.image} onChange={handleInputChange} className="mt-1 p-2 border rounded-lg w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Colors</label>
                                <input type="text" name="colors" value={currentProduct.color} onChange={(e) => setCurrentProduct({ ...currentProduct, colors: e.target.value.split(', ') })} className="mt-1 p-2 border rounded-lg w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Sizes</label>
                                <input type="text" name="sizes" value={currentProduct.size} onChange={(e) => setCurrentProduct({ ...currentProduct, sizes: e.target.value.split(', ') })} className="mt-1 p-2 border rounded-lg w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Brand</label>
                                <input type="text" name="brand" value={currentProduct.brand} onChange={handleInputChange} className="mt-1 p-2 border rounded-lg w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Quantity</label>
                                <input type="number" name="quantity" value={currentProduct.quantity} onChange={handleInputChange} className="mt-1 p-2 border rounded-lg w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Store Price</label>
                                <input type="number" name="storePrice" value={currentProduct.storePrice} onChange={handleInputChange} className="mt-1 p-2 border rounded-lg w-full" />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={() => setModalOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">Cancel</button>
                                <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">{formType === 'add' ? 'Add Product' : 'Update Product'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AllProducts;
