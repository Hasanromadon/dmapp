import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form, Col, Row } from 'react-bootstrap';
import ButtonDumbMerch from '../../components/ButtonDumbMerch';
import LayoutAdmin from '../../hoc/LayoutAdmin';
import Select, { StylesConfig } from 'react-select';
import { API } from '../../config/api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const params = useParams('id');

  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState([]);
  const [preview, setPreview] = useState();
  const navigate = useNavigate();

  let { data: product, refetch } = useQuery('productCache', async () => {
    const response = await API.get('/products/' + params.id);
    setPreview(response.data.data.image);
    return response.data.data;
  });
  const getCategories = async () => {
    try {
      const response = await API.get('/categories');
      const optionsCategory = response.data.data.map((cat) => {
        return {
          value: cat.id,
          label: cat.name,
        };
      });
      setCategories(optionsCategory);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product.name,
      price: product.price,
      qty: product.qty,
      desc: product.desc,
      image: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Product name is required'),
      price: Yup.number().required('Price is required'),
      qty: Yup.number().required('Qty is required'),
      desc: Yup.string().min(10).required('Qty is required'),
    }),

    onSubmit: (values) => {
      handleSubmit.mutate(values);
    },
  });

  // submit form

  const handleSubmit = useMutation(async (values) => {
    let categoriesId = selectCategory.map((cat) => cat.value);
    values.categories = categoriesId;

    const formData = new FormData();
    if (values.image !== '') {
      formData.set('image', values.image, values.image.name);
    }
    formData.set('name', values.name);
    formData.set('desc', values.desc);
    formData.set('price', values.price);
    formData.set('qty', values.qty);
    formData.set('categories', values.categories);

    try {
      // POST DATA
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
      await API.patch('/products/' + params.id, formData, config);
      toast('New product added');
      navigate('/admin/product');
    } catch (error) {
      console.log(error);
      toast('Cannot Edit products');
    }
  });

  const handleImage = (e) => {
    formik.setFieldValue('image', e.currentTarget.files[0]);

    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      // borderBottom: '1px dotted pink',
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? '#ffa8b4 ' : '#eaeaea',
      ':hover': {
        backgroundColor: '#ffa8b4 ',
        color: 'white',
      },
    }),

    control: (provided, state) => ({
      ...provided,
      padding: '10px 5px',
      color: 'black',
    }),

    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: '#ffd0d6',
      };
    },
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: '#ffd0d6',
        color: 'white',
      },
      multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: '#ffd0d6',
      }),
    }),
  };

  useEffect(() => {
    if (product.categories) {
      let defaultCat = product.categories.map((cat) => ({
        value: cat.id,
        label: cat.name,
      }));
      setDefaultCategory(defaultCat);
      setSelectCategory(defaultCat);
    }

    getCategories();
  }, [product.categories]);

  return (
    <LayoutAdmin>
      <Col>
        <Row className="justify-content-center">
          <Col md={11}>
            <h4 className="fw-bold mb-5">Edit Product</h4>
            <form onSubmit={formik.handleSubmit}>
              {preview && (
                <div className="mb-3">
                  <img
                    src={preview}
                    style={{
                      maxWidth: '150px',
                      maxHeight: '150px',
                      objectFit: 'cover',
                    }}
                    alt={preview}
                  />
                </div>
              )}
              <Row>
                <Col md={5}>
                  <Form.Group controlId="image" className="mb-3">
                    <Form.Control type="file" onChange={handleImage} />
                  </Form.Group>
                </Col>
              </Row>

              <FloatingLabel
                controlId="name"
                label="Product Name"
                className="mb-3 text-dark p-0"
              >
                <Form.Control
                  type="text"
                  placeholder="name@example.com"
                  {...formik.getFieldProps('name')}
                />
                {formik.errors.name && formik.touched.name ? (
                  <small className="text-red-primary">
                    {formik.errors.name}
                  </small>
                ) : null}
              </FloatingLabel>
              {product?.categories && defaultCategory.length > 0 && (
                <div className="my-3">
                  <small>Select at least one category</small>
                  <Select
                    isMulti
                    defaultValue={defaultCategory}
                    name="categories"
                    placeholder="Select category"
                    options={categories}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customStyles}
                    onChange={(option) => setSelectCategory(option)}
                  />
                </div>
              )}

              <FloatingLabel
                controlId="description"
                label="Description"
                className="mb-3 text-dark p-0"
              >
                <Form.Control
                  as="textarea"
                  style={{ height: '100px' }}
                  placeholder="description"
                  {...formik.getFieldProps('desc')}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="price"
                label="Price"
                className="mb-3 text-dark p-0"
              >
                <Form.Control
                  type="number"
                  className="form-input-big"
                  placeholder="price"
                  {...formik.getFieldProps('price')}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="qty"
                label="Stock"
                className="mb-3 text-dark p-0"
              >
                <Form.Control
                  type="number"
                  className="form-input-big"
                  placeholder="quantity stock"
                  {...formik.getFieldProps('qty')}
                />
              </FloatingLabel>
              <div className="d-grid mt-5">
                <ButtonDumbMerch type="submit">Save</ButtonDumbMerch>
              </div>
            </form>
          </Col>
        </Row>
      </Col>
    </LayoutAdmin>
  );
};

export default EditProduct;
