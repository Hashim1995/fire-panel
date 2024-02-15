/* eslint-disable no-unused-expressions */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import {
  Flex,
  Tooltip,
  useToast,
  FormControl,
  FormLabel,
  Button,
  Box,
  Stack,
  Skeleton,
  Input
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { inputValidationText } from '@/utils/constants/texts';
import { SettingsService } from '@/services/setting-services/setting-services';
import { AxiosError } from 'axios';

function PaymentTypePrice() {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [btnLoader, setBtnLaoder] = useState<boolean>(false);
  const [refreshComponent, setRefreshComponent] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid }
  } = useForm<any>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setBtnLaoder(true);
    const payload = {
      complexAmount: Number(data?.complexAmount),
      simpleAmount: Number(data?.simpleAmount)
    };

    try {
      const res = await SettingsService.getInstance().changePrice(payload);
      if (res?.succeeded) {
        toast({
          title: 'Əməliyyat uğurla icra olundu',
          status: 'success',
          position: 'top-right',
          duration: 3000,
          isClosable: true
        });
        setRefreshComponent(z => !z);
      }
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

            status: 'error',
            position: 'top-right',
            duration: 3000,
            isClosable: true
          });
        }
      }
    }
    setBtnLaoder(false);
  };

  const fetchCurrentPrices = async () => {
    try {
      const res = await SettingsService.getInstance().getCurrentPrices();
      setValue('simpleAmount', res?.data[0]?.amount);
      setValue('complexAmount', res?.data[1]?.amount);
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

            status: 'error',
            position: 'top-right',
            duration: 3000,
            isClosable: true
          });
        }
      }
    }
  };

  useEffect(() => {
    fetchCurrentPrices();
  }, [refreshComponent]);

  return (
    <div>
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex alignItems="space-between" gap="20px">
            <Box w="50%">
              <Controller
                control={control}
                name="simpleAmount"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Sadə Ödəniş qiyməti')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.simpleAmount)}
                    isRequired
                    id="simpleAmount"
                  >
                    <FormLabel fontSize="sm" mb={1}>
                      Sadə Ödəniş qiyməti
                    </FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      // @ts-ignore
                      label={
                        errors?.simpleAmount
                          ? errors?.simpleAmount?.message
                          : ''
                      }
                    >
                      <Input
                        onChange={onChange}
                        type="number"
                        value={value}
                        placeholder={'Daxil edin'}
                      />
                    </Tooltip>
                  </FormControl>
                )}
              />
            </Box>
            <Box w="50%">
              <Controller
                control={control}
                name="complexAmount"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Kompleks Ödəniş qiyməti')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.complexAmount)}
                    isRequired
                    id="complexAmount"
                  >
                    <FormLabel fontSize="sm" mb={1}>
                      Kompleks Ödəniş qiyməti
                    </FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      // @ts-ignore
                      label={
                        errors?.complexAmount
                          ? errors?.complexAmount?.message
                          : ''
                      }
                    >
                      <Input
                        onChange={onChange}
                        value={value}
                        type="number"
                        placeholder={'Daxil edin'}
                      />
                    </Tooltip>
                  </FormControl>
                )}
              />
            </Box>
          </Flex>
          <br />
          <Flex alignItems="space-between" gap="20px">
            <Button
              isDisabled={!isValid}
              type="submit"
              isLoading={btnLoader}
              alignSelf="end"
            >
              Yenilə
            </Button>
          </Flex>
        </form>
      ) : (
        <Stack>
          <Skeleton height="120px" />
        </Stack>
      )}
    </div>
  );
}

export default PaymentTypePrice;
