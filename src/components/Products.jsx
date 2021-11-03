import React from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import PRODUCT_IMAGE from '../assets/images/liquid-product.png';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';


function Products(props) {

    const handleClick = (id) => {
        props.addToCart(id);
    }



    return (
        <div className="">
            <div className="top">
                <div className="heading">
                    <h1 className="mt-5">Product List</h1>
                </div>
            </div>
            <div className= "row">
                <div className="products bottom">
                <div className=" container">
                    <div className="row">
                        {
                            props.items.map(item => {
                                return (
                                    <div className="card" key={item.id}>
                                    <div className="col-md-6 column thumbnail-container shadow-sm">
                                        <img src={PRODUCT_IMAGE} alt="product_image" />
                                        <div className="overlay">
                                            <div className="text">
                                                {item.isAvailable ?<Button onClick= {handleClick(item.id)}>Add</Button> : <h3>Out of Stock</h3>}
                                                
                                                
                                            </div>
                                        </div>
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                        <p>Price {item.currency} {item.unitPrice} </p>
                                        
                                    </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            </div>
            
            <div className="row container heading">
                <h2 className="p-5 text-center">
                    End of products list
                </h2>
            </div>
        </div>


    )



}
const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => { dispatch(addToCart(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)