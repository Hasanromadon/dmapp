import React, { useContext } from 'react';
import { Badge, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/user/UserContext';

const SideNavUser = ({ wishlist }) => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');
  const [state] = useContext(UserContext);
  const user = state.user;
  return (
    <Col className="border-end border-dark border-2 me-3" md={3}>
      <div>
        <div className="mb-5 d-flex">
          <img
            width={50}
            className="me-2 rounded"
            src={user.profile?.image}
            alt=""
          />
          <div>
            <p className="mb-0 fw-bold">{user.name}</p>
            <div>
              <img width={16} src="/assets/images/badge.svg" alt="" />
              <span className="align-middle ms-2 profile-badge">
                Senior Buyer
              </span>
            </div>
          </div>
        </div>
        <ul className="">
          <li className="bg-transparent border-0 mb-3">
            <Link
              className={
                splitLocation[2] === 'order'
                  ? 'sidenav-link fw-bold text-red-primary'
                  : 'sidenav-link fw-bold'
              }
              to="/profile/order"
            >
              My Order
            </Link>
          </li>
          <li className="bg-transparent border-0 mb-3">
            <Link
              className={
                splitLocation[2] === 'reviews'
                  ? 'sidenav-link fw-bold text-red-primary'
                  : 'sidenav-link fw-bold'
              }
              to="/reviews"
            >
              Review and Rating
            </Link>
          </li>
          <li className="bg-transparent border-0 mb-3">
            <Link
              className={
                splitLocation[2] === 'wishlist'
                  ? 'sidenav-link fw-bold text-red-primary'
                  : 'sidenav-link fw-bold'
              }
              to="/profile/wishlist"
            >
              Wishlist <Badge bg="danger">{wishlist}</Badge>
            </Link>
          </li>
          <li className="bg-transparent border-0 mb-3">
            <Link
              className={
                splitLocation[2] === 'setting'
                  ? 'sidenav-link fw-bold text-red-primary'
                  : 'sidenav-link fw-bold'
              }
              to="/profile/setting"
            >
              Setting
            </Link>
          </li>
        </ul>
      </div>
    </Col>
  );
};

export default SideNavUser;
