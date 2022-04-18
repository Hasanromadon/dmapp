import React, { useContext } from 'react';
import { Accordion, Badge, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { UserContext } from '../context/user/UserContext';

const SideNavAdmin = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');
  const [state, dispatch] = useContext(UserContext);

  return (
    <Col className="border-end border-dark border-2 me-3" md={3}>
      <div>
        <div className="mb-5 d-flex">
          <div>
            <p className="mb-0 fw-bold">Welcome!</p>
            <p className="mb-0 fw-bold">{state.user?.name}</p>
          </div>
        </div>
        <ul className="">
          <li className="bg-transparent border-0 mb-3">
            <Link
              className={
                splitLocation[2] === 'orders'
                  ? 'sidenav-link fw-bold text-red-primary'
                  : 'sidenav-link fw-bold'
              }
              to="/admin/orders"
            >
              Orders
            </Link>
          </li>
          <li className="bg-transparent border-0 mb-3">
            <Link
              className={
                splitLocation[2] === 'report'
                  ? 'sidenav-link fw-bold text-red-primary'
                  : 'sidenav-link fw-bold'
              }
              to="/admin/report"
            >
              Report
            </Link>
          </li>
          <li className="bg-transparent border-0 mb-3">
            <Collapsible
              open={
                splitLocation[2] === 'product' ||
                splitLocation[2] === 'category'
              }
              transitionTime={100}
              trigger="Product"
            >
              <div>
                <Link
                  className={
                    splitLocation[2] === 'product'
                      ? 'sidenav-link fw-bold text-red-primary'
                      : 'sidenav-link fw-bold'
                  }
                  to="/admin/product"
                >
                  All Products
                </Link>
              </div>
              <div className="mt-2">
                <Link
                  className={
                    splitLocation[2] === 'category'
                      ? 'sidenav-link fw-bold text-red-primary'
                      : 'sidenav-link fw-bold'
                  }
                  to="/admin/category"
                >
                  Category
                </Link>
              </div>
            </Collapsible>
          </li>
        </ul>
      </div>
    </Col>
  );
};

export default SideNavAdmin;
