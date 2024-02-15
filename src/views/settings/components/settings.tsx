/* eslint-disable no-prototype-builtins */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import {
  Flex,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  BreadcrumbSeparator
} from '@chakra-ui/react';
import { BiHome } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

import PaymentTypePrice from './payment-type-price';

// {
//   id,
//   name,
//   isActive
// }

function Settings() {
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
              <BreadcrumbLink as={NavLink} to="/home">
                <BiHome />
              </BreadcrumbLink>
              <BreadcrumbSeparator />

              <BreadcrumbLink as={NavLink} to="/web">
                Veb səhifə
              </BreadcrumbLink>
              <BreadcrumbSeparator />
              <BreadcrumbLink isCurrentPage href="/settings">
                Tənzimləmə
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
      </Box>
      <Box mt={5} shadow="lg" bg="white" borderRadius={6} w="100%" p={4}>
        <Flex justifyContent="left">
          <Heading fontWeight="medium" mb={5} size="md">
            Ödəniş növü qiymətləri
          </Heading>
        </Flex>
        <PaymentTypePrice />
      </Box>
    </>
  );
}

export default Settings;
