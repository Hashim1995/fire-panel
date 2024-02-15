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
  BiGitPullRequest
} from 'react-icons/bi';
import { useLocalStorage } from 'usehooks-ts';
import Logo from '@assets/logo/logo.png';
import { NavLink } from 'react-router-dom';

import { IconType } from 'react-icons/lib';
import { MdFastfood } from 'react-icons/md';
import { useState } from 'react';
import { IoBriefcaseOutline } from 'react-icons/io5';
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
}

function Sidebar({ onClose, isOpen, ...rest }: SidebarProps) {
  const sidebarMenuElements = [
    {
      id: 'element-0',
      title: 'Ana səhifə',
      isCollapsable: false,
      icon: BiHomeAlt,
      url: '/home'
    },
    {
      id: 'element-102',
      title: 'Haqqımızda',
      isCollapsable: false,
      icon: BiBookContent,
      url: '/about'
    },
    {
      id: 'element-103',
      title: 'Əlaqə',
      isCollapsable: false,
      icon: BiPhone,
      url: '/contact'
    },
    {
      id: 'element-104',
      title: 'Bloq',
      isCollapsable: false,
      icon: BiNews,
      url: '/blog'
    },
    {
      id: 'element-105',
      title: 'Ölkələr',
      isCollapsable: false,
      icon: BiWorld,
      url: '/country'
    },
    {
      id: 'element-106',
      title: 'Mesajlar',
      isCollapsable: false,
      icon: BiMessage,
      url: '/appeal'
    },
    {
      id: 'element-106',
      title: 'Müraciətlər',
      isCollapsable: false,
      icon: BiGitPullRequest,
      url: '/visa'
    },
    {
      id: 'element-106',
      title: 'Müraciətlər',
      isCollapsable: false,
      icon: BiGitPullRequest,
      url: '/visa-admin'
    }
    // {
    //   id: 'element-1',
    //   title: 'Sifarişlər',
    //   isCollapsable: false,
    //   icon: BiBasket,
    //   url: '/orders'
    // },
    // {
    //   id: 'element-2',
    //   title: 'Menular',
    //   isCollapsable: false,
    //   icon: BiFoodMenu,
    //   url: '/menus'
    // },
    // {
    //   id: 'element-2',
    //   title: 'Filiallar',
    //   isCollapsable: false,
    //   icon: BiStore,
    //   url: '/branches'
    // },

    // {
    //   id: 'element-3',
    //   title: 'Müştərilər',
    //   isCollapsable: false,
    //   icon: FiUsers,
    //   url: '/clients'
    // },
    // {
    //   id: 'element-4',
    //   title: 'İstifadəçilər',
    //   isCollapsable: false,
    //   icon: BiUser,
    //   url: '/users'
    // },
    // {
    //   id: 'element-7',
    //   title: 'Mesajlar',
    //   isCollapsable: false,
    //   icon: BiMessageDetail,
    //   url: '/messages'
    // },

    // {
    //   id: 'element-8',
    //   title: 'Karyera',
    //   isCollapsable: false,
    //   icon: IoBriefcaseOutline,
    //   url: '/career'
    // },
    // {
    //   id: 'element-8',
    //   title: 'Mesajlar',
    //   isCollapsable: false,
    //   icon: BiBookContent,
    //   url: '/applications'
    // },

    // {
    //   id: 'element-2.1',
    //   title: 'Slayder',
    //   isCollapsable: false,
    //   icon: BiCarousel,
    //   url: '/web/slider'
    // },
    // {
    //   id: 'element-2.2',
    //   title: 'Haqqımızda',
    //   isCollapsable: false,
    //   icon: FiInfo,
    //   url: '/web/about'
    // },
    // {
    //   id: 'element-2.3',
    //   title: '11 İnqridient',
    //   isCollapsable: false,
    //   icon: BiFoodMenu,
    //   url: '/web/eleven-ingredient'
    // },
    // {
    //   id: 'element-2.4',
    //   title: 'Kateqoriya',
    //   isCollapsable: false,
    //   icon: BiCategory,
    //   url: '/category'
    // },
    // {
    //   id: 'element-2.5',
    //   title: 'Məhsul',
    //   isCollapsable: false,
    //   icon: MdFastfood,
    //   url: '/product'
    // },
    // {
    //   id: 'element-2.6',
    //   title: 'Tənzimləmə',
    //   isCollapsable: false,
    //   icon: FiSettings,
    //   url: '/settings'
    // },
    // {
    //   id: 'element-2.7',
    //   title: 'Populyar',
    //   isCollapsable: false,
    //   icon: BiStar,
    //   url: '/popular'
    // }

    // {
    //   id: 'element-4',
    //   title: 'Hesabatlar',
    //   isCollapsable: false,
    //   icon: BiFile,
    //   url: '/reports'
    // },
    // {
    //   id: 'element-6',
    //   title: 'Veb səhifə',
    //   isCollapsable: true,
    //   icon: BiWorld,
    //   url: '/web',
    //   modules: [
    //     {
    //       id: 'element-2.1',
    //       title: 'Slayder',
    //       isCollapsable: false,
    //       icon: BiCarousel,
    //       isChild: true,
    //       url: '/web/slider'
    //     },
    //     {
    //       id: 'element-2.2',
    //       title: 'Haqqımızda',
    //       isCollapsable: false,
    //       icon: FiInfo,
    //       isChild: true,
    //       url: '/web/about'
    //     },
    //     {
    //       id: 'element-2.3',
    //       title: '11 İnqridient',
    //       isCollapsable: false,
    //       icon: BiFoodMenu,
    //       isChild: true,
    //       url: '/web/eleven-ingredient'
    //     }
    //   ]
    // },
    // {
    //   id: 'element-5',
    //   title: 'Tənzimləmələr',
    //   isCollapsable: false,
    //   icon: FiSettings,
    //   url: '/settings'
    // }
  ];

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
        {sidebarMenuElements.map((group: ISidebarMenuElements) => (
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
