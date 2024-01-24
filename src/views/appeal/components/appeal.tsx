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
  Input,
  Modal,
  useDisclosure,
  ModalOverlay
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { BiHome, BiReset } from 'react-icons/bi';
import NoData from '@/components/feedback/no-data/no-data';
import { NavLink } from 'react-router-dom';

import { AppealServices } from '@/services/appeal-services/appeal-services';
import { convertFormDataToQueryParams } from '@/utils/functions/functions';
import { IAppealFilter, IAppealItem, IAppealListResponse } from '../models';
import AppealViewModal from '../modals/appeal-view-modal';

function Appeal() {
  const [page, setCurrentPage] = useState<number>(1);
  const [appealData, setAppealData] = useState<
    IAppealListResponse['data'] | null
  >(null);
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<IHTTPSParams[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const viewModal = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<IAppealItem>();

  const fetchAppeals = async () => {
    setLoading(true);

    const res: IAppealListResponse = await AppealServices.getInstance().get([
      ...queryParams,
      { name: 'page', value: page }
    ]);
    if (res?.succeeded) {
      setAppealData(res?.data);
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<IAppealFilter> = async (
    data: IAppealFilter
  ) => {
    setCurrentPage(1);
    const queryParamsData: IHTTPSParams[] =
      convertFormDataToQueryParams<IAppealFilter>(data);
    setQueryParams(queryParamsData);
    setRefreshComponent(!refreshComponent);
  };

  const { handleSubmit, setValue, control } = useForm<IAppealFilter>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      phoneNumber: '',
      title: '',
      author: ''
    }
  });

  const resetForm = (): void => {
    setValue('email', '');
    setValue('phoneNumber', '');
    setValue('author', '');
    setValue('title', '');

    setCurrentPage(1);
    setQueryParams([]);
    setRefreshComponent(r => !r);
  };

  useEffect(() => {
    fetchAppeals();
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
              <BreadcrumbLink isCurrentPage href="/country">
                Müraciətlər
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
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Grid templateColumns="repeat(3, 1fr)" py={1} gap={1}>
              <GridItem width={'80%'}>
                <Controller
                  control={control}
                  name="email"
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="email">
                      <FormLabel fontSize="sm" mb={1}>
                        Email
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
              <GridItem width={'80%'}>
                <Controller
                  control={control}
                  name="phoneNumber"
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="phoneNumber">
                      <FormLabel fontSize="sm" mb={1}>
                        Telefon
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
              <GridItem width={'80%'}>
                <Controller
                  control={control}
                  name="author"
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="author">
                      <FormLabel fontSize="sm" mb={1}>
                        Müraciətçi
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
        <Heading size="xs" mb={1} fontWeight="medium">
          CƏDVƏL
        </Heading>
        {!loading ? (
          <Box>
            <TableContainer>
              <Table size="sm" variant="striped">
                <Thead textAlign="left">
                  <Tr>
                    <Th textTransform="initial">AD</Th>
                    <Th textTransform="initial">BAŞLIQ</Th>
                    <Th textTransform="initial">AÇIQLAMA</Th>
                    <Th textTransform="initial">EMAİL</Th>
                    <Th textTransform="initial">TELEFON</Th>
                    <Th textTransform="initial">TARİX</Th>

                    <Th />
                  </Tr>
                </Thead>
                {appealData?.data && appealData?.data?.length > 0 ? (
                  <Tbody textAlign="left">
                    {appealData?.data?.map((z: IAppealItem) => (
                      <Tr
                        cursor="pointer"
                        onClick={() => {
                          setSelectedItem(z);
                          viewModal.onOpen();
                        }}
                        key={z?.id}
                        textAlign="left"
                      >
                        <Td>{z?.fullname}</Td>

                        <Td>{z?.title}</Td>
                        <Td
                          overflow="hidden"
                          style={{
                            display: 'block !important'
                          }}
                          whiteSpace="nowrap"
                          maxWidth={200}
                          isTruncated
                        >
                          {z?.description}
                        </Td>
                        <Td>{z?.email}</Td>
                        <Td>{z?.phoneNumber}</Td>
                        <Td>{z?.createdAt}</Td>
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

            {appealData?.data && appealData?.data?.length > 0 ? (
              <Flex mt={4} justify="flex-end">
                <Pagination
                  currentPage={page}
                  totalCount={appealData?.totalDataCount}
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
        isOpen={viewModal.isOpen}
        size="xl"
        variant="big"
        isCentered
        onClose={viewModal.onClose}
      >
        <ModalOverlay />
        <AppealViewModal
          selectedId={selectedItem!}
          onClose={viewModal.onClose}
        />
      </Modal>
    </>
  );
}

export default Appeal;
