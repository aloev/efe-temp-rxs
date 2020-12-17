

import React, {  useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../actions';
import { Layout } from '../../components/Layout';
import { Input } from '../../components/UI/Input';
import { newModal as Modal } from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import {
    IoCheckbox,
    IoCheckboxOutline,
    IoIosArrowDown,
    IoIosArrowForward
} from 'react-icons/io';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

export const Category = (props) => {

    const category = useSelector(state => state.category);

    const dispatch = useDispatch();

    const [categoryName, setCategoryName] = useState('');

    const [parentCategoryId, setParentCategoryId] = useState('');

    const [categoryImage, setCategoryImage] = useState('');

    const [show, setShow] = useState(false);

    const [checked , setChecked ] = useState([]);

    const [expanded, setExpanded] = useState([]);

    const [checkedArray, setCheckedArray] = useState([]);

    const [expandArray, setExpandArray] = useState([]);
    
    const handleShow = () => setShow(true);

    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);


    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.value);
    }


    const renderCategories = ( categories ) => {


        let Decategories = [];

        for(let category of categories){
            Decategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }

                
            );
        }


        return Decategories;
    }

    const handleClose = () => {

        const form = new FormData();

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch( addCategory(form));

        setCategoryName('');
        setParentCategoryId('');
        setShow(false);

    };

    const createCategoryList = ( categories, options = []) => {

        for( let category of categories ){
            options.push({ value: category._id, name: category.name });
            if(category.children.length > 0 ){

                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    const updateCategory = () => {
        setUpdateCategoryModal(true);
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
                            {/* <ul>
                                { renderCategories( category.categories) }

                            </ul> */}
                            <CheckboxTree 
                                nodes={renderCategories(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked({ checked })}
                                onExpand={expanded => setExpanded({ expanded })}
                                icons={{
                                    check: <IoIosCheckbox />,
                                    uncheck: <IoIosCheckboxOutline />,
                                    halfCheck: <IoIosCheckboxOutline />,
                                    expandClose: <IoIosArrowForward />,
                                    expandOpen: <IoIosArrowDown />,
                                }} 
                            />
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                                <button> Delete</button>
                                <button onClick={ updateCategory }> Edit </button>
                        </Col>
                    </Row>

                    {/* This tag MUST be a Modal for it to work */}
                    <Modal
                        show = { show }
                        handleClose = { handleClose }
                        modalTitle = { 'Add new Category' }
                    >

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


                    </Modal>

                    {/* Edit Categories */}

                    <Modal
                        show = { updateCategoryModal }
                        handleClose = { () => setUpdateCategoryModal(true) }
                        modalTitle = { 'Add new Category' }
                    >

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


                    </Modal>
                </Container>
                    
                
            </Layout>
    )
}
