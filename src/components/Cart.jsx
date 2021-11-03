import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
//Firebase Info
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { removeItem, addQuantity, subtractQuantity } from './actions/cartActions'
import CartBanner from './CartBanner';
import PRODUCT_IMAGE from '../assets/images/liquid-product.png';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { DeleteForeverOutlined } from '@material-ui/icons';
import { Button } from '@mui/material';

const firebaseConfig = {
    apiKey: "AIzaSyDCQpBqVijBnhT8fXlaAeP6lIHkaiFaWDQ",
    authDomain: "test-48da0.firebaseapp.com",
    projectId: "test-48da0",
    storageBucket: "test-48da0.appspot.com",
    messagingSenderId: "210396814867",
    appId: "1:210396814867:web:b04adca6399f8ce70669e6"
  };

firebase.initializeApp(firebaseConfig);
const nodemailer = require("nodemailer")


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 0
        };
    }
    //to remove the item completely
    handleRemove = (id) => {
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    }

    //to send email as Checkout
    handleCheckOut = async (email, amount) => {

        const emailRecepient = email + "";

        let testAccount = nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = transporter.sendMail({
            from: '"Ngoni \'s cart 👻" ' + (process.env.NODEMAILER_SENDER_EMAIL), // sender address
            to: emailRecepient, // buyer's email address
            subject: "Checkout Confirmation ✔", // Subject line
            text: "Items bought are worth:" + amount + "To complete purchase, contact the Liquid thought team ", // plain text body
            html: "Items bought are worth:" + amount + "Io complete purchase, contact the Liquid thought team ", // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    };
    render() {
        let user = firebase.auth().currentUser;
        let addedItems = this.props.items.length ?
            (
                this.props.items.map(item => {
                    return (

                        <li className="collection-item avatar" key={item.id}>
                            <div className="item-img">
                                <img src={PRODUCT_IMAGE} alt={item.img} className="" />
                            </div>

                            <div className="item-desc">
                                <span className="title">{item.name}</span>
                                <p>{item.desc}</p>
                                <p><b>Price:{item.currecy} {item.unitPrice}</b></p>
                                <p>
                                    <b>Quantity: {item.quantity}</b>
                                </p>
                                <div className="add-remove">
                                    <Link to="/cart"><ArrowUpwardIcon onClick={() => { this.handleAddQuantity(item.id) }} /></Link>
                                    <Link to="/cart"><ArrowDownwardIcon onClick={() => { this.handleSubtractQuantity(item.id) }} /></Link>
                                </div>
                                <DeleteForeverOutlined onClick={() => { this.handleRemove(item.id) }} />
                            </div>

                        </li>

                    )
                })
            ) :

            (
                <p>Nothing.</p>
            )
        return (
            <div className="container">
                <CartBanner />
                <div className="cart">

                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div>
                <div className="collection">

                    <li className="collection-item"><b>Total: ZAR {this.props.total} </b></li>
                </div>
                <div className="checkout">
                    <Button className="waves-effect waves-light btn" onClick={() => { 
                        console.log(user.email)
                        this.handleCheckOut(user.email, this.props.total) 
                        }}>Checkout</Button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        items: state.addedItems,
        addedItems: state.addedItems,
        total: state.total
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (id) => { dispatch(removeItem(id)) },
        addQuantity: (id) => { dispatch(addQuantity(id)) },
        subtractQuantity: (id) => { dispatch(subtractQuantity(id)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)