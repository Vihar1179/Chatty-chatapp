import React, { useEffect } from 'react';
import { Box, Container, Text, Tab, TabList, TabPanel, TabPanels, Tabs, } from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Homepage = () => {
  const history = useHistory();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo) { history.push("/") };
    }, [history]);

  
  return (
    <Container maxW='xl' centerContent>
      <Box
        d="flex"
        justifyContent="center"
        alignItems="center" // Added property
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px" // Changed "lpx" to "1px"
        textAlign="center" // Added property
      >
        <Text fontSize="4xl" fontFamily="Work sans" color='black'>Chatty</Text>
        <Text fontSize="xl" fontFamily="Work sans" color='black'>
© ~ vihar
</Text>
      </Box>
          <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
              <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <Login />
    </TabPanel>
    <TabPanel>
    <Signup />
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
