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
  BreadcrumbSeparator,
  Grid,
  GridItem,
  Stack,
  FormControl,
  Skeleton,
  Switch
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiHome } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import {
  IGetLanguagesResponse,
  SettingsService
} from '@/services/setting-services/setting-services';
import { ILanguageItem } from '@/models/settings';

// {
//   id,
//   name,
//   isActive
// }

function Settings() {
  const [languagesData, setLanguagesData] =
    useState<IGetLanguagesResponse | null>(null);
  const [loadingLanguage, setLoadingLanguage] = useState<boolean>(true);
  const [disableSwitch, setDisableSwitch] = useState<boolean>(false);
  const fetchData = async () => {
    setLoadingLanguage(true);

    const res: IGetLanguagesResponse =
      await SettingsService.getInstance().getLanguages();
    if (res.succeeded) {
      setLanguagesData(res);
      setLoadingLanguage(false);
    } else {
      setLoadingLanguage(false);
    }
  };

  const changeLanguageItemStatus = async (id: number) => {
    setDisableSwitch(true);
    try {
      const res = await SettingsService.getInstance().changeLanguageItemStatus(
        id
      );
      if (res?.succeeded) {
        const obj: any = {
          ...languagesData?.datas,
          datas: languagesData?.datas?.map(item => {
            if (item?.id === id) {
              return { ...item, isActive: !item.isActive };
            }
            return item;
          })
        };
        setLanguagesData(obj);
      }
      setDisableSwitch(false);
    } catch {
      setDisableSwitch(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

              <BreadcrumbLink as={NavLink} to="/web">
                Veb səhifə
              </BreadcrumbLink>
              <BreadcrumbSeparator />
              <BreadcrumbLink isCurrentPage href="/settings">
                Tənzimləmə
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
      </Box>
      <Box mt={5} shadow="lg" bg="white" borderRadius={6} w="100%" p={4}>
        <Flex justifyContent="left">
          <Heading fontWeight="medium" mb={1} size="xs">
            DİLLƏR
          </Heading>
        </Flex>
        {!loadingLanguage ? (
          <Flex justifyContent="left">
            <Box>
              {languagesData?.datas?.map((item: ILanguageItem) => (
                <Grid templateColumns="repeat(2, 1fr)" py={1} gap={1}>
                  <>
                    <GridItem width="85%">{item?.name}</GridItem>
                    {item?.id !== 1 && (
                      <GridItem width="85%">
                        <FormControl display="flex" alignItems="center">
                          <Switch
                            isDisabled={disableSwitch}
                            colorScheme="brand"
                            onChange={() => {
                              changeLanguageItemStatus(item?.id);
                            }}
                            isChecked={item?.isActive}
                            id="email-alerts"
                          />
                        </FormControl>
                      </GridItem>
                    )}
                  </>
                </Grid>
              ))}
            </Box>
          </Flex>
        ) : (
          <Stack>
            <Skeleton height="25px" />
            <Skeleton height="25px" />
            <Skeleton height="25px" />
          </Stack>
        )}
      </Box>
    </>
  );
}

export default Settings;
