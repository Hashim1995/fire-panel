/* eslint-disable no-prototype-builtins */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import { IHTTPSParams } from '@/services/config';

import Pagination from '@/components/display/pagination/pagination';
import {
  Flex,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
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
  TabList,
  Tabs,
  Tab,
  Collapse
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import { BiDotsVertical, BiHome, BiReset } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import NoData from '@/components/feedback/no-data/no-data';
import { convertFormDataToQueryParams } from '@/utils/functions/functions';
import DeleteModal from '@/components/display/delete-modal/delete-modal';
import { AxiosError } from 'axios';
import { noText } from '@/utils/constants/texts';
import { VisaServices } from '@/services/visa-services/visa-services';
import {
  IVisaApplicationItem,
  IVisaApplicationListResponse,
  IVisaFilter
} from '../models';

import VisaViewModal from '../modals/visa-view-modal';
import { getEnumLabel, VisaLevels, VisaTypes } from '../options';
import VisaAskModal from '../modals/visa-ask-modal';
import VisaReviewModal from '../modals/visa-review-modal';

function Visa() {
  const [page, setCurrentPage] = useState<number>(1);
  const [takeDocumentLoading, setTakeDocumentLoading] = useState(false);
  const [isOpenFilter, setIsOpeFilter] = useState(false);

  const toggleCollapse = () => {
    setIsOpeFilter(!isOpenFilter);
  };

  const [visaData, setVisaData] = useState<
    IVisaApplicationListResponse['data'] | null
  >(null);
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<IHTTPSParams[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<IVisaApplicationItem>();
  const [deleteModalButtonLoading, setDeleteModalButtonLoading] =
    useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const askModal = useDisclosure();
  const reviewModal = useDisclosure();
  const deleteModal = useDisclosure();
  const viewModal = useDisclosure();
  const toast = useToast();

  const fetchVisaList = async () => {
    setLoading(true);

    const res: IVisaApplicationListResponse =
      await VisaServices.getInstance().get([
        ...queryParams,
        { name: 'page', value: page },
        { name: 'visaLevels', value: selectedTab + 1 } 
      ]);
    setVisaData(res?.data);

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
      // visaLevels: VisaLevels[0],
      visaTypes: null,
      applicantName: ''
    }
  });

  const resetForm = (): void => {
    // setValue('visaLevels', null);
    setValue('visaTypes', null);
    setValue('applicantName', '');

    setCurrentPage(1);
    setQueryParams([]);
    setRefreshComponent(r => !r);
  };

  useEffect(() => {
    fetchVisaList();
  }, [page, refreshComponent, queryParams, selectedTab]);

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
        setSelectedTab(1) // for activate Icrada
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
        <Flex justify="space-between" align="center">
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

          <Button isLoading={takeDocumentLoading} onClick={takeDocument}>
            Sənəd götür
          </Button>
        </Flex>
      </Box>
      <Box mt={5} shadow="lg" bg="white" borderRadius={6} w="100%" p={4}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          onClick={toggleCollapse}
          cursor="pointer"
        >
          <Heading fontWeight="medium" mb={1} size="xs">
            FİLTR
          </Heading>
          <IconButton
            aria-label="Toggle Filters"
            icon={isOpenFilter ? <IoIosArrowUp /> : <IoIosArrowDown />}
            onClick={toggleCollapse}
            variant="unstyled"
            size="sm"
            _hover={{ backgroundColor: 'transparent' }}
            _focus={{ boxShadow: 'none' }}
          />
        </Flex>
        <Collapse in={isOpenFilter} animateOpacity>
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
                          menuPortalTarget={document.body}
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
                {/* <GridItem width={'80%'}>
                  <Controller
                    control={control}
                    name="visaLevels"
                    rules={{ required: false }}
                    render={({ field: { onChange, value } }) => (
                      <FormControl id="visaLevels">
                        <FormLabel fontSize="sm" mb={1}>
                          Müraciətin statusu
                        </FormLabel>
                        <Select
                          className="chakra-select"
                          onChange={onChange}
                          value={value}
                          options={VisaLevels}
                          placeholder={
                            <div className="custom-select-placeholder">
                              Müraciətin statusu
                            </div>
                          }
                          isClearable
                        />
                      </FormControl>
                    )}
                  />
                </GridItem> */}
                <GridItem width={'80%'}>
                  <Controller
                    control={control}
                    name="applicantName"
                    rules={{ required: false }}
                    render={({ field: { onChange, value } }) => (
                      <FormControl id="applicantName">
                        <FormLabel fontSize="sm" mb={1}>
                          Müraciət edən şəxs
                        </FormLabel>
                        <Input
                          onChange={onChange}
                          value={value}
                          placeholder={'Müraciət edən şəxs'}
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
        </Collapse>
      </Box>
      <Box mt={5} shadow="lg" bg="white" borderRadius={6} w="100%" p={4}>
        <Tabs
          variant="soft-rounded"
          colorScheme="blue"
          index={selectedTab} 
          onChange={(index) => {
            setSelectedTab(index); 
          }}
        >
          <TabList>
            {VisaLevels.map(level => (
              <Tab key={level.value}>{level.label}</Tab>
            ))}
          </TabList>
        </Tabs>
      </Box>
      <Box mt={5} shadow="lg" bg="white" borderRadius={6} w="100%" p={4}>
        <Heading size="xs" mb={1} fontWeight="medium">
          CƏDVƏL ({visaData?.totalDataCount || noText})
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
                    <Th textTransform="initial">MÜRACİƏTİN STATUSU</Th>
                    <Th />
                  </Tr>
                </Thead>
                {visaData?.data && visaData?.data?.length > 0 ? (
                  <Tbody textAlign="left">
                    {visaData?.data?.map((z: IVisaApplicationItem) => (
                      <Tr key={z?.id} textAlign="left">
                        <Td>
                          {z?.customer?.firstname
                            ? `${z?.customer?.firstname} ${z?.customer?.lastname}`
                            : '-'}
                        </Td>

                        <Td>{z?.country?.title || '-'}</Td>
                        <Td>{z?.departureDate || '-'}</Td>
                        <Td>{z?.returnDate || '-'}</Td>

                        <Td>{getEnumLabel(VisaLevels, z?.visaLevel) || '-'}</Td>
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
                              {/* <MenuItem
                                  onClick={() => {
                                    setSelectedItem(z);
                                    approveModal.onOpen();
                                  }}
                                >
                                  Təsdiqlə
                                </MenuItem> */}
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
    </>
  );
}

export default Visa;
