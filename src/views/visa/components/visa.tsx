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
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverArrow,
  PopoverFooter,
  ButtonGroup,
  PopoverHeader,
  PopoverBody
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import { BiDotsVertical, BiHome, BiReset } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import NoData from '@/components/feedback/no-data/no-data';
import { ICategoryItem } from '@/models/category';
import { selectOption } from '@/models/common';
import { addBtn, selectPlaceholderText } from '@/utils/constants/texts';
import { languageOptions, statusOptions } from '@/utils/constants/options';
import { BlogServices } from '@/services/blog-services/blog-service';
import { convertFormDataToQueryParams } from '@/utils/functions/functions';
import Can from '@/components/permission/Can';
import DeleteModal from '@/components/display/delete-modal/delete-modal';
import { CountryServices } from '@/services/country-services/country-services';
import { AxiosError } from 'axios';
import { VisaServices } from '@/services/visa-services/visa-services';
import ApproveModal from '@/components/display/approve-modal/approve-modal';
import {
  IVisaApplicationItem,
  IVisaApplicationListResponse,
  IVisaFilter
} from '../models';

import VisaViewModal from '../modals/visa-view-modal';
import { getEnumLabel, VisaLevels, VisaStatuses, VisaTypes } from '../options';
import VisaAskModal from '../modals/visa-ask-modal';
import VisaReviewModal from '../modals/visa-review-modal';

