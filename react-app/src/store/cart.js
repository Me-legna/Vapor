//constants
const LOAD = 'cart/LOAD';
const ADD = 'cart/ADD'
const REMOVE = 'cart/REMOVE'
const DELETE = 'cart/DELETE'


//action creators
const load = (cart) => ({
    type: LOAD,
    payload: cart
})
const add = (cart) => ({
    type: ADD,
    payload: cart
})
const remove = (cart) => ({
    type: REMOVE,
    payload: cart
})
const reset = (cart) => ({
    type: DELETE,
    payload: cart
})


//Thunks
export const loadCart = () => async (dispatch) => {
    const response = await fetch('/api/cart/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json()

        if (data.errors) {
            return;
        }
        dispatch(load(data))
    }
}

export const addToCart = (item_id) => async (dispatch) => {
    const response = await fetch('/api/cart/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({item_id})
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(add(data))
        return data;

    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const removeFromCart = (item_id) => async (dispatch) => {
    const response = await fetch('/api/cart/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({item_id})
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(remove(data))
        return data;

    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteCart = (checkout) => async (dispatch) => {
    const response = await fetch('/api/cart/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({checkout})
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(reset(data))
        return data;

    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}


const initialState = {
    items:[],
    total: 0
}

export default function reducer(state = initialState, action) {
    const newState = action.payload

    switch (action.type) {
        case LOAD:
            return newState
        case ADD:
            return newState
        case REMOVE:
            return newState
        case DELETE:
            return newState
        default:
            return state
    }
}
