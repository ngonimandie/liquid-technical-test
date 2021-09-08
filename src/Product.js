import React, { Component } from 'react'
import { connect } from 'react-redux'
class Product extends Component{
    


    render(){
  
        return(
            <div className="container">
                <div className="collection">
                    <li className="collection-item">
                            <label>
                                <input type="checkbox" ref="checkoutItem" onChange= {this.handleChecked} />
                                
                            </label>
                        </li>
                        <li className="collection-item"><b>Total: ZAR {this.props.total} </b></li>
                    </div>
                    <div className="checkout">
                        <button className="waves-effect waves-light btn">Checkout</button>
                    </div>
                 </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        addedItems: state.addedItems,
        total: state.total
    }
}


export default connect(mapStateToProps)(Product)
