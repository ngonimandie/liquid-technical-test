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
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            email: '',
            checkOutMessage: ''
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
        //e.preventDefault();
        console.log('Posting checkout with data:'+{ email, amount });
        const response = await fetch("/checkout", { 
          method: 'POST', 
          headers: { 
              'Content-type': 'application/json'
          }, 
          body: JSON.stringify({email, amount}) 
      }); 
        const resData = await response.json(); 
        if (resData.status === 'success'){
          alert("Message Sent."); 
          this.resetForm()
      }else if(resData.status === 'fail'){
          alert("Message failed to send.")
      }
      };
    submitRequest1 = async (email, amount) => {



        /* create reusable transporter object using SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.REACT_APP_NODEMAILER_SENDER_EMAIL, 
                pass: process.env.REACT_APP_NODEMAILER_SENDER_PASSWORD, 
            },
        });
        var mailOptions = {
            from: '"Ngoni \'s cart 👻" '+ process.env.REACT_APP_NODEMAILER_SENDER_EMAIL,
            to: emailRecepient,
            subject: 'Checkout Confirmation ✔',
            text: "Items bought are worth:" + amount + "To complete purchase, contact the Liquid thought team ", // plain text body
          };
        /*
        let info = transporter.sendMail({
            from: '"Ngoni \'s cart 👻" ' + (process.env.REACT_APP_NODEMAILER_SENDER_EMAIL), // sender address
            to: emailRecepient, // buyer's email address
            subject: "Checkout Confirmation ✔", // Subject line
            text: "Items bought are worth:" + amount + "To complete purchase, contact the Liquid thought team ", // plain text body
            html: "Items bought are worth:" + amount + "Io complete purchase, contact the Liquid thought team ", // html body
        });
transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log( 'Failed Email sending with response:' +error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          }); 
        */


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
                <div className=" view-cart-btn checkout">
                    <Button className="waves-effect waves-light btn " onClick={() => {
                        console.log(user.email)
                        this.handleCheckOut(user.email, this.props.total)
                    }}>Checkout to Email</Button>
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