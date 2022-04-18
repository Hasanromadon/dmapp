import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Chart from '../../components/Chart';
import LayoutAdmin from '../../hoc/LayoutAdmin';
import { useQuery } from 'react-query';
import { API } from '../../config/api';
import toRupiah from '@develoka/angka-rupiah-js';
import dateFormat, { masks } from 'dateformat';
const Report = () => {
  const now = new Date();

  let { data: reports, refetch } = useQuery('reportsCache', async () => {
    const response = await API.get('/transactions/report/months');
    return response.data.data;
  });
  const currentMonth = new Date().getMonth() + 1;
  const reportCurrentMonth =
    reports && reports.find((report) => report.month === currentMonth);

  const allRevenue = (reports) => {
    let totalRevenue = 0;
    reports.map((item) => {
      return (totalRevenue += +item.total);
    });
    return totalRevenue;
  };

  return (
    <LayoutAdmin>
      <Col>
        <h5>Summary</h5>
        <Row>
          <Col md={4}>
            <div className="monthly-revenue py-2 px-3">
              <small> Revenue {dateFormat(now, 'mmmm')}</small>
              <h5 className="mt-1">
                {reportCurrentMonth && reportCurrentMonth !== 0
                  ? toRupiah(reportCurrentMonth && reportCurrentMonth.total, {
                      floatingPoint: 0,
                    })
                  : 0}
              </h5>
            </div>
          </Col>
          <Col md={4}>
            <div className="monthly-revenue py-2 px-3">
              <small>All Revenue</small>
              <h5 className="mt-1">
                {reports &&
                  reports.length > 0 &&
                  toRupiah(allRevenue(reports), {
                    floatingPoint: 0,
                  })}
              </h5>
            </div>
          </Col>
        </Row>
        <h5 className="mt-5">Report</h5>
        {reports && <Chart reports={reports} />}
      </Col>
    </LayoutAdmin>
  );
};

export default Report;
