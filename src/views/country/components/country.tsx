/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import { IHTTPSParams } from '@/services/config';
import {
  CategoryService,
  IGetCategoryResponse
} from '@/services/category-services/category-services';
import Pagination from '@/components/display/pagination/pagination';
import {
  Flex,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Switch,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Button,
  useToast,
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
  Input
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import { BiDotsVertical, BiHome, BiReset } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import NoData from '@/components/feedback/no-data/no-data';
import { ICategoryItem } from '@/models/category';
import { selectOption } from '@/models/common';
import { addBtn, noText, selectPlaceholderText } from '@/utils/constants/texts';
import { languageOptions, statusOptions } from '@/utils/constants/options';
import { BlogServices } from '@/services/blog-services/blog-service';
import { convertFormDataToQueryParams } from '@/utils/functions/functions';
import Can from '@/components/permission/Can';
import DeleteModal from '@/components/display/delete-modal/delete-modal';
import { CountryServices } from '@/services/country-services/country-services';
import { AxiosError } from 'axios';
import CategoryEditModal from '../modals/country-edit-modal';
import { ICountryFilter, ICountryItem, ICountryListResponse } from '../models';
import CountryAddModal from '../modals/country-add-modal';

function Country() {
  const [page, setCurrentPage] = useState<number>(1);
  const [countryData, setCountryData] = useState<
    ICountryListResponse['data'] | null
  >(null);
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<IHTTPSParams[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<ICountryItem>();
  const [disableSwitch, setDisableSwitch] = useState<boolean>(false);
  const [deleteModalButtonLoading, setDeleteModalButtonLoading] =
    useState<boolean>(false);
  const editModal = useDisclosure();
  const addModal = useDisclosure();
  const deleteModal = useDisclosure();
  const toast = useToast();

  const fetchCountry = async () => {
    setLoading(true);

    const res: ICountryListResponse = await CountryServices.getInstance().get([
      ...queryParams,
      { name: 'page', value: page }
    ]);
    setCountryData(res?.data);
    setLoading(false);
  };

  const onSubmit: SubmitHandler<ICountryFilter> = async (
    data: ICountryFilter
  ) => {
    setCurrentPage(1);
    const queryParamsData: IHTTPSParams[] =
      convertFormDataToQueryParams<ICountryFilter>(data);
    setQueryParams(queryParamsData);
    setRefreshComponent(!refreshComponent);
  };

  const { handleSubmit, setValue, control } = useForm<ICountryFilter>({
    mode: 'onChange',
    defaultValues: {
      status: null,
      Language: null,
      title: ''
    }
  });

  const resetForm = (): void => {
    setValue('status', null);
    setValue('Language', null);
    setValue('title', '');
    setCurrentPage(1);
    setQueryParams([]);
    setRefreshComponent(r => !r);
  };

  const changeCategoryItemStatus = async (id: number) => {
    setDisableSwitch(true);
    try {
      const res = await CountryServices.getInstance().changeItemStatus(id);
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
    fetchCountry();
  }, [page, refreshComponent]);

  const deleteItem = async () => {
    setDeleteModalButtonLoading(true);
    try {
      const res = await CountryServices.getInstance().deleteItem(
        selectedItem?.id || 0
      );
      if (res.succeeded) {
        toast({
          title: 'Əməliyyat uğurla icra olundu',
          status: 'success',
          position: 'top-right',
          duration: 3000,
          isClosable: true
        });
      }

      setDeleteModalButtonLoading(false);
      deleteModal.onClose();
      setRefreshComponent((prev: boolean) => !prev);
    } catch (error: unknown) {
      setDeleteModalButtonLoading(false);
      if (error instanceof AxiosError) {
        if (error?.response?.data?.messages?.length) {
          error.response.data.messages?.map((z: string) =>
            toast({
              title: 'Xəta baş verdi',
              description: z,
              status: 'error',
              position: 'top-right',
              duration: 3000,
              isClosable: true
            })
          );
        } else {
          toast({
            title: 'Xəta baş verdi',

            status: 'error',
            position: 'top-right',
            duration: 3000,
            isClosable: true
          });
        }
      }
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
        <Flex align="center" justify="space-between">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink as={NavLink} to="/home">
                <BiHome />
              </BreadcrumbLink>

              <BreadcrumbSeparator />
              <BreadcrumbLink isCurrentPage href="/country">
                Ölkələr
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Button onClick={addModal.onOpen}>{addBtn}</Button>
        </Flex>
      </Box>
      <Box mt={5} shadow="lg" bg="white" borderRadius={6} w="100%" p={4}>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading fontWeight="medium" mb={1} size="xs">
            FİLTR
          </Heading>
         
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Grid templateColumns="repeat(3, 1fr)" py={1} gap={1}>
              <GridItem width={'80%'}>
                <Controller
                  control={control}
                  name="Language"
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="Language">
                      <FormLabel fontSize="sm" mb={1}>
                        Dil
                      </FormLabel>
                      <Select
                        onChange={onChange}
                        value={value}
                        options={languageOptions}
                        placeholder={
                          <div className="custom-select-placeholder">Dil</div>
                        }
                        isClearable
                      />
                    </FormControl>
                  )}
                />
              </GridItem>
              <GridItem width={'80%'}>
                <Controller
                  control={control}
                  name="status"
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="status">
                      <FormLabel fontSize="sm" mb={1}>
                        Status
                      </FormLabel>
                      <Select
                        className="chakra-select"
                        onChange={onChange}
                        value={value}
                        options={statusOptions}
                        placeholder={
                          <div className="custom-select-placeholder">
                            Status
                          </div>
                        }
                        isClearable
                      />
                    </FormControl>
                  )}
                />
              </GridItem>
              <GridItem width={'80%'}>
                <Controller
                  control={control}
                  name="title"
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="title">
                      <FormLabel fontSize="sm" mb={1}>
                        Başlıq
                      </FormLabel>
                      <Input
                        onChange={onChange}
                        value={value}
                        placeholder={'Başlıq'}
                      />
                    </FormControl>
                  )}
                />
              </GridItem>
            </Grid>
            <Flex mt={2} justify="flex-end">
              <IconButton
                variant="outline"
                onClick={resetForm}
                aria-label="Show password"
                icon={<BiReset size={22} />}
              />
              <Button type="submit" ml={2} variant="solid">
                Axtar
              </Button>
            </Flex>
          </Box>
        </form>
      </Box>
      <Box mt={5} shadow="lg" bg="white" borderRadius={6} w="100%" p={4}>
        <Heading size="xs" mb={3} fontWeight="medium">
          CƏDVƏL ({countryData?.totalDataCount || noText})
        </Heading>
        {!loading ? (
          <Box>
            <TableContainer>
              <Table size="sm" variant="unstyled">
                <Thead textAlign="left">
                  <Tr>
                    <Th textTransform="initial">BAŞLIQ</Th>
                    <Th textTransform="initial">MÜƏLLİF</Th>
                    <Th textTransform="initial">DİL</Th>
                    <Th textTransform="initial">TARİX</Th>
                    <Th textTransform="initial">STATUS</Th>

                    <Th />
                  </Tr>
                </Thead>
                {countryData?.data && countryData?.data?.length > 0 ? (
                  <Tbody textAlign="left">
                    {countryData?.data?.map(
                      (z: ICountryItem, index: number) => (
                        <Tr key={z?.id} textAlign="left">
                          <Td>{z?.title}</Td>
                          <Td>{z?.createdBy}</Td>
                          <Td>
                            {z?.language === 1
                              ? 'AZ'
                              : z?.language === 2
                              ? 'EN'
                              : z?.language === 3
                              ? 'RU'
                              : ''}
                          </Td>
                          <Td>{z?.createdAt}</Td>

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
                      )
                    )}
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

            {countryData?.data && countryData?.data?.length > 0 ? (
              <Flex mt={4} justify="flex-end">
                <Pagination
                  currentPage={page}
                  totalCount={countryData?.totalDataCount}
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
        <CategoryEditModal
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
        <CountryAddModal
          setRefreshComponent={setRefreshComponent}
          onClose={addModal.onClose}
        />
      </Modal>
      <Modal
        scrollBehavior="inside"
        isOpen={deleteModal.isOpen}
        size="xl"
        variant="big"
        isCentered
        onClose={deleteModal.onClose}
      >
        <ModalOverlay />
        <DeleteModal
          deleteModalButtonLoading={deleteModalButtonLoading}
          event={deleteItem}
          onClose={deleteModal.onClose}
        />
      </Modal>
    </>
  );
}

export default Country;
