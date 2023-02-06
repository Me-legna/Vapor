import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import {  removeFromCart } from "../../store/cart"
import { authenticate } from "../../store/session"
import vaporLogo from '../../images/vapor-icon.png'


function CartItems(){
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const history = useHistory()

    async function removeGame(e, gameId) {
        e.preventDefault()
        await dispatch(removeFromCart(gameId))
        await dispatch(authenticate())

    }
    const addDefaultSrc = (e) => {
        e.target.onerror = null; // prevents looping
        e.target.src = vaporLogo
    }
    return(
        <div>
            {cart.items.map(item => (
                <div key={item.id}>
                    <div className="clickable" onClick={() => history.push(`/games/${item.id}`)}>
                        <img src={item.preview} onError={addDefaultSrc} alt={item.title}></img>
                    </div>
                    <div className="cart_title_and_price">
                        <p className="clickable" onClick={() => history.push(`/games/${item.id}`)}>{item.title}</p>
                        <div>
                            <p>${item.price}</p>
                            <div onClick={(e) => removeGame(e, item.id)} className="clickable remove_from_cart">Remove</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CartItems
