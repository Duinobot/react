import React, { Component, useState } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';

function RenderDish({ dish }) {
    return (
        <>
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </>
    );
}

function RenderComments({ comments, addComment, dishId }) {

    const dishComments = comments.map((comment) => {
        var options = { year: 'numeric', month: 'short', day: 'numeric' };
        var date = (new Date(comment.date)).toLocaleString('en-US', options);
        return (
            <li className="list-unstyled" key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {date}</p>
            </li>
        );
    });

    const [isModalOpen, setModal] = useState(false);

    const toggleModal = () => setModal(!isModalOpen);

    return (
        <>
            <h4>Commnets</h4>
            <ul className="list-unstyled">
                {dishComments}
            </ul>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <CommentForm dishId={dishId} addComment={addComment} />
                </ModalBody>
            </Modal>
            <div className="col-12 col-md-5 m-1">
                <Button outline color="secondary" onClick={toggleModal}>Submit Comment</Button>
            </div>
        </>
    );
}


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(values) {
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                    <Col>
                        <Label htmlFor="rating">Rating</Label>

                        <Control.select model=".rating" id="rating" name="rating"
                            className="form-control"
                            placeholder="5">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Control.select>
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col>
                        <Label htmlFor="name">Your Name</Label>
                        <Control.text model=".name" id="name" name="name"
                            placeholder="Your Name"
                            className="form-control"
                            validators={{
                                required: required, minLength: minLength(2), maxlength: maxLength(15)
                            }}>
                        </Control.text>
                        <Errors
                            className="text-danger"
                            model=".name"
                            show="touched"
                            messages={{
                                required: "Name is required",
                                minLength: "Must be greater than 2 characters",
                                maxLength: "Must be 15 characters or less",
                            }}
                        />
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col>
                        <Label htmlFor="comment">Comment</Label>
                        <Control.textarea
                            model=".comment" id="comment" name="comment" rows="6"
                            className="form-control">
                        </Control.textarea>
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col>
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </LocalForm>
        );
    }
}

const DishDetail = (props) => {


    if (props.dish != null) {
        return (
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="row">
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
                    </div>

                </div>
            </div>
        )
    } else {
        return (
            <div className="container">
                <div className="row">
                    <div></div>
                </div>
            </div>
        )
    };
}

export default DishDetail;