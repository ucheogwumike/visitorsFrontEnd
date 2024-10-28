import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, Table  } from "reactstrap";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';




//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";


const users = [
  { name: 'John Doe', registrationTime: '2024-10-17 10:00 AM' },
  { name: 'Jane Smith', registrationTime: '2024-10-17 11:30 AM' },
  { name: 'Mark Johnson', registrationTime: '2024-10-18 9:00 AM' },
];

const data = [
  { day: '1', activities: 12 },
  { day: '2', activities: 15 },
  { day: '3', activities: 8 },
  { day: '4', activities: 10 },
  { day: '5', activities: 17 },
  { day: '6', activities: 6 },
  { day: '7', activities: 13 },
  // Add more data points as needed
];


const Dashboard = () => {

  document.title=" Dashboard | Minible - Responsive Bootstrap 5 Admin Dashboard"


  

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Minible" breadcrumbItem="Dashboard" />
          <Row>
        {/* Number of Users */}
        <Col md={6}>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Total Users</CardTitle>
              <h2>{users.length}</h2>
            </CardBody>
          </Card>
        </Col>

        {/* Recent Registrations */}
        <Col md={6}>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Recent Registrations</CardTitle>
              <Table bordered striped>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Registration Time</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.registrationTime}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      
      <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="activities" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
        
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;