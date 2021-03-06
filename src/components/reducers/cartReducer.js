import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY } from '../actions/actionTypes/cart-actions'

const initState = {
    items: [
        { id: 3, isSale: false, unitPrice: 150, sku: "SKU001", image: "liquid-product.png", isAvailable: true, description: "Product Description", currency: "ZAR", name: "Product1" },
        { id: 4, isSale: true, unitPrice: 250, sku: "SKU002", image: "liquid-product.png", isAvailable: true, description: "Product 2 Description", currency: "ZAR", name: "Product2" },
        { id: 5, isSale: false, unitPrice: 320, sku: "SKU001", image: "liquid-product.png", isAvailable: false, description: "Product Description", currency: "ZAR", name: "Product3" },
        { id: 6, isSale: true, unitPrice: 460, sku: "SKU002", image: "liquid-product.png", isAvailable: true, description: "Product 2 Description", currency: "ZAR", name: "Product4" }

    ],
    addedItems: [],
    total: 0

}
const cartReducer = (state = initState, action) => {
    if (action.type === ADD_TO_CART) {
        let addedItem = state.items.find(item => item.id === action.id)
        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => action.id === item.id)
        if (existed_item) {
            addedItem.quantity += 1
            return {
                ...state,
                total: state.total + addedItem.unitPrice
            }
        }
        else {
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.unitPrice

            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal
            }

        }
    }
    if (action.type === REMOVE_ITEM) {
        let itemToRemove = state.addedItems.find(item => action.id === item.id)
        let new_items = state.addedItems.filter(item => action.id !== item.id)

        //calculating the total
        let newTotal = state.total - (itemToRemove.unitPrice * itemToRemove.quantity)
        console.log(itemToRemove)
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    if (action.type === ADD_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        addedItem.quantity += 1
        let newTotal = state.total + addedItem.unitPrice
        return {
            ...state,
            total: newTotal
        }
    }
    if (action.type === SUB_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        //if the qt == 0 then it should be removed
        if (addedItem.quantity === 1) {
            let new_items = state.addedItems.filter(item => item.id !== action.id)
            let newTotal = state.total - addedItem.unitPrice
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.unitPrice
            return {
                ...state,
                total: newTotal
            }
        }
    }

    else {
        return state
    }
}
export default cartReducer;