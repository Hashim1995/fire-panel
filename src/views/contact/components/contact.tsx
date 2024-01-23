/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import {
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  BreadcrumbSeparator,
  Box
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiHome } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { AboutSerices } from '@/services/about-services/about-services';
import { ContactServices } from '@/services/contact-services/contact-services';

import AboutItem from './contact-item';
import { IContactItem } from '../models';

function Contact() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [contactData, setContactData] = useState<IContactItem[]>();
  const [refreshComponent, setRefreshComponent] = useState(false);

  const fetchContct = async () => {
    try {
      const res = await ContactServices.getInstance().get();
      if (res?.succeeded) {
        setContactData(res?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchContct();
  }, [refreshComponent]);
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
              <BreadcrumbLink isCurrentPage href="/contact">
                Əlaqə
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
      </Box>
      <Box
        style={{
          minHeight: '60vh'
        }}
        mt={5}
        shadow="lg"
        bg="white"
        borderRadius={6}
        w="100%"
        p={4}
      >
        <Heading size="xs" mb={1} fontWeight="medium">
          ƏLAQƏ SƏHİFƏ BAŞLIQI
        </Heading>
        {/* <Can action={['updateAboutHeaderAction']}> */}
        <Tabs
          onChange={e => {
            setActiveTab(e);
          }}
        >
          <TabList>
            <Tab>AZ</Tab>
            <Tab>EN</Tab>
            <Tab>RU</Tab>
          </TabList>

          <TabPanels>
            {contactData?.map((item: IContactItem) => (
              <AboutItem
                setRefreshComponent={setRefreshComponent}
                key={item?.id}
                data={item}
              />
            ))}

            {/* <AboutEn />
            <AboutRu /> */}
          </TabPanels>
        </Tabs>
        {/* </Can> */}
      </Box>
    </>
  );
}

export default Contact;
