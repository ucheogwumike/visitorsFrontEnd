import React, { useEffect, useState } from "react"
import { Container, Row, Col, Card, CardBody, CardTitle, Table  } from "reactstrap";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { findVisitors } from "../../helpers/api_helper";



//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";


const users = [
  { name: 'John Doe', registrationTime: '2024-10-17 10:00 AM' },
  { name: 'Jane Smith', registrationTime: '2024-10-17 11:30 AM' },
  { name: 'Mark Johnson', registrationTime: '2024-10-18 9:00 AM' },
];

const data = [
  { month: 'jan', visits: 12 },
  { month: 'feb', visits: 20 },
  { month: 'mar', visits: 12 },
  { month: 'apr', visits: 12 },
  { month: 'may', visits: 12 },
  { month: 'jun', visits: 12 },
  { month: 'jul', visits: 12 },
  { month: 'aug', visits: 12 },
  { month: 'sep', visits: 12 },
  { month: 'oct', visits: 12 },
  { month: 'nov', visits: 12 },
  { month: 'dec', visits: 12 },
  // Add more data points as needed
];


const Dashboard = () => {

  document.title=" Dashboard | Minible - Responsive Bootstrap 5 Admin Dashboard"

  const [user,setUser] = useState(null)
  useEffect(()=>{
    findVisitors('/visits/dashboard').then(
      response=>setUser(response.data)
    ).catch(
      
    )
  },[])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Minible" breadcrumbItem="Dashboard" />
          <Row>
        {/* Number of Users */}
        <Col  md={6}>
        <Col className="d-flex" style={{justifyContent:"space-evenly"}}>
        <Card  style={{width:'40%'}}>
            <CardBody>
              <CardTitle tag="h5">Total Visitors</CardTitle>
              <h2>{user?.visitorCount}</h2>
            </CardBody>
          </Card>
          <Card style={{width:'40%'}}>
            <CardBody>
              <CardTitle tag="h5">Total Visits</CardTitle>
              <h2>{user?.visitCount}</h2>
            </CardBody>
            
          </Card>
        </Col>
        <Col className="d-flex" style={{justifyContent:"space-evenly"}}>
        <Card  style={{width:'40%'}}>
            <CardBody>
              <CardTitle tag="h5">Blocked Visitors</CardTitle>
              <h2>{user?.blockeVisitors}</h2>
            </CardBody>
          </Card>
          <Card style={{width:'40%'}}>
            <CardBody>
              <CardTitle tag="h5">Ongoing Visits</CardTitle>
              <h2>{user?.ongoingvisitCount}</h2>
            </CardBody>
            
          </Card>
        </Col>
        
        </Col>

        {/* <Col md={3}>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Total Visits</CardTitle>
              <h2>{user?.visitCount}</h2>
            </CardBody>
          </Card>
        </Col> */}

        {/* Recent Registrations */}
        <Col md={6}>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Recent Registrations</CardTitle>
              <Table bordered striped>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Date of Visit</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.recentVisits.map((user, index) => (
                    <tr key={index}>
                      <td>{user?.visitor[0].firstName} {user?.visitor[0].lastName}</td>
                      <td>{user?.code}</td>
                      <td>{user?.dateOfVisit.split('T')[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      
      <ResponsiveContainer width="100%" height={400}>
                <BarChart data={user?.monthAndYear}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="visits"  />
                </BarChart>
              </ResponsiveContainer>
        
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;