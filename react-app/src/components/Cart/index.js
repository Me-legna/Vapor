import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadCart} from "../../store/cart"
import CartItems from "./CartItems"
import Checkout from "./Checkout"
import ContinueOrRemove from "./ContinueOrRemove"

function Cart() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadCart())
    },[dispatch])


    return (
        <div>
            <header>
                <p>AllProducts {'>'} Your Shopping Cart</p>
                <h1>YOUR SHOPPING CART</h1>
            </header>
            <section>
                <CartItems />
                <Checkout />
            </section>
            <ContinueOrRemove />
        </div>
    )
}

export default Cart
