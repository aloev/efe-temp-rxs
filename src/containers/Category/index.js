

import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllcategories } from '../../actions'
import { Layout } from '../../components/Layout'
import { Input } from '../../UI/Input'



export const Category = (props) => {

    const category = useSelector(state => state.category);

    const dispatch = useDispatch();

    const [categoryName, setCategoryName] = useState('');

    const [parentCategoryId, setParentCategoryId] = useState('');

    const [categoryImage, setCategoryImage] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => {

        const form = new FormData();

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);

        // const cat = {
        //     categoryName,
        //     parentCategoryId,
        //     categoryImage
        // };

        dispatch( addCategory(form));

        setShow(false);
    };

    const handleShow = () => setShow(true);

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.value);
    }
    
    useEffect(() => {
        dispatch( getAllcategories());
    }, [])

    const renderCategories = ( categories ) => {

        let Decategories = [];

        for(let category of categories){
            Decategories.push(
                <li key={ category.name }>
                    { category.name }

                    {/* Bienvenidos al arbol de expansion */}

                    { 
                        category.children.length > 0 
                                                    ? ( <ul> { renderCategories( category.children ) } </ul> )
                                                    : null 
                    }
                </li>
            );
        }

        return Decategories;
    }

    const createCategoryList = ( categories, options = []) => {

        for( let category of categories ){
            options.push({ value: category._id, name: category.name });
            if(category.children.length > 0 ){

                createCategoryList(category.children, options)
            }
        }

        return options;
    }


    return (

            <Layout sidebar>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                <h3>Category</h3>
                                <button onClick={ handleShow } >Add</button>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={ 12 }>
                            <ul>
                                { renderCategories( category.categories) }

                            </ul>
                        </Col>
                    </Row>

                </Container>
                    
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Add New Category </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        < Input 
                            value = { categoryName }
                            placeholder = { `Category name` }
                            onChange = { (e) => setCategoryName(e.target.value) }
                        />

                        <select 
                            className="form-control" 
                            value = { parentCategoryId }
                            onChange={ (e) => setParentCategoryId(e.target.value) }>
                            <option> select category </option>
                            {
                                createCategoryList(category.categories).map( option => 
                                    <option key={ option.value } value={ option.value } >
                                        
                                        { option.name } 
                                    </option>
                                )
                            }
                        </select>
                        
                        <input type="file" name="categoryImage" onChange={ handleCategoryImage }  />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Layout>
    )
}
