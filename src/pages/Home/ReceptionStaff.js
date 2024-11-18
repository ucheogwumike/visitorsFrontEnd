import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"
import { Table,Container,Form, FormGroup, Label, Input, Button,Col,Card,CardBody,CardText,
   Modal, ModalHeader, ModalBody, ModalFooter, Alert,CardTitle, UncontrolledAlert} from "reactstrap";
import { findVisitors, editVisitors } from '../../helpers/api_helper';
import './ToggleSwitch.css';
import CustomPagination from './CustomPagination';
import VisitHistory from './VisitHistory';
// import ReceptionPage from '../Profile/profile'
// Redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
import  withRouter from "../../components/Common/withRouter"
import Breadcrumbs from "../../components/Common/Breadcrumb";

import logo from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"


const user = JSON.parse(localStorage.getItem("user"));


const ReceptionPage = props => {

    document.title=" Reception"
  
  
    // const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [vistData,setVisitData] = useState([]);
    const [visitorItem,setVisitorItem] = useState(null);
    const [success, setSuccess] = useState('')
    const[visible, setVisible] = useState(true)
    const [isOn, setIsOn] = useState(false);
    const [userVisits, setUserVisits] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = 100;
  
    const onPageChange = (page) => {
      setCurrentPage(page);
      // .logconsole(`Current Page: ${page}`);
      findVisitors(`/visitors?page=${page}`).then(data => {
        setVisitData(data)})
      // Fetch new data based on the current page if necessary
    };
    
    const toggle = () => setModal(!modal);
    const onDissmiss = () => setVisible(false);



    const visitor =  (item) =>{
      setVisitorItem(item)
      findVisitors(`visits/visits?email=${item.email}&type=visitor`).then(data => {
        // console.log(data)
        setUserVisits(data)
        toggle()
      })
    }
  //  const visitors = async()=>{return await  findVisitors('/visitors')};

    const block = async (email) =>{
     return await editVisitors('/visitors/block',{email}).then(data => {
      if(data?.message){
        window.scrollTo(0, 0);
        setSuccess(data.message)
      }
     } )
    }

    const unblock = async (email) =>{
      return await editVisitors('/visitors/unblock',{email}).then(data => {
        if(data?.message){
          window.scrollTo(0, 0);
          setSuccess(data.message)
        }
       } )
     }

     const toggleButton = async (item) => {
      if(item?.status) {
        await block(item?.email)
        setIsOn(!item?.status)
      }else{
        await unblock(item?.email)
        setIsOn(!item?.status)
      }
      ;}

      

      // findVisitors('/visitors').then(data => {
      //   console.log(data)
      //   setVisitData(data)})
    // console.log(vistData)
   
    useEffect(() => {
    //   document.body.className = "authentication-bg";
      // remove classname when component will unmount
      findVisitors('/visitors').then(data => {
        // console.log(data)
        setVisitData(data)})
      return function cleanup() {
        document.body.className = "";
      };
    },[]);

    
  
    return (
      <React.Fragment>
        <div className="page-content">
          
          <Container fluid>
          <Breadcrumbs title="FIRS" breadcrumbItem="VISITORS" />
          
        </Container>
        {success && <Alert isOpen={visible} toggle={onDissmiss}>{success}</Alert>}
        <Table striped>
  <thead>
    <tr>
      <th>
        #
      </th>
      <th>
        First Name
      </th>
      <th>
        Last Name
      </th>
      <th>
        Email
      </th>
      <th>
        Phone
      </th>
      <th>
        Status
      </th>
      <th>
        Edit
      </th>
      <th>
        Visits
      </th>
    </tr>
  </thead>
  <tbody>
    {vistData.length ? (
      vistData.map((item,id) => (
       
        <tr>
        <th scope="row">
        {id+1}
      </th>
      <td>
        {item.firstName}
      </td>
      <td>
        {item.lastName}
      </td>
      <td>
        {item.email}
      </td>
      <td>
        {item.phone}
      </td>
      <td>
     
        {item.status + ''}
      </td>
      <td>
       <div className="toggle-switch" onClick={()=>toggleButton(item)}>
      <div className={`slider ${item?.status ? 'on' : 'off'}`}>
        {item.status ? 'block' : 'allow'}
      </div>
    </div>
      </td>
      <td>
       <Button onClick={()=>{
        visitor(item)
       
       }}>
        ...
       </Button>
      </td>
        </tr>
      )
        
      ))
    :(<></>)}

    
    
    
    
    

    {/* <tr>
      <th scope="row">
        1
      </th>
      <td>
        Mark
      </td>
      <td>
        Otto
      </td>
      <td>
        @mdo
      </td>
    </tr>
    <tr>
      <th scope="row">
        2
      </th>
      <td>
        Jacob
      </td>
      <td>
        Thornton
      </td>
      <td>
        @fat
      </td>
    </tr>
    <tr>
      <th scope="row">
        3
      </th>
      <td>
        Larry
      </td>
      <td>
        the Bird
      </td>
      <td>
        @twitter
      </td>
    </tr> */}
  </tbody>
        </Table>
      
        <CustomPagination 
        totalItems={totalItems} 
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}/>
        </div>
      
        <Modal size='lg' isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader style={{textAlign:'center'}} toggle={toggle}>Visits</ModalHeader>
        <ModalBody>
          
          <Col md={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody className="text-center">
              {/* Profile Picture */}
              <img
                src={visitorItem?.profile_picture}
                alt={`${visitorItem?.firstName} ${visitorItem?.lastName}`}
                className="rounded-circle"
                width="150"
                height="150"
              />
              <CardTitle tag="h4" className="mt-3">
                {visitorItem?.firstName} {visitorItem?.lastName}
              </CardTitle>
              <CardText>
                <strong>Company:</strong> {visitorItem?.company}
              </CardText>
              <CardText>
                <strong>Phone:</strong> {visitorItem?.phone}
              </CardText>
              <CardText>
                <strong>Email:</strong> {visitorItem?.email}
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <h3 className='mb-3' style={{"textAlign":"center",marginTop:"4px"}}> Visitor's History</h3>
          <VisitHistory data ={userVisits}/>
          
        </ModalBody>
        <ModalFooter>
         
          <Button style={{backgroundColor:"#e3242B", color:'white'}} onClick={()=>{
            toggle()}}>
            close
          </Button>
        </ModalFooter>
      </Modal>
        
      </React.Fragment>
     
    )
  }
  
  ReceptionPage.propTypes = {
    // forgetError: PropTypes.any,
    // forgetSuccessMsg: PropTypes.any,
    history: PropTypes.object,
    // userForgetPassword: PropTypes.func
  }
  
  export default withRouter(ReceptionPage);