import React, { Component } from 'react';
import { Navbar, NavbarBrand  } from 'reactstrap';
import { DISHES } from '../shared/dishes'
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDishId: null
    }
  }

  onDishSelect(dishId) {
    this.setState({ selectedDishId: dishId });
  }

  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorant Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes}
          onClick={(dishId) => this.onDishSelect(dishId)} />
        <DishDetail selectedDish={this.state.dishes.
          filter((dish) => dish.id === this.state.selectedDishId)[0]} />
      </div>
    );
  }
}

export default Main;