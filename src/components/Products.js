import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PRODUCT_IMAGE from '../assets/images/liquid-product.png';


class Products extends Component {

    handleClick = (id) => {
        this.props.addToCart(id);
    }
    classes = makeStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '40%', // 16:9,
            marginTop: '30'
        },
    });



    render() {
        let itemList = this.props.items.map(item => {
            return (
                <Card className={this.classes.root} key={item.id}>
                    <CardActionArea>
                        <CardMedia
                            className={this.classes.media}
                            title={item.name}
                        >
                            <img src={PRODUCT_IMAGE} alt="Image thumbnail" />
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.description}
                            </Typography>
                            <Typography variant="h5" component="h5">
                                Price: {item.currency} {item.unitPrice}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => { this.handleClick(item.id) }}>
                            Add to Cart
                        </Button>



                    </CardActions>
                </Card>


            )
        })

        return (
            <div className="container">
                <h3 className="center">Products List</h3>
                <div >
                    {itemList}
                </div>
            </div>
        )
    }
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