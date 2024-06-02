import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';
import Nav from '../Navbar/Navbar.component';
import { Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import './student-form.css';

const StudentForm = () => {
  const [RegdNo, setRegdNo] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [Branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const { eventName } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        try {
          const response = await fetch('http://localhost:9000/student-form', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              eventName,
              RegdNo,
              contactNo,
              email,
              year,
              Branch,
              userLocation: { latitude, longitude }
            }),
          });

          if (response.ok) {
            toast({
              title: 'Form Submitted Successfully',
              description: "Your form has been submitted successfully and OTP will be triggered shortly.",
              status: 'success',
              duration: 5000,
              isClosable: true,
            });

            setRegdNo('');
            setContactNo('');
            setEmail('');
            setBranch('');
            setYear('');
          } else {
            const data = await response.json();
            if (data.error === 'User location is outside the allowed radius') {
              toast({
                title: 'Error',
                description: 'Your location is outside the allowed radius.',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
            } else if (data.error === 'User already exists') {
              toast({
                title: 'Error',
                description: 'User already exists.',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
            } else {
              console.error('Failed to submit data');
            }
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An error occurred.");
    }
  };

  return (
    <div>
      <Fragment>
        <div>
          <Nav />
        </div>
        <Box className='studentL'>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor='RegdNo'>Register Number</FormLabel>
              <Input
                id='RegdNo'
                placeholder='Enter Register Number'
                value={RegdNo}
                onChange={(e) => setRegdNo(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='contactNo'>Contact No</FormLabel>
              <Input
                id='contactNo'
                type='tel'
                placeholder='Enter Contact No'
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input
                id='email'
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='Branch'>Branch</FormLabel>
              <Input
                id='Branch'
                type='text'
                placeholder='Enter Your Respective Branch'
                value={Branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='year'>Year of Study</FormLabel>
              <Input
                id='year'
                type='text'
                placeholder='Enter Your Year of Study'
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </FormControl>

            <Button mt={4} colorScheme='teal' type='submit'>
              Submit
            </Button>
          </form>
        </Box>
      </Fragment>
    </div>
  );
};

export default StudentForm;
