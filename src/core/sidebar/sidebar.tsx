/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import {
  Box,
  Flex,
  Link,
  CloseButton,
  BoxProps,
  IconButton
} from '@chakra-ui/react';
import {
  FiArrowRightCircle,
  FiArrowLeftCircle,
  FiInfo,
  FiUsers,
  FiSettings
} from 'react-icons/fi';
import {
  BiFoodMenu,
  BiHomeAlt,
  BiUser,
  BiCarousel,
  BiStore,
  BiMessageDetail,
  BiBookContent,
  BiCategory,
  BiBasket,
  BiStar,
  BiPhone,
  BiNews,
  BiWorld,
  BiMessage,
  BiGitPullRequest,
  BiCog
} from 'react-icons/bi';
import { useLocalStorage } from 'usehooks-ts';
import Logo from '@assets/logo/logo.png';
import { NavLink } from 'react-router-dom';

import { IconType } from 'react-icons/lib';
import { MdFastfood } from 'react-icons/md';
import { useState } from 'react';
import { IoBriefcaseOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SidebarMenuItem from './sidebar-item/sidebar-item';

interface SidebarProps extends BoxProps {
  onClose: () => void;
  isOpen?: boolean;
}

export interface ISidebarMenuElements {
  title?: string;
  icon?: IconType;
  id: string;
  isDefaultCollapsed?: boolean;
  item?: ISidebarMenuElements;
  url: string;
  isCollapsable?: boolean;
  modules?: ISidebarMenuElements[];
  isChild?: boolean;
  canShow: string;
}

function Sidebar({ onClose, isOpen, ...rest }: SidebarProps) {
  const { role } = useSelector((state: RootState) => state?.user?.user);

  const sidebarMenuElements = [
    {
      id: 'element-0',
      title: 'Ana səhifə',
      isCollapsable: false,
      icon: BiHomeAlt,
      url: '/home',
      canShow: 'all'
    },
    {
      id: 'element-102',
      title: 'Haqqımızda',
      isCollapsable: false,
      icon: BiBookContent,
      url: '/about',
      canShow: 'Admin'
    },
    {
      id: 'element-103',
      title: 'Əlaqə',
      isCollapsable: false,
      icon: BiPhone,
      url: '/contact',
      canShow: 'Admin'
    },
    {
      id: 'element-104',
      title: 'Bloq',
      isCollapsable: false,
      icon: BiNews,
      url: '/blog',
      canShow: 'Admin'
    },
    {
      id: 'element-104',
      title: 'Tənzimləmə',
      isCollapsable: false,
      icon: BiCog,
      url: '/settings',
      canShow: 'Admin'
    },
    {
      id: 'element-105',
      title: 'Ölkələr',
      isCollapsable: false,
      icon: BiWorld,
      url: '/country',
      canShow: 'Admin'
    },
    {
      id: 'element-106',
      title: 'Mesajlar',
      isCollapsable: false,
      icon: BiMessage,
      url: '/appeal',
      canShow: 'Admin'
    },
    {
      id: 'element-106',
      title: 'Müraciətlər',
      isCollapsable: false,
      icon: BiGitPullRequest,
      url: '/visa',
      canShow: 'Operator'
    },
    {
      id: 'element-106',
      title: 'Müraciətlər',
      isCollapsable: false,
      icon: BiGitPullRequest,
      url: '/visa-admin',
      canShow: 'admin'
    },
    {
      id: 'element-4',
      title: 'İstifadəçilər',
      isCollapsable: false,
      icon: BiUser,
      url: '/users',
      canShow: 'admin'
    }
  ];

  const filteredMenuElements = sidebarMenuElements?.filter(
    element =>
      element.canShow === 'all' ||
      element.canShow.toLowerCase() === role.toLowerCase()
  );

  const [isMenuCollapsed, setIsMenuCollapsed] = useLocalStorage(
    'menuCollapsed',
    false
  );

  const [collapseIsOpen, setCollapseIsOpen] = useState<string[]>([]);

  const handleToggleCollapse = () => {
    setIsMenuCollapsed(prevValue => !prevValue);
    //  setCollapseIsOpen([]);
  };

  return (
    <Box
      transition=".4s ease"
      bg="white"
      shadow="lg"
      w={{ base: '100%', md: isMenuCollapsed ? '80px' : '240px' }}
      overflow="hidden"
      h="full"
      {...rest}
    >
      <Flex
        position="relative"
        alignItems="center"
        justifyContent={isOpen ? 'space-between' : 'center'}
        p={2}
      >
        {' '}
        <Box p={2}>
          <Link as={NavLink} to="/home">
            <img src={Logo} alt="" />
          </Link>
        </Box>
        <IconButton
          className="collapseBtn"
          variant="outline"
          borderRadius="circle"
          aria-label="Collapse Menu"
          onClick={handleToggleCollapse}
          transition=".4s ease"
          fontSize="20px"
          display={{ base: 'none', md: 'flex' }}
          icon={
            isMenuCollapsed ? <FiArrowRightCircle /> : <FiArrowLeftCircle />
          }
          position="fixed"
          top="6%"
          left={isMenuCollapsed ? '60px' : '220px'}
          zIndex="999999"
        />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Flex
        position="relative"
        alignItems="start"
        pl={2}
        flexDirection="column"
      >
        {filteredMenuElements?.map((group: ISidebarMenuElements) => (
          <SidebarMenuItem
            setIsOpen={setCollapseIsOpen}
            isOpen={collapseIsOpen}
            item={group}
            key={group.title}
          />
        ))}
      </Flex>
    </Box>
  );
}

export default Sidebar;