function Visa() {
  const [page, setCurrentPage] = useState<number>(1);
  const [takeDocumentLoading, setTakeDocumentLoading] = useState(false);

  const [visaData, setVisaData] = useState<
    IVisaApplicationListResponse['data'] | null
  >(null);
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<IHTTPSParams[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<IVisaApplicationItem>();
  const [disableSwitch, setDisableSwitch] = useState<boolean>(false);
  const [deleteModalButtonLoading, setDeleteModalButtonLoading] =
    useState<boolean>(false);
  const [approveModalButtonLoading, setApproveModalButtonLoading] =
    useState<boolean>(false);
  const editModal = useDisclosure();
  const askModal = useDisclosure();
  const reviewModal = useDisclosure();
  const deleteModal = useDisclosure();
  const viewModal = useDisclosure();
  const approveModal = useDisclosure();
  const toast = useToast();

  const fetchVisaList = async () => {
    setLoading(true);

    const res: IVisaApplicationListResponse =
      await VisaServices.getInstance().get([
        ...queryParams,
        { name: 'page', value: page }
      ]);
    if (res?.succeeded) {
      setVisaData(res?.data);
    }
    setLoading(false);
  };

  const onSubmit: SubmitHandler<IVisaFilter> = async (data: IVisaFilter) => {
    setCurrentPage(1);
    const queryParamsData: IHTTPSParams[] =
      convertFormDataToQueryParams<IVisaFilter>(data);
    setQueryParams(queryParamsData);
    setRefreshComponent(!refreshComponent);
  };

  const { handleSubmit, setValue, control } = useForm<IVisaFilter>({
    mode: 'onChange',
    defaultValues: {
      visaStatuses: null,
      visaTypes: null,
      applicantName: ''
    }
  });

  const resetForm = (): void => {
    setValue('visaStatuses', null);
    setValue('visaTypes', null);
    setValue('applicantName', '');

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
    fetchVisaList();
  }, [page, refreshComponent]);

  const deleteItem = async () => {
    setDeleteModalButtonLoading(true);
    try {
      const res = await VisaServices.getInstance().cancelApply(
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

  const approveItem = async () => {
    setApproveModalButtonLoading(true);
    try {
      const res = await VisaServices.getInstance().confirm({
        appointmentId: selectedItem?.id
      });
      if (res.succeeded) {
        toast({
          title: 'Əməliyyat uğurla icra olundu',
          status: 'success',
          position: 'top-right',
          duration: 3000,
          isClosable: true
        });
      }

      setApproveModalButtonLoading(false);
      deleteModal.onClose();
      setRefreshComponent((prev: boolean) => !prev);
    } catch (error: unknown) {
      setApproveModalButtonLoading(false);
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

  const takeDocument = async () => {
    setTakeDocumentLoading(true);
    try {
      const res = await VisaServices.getInstance().takeDocument();
      if (res.succeeded) {
        toast({
          title: 'Əməliyyat uğurla icra olundu',
          status: 'success',
          position: 'top-right',
          duration: 3000,
          isClosable: true
        });
        setRefreshComponent(!refreshComponent);
      }
    } catch (error: unknown) {
      setTakeDocumentLoading(false);
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
    setTakeDocumentLoading(false);
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
              <BreadcrumbLink as={NavLink} to="/home">
                <BiHome />
              </BreadcrumbLink>

              <BreadcrumbSeparator />
              <BreadcrumbLink isCurrentPage href="/visa">
                Viza Müraciətləri
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
      </Box>
      <Box mt={5} shadow="lg" bg="white" borderRadius={6} w="100%" p={4}>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading fontWeight="medium" mb={1} size="xs">
            FİLTR
          </Heading>
          <Button isLoading={takeDocumentLoading} onClick={takeDocument}>
            Sənəd götür
          </Button>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Grid templateColumns="repeat(3, 1fr)" py={1} gap={1}>
              <GridItem width={'80%'}>
                <Controller
                  control={control}
                  name="visaTypes"
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="visaTypes">
                      <FormLabel fontSize="sm" mb={1}>
                        Viza növü
                      </FormLabel>
                      <Select
                        onChange={onChange}
                        value={value}
                        options={VisaTypes}
                        placeholder={
                          <div className="custom-select-placeholder">
                            Viza növü
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
                  name="visaStatuses"
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="visaStatuses">
                      <FormLabel fontSize="sm" mb={1}>
                        Viza statusu
                      </FormLabel>
                      <Select
                        className="chakra-select"
                        onChange={onChange}
                        value={value}
                        options={VisaStatuses}
                        placeholder={
                          <div className="custom-select-placeholder">
                            Viza statusu
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
                  name="applicantName"
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="applicantName">
                      <FormLabel fontSize="sm" mb={1}>
                        Müraciətçi
                      </FormLabel>
                      <Input
                        onChange={onChange}
                        value={value}
                        placeholder={'Müraciətçi'}
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
        <Heading size="xs" mb={1} fontWeight="medium">
          CƏDVƏL
        </Heading>
        {!loading ? (
          <Box>
            <TableContainer>
              <Table size="sm" variant="striped">
                <Thead textAlign="left">
                  <Tr>
                    <Th textTransform="initial">MÜRACİƏTÇİ</Th>

                    <Th textTransform="initial">GEDİLƏCƏK ÖLKƏ</Th>
                    <Th textTransform="initial">GEDİŞ TARİXİ</Th>
                    <Th textTransform="initial">GERİ DÖNÜŞ TARİXİ</Th>
                    <Th textTransform="initial">VİZA STATUSU</Th>
                    <Th textTransform="initial">MƏRHƏLƏ STATUSU</Th>
                    <Th />
                  </Tr>
                </Thead>
                {visaData?.data && visaData?.data?.length > 0 ? (
                  <Tbody textAlign="left">
                    {visaData?.data?.map(
                      (z: IVisaApplicationItem, index: number) => (
                        <Tr key={z?.id} textAlign="left">
                          <Td>
                            {z?.customer?.firstname
                              ? `${z?.customer?.firstname} ${z?.customer?.lastname}`
                              : '-'}
                          </Td>

                          <Td>{z?.country?.title || '-'}</Td>
                          <Td>{z?.departureDate || '-'}</Td>
                          <Td>{z?.returnDate || '-'}</Td>
                          <Td>
                            {getEnumLabel(VisaStatuses, z?.visaStatus) || '-'}
                          </Td>
                          <Td>
                            {getEnumLabel(VisaLevels, z?.visaLevel) || '-'}
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
                                {z?.visaLevel === 2 && (
                                  <MenuItem
                                    onClick={() => {
                                      setSelectedItem(z);
                                      askModal.onOpen();
                                    }}
                                  >
                                    Sənəd tələb et
                                  </MenuItem>
                                )}
                                {z?.visaLevel === 4 && (
                                  <MenuItem
                                    onClick={() => {
                                      setSelectedItem(z);
                                      reviewModal.onOpen();
                                    }}
                                  >
                                    Sənədlərə bax və geri dönüş et
                                  </MenuItem>
                                )}
                                <MenuItem
                                  onClick={() => {
                                    setSelectedItem(z);
                                    viewModal.onOpen();
                                  }}
                                >
                                  Ümumumi məlumata baxış
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    setSelectedItem(z);
                                    approveModal.onOpen();
                                  }}
                                >
                                  Təsdiqlə
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    setSelectedItem(z);
                                    deleteModal.onOpen();
                                  }}
                                >
                                  Ləğv et
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
                        <NoData title="MƏLUMAT YOXDUR. MÜRACİƏT SƏNƏDİ GÖTÜRMƏK ÜÇÜN, SƏNƏD GÖTÜR DÖYMƏSİNİ SIXIN" />
                      </Td>
                    </Tr>
                  </Tbody>
                )}
              </Table>
            </TableContainer>

            {visaData?.data && visaData?.data?.length > 0 ? (
              <Flex mt={4} justify="flex-end">
                <Pagination
                  currentPage={page}
                  totalCount={visaData?.totalDataCount}
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
        isOpen={reviewModal.isOpen}
        size="xl"
        variant="big"
        isCentered
        onClose={reviewModal.onClose}
      >
        <ModalOverlay />
        <VisaReviewModal
          setRefreshComponent={setRefreshComponent}
          onClose={reviewModal.onClose}
          selectedId={selectedItem!}
        />
      </Modal>
      <Modal
        scrollBehavior="inside"
        isOpen={askModal.isOpen}
        size="xl"
        variant="big"
        isCentered
        onClose={askModal.onClose}
      >
        <ModalOverlay />
        <VisaAskModal
          setRefreshComponent={setRefreshComponent}
          onClose={askModal.onClose}
          selectedId={selectedItem!}
        />
      </Modal>
      <Modal
        scrollBehavior="inside"
        isOpen={viewModal.isOpen}
        size="6xl"
        isCentered
        onClose={viewModal.onClose}
      >
        <ModalOverlay />
        <VisaViewModal onClose={viewModal.onClose} selectedId={selectedItem!} />
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
          header="Müraciət ləğv ediləcək, davam etmək istədiyinizə əminsinizmi?"
          eventText="Ləğv et"
          onClose={deleteModal.onClose}
        />
      </Modal>

      <Modal
        scrollBehavior="inside"
        isOpen={approveModal.isOpen}
        size="xl"
        variant="big"
        isCentered
        onClose={approveModal.onClose}
      >
        <ModalOverlay />
        <ApproveModal
          approveModalButtonLoading={approveModalButtonLoading}
          event={approveItem}
          onClose={approveModal.onClose}
        />
      </Modal>
    </>
  );
}

export default Visa;
