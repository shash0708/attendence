import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, Box, CheckboxGroup, Checkbox, HStack } from '@chakra-ui/react';
import Nav from '../Navbar/Navbar.component';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import axios from 'axios'; // Import Axios

export default function Form() {
  const [eventName, setEventName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [strength, setStrength] = useState('');
  const [year, setYear] = useState([]);
  const [organization, setOrganization] = useState('');
  const [department, setDepartment] = useState('');
  const [maxRadius, setMaxRadius] = useState('');
  const [adminLocation, setAdminLocation] = useState({ latitude: null, longitude: null });
                                                                                                                                    
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get admin location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setAdminLocation({ latitude, longitude });

        try {
          // Axios POST request for form submission
          const response = await axios.post('https://bjp-suru.onrender.com/update', {
            eventName,
            contactNo,
            strength,
            year,
            organization,
            department,
            maxRadius,
            adminLocation: { latitude, longitude }
          }, {
            headers: {
              'Content-Type': 'application/json',
            },      
          withCredentials: true
          });

          console.log(response);

          if (response.status === 200) {
            // Handle successful submission
            toast({
              title: 'Form Submitted Successfully',
              description: "Your form has been submitted successfully and Link generated Successfully.",
              status: 'success',
              duration: 5000, // Adjust duration as needed
              isClosable: true,
            });

            // Call function to generate link
            generateLink(eventName);
          } else {
            // Handle errors
            console.error('Failed to submit data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const generateLink = async (eventName) => {
    try {
      // Axios POST request to generate link
      const linkResponse = await axios.post('https://bjp-suru.onrender.com/generate-link/', {
        eventName
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true

      });

      if (linkResponse.status === 200) {
        // Handle successful link generation
        const linkData = linkResponse.data;
        console.log('Generated Link:', linkData.link);

        // Copy to clipboard
        if (navigator.clipboard) {
          navigator.clipboard.writeText(linkData.link)
            .then(() => {
              toast({
                title: 'Link Copied',
                description: "The generated link has been copied to your clipboard.",
                status: 'info',
                duration: 5000,
                isClosable: true,
              });
            });
        }

        // Redirect to the link page
        navigate(`/${eventName}`);

      } else {
        // Handle errors in link generation
        console.error('Failed to generate link');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const showError = (error) => {
    switch(error.code) {
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

  const handleYearChange = (selectedYears) => {
    setYear(selectedYears);
  };

  return (
    <Fragment>
      <div>
        <Nav/>
      </div>
      <Box width="400px" marginRight="200" marginTop='10' marginLeft="auto">
        <form onSubmit={handleSubmit}>
          {/* Form controls */}
          {/* Event Name */}
          <FormControl>
            <FormLabel htmlFor='eventName'>Event Name</FormLabel>
            <Input
              id='eventName'
              placeholder='Enter Event name'
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </FormControl>

          {/* Contact No */}
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

          {/* Strength */}
          <FormControl>
            <FormLabel htmlFor='strength'>Strength</FormLabel>
            <Input
              id='strength'
              placeholder='Enter Strength of the Event'
              value={strength}
              onChange={(e) => setStrength(e.target.value)}
            />
          </FormControl>

          {/* Year */}
          <FormControl>
            <FormLabel htmlFor='year'>Select Year</FormLabel>
            <CheckboxGroup value={year} onChange={handleYearChange}>
              <HStack spacing={4}>
                <Checkbox value='1st'>1st Year</Checkbox>
                <Checkbox value='2nd'>2nd Year</Checkbox>
                <Checkbox value='3rd'>3rd Year</Checkbox>
              </HStack>
            </CheckboxGroup>
          </FormControl>

          {/* Organization */}
          <FormControl>
            <FormLabel htmlFor='organization'>Organization</FormLabel>
            <Input
              id='organization'
              placeholder='Association of Computer Engineers'
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </FormControl>

          {/* Department */}
          <FormControl>
            <FormLabel htmlFor='department'>Department</FormLabel>
            <Input
              id='department'
              placeholder='Computer Science Engineers'
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </FormControl>

          {/* Max Radius */}
          <FormControl>
            <FormLabel htmlFor='maxRadius'>Max Radius (in meters)</FormLabel>
            <Input
              id='maxRadius'
              placeholder='Enter max radius'
              type='number'
              value={maxRadius}
              onChange={(e) => setMaxRadius(e.target.value)}
            />
          </FormControl>

          {/* Submit Button */}
          <Button mt={4} colorScheme='teal' type='submit'>
            Submit
          </Button>
        </form>
      </Box>
    </Fragment>
  );
}
