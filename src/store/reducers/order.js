import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased:  false
}

const purchaseInit = (state, action) => updateObject(state, { purchased: false });

const purchaseBurgerStart = (state, action) => updateObject(state, {loading: true});

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId})
        return updateObject(state, {
            loading: false,
            orders: state.orders.concat(newOrder),
            purchased: true
        })
}

const purchaseBurgerFail = (state, action) => updateObject(state, { loading: false })

const fetchOrdersStart = (state, action) => updateObject(state, {loading: true})

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    })
}

const fetchOrdersFail = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}

const onOrderClicked = (state, action) => {
    const newOrders = state.orders.filter(order => order.id !== action.id);
    return updateObject(state, {orders: newOrders});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state, action);
            
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state, action);

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
            
        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state, action);

        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state, action);
        
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action);

        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchOrdersFail(state, action);

        case actionTypes.ON_ORDER_CLICKED:
            return onOrderClicked(state, action);
            
        default:
            return state;
    }
}

export default reducer;