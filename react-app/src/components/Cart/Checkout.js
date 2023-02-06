import { useDispatch, useSelector } from "react-redux"
import { deleteCart } from "../../store/cart"

function Checkout() {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const checkout = async (e) => {

        dispatch(deleteCart(true))
    }

    return (
        <>
            <div className="estimated_totals_container">
                <div className="cart_totals">
                    <div className="estimate_totals">
                        <div>
                            Estimated Total
                            <sup>1</sup>
                            <p>${cart.total}</p>
                        </div>
                    </div>
                </div>
                <div className="purchase_actions">
                    <div>Is this a purchase for yourself or is it a gift? Only one available option until future features are implemented.</div>
                    <div>
                        <button disabled={cart.items.length === 0} className={cart.items.length ? 'clickable' : ''} onClick={checkout}>Purchase for myself</button>
                        {/* <button>Purchase as a gift</button> */}
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <sup>1</sup>
                </div>
                <div>
                    Sales tax will be calculated during checkout where applicable in the future...
                </div>
            </div>
        </>
    )
}

export default Checkout
