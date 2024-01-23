import Pagination from '@/components/display/pagination/pagination';
import DatePicker from '@/components/forms/date-picker/date-picker';
import {
  BranchesServies,
  IGetBranchesSelectResponse
} from '@/services/branches-services/branches-services';
import { IHTTPSParams } from '@/services/config';
import {
  IGetOrdersResponse,
  OrderServices
} from '@/services/order-services/order-services';
import { convertFormDataToQueryParams } from '@/utils/functions/functions';
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
  Input,
  FormLabel,
  Button,
  IconButton,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Stack,
  Skeleton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { BiReset } from 'react-icons/bi';

interface IOrdersFilter {
  name: string;
  organizationId: string;
  orderType: string;
  endDate: string;
  startDate: string;
  // status: string;
}

function Orders() {
  const [branchesData, setBranchesData] =
    useState<IGetBranchesSelectResponse>();
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<IHTTPSParams[]>([]);
  const [page, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [orderData, setOrderData] = useState<IGetOrdersResponse | null>(null);

  const { handleSubmit, setValue, control } = useForm<IOrdersFilter>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      organizationId: '',
      orderType: '',
      endDate: '',
      startDate: ''
      // status: ''
    }
  });

  const fetchData = async () => {
    setLoading(true);

    const res: IGetOrdersResponse = await OrderServices.getInstance().getOrders(
      [...queryParams, { name: 'page', value: page }]
    );
    if (res.succeeded) {
      setOrderData(res);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const fetchDataAllBranchs = async () => {
    const res: IGetBranchesSelectResponse =
      await BranchesServies.getInstance().getBranchesSelect();
    setBranchesData(res);
  };

  const onSubmit: SubmitHandler<IOrdersFilter> = async data => {
    setCurrentPage(1);
    const queryParamsData: IHTTPSParams[] =
      convertFormDataToQueryParams<IOrdersFilter>(data);
    setQueryParams(queryParamsData);
    setRefreshComponent(!refreshComponent);
  };

  useEffect(() => {
    fetchDataAllBranchs();
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, refreshComponent]);

  const resetForm = () => {
    setValue('name', '');
    setValue('organizationId', '');
    setValue('orderType', '');
    setValue('endDate', '');
    setValue('startDate', '');
    // setValue('status', '');

    setCurrentPage(1);
    setQueryParams([]);
    setRefreshComponent(r => !r);
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
              <BreadcrumbLink isCurrentPage href="/orders">
                Orders
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
      </Box>
      <Box mt={5} shadow="lg" bg="white" borderRadius={6} w="100%" p={4}>
        <Heading fontWeight="medium" mb={1} size="xs">
          FİLTR
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Grid
              overflowX="hidden"
              templateColumns="repeat(3, 1fr)"
              py={1}
              gap={0}
            >
              <GridItem width="85%">
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="name">
                      <FormLabel fontSize="sm" mb={1}>
                        Sifarişçinin adı
                      </FormLabel>
                      <Input
                        onChange={onChange}
                        value={value}
                        borderRadius="md"
                        type="text"
                        placeholder="Sifariş adı"
                      />
                    </FormControl>
                  )}
                />
              </GridItem>
              <GridItem width="85%">
                <Controller
                  control={control}
                  name="organizationId"
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="client_name">
                      <FormLabel fontSize="sm" mb={1}>
                        Filial
                      </FormLabel>
                      <Select
                        onChange={onChange}
                        value={value}
                        borderRadius="md"
                        placeholder="Filial"
                      >
                        {branchesData?.datas?.map(item => (
                          <option value={item?.id}>{item?.name}</option>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              </GridItem>
              <GridItem width="85%">
                <Controller
                  control={control}
                  name="orderType"
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="contact_number">
                      <FormLabel fontSize="sm" mb={1}>
                        Sifariş növü
                      </FormLabel>
                      <Select
                        onChange={onChange}
                        value={value}
                        borderRadius="md"
                        placeholder="Sifariş növü"
                      >
                        <option value="1">Gəl götür</option>
                        <option value="2">Çatdırılma</option>
                      </Select>
                    </FormControl>
                  )}
                />
              </GridItem>
            </Grid>
            <Grid
              overflowX="hidden"
              templateColumns="repeat(3, 1fr)"
              py={1}
              gap={1}
            >
              <GridItem width="85%">
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="address">
                      <FormLabel fontSize="sm" mb={1}>
                        Başlama tarixi
                      </FormLabel>
                      <DatePicker
                        name="date-input"
                        type="date"
                        placeholder="Sifariş tarixi"
                        value={value}
                        onChange={onChange}
                      />
                    </FormControl>
                  )}
                />
              </GridItem>
              <GridItem width="85%">
                <Controller
                  control={control}
                  name="endDate"
                  render={({ field: { onChange, value } }) => (
                    <FormControl>
                      <FormLabel fontSize="sm" mb={1}>
                        Bitmə tarixi
                      </FormLabel>
                      <DatePicker
                        name="date-input"
                        type="date"
                        placeholder="Sifariş tarixi"
                        value={value}
                        onChange={onChange}
                      />
                    </FormControl>
                  )}
                />
              </GridItem>
              {/* <GridItem width="85%">
                <Controller
                  control={control}
                  name="status"
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="status">
                      <FormLabel fontSize="sm" mb={1}>
                        Status
                      </FormLabel>
                      <Select
                        onChange={onChange}
                        value={value}
                        borderRadius="md"
                        placeholder="Status"
                      >
                        <option value="1">Uğurlu</option>
                        <option value="2">Uğursuz</option>
                      </Select>
                    </FormControl>
                  )}
                />
              </GridItem> */}
            </Grid>
            <Flex mt={2} justify="flex-end">
              <IconButton
                variant="outline"
                onClick={resetForm}
                aria-label="Show password"
                icon={<BiReset size={22} />}
              />
              <Button type="submit" ml={2} variant="solid">
                Search
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
                <TableCaption>
                  Imperial to metric conversion factors
                </TableCaption>
                <Thead textAlign="left">
                  <Tr>
                    <Th textAlign="left" textTransform="initial">
                      Sifariş nömrəsi
                    </Th>
                    <Th textTransform="initial">Sifariş adı</Th>
                    <Th textTransform="initial">Filial</Th>
                    <Th textTransform="initial">Sifariş növü</Th>
                    <Th textTransform="initial">Sifariş tarixi</Th>
                  </Tr>
                </Thead>
                <Tbody textAlign="left">
                  {orderData?.datas?.datas?.map(item => (
                    <Tr textAlign="left" key={item?.id}>
                      <Td textAlign="left">{item?.id}</Td>
                      <Td textAlign="left">{item?.user?.lastname} {item?.user?.firstname}</Td>
                      <Td>{item?.organizationName}</Td>
                      <Td>{item?.orderType}</Td>
                      <Td>{item?.createdAt}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Flex justify="flex-end">
              <Pagination
                currentPage={page}
                totalCount={
                  orderData?.datas?.totalDataCount
                    ? orderData?.datas?.totalDataCount
                    : 0
                }
                pageSize={10}
                onPageChange={(z: number) => setCurrentPage(z)}
              />
            </Flex>
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
    </>
  );
}

export default Orders;
