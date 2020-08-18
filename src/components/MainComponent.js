import React, { Component } from 'react';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from './ContactComponent';
import {COMMENTS} from '../shared/comments';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';
import DishDetail from './DishDetail';
import About from './AboutComponent';

class Main extends Component {

  constructor(props){
    super(props)
    this.state={
      dishes: DISHES,
      selectedDish : null,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    }
  }

  onDishSelect(dishId){
    this.setState({selectedDish: dishId})
}

  render(){

    const HomePage = () => {
      return (
        <Home dish={this.state.dishes.filter((dish)=> dish.featured)[0]}
        promotion={this.state.promotions.filter((promo)=> promo.featured)[0]}
        leader={this.state.leaders.filter((lead)=> lead.featured)[0]}
        />
      )
    }

    const DishWithId = ({match}) => {
      return (
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        comments={this.state.comments.filter((comment)=> comment.dishId ===parseInt(match.params.dishId,10))}
        />
      )
    }

    const AboutPage =() => {
      return(
        <About leaders={this.state.leaders} />
      )
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes= {this.state.dishes}/>}/>
          <Route exact path="/aboutus" component={AboutPage}/>
          <Route exact path="/contactus" component={Contact} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
