import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderDish({ dish }) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({ comments }) {

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

    return (
        <div className="col-12 col-md-5 m-1">
            <h4>Commnets</h4>
            <ul className="list-unstyled">
                {dishComments}
            </ul>
        </div>
    );
}

const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.dish.comments} />
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