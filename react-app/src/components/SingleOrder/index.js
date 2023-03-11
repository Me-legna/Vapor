import { Button, Col, Container, Row } from "react-bootstrap";

function SingleOrder() {
	return (
		<Container fluid>
			<Row>
				<Col
					lg
					className="p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3"
				>
					Vapor Support
				</Col>
			</Row>
			<Row>
				<Col>
					<Button>Home</Button>
					{" > "}
					<Button>Recent Purchases</Button>
				</Col>
			</Row>
		</Container>
	);
}

export default SingleOrder;
