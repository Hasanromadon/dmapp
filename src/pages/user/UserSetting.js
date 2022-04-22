import React, { useContext, useState } from 'react';
import { Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import LayoutUser from '../../hoc/LayoutUser';
import FormPersonalInformation from '../../components/FormPersonalInformation';
import FormChangePassword from '../../components/FormChangePassword';
import { UserContext } from '../../context/user/UserContext';
import { API } from '../../config/api';
import { toast } from 'react-toastify';

const UserSetting = () => {
  const title = 'Profile';
  document.title = 'DumbMerch | ' + title;

  const [key, setKey] = useState('personal-info');
  const [state, dispatch] = useContext(UserContext);

  const handleChangePicture = async (e) => {
    const values = e.target.files[0];

    if (values) {
      try {
        const formData = new FormData();
        formData.append('image', values);

        const config = {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        };

        const response = await API.patch('/users/image', formData, config);
        if (response.status === 200) {
          await API.get('/users/profile').then((data) => {
            dispatch({
              type: 'UPDATE_SUCCESS',
              payload: data.data.data,
            });
            toast('profile updated!');
          });
        }
      } catch (error) {
        console.log(error);
        toast('Cannot image products');
      }
    }
  };
  console.log('oke');
  return (
    <LayoutUser>
      <Col className="p-0">
        <h5 className="mb-3">My Profile</h5>
        <Row className="g-0">
          <Col className="me-4" md={2}>
            <div className="mb-2 mb-sm-0">
              <Form>
                <img
                  className="mb-1 image-profile rounded"
                  width={'100%'}
                  height={120}
                  src={
                    state.user?.profile?.image !== null
                      ? state.user?.profile?.image
                      : '/assets/images/default_profile.png'
                  }
                  alt="admin"
                />
                <label
                  className="button-dumb-merch p-1 rounded"
                  for="upload-image-profile"
                >
                  Change Picture
                </label>
                <input
                  onChange={(e) => handleChangePicture(e)}
                  className="d-none"
                  id="upload-image-profile"
                  type="file"
                  name="upload-image-profile"
                />
              </Form>
            </div>
          </Col>
          <Col>
            <Tabs
              id="tab-profile"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-4 tab-profile"
            >
              <Tab eventKey="personal-info" title="Personal Information">
                <FormPersonalInformation state={state} dispatch={dispatch} />
              </Tab>
              <Tab eventKey="security" title="Security">
                <FormChangePassword state={state} dispatch={dispatch} />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Col>
    </LayoutUser>
  );
};

export default UserSetting;
