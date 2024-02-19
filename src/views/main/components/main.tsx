/* eslint-disable prefer-rest-params */

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  // Grid,
  // GridItem,
  // Button,
  Stack
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import Stats from './stats';

// import PieChart from '../charts/pie-chart';
// import PieChart from '../charts/pie-chart';

function Main() {
  return (
    <>
      <Box
        bg="white"
        w="100%"
        shadow="lg"
        px={4}
        py={2}
        borderRadius={6}
        transition=".4s ease"
      >
        <Flex align="center">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink isCurrentPage href="#">
                Ana səhifə
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
      </Box>

      <Box
        pos="relative"
        mt={5}
        overflow="hidden"
        shadow="lg"
        bg="white"
        borderRadius={6}
        w="100%"
        p={4}
      >
        <Stack
          textAlign="center"
          align="center"
          spacing={{ base: 8, md: 10 }}
          py={{ base: 5, md: 10 }}
        >
          <Flex
            align="center"
            style={{
              zIndex: '99'
            }}
          >
            <Heading
              as={NavLink}
              to="#"
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '3xl', md: '3xl' }}
              color="blue.500"
              mr={2}
            >
              Iviza veb-səhifəsinin
            </Heading>
            <Heading
              fontWeight={600}
              fontSize={{ base: '1xl', sm: '2xl', md: '3xl' }}
              color="gray.800"
            >
              admin panelinə xoş gəlmisiniz{' '}
            </Heading>
          </Flex>
        </Stack>
        <Stats />
      </Box>
    </>
  );
}

export default Main;
