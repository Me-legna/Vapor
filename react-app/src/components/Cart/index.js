import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadCart } from "../../store/cart"
import CartItems from "./CartItems"
import Checkout from "./Checkout"
import ContinueOrRemove from "./ContinueOrRemove"

function Cart() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadCart())
    }, [dispatch])


    return (
        <div className="cart-container">
            <header className='single-header'>
                <div>
                    <p>AllProducts {'>'} Your Shopping Cart</p>
                    <h1>YOUR SHOPPING CART</h1>
                </div>
                <div></div>
            </header>
            <section className="main-cart">
                <div className="cart">
                    <CartItems />
                    <Checkout />
                </div>
            </section>
            <div style={{ paddingRight: '20%'}} className="main-cart">
                <ContinueOrRemove />
            </div>
        </div>
    )
}

export default Cart
