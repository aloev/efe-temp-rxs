

import React, { useState } from 'react'
import { Layout } from '../../components/Layout'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { Input } from '../../components/UI/Input'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../actions'
import { newModal as Modal } from '../../components/UI/Modal';
import { generatePublicUrl } from '../../urlConfig'
import './style.css';

export const Products = () => {

    const category = useSelector(state => state.category);

    const product = useSelector(state => state.product);

    const [name, setName] = useState('');

    const [quantity, setQuantity] = useState('');

    const [price, setPrice] = useState('');

    const [description, setDescription] = useState('');

    const [categoryId, setCategoryId] = useState('');

    const [productDetailModal, setProductDetailModal] = useState(false);

    const [productPictures, setProductPictures] = useState('');

    const [productDetails, setProductDetails] = useState(null);

    const [show, setShow] = useState(false);

    

    const dispatch = useDispatch();

    const handleClose = () => {

        const form = new FormData();
        form.append('name', name);
        form.append('price', price);
        form.append('description', description);
        form.append('quantity', quantity);
        form.append('category', categoryId);
        
        console.log(name);

        for(let pic of productPictures){
            form.append('productPicture', pic);
        }

        dispatch(addProduct(form));

        setShow(false);
    };

    const handleShow = () => setShow(true);

    // Organizes them in a List

    const createCategoryList = ( categories, options = []) => {

        for( let category of categories ){
            options.push({ value: category._id, name: category.name });
            if(category.children.length > 0 ){

                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    const handleProductPictures = (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ]);
    }

    // Actual Table

    const renderProducts = () => {

        return (
            <Table style={{ fontSize: 12}} responsive="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tbody>

                    {/* From the State-Redux */}
                    {  
                        product.products.length > 0 ?

                            product.products.map( product => 
                            <tr 
                                onClick = { () => showProductDetailModal(product) }
                                key = { product._id  }>
                                <td>3</td>
                                <td>{ product.name } </td>
                                <td>{ product.price }</td>
                                <td>{ product.quantity }</td>
                                <td> { product.category.name } </td>
                            </tr>
                                
                                
                            ) :
                            null
                    }    
               
                </tbody>
            </Table>
        )
    }

    // For adding a new One

    const renderAddProductModal = () => {

        return (
            <Modal 
                show={show} 
                handleClose={handleClose}
                modalTitle={ 'Add New Product' }
            >
                < Input 
                    label="Name"
                    value = { name }
                    placeholder = { `Product name` }
                    onChange = { (e) => setName(e.target.value) }
                />
                < Input 
                    label="Quantity"
                    value = { quantity }
                    placeholder = { `Product quantity` }
                    onChange = { (e) => setQuantity(e.target.value) }
                />
                < Input 
                    label="Price"
                    value = { price }
                    placeholder = { `Product price` }
                    onChange = { (e) => setPrice(e.target.value) }
                />
                < Input 
                    label="Description"
                    value = { description }
                    placeholder = { `Product description` }
                    onChange = { (e) => setDescription(e.target.value) }
                />
                <select 
                    className="form-control" 
                    value = { categoryId }
                    onChange={ (e) => setCategoryId(e.target.value) }>
                    <option> select category </option>
                    {
                        createCategoryList(category.categories).map( option => 
                            <option key={ option.value } value={ option.value } >
                                
                                { option.name } 
                            </option>
                        )
                    }
                </select>

                {
                    productPictures.length > 0 ?
                    productPictures.map((pic, index) => 
                                            <div key={ index }> { pic.name }  </div>) : null
                }
                
                <input type="file" name="productPicture" onChange={ handleProductPictures} />

            </Modal>
        )
    }

    const handleClosedProductDetailsModal = () => {

        setProductDetailModal(false);
    }

    // Opens Modal of extra information

    const showProductDetailModal = (product) => {
        setProductDetailModal(true);
        setProductDetails(product);
        
    }

    // To read extra modal description, uses productDetals useState as patron of information

    const renderProductDetailsModal = () => {

        if(!productDetails){
            return null;
        }

        return (
            <Modal
                show = { productDetailModal }
                handleClose = { handleClosedProductDetailsModal }
                modalTitle = { 'Product Details' }
                size="lg"
            >

            <Row>
                <Col md="6"> 
                    <label className="key"> Name </label>
                    <p className="value"> { productDetails.name } </p>
                </Col>
                <Col md="6"> 
                    <label className="key"> Price </label>
                    <p className="value"> { productDetails.price } </p>
                </Col>
            </Row>
            <Row>
                <Col md="6"> 
                    <label className="key"> Quantity </label>
                    <p className="value"> { productDetails.quantity } </p>
                </Col>
                <Col md="6"> 
                    <label className="key"> Category </label>
                    <p className="value">  { productDetails.category.name }  </p>
                </Col>
            </Row>
            <Row>
                <Col md="12"> 
                    <label className="key"> Description </label>
                    <p className="value"> { productDetails.description } </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <label className="key" > Product Pictures </label>

                    <div style={{ display: 'flex' }}>
                        { productDetails.productPictures.map( picture =>
                        
                        <div className="productImgContainer"> 
                            <img src={ generatePublicUrl (picture.img)}  />
                        </div>

                        )}

                    </div>
                </Col>
            </Row>
            </Modal>
        )
    }  

    return (


            <Layout sidebar>
                {/* Simple Layout of the template */}
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <h3>Products</h3>
                                <button onClick={ handleShow } >Add</button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            { renderProducts() }
                        </Col>
                    </Row>
                </Container>
                {
                    renderAddProductModal()
                }
                {
                    renderProductDetailsModal()
                }
            </Layout>
    )
}
