import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deleteCart } from "../../store/cart"


function ContinueOrRemove(){
    const dispatch = useDispatch()
    const history = useHistory()

    const removeAll = async (e) => {

        dispatch(deleteCart(false))
    }

    return (
        <div>
            <div>
                <button onClick={() => history.push('/store')}>Continue Shopping</button>
            </div>
            <div>
                <p onClick={removeAll} className="clickable">Remove all items</p>
            </div>
        </div>
    )
}

export default ContinueOrRemove
