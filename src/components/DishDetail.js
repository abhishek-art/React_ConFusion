import React, {Component} from 'react';
import { Card, BreadcrumbItem, CardImg, Breadcrumb, CardText, CardTitle,
    Modal, ModalHeader, ModalBody, Col, Label, Button, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm, Control, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseURL} from '../shared/BaseURL';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len)=> (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)


class CommentForm extends Component {

    constructor(props) {
        super(props)
        this.state= {
            isModalOpen: false,
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit= this.handleSubmit.bind(this)
    }

    handleSubmit (values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.yourname, values.comment)
    }

    toggleModal () {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    render () {
        return (
            <div>
                <button className="btn btn-outline-secondary" onClick={this.toggleModal}>
                <span className="fa fa-pencil"> Submit Comment</span>
                </button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(value) => this.handleSubmit(value)}>
                            <Row className="form-group">
                                <Col xs={12}>
                                <Label htmlFor="rating">Rating</Label>
                                </Col>
                                <Col xs={12}>
                                <Control.select model=".rating" className="form-control"
                                name="rating">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col xs={12}>
                                    <Label htmlFor="yourname">
                                        Your Name
                                    </Label>
                                </Col>
                                <Col xs={12}>
                                    <Control.text model=".yourname" className="form-control"
                                    id="yourname" name="yourname" placeholder="Your Name"
                                    validators={{
                                        required,
                                        minLength: minLength(3), 
                                        maxLength: maxLength(15)
                                    }}/>
                                    <Errors 
                                    className="text-danger" model=".yourname"
                                    show="touched"
                                    messages={{
                                        required: "Required",
                                        minLength: "Must be greater than 2 characters",
                                        maxLength: "Must be 15 characters or less"
                                    }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col xs={12}>
                                    <Label htmlFor="comment">
                                        Comment
                                    </Label>
                                </Col>
                                <Col xs={12}>
                                    <Control.textarea model=".comment" className="form-control"
                                    id="comment" name="comment" rows="6"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col xs={12}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

    function RenderDish({dish}) {
        return(
            <div className="col-12 col-md-5 m-1">
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width="100%" src={baseURL + dish.image} alt={dish.name}/>
                    <CardTitle> {dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </Card>
                </FadeTransform>
            </div>
        )
    }

    function RenderComments({dr, postComment, dishId}){
        const com = 
        <Stagger in>
         {dr.map((c) => {
            return (
                <div className="container">
                    <ul className="list list-unstyled">
                        <Fade in>
                        <li>{c.comment}</li>
                        <li>-- {c.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</li>
                        </Fade>
                    </ul>
                </div>
            )
        })}
        </Stagger>

        return(<div>
            {com}
            <CommentForm dishId={dishId} postComment={postComment}/>
        </div>
        )
    }

    const DishDetail =(props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            ) 
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                    <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if (props.dish != null) {
            return(
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <RenderComments dr={props.comments}
                    postComment={props.postComment}
                    dishId= {props.dish.id} />
                </div>
                </div>
                </div>
            )
        }
    }


export default DishDetail