import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
        <>
            <h4>Commnets</h4>
            <ul className="list-unstyled">
                {dishComments}
            </ul>
        </>
    );
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
                        <RenderComments comments={props.comments} />
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