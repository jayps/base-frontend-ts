import React from "react";
import PageContainer from "../../components/page-container/PageContainer";
import {Button, Card, Carousel, Col, Container, Form, Jumbotron, Row} from "react-bootstrap";

const About: React.FC = () => {
    return (
        <PageContainer>
            <Carousel>
                <Carousel.Item >
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/800x300"
                        alt="First slide"
                        height={300}
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/800x300"
                        alt="Second slide"
                        height={300}
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/800x300"
                        alt="Third slide"
                        height={300}
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Container>
                <Row>
                    <Col className="pt-5">
                        <Jumbotron>
                            <h1>About Us</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut
                                labore
                                et dolore magna aliqua.
                            </p>
                            <p>
                                <Button variant="primary">Learn more</Button>
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Card className="mb-5">
                            <Card.Body>
                                <h3>Lorem Ipsum</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut
                                    labore
                                    et dolore magna aliqua.
                                </p>
                            </Card.Body>
                        </Card>
                        <Card className="mb-5">
                            <Card.Body>
                                <h3>Lorem Ipsum</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut
                                    labore
                                    et dolore magna aliqua.
                                </p>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <h3>Lorem Ipsum</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut
                                    labore
                                    et dolore magna aliqua.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="https://via.placeholder.com/280x180"/>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <Card>
                            <Card.Body>
                                <div>
                                    <h3>Contact Us</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut
                                        labore
                                        et dolore magna aliqua.
                                    </p>
                                </div>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Your name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name"/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email"/>
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </PageContainer>
    )
}

export default About;