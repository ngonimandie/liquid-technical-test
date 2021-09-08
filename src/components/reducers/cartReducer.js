import { ADD_TO_CART} from '../actions/actionTypes/cart-actions'

const initState = {
    items: [
        {id:3,isSale:false, unitPrice: 150, sku:"SKU001", image:"liquid-product.png", isAvailable: true, description:"Product Description", currency:"ZAR", name:"Product1"},
        {id:4,isSale:true, unitPrice: 250, sku:"SKU002", image:"liquid-product.png", isAvailable: true, description:"Product 2 Description", currency:"ZAR", name:"Product2"}
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.unitPrice
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.unitPrice 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    else{
        return state
    }
  }
  export default cartReducer;