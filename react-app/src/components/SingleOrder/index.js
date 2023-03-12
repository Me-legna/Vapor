import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { loadOneOrder } from "../../store/orders";
import Issues from "./Issues";
import OrderDetails from "./OrderDetails";

function SingleOrder() {
  const user = useSelector(state => state.session.user)
  const order = useSelector(state => state.orders.singleOrder)
  const [loaded, setLoaded] = useState(false)


  const dispatch = useDispatch()
  const history = useHistory()
  const {orderId} = useParams()

  useEffect(()=>{
    dispatch(loadOneOrder(orderId))
    setLoaded(true)
  },[dispatch, orderId])

  // if((!user || !order.id) && user.id !== order.customer_id) return null
	return loaded && (
		<Container>
			<Row>
				<Col
					lg
					className="p-3 text-primary-emphasis bg-primary border border-primary rounded-3"
				>
					Vapor Support
				</Col>
			</Row>
			<Row>
				<Col>
					<Button className="btn-link">Home</Button>
					{" > "}
					<Button className="btn-link">Recent Purchases</Button>
				</Col>
			</Row>
      <OrderDetails/>
      <Issues/>
		</Container>
	);
}

export default SingleOrder;
