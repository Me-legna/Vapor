//constants
const LOAD_ALL = "order/LOAD_ALL";
const LOAD_ONE = "order/LOAD_ONE";
const UPDATE = "order/UPDATE";


//action creators
const loadAll = (orders) => ({
    type: LOAD_ALL,
    payload: orders
})
const loadOne = (order) => ({
    type: LOAD_ONE,
    payload: order,
});
const update = (order) => ({
    type: UPDATE,
    payload: order
})


//Thunks
export const loadAllOrders = () => async (dispatch) => {
    const response = await fetch('/api/orders/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json()

        if (data.errors) {
            return;
        }
        dispatch(loadAll(data.Orders))
    }
}

export const loadOneOrder = (orderId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json()

        if (data.errors) {
            return;
        }
        dispatch(loadOne(data))
    }
}

export const refundOrder = (orderId, itemId) => async (dispatch) => {
    const response = await fetch(`/api/orders/${orderId}/refund`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({itemId}),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(update(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
}


const initialState = {
  allOrders: {
    byId: {},
    allIds: []
  },
  singleOrder: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALL: {
        const allOrders = action.payload
        const newState = {
          allOrders: {
            byId: {},
            allIds: []
          },
          singleOrder: {},
        };
        allOrders.forEach((order) => {
          newState.allOrders.byId[order.id] = order;
          newState.allOrders.allIds.push(order.id);
        });

        return newState
    }
    case LOAD_ONE: {
        const orderDetails = action.payload;
        const newState = {...state, singleOrder: orderDetails}

        return newState
    }
    case UPDATE: {
        const updatedOrder = action.payload
        const newState = { ...state, singleOrder: updatedOrder };

        return newState;
    }
    default:
      return state;
  }
}
