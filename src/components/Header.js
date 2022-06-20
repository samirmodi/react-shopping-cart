import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Nav,
  Badge,
  Dropdown,
  Container,
  Navbar,
  FormControl,
  Button,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import "./styles.css";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    filterDispatcher,
  } = CartState();

  return (
    <Navbar bg='dark' variant='dark' style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <a href='/'>Shopping Cart</a>
        </Navbar.Brand>
        {useLocation().pathname.split("/")[1] !== "cart" && (
          <Navbar.Text className='search'>
            <FormControl
              style={{ width: 500 }}
              placeholder='Search for a product'
              className='m-auto'
              aria-label='Search'
              onChange={(e) => {
                filterDispatcher({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>
        )}
        <Nav>
          <Dropdown align={{ sm: "right" }}>
            <Dropdown.Toggle variant='success'>
              <FaShoppingCart color='white' fontSize='25px' />

              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length === 0 ? (
                <span style={{ padding: 10 }}>Cart is empty</span>
              ) : (
                cart.map((cartItem) => (
                  <div>
                    <span className='cartitem' key={cartItem.id}>
                      <img
                        src={cartItem.image}
                        className='cartImage'
                        alt={cartItem.name}
                      />
                      <div className='cartItemDetail'>
                        <span>{cartItem.name}</span>
                        <span> $ {cartItem.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize='20px'
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: cartItem,
                          })
                        }
                      />
                    </span>
                    <Link to='/cart'>
                      <Button style={{ width: "95%", margin: "0 10px" }}>
                        Go To Cart
                      </Button>
                    </Link>
                  </div>
                ))
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
