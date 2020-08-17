import React from 'react';
import { Card, BreadcrumbItem, CardImg, Breadcrumb, CardText, CardTitle} from 'reactstrap';
import {Link} from 'react-router-dom';




    function RenderDish({dish}) {
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardTitle> {dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </Card>
            </div>
        )
    }

    function RenderComments({dr}){
        const com = dr.map((c) => {
            return (
                <div className="container">
                    <ul className="list list-unstyled">
                        <li>{c.comment}</li>
                        <li>-- {c.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</li>
                    </ul>
                </div>
            )
        })

        return(<div>
            {com}
        </div>
        )
    }

    const DishDetail =(props) => {
        if (props.dish == null) {
        return(
            <div>
            </div>)
        }
        else {
            return(
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link active to={`/menu/${props.dish.id}`}>{props.dish.name}</Link></BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <RenderComments dr={props.comments} />
                </div>
                </div>
                </div>
            )
        }
    }


export default DishDetail