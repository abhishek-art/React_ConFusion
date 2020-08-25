import React from 'react';
import {Link} from 'react-router-dom';
import { Card, BreadcrumbItem, CardImg, CardImgOverlay, Breadcrumb, CardTitle} from 'reactstrap';
import { Loading } from './LoadingComponent';

function MenuCompo (props) {
    return(
        <Card>
            <Link to={`/menu/${props.dish.id}`}>
            <CardImg width="100%" src={props.dish.image} alt={props.dish.name}/>
            <CardImgOverlay>
            <CardTitle> {props.dish.name}</CardTitle>
            </CardImgOverlay>
            </Link>
        </Card>
    )
    }

const Menu = (props) => {

        const menu = props.dishes.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <MenuCompo dish={dish}/>
                </div>
            )
        });

        if (props.dishes.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.dishes.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.dishes.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link active to="/menu">Menu</Link></BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                    </div>
                </div>
                <div className="row">
                        {menu}
                </div>
            </div>
        );
        }
}

export default Menu