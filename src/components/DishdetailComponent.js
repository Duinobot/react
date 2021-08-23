import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, List } from "reactstrap";

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderComments(dish) {
        if (dish != null) {
            const comments = dish.comments.map((comment) => {
                return (
                    <li key={ comment.id }>
                        <p>{ comment.comment }</p>
                        <p>-- { comment.author }</p>
                    </li>
                );
            });

            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Commnets</h4>
                    <List type="unstyled">{comments}</List>
                </div>
            );

        } else {
            return (
                <div className="row">
                    <div></div>
                </div>
            )
        };

    }

    renderDish(dish) {
        if (dish != null)
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
        else
            return (
                <div className="row">
                    <div></div>
                </div>
            );
    }

    render() {
        const dish = this.renderDish(this.props.dishSeletected);
        const comment = this.renderComments(this.props.dishSeletected);
        return (
            <div className="row">{dish}{comment}</div>
        )

    }
}

export default DishDetail;