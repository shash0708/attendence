import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from '@chakra-ui/react'
import Nav from '../Navbar/Navbar.component'
import { Fragment,Outlet } from 'react'
export default function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve()
      }, 3000)
    })
  }

  return (
    <Fragment>
    <div>
    <Nav/>
    </div>
    <Box width="400px" marginRight="200" marginTop='10' marginLeft="auto">
    <form onSubmit={handleSubmit(onSubmit)}>
    <FormControl isInvalid={errors.firstName}>
      <FormLabel htmlFor='firstName'>Event Name</FormLabel>
      <Input
        id='firstName'
        placeholder='Enter Event name'
        {...register('firstName', {
          required: 'This field is required',
          minLength: { value: 4, message: 'Minimum length should be 4' },
        })}
      />
      <FormErrorMessage>
        {errors.firstName && errors.firstName.message}
      </FormErrorMessage>
    </FormControl>

    <FormControl isInvalid={errors.phone}>
    <FormLabel htmlFor='phone'>Contact No</FormLabel>
    <Input
      id='phone'
      type='tel' // Changed from 'phone' to 'tel'
      placeholder='Enter Contact No'
      {...register('phone', {
        required: 'This field is required',
        pattern: {
          value: /^[0-9]{10}$/, // Adjusted pattern for phone numbers
          message: 'Invalid phone number',
        },
      })}
    />
    <FormErrorMessage>
      {errors.phone && errors.phone.message} {/* Fixed typo here */}
    </FormErrorMessage>
  </FormControl>
  
   
    <FormControl isInvalid={errors.course}>
      <FormLabel htmlFor='course'>Course</FormLabel>
      <Input
        id='course'
        placeholder='Enter your course'
        {...register('course', {
          required: 'This field is required',
          minLength: { value: 4, message: 'Minimum length should be 4' },
        })}
      />
      <FormErrorMessage>
        {errors.course && errors.course.message}
      </FormErrorMessage>
    </FormControl>
    <FormControl isInvalid={errors.section}>
      <FormLabel htmlFor='section'>Section</FormLabel>
      <Input
        id='section'
        placeholder='Enter your section'
        {...register('section', {
          required: 'This field is required',
          minLength: { value: 4, message: 'Minimum length should be 4' },
        })}
      />
      <FormErrorMessage>
        {errors.section && errors.section.message}
      </FormErrorMessage>
    </FormControl>
    <FormControl isInvalid={errors.subject}>
      <FormLabel htmlFor='subject'>Subject</FormLabel>
      <Input
        id='subject'
        placeholder='Enter your subject'
        {...register('subject', {
          required: 'This field is required',
          minLength: { value: 4, message: 'Minimum length should be 4' },
        })}
      />
      <FormErrorMessage>
        {errors.subject && errors.subject.message}
      </FormErrorMessage>
    </FormControl>
    <FormControl isInvalid={errors.subjectCode}>
      <FormLabel htmlFor='subjectCode'>Subject Code</FormLabel>
      <Input
        id='subjectCode'
        placeholder='Enter your subject code'
        {...register('subjectCode', {
          required: 'This field is required',
          minLength: { value: 4, message: 'Minimum length should be 4' },
        })}
      />
      <FormErrorMessage>
        {errors.subjectCode && errors.subjectCode.message}
      </FormErrorMessage>
    </FormControl>
    <FormControl isInvalid={errors.maxRadius}>
      <FormLabel htmlFor='maxRadius'>Max Radius (in meters)</FormLabel>
      <Input
        id='maxRadius'
        placeholder='Enter max radius'
        type='number'
        {...register('maxRadius', {
          required: 'This field is required',
          minLength: { value: 4, message: 'Minimum length should be 4' },
        })}
      />
      <FormErrorMessage>
        {errors.maxRadius && errors.maxRadius.message}
      </FormErrorMessage>
    </FormControl>
    <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
      Submit
    </Button>
  </form>
    </Box>
    </Fragment>
  )
}
