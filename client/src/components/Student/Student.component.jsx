import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Heading,
  Text,
} from "@chakra-ui/react";
import Attendence from "../attendence/Attendence";
import Nav from "../Navbar/Navbar.component";
import { useParams } from "react-router-dom";
import axios from "axios";
import './LinkPage.styles.css'
const LinkPage = () => {
  const [eventDetails, setEventDetails] = useState([]);
  const { eventName } = useParams();
  

  useEffect(() => {
    axios
      .get(`https://bjp-suru.onrender.com/fetchEventDetails?eventName=${eventName}`)
      .then((response) => {
        setEventDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [eventName]); // Ensure useEffect runs when `eve` changes

  return (
    <div>

      <Nav />
      <div  >
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(800px, 1fr))"
        marginTop={50}

        className="box"


      >
        <SimpleGrid
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          justifyContent={"center"}
          display={"flex"}

        >
          <Card
            size="xxl"
            borderRadius="xl"
            boxShadow="xl"
            padding={6}
            margin={4}
          >
            <div > 
              <h2>Event Details</h2>
              {eventDetails.map((event, index) => (
                <div key={index}>
                  <p>Event Name: {event.eventName}</p>
                  <p>Contact No: {event.contactNo}</p>
                  <p>Strength: {event.strength}</p>
                </div>
              ))}
            </div>
            <CardFooter></CardFooter>
          </Card>
        </SimpleGrid>
        <div >
          <Attendence className="sss"/>
        </div>
      </SimpleGrid>
    
      </div>
    </div>
  );
};

export default LinkPage;
