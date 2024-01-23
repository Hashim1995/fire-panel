import {
  Flex,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  Switch,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { BiDotsVertical, BiHome, BiReset } from 'react-icons/bi';
import { Select } from 'chakra-react-select';
import { NavLink } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  inputPlaceholderText,
  noText,
  selectPlaceholderText
} from '@/utils/constants/texts';
import { useEffect, useState } from 'react';
import { IHTTPSParams } from '@/services/config';
import { convertFormDataToQueryParams } from '@/utils/functions/functions';
import Pagination from '@/components/display/pagination/pagination';
import NoData from '@/components/feedback/no-data/no-data';
import { AxiosError } from 'axios';
import {
  IGetPopularResponse,
  PopularService
} from '@/services/popular-services/popular-services';
import { IPopularFilter, IPopularList } from '@/models/populars';
import { popularOption } from '@/utils/constants/options';
import { IGlobalResponse } from '@/models/common';
import Can from '@/components/permission/Can';
import PopularEditModal from '../modals/popular-edit-modal';

function Popular() {
  const { handleSubmit, setValue, control } = useForm<IPopularFilter>({
    mode: 'onChange',
    defaultValues: {
      isExclusive: null,
      isPopularMeal: null,
      isPopularMenu: null,
      name: ''
    }
  });

  const toast = useToast();

  const [page, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [popularData, setPopularData] = useState<IGetPopularResponse>();
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<IHTTPSParams[]>([]);
  const [selectedItem, setSelectedItem] = useState<IPopularList>();

  const editModal = useDisclosure();

  const resetForm = (): void => {
    setValue('name', '');
    setValue('isExclusive', null);
    setValue('isPopularMeal', null);
    setValue('isPopularMenu', null);

    setCurrentPage(1);
    setQueryParams([]);
    setRefreshComponent(r => !r);
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const res: IGetPopularResponse =
        await PopularService.getInstance().getPopular([
          ...queryParams,
          { name: 'page', value: page }
        ]);
      setPopularData(res);
      setLoading(false);
    } catch (error: unknown) {
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
            description:
              'Mesajlar məlumatlarının gətirilməsi zamanı xəta baş verdi',
            status: 'error',
            position: 'top-right',
            duration: 3000,
            isClosable: true
          });
        }
      }
    }
  };

  const changeisExclusive = async (id: number) => {
    const res: IGlobalResponse =
      await PopularService.getInstance().changeExclusiveStatus(id);

    if (res?.succeeded) {
      setRefreshComponent(r => !r);
      toast({
        title: 'Əməliyyat uğurla başa çatdı',
        status: 'success',
        position: 'top-right',
        duration: 3000,
        isClosable: true
      });
    }
  };
  const changeisPopularMeal = async (id: number) => {
    const res: IGlobalResponse =
      await PopularService.getInstance().changePopularMealStatus(id);

    if (res?.succeeded) {
      setRefreshComponent(r => !r);
      toast({
        title: 'Əməliyyat uğurla başa çatdı',
        status: 'success',
        position: 'top-right',
        duration: 3000,
        isClosable: true
      });
    }
  };
  const changeisPopularMenu = async (id: number) => {
    const res: IGlobalResponse =
      await PopularService.getInstance().changePopularMenuStatus(id);

    if (res?.succeeded) {
      setRefreshComponent(r => !r);
      toast({
        title: 'Əməliyyat uğurla başa çatdı',
        status: 'success',
        position: 'top-right',
        duration: 3000,
        isClosable: true
      });
    }
  };

  const deletedOldPrice = async (id: number) => {
    const res: IGlobalResponse =
      await PopularService.getInstance().oldPriceDelet(id);

    if (res?.succeeded) {
      setRefreshComponent(r => !r);
      toast({
        title: 'Əməliyyat uğurla başa çatdı',
        description: 'Endirimli qiymət uğurla silindi',
        status: 'success',
        position: 'top-right',
        duration: 3000,
        isClosable: true
      });
    }
  };

  const onSubmit: SubmitHandler<IPopularFilter> = async (
    data: IPopularFilter
  ) => {
    setCurrentPage(1);
    const queryParamsData: IHTTPSParams[] =
      convertFormDataToQueryParams<IPopularFilter>(data);
    setQueryParams(queryParamsData);
    setRefreshComponent(!refreshComponent);
  };

  useEffect(() => {
    fetchData();
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

              <BreadcrumbLink isCurrentPage as={NavLink} to="/messages">
                Populyar
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
            <Grid templateColumns="repeat(2,1fr)" py={1} gap={3}>
              <GridItem>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="name">
                      <FormLabel fontSize="sm">Ad</FormLabel>
                      <Input
                        onChange={onChange}
                        value={value}
                        type="text"
                        placeholder={inputPlaceholderText('Ad')}
                      />
                    </FormControl>
                  )}
                />
              </GridItem>
              <GridItem width="85%">
                <Controller
                  control={control}
                  name="isExclusive"
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="isExclusive">
                      <FormLabel fontSize="sm" mb={1}>
                        Ekskulizv
                      </FormLabel>
                      <Select
                        onChange={onChange}
                        value={value}
                        options={popularOption}
                        placeholder={
                          <div className="custom-select-placeholder">
                            {selectPlaceholderText('Ekskulizv')}
                          </div>
                        }
                        isClearable
                      />
                    </FormControl>
                  )}
                />
              </GridItem>
              <GridItem width="85%">
                <Controller
                  control={control}
                  name="isPopularMeal"
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="isPopularMeal">
                      <FormLabel fontSize="sm" mb={1}>
                        Popular məhsul
                      </FormLabel>
                      <Select
                        onChange={onChange}
                        value={value}
                        options={popularOption}
                        placeholder={
                          <div className="custom-select-placeholder">
                            {selectPlaceholderText('Popular məhsul')}
                          </div>
                        }
                        isClearable
                      />
                    </FormControl>
                  )}
                />
              </GridItem>
              <GridItem width="85%">
                <Controller
                  control={control}
                  name="isPopularMenu"
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl id="isPopularMenu">
                      <FormLabel fontSize="sm" mb={1}>
                        Popular menu
                      </FormLabel>
                      <Select
                        onChange={onChange}
                        value={value}
                        options={popularOption}
                        placeholder={
                          <div className="custom-select-placeholder">
                            {selectPlaceholderText('Popular menu')}
                          </div>
                        }
                        isClearable
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
          <Box overflowX="auto">
            <Table overflowX="auto" size="sm" variant="striped">
              <Thead textAlign="left">
                <Tr>
                  <Th textAlign="left" textTransform="initial">
                    Məhsul adı
                  </Th>
                  <Can action={['updateExclusiveAction']}>
                    <Th textTransform="initial">Ekskluziv</Th>
                  </Can>
                  <Can action={['updatePopularMenuAction']}>
                    <Th textTransform="initial">Popular menu</Th>
                  </Can>
                  <Can action={['updatePopularMealAction']}>
                    <Th textTransform="initial">Popular məhsul</Th>
                  </Can>
                  <Th textTransform="initial">Qiymət</Th>
                  <Th textTransform="initial">Köhnə qiymət</Th>
                  <Th />
                </Tr>
              </Thead>
              {popularData?.datas?.datas &&
              popularData?.datas?.datas?.length > 0 ? (
                <Tbody textAlign="left">
                  {popularData?.datas?.datas?.map((z: IPopularList) => (
                    <Tr cursor="pointer" key={z?.id} textAlign="left">
                      <Td textAlign="left">{z?.name ?? noText}</Td>

                      <Can action={['updateExclusiveAction']}>
                        <Td>
                          {' '}
                          <FormControl display="flex" alignItems="center">
                            <Switch
                              colorScheme="brand"
                              id="email-alerts"
                              isChecked={z?.isExclusive}
                              onChange={() => {
                                changeisExclusive(z?.id);
                              }}
                            />
                          </FormControl>
                        </Td>
                      </Can>
                      <Can action={['updatePopularMenuAction']}>
                        <Td>
                          {' '}
                          <FormControl display="flex" alignItems="center">
                            <Switch
                              colorScheme="brand"
                              id="email-alerts"
                              isChecked={z?.isPopularMenu}
                              onChange={() => {
                                changeisPopularMenu(z?.id);
                              }}
                            />
                          </FormControl>
                        </Td>
                      </Can>
                      <Can action={['updatePopularMealAction']}>
                        <Td>
                          {' '}
                          <FormControl display="flex" alignItems="center">
                            <Switch
                              colorScheme="brand"
                              id="email-alerts"
                              isChecked={z?.isPopularMeal}
                              onChange={() => {
                                changeisPopularMeal(z?.id);
                              }}
                            />
                          </FormControl>
                        </Td>
                      </Can>

                      <Td>
                        <span>{z?.price} azn</span>
                      </Td>
                      <Td>
                        <span>
                          {z?.oldPrice && z.oldPrice !== 0
                            ? `${z?.oldPrice} azn`
                            : 'Məlumat yoxdur'}
                        </span>
                      </Td>
                      <Td textAlign="right">
                        <Can
                          action={[
                            'deleteOldPriceAction',
                            'updateOldPriceAction'
                          ]}
                        >
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              aria-label="Options"
                              icon={<BiDotsVertical />}
                              variant="outline"
                            />
                            <MenuList>
                              <Can action={['updateOldPriceAction']}>
                                <MenuItem
                                  onClick={() => {
                                    setSelectedItem(z);
                                    editModal.onOpen();
                                  }}
                                >
                                  Düzəliş et
                                </MenuItem>
                              </Can>
                              <Can action={['deleteOldPriceAction']}>
                                <MenuItem
                                  onClick={() => {
                                    deletedOldPrice(z?.id);
                                  }}
                                >
                                  Köhnə qiyməti sil
                                </MenuItem>
                              </Can>
                            </MenuList>
                          </Menu>
                        </Can>
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

            {popularData?.datas?.datas &&
            popularData?.datas?.datas?.length > 0 ? (
              <Flex mt={4} justify="flex-end">
                <Pagination
                  currentPage={page}
                  totalCount={popularData?.datas?.totalDataCount}
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
        <Modal
          scrollBehavior="inside"
          isOpen={editModal.isOpen}
          size="xl"
          variant="big"
          isCentered
          onClose={editModal.onClose}
        >
          <ModalOverlay />
          <PopularEditModal
            selectedItem={selectedItem}
            setRefreshComponent={setRefreshComponent}
            onClose={editModal.onClose}
          />
        </Modal>
      </Box>
    </>
  );
}

export default Popular;
