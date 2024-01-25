/* eslint-disable prefer-rest-params */

import { MouseEvent, useRef } from 'react';
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
import travel from '@assets/images/travel.svg';

// import PieChart from '../charts/pie-chart';
// import PieChart from '../charts/pie-chart';

function Main() {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const box = imageRef?.current?.getBoundingClientRect();
    if (!box) return;
    const mouseX = event.clientX - box.left;
    const mouseY = event.clientY - box.top;
    const newX = (mouseX / box.width) * 20;
    const newY = (mouseY / box.height) * 20;
    if (imageRef.current) {
      imageRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current!.style.transform = 'translate(0, 0)';
    }
  };

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
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        bg="white"
        borderRadius={6}
        w="100%"
        p={4}
      >
        <img
          ref={imageRef}
          draggable="false"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            overflow: 'hidden !important',
            left: 0,
            width: '100%',
            right: 0,
            height: '100%',
            opacity: '0.8'
          }}
          alt=""
          src={travel}
        />
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
          <span
            style={{
              zIndex: '99'
            }}
            color="gray.500"
          >
            Never miss a meeting. Never be late for one too. Keep track of your
            meetings and receive smart reminders in appropriate times. Read your
            smart “Daily Agenda” every morning.
          </span>

          <Flex height={{ sm: '24rem', lg: '20rem' }} w="full" />
        </Stack>
      </Box>
    </>
  );
}

export default Main;
