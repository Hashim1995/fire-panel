/* eslint-disable react/no-array-index-key */
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
  Switch,
  FormControl,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  BreadcrumbSeparator,
  Skeleton,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Pagination from '@/components/display/pagination/pagination';
import { BiDotsVertical, BiHome } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import NoData from '@/components/feedback/no-data/no-data';
import { OptionsServices } from '@/services/options-services/options-services';
import { addBtn, noText } from '@/utils/constants/texts';
import OptionEditModal from '../modals/option-edit-modal';
import { IOptionItem, IOptionListResponse } from '../models';
import OptionAddModal from '../modals/option-add-modal';

function Options() {
  const [page, setCurrentPage] = useState<number>(1);
  const [options, setOptions] = useState<IOptionListResponse['data'] | null>(
    null
  );
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<IOptionItem>();
  const [disableSwitch, setDisableSwitch] = useState<boolean>(false);

  const editModal = useDisclosure();
  const addModal = useDisclosure();
  const deleteModal = useDisclosure();

  const fetchOptions = async () => {
    setLoading(true);

    const res: IOptionListResponse = await OptionsServices.getInstance().get([
      { name: 'page', value: page }
    ]);
    setOptions(res?.data);
    setLoading(false);
  };

  const changeCategoryItemStatus = async (id: number) => {
    setDisableSwitch(true);
    try {
      const res = await OptionsServices.getInstance().changeItemStatus(id);
      if (res?.succeeded) {
        setRefreshComponent(z => !z);
        // const obj: any = {
        //   ...blogData,
        //   datas: {
        //     ...blogData?.datas,
        //     datas: blogData?.datas?.map(item => {
        //       if (item?.id === id) {
        //         return { ...item, isActive: !item.isActive };
        //       }
        //       return item;
        //     })
        //   }
        // };
        // setBlogData(obj);
      }
      setDisableSwitch(false);
    } catch {
      setDisableSwitch(false);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, [page, refreshComponent]);

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
              <BreadcrumbLink isCurrentPage href="/options">
                Əlavə opsiyalar
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
      </Box>
      <Box mt={5} shadow="lg" bg="white" borderRadius={6} w="100%" p={4}>
        <Flex alignItems="center" justifyContent="space-between">
          <Box />
          <Button onClick={addModal.onOpen}>{addBtn}</Button>
        </Flex>
      </Box>
      <Box mt={5} shadow="lg" bg="white" borderRadius={6} w="100%" p={4}>
        <Heading size="xs" mb={1} fontWeight="medium">
          CƏDVƏL ({options?.totalDataCount || noText})
        </Heading>
        {!loading ? (
          <Box>
            <TableContainer>
              <Table size="sm" variant="striped">
                <Thead textAlign="left">
                  <Tr>
                    <Th textTransform="initial">BAŞLIQ</Th>
                    <Th textTransform="initial">MƏBLƏĞ</Th>
                    <Th textTransform="initial">NÖVÜ</Th>
                    <Th textTransform="initial">STATUS</Th>

                    <Th />
                  </Tr>
                </Thead>
                {options?.data && options?.data?.length > 0 ? (
                  <Tbody textAlign="left">
                    {options?.data?.map((z: IOptionItem, index: number) => (
                      <Tr key={z?.key || index} textAlign="left">
                        <Td>{z?.title}</Td>
                        <Td>{z?.amount}</Td>
                        <Td>
                          {z?.paymentType === 1
                            ? 'Sadə'
                            : z?.paymentType === 2
                            ? 'Kompleks'
                            : z?.paymentType === 3
                            ? 'Hamısı'
                            : ''}
                        </Td>

                        <Td>
                          <FormControl display="flex" alignItems="center">
                            <Switch
                              isDisabled={disableSwitch}
                              colorScheme="brand"
                              onChange={() => {
                                setSelectedItem(z);
                                changeCategoryItemStatus(z?.id);
                              }}
                              isChecked={z?.isActive}
                              id="email-alerts"
                            />
                          </FormControl>
                        </Td>
                        <Td textAlign="right">
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<BiDotsVertical />}
                              variant="outline"
                            />
                            <MenuList>
                              <MenuItem
                                onClick={() => {
                                  setSelectedItem(z);
                                  editModal.onOpen();
                                }}
                              >
                                Düzəliş et
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  setSelectedItem(z);
                                  deleteModal.onOpen();
                                }}
                              >
                                Sil
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                ) : (
                  <Tbody>
                    <Tr>
                      <Td
                        bg="transparent !important"
                        colSpan={7}
                        textAlign="center"
                      >
                        <NoData />
                      </Td>
                    </Tr>
                  </Tbody>
                )}
              </Table>
            </TableContainer>
            {options?.data && options?.data?.length > 0 ? (
              <Flex mt={4} justify="flex-end">
                <Pagination
                  currentPage={page}
                  totalCount={options?.totalDataCount}
                  pageSize={10}
                  onPageChange={(z: number) => setCurrentPage(z)}
                />
              </Flex>
            ) : null}
          </Box>
        ) : (
          <Stack>
            <Skeleton height="30px" />
            <Skeleton height="30px" />
            <Skeleton height="30px" />
            <Skeleton height="30px" />
            <Skeleton height="30px" />
            <Skeleton height="30px" />
            <Skeleton height="30px" />
            <Skeleton height="30px" />
            <Skeleton height="30px" />
            <Skeleton height="30px" />
          </Stack>
        )}
      </Box>
      <Modal
        scrollBehavior="inside"
        isOpen={editModal.isOpen}
        size="xl"
        variant="big"
        isCentered
        onClose={editModal.onClose}
      >
        <ModalOverlay />
        <OptionEditModal
          selectedItem={selectedItem}
          setRefreshComponent={setRefreshComponent}
          onClose={editModal.onClose}
        />
      </Modal>
      <Modal
        scrollBehavior="inside"
        isOpen={addModal.isOpen}
        size="xl"
        variant="big"
        isCentered
        onClose={addModal.onClose}
      >
        <ModalOverlay />
        <OptionAddModal
          setRefreshComponent={setRefreshComponent}
          onClose={addModal.onClose}
        />
      </Modal>
    </>
  );
}

export default Options;
