import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteCart } from "../../store/cart"
import './Cart.css'

function ContinueOrRemove(){
    const dispatch = useDispatch()
    const history = useHistory()

    const removeAll = async (e) => {

        dispatch(deleteCart(false))
    }

    return (
        <div className="continue-remove">
            <div>
                <button className="continue-button clickable" onClick={() => history.push('/store')}>Continue Shopping</button>
            </div>
            <div>
                <p onClick={removeAll} className="clickable">Remove all items</p>
            </div>
        </div>
    )
}

export default ContinueOrRemove
