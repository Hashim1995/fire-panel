/* eslint-disable no-unused-expressions */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import {
  Flex,
  Textarea,
  Tooltip,
  useToast,
  TabPanel,
  FormControl,
  FormLabel,
  Button,
  Box,
  Stack,
  Skeleton
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  inputPlaceholderText,
  inputValidationText
} from '@/utils/constants/texts';
import { ContactServices } from '@/services/contact-services/contact-services';
import { IContactForm, IContactItem, IContactUpsert } from '../models';

interface IContactItemProps {
  data: IContactItem;
  setRefreshComponent: Dispatch<SetStateAction<boolean>>;
}
function AboutItem({ data, setRefreshComponent }: IContactItemProps) {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting }
  } = useForm<IContactForm>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<IContactForm> = async (
    formData: IContactForm | IContactUpsert
  ) => {
    setLoading(true);
    const payload = {
      description: formData?.description,
      email: formData?.email,
      header: formData?.header,
      address: formData?.address,
      phoneNumber: formData?.phoneNumber,
      language: data?.language,
      id: data?.id
    };

    try {
      const res = await ContactServices.getInstance().upsert(payload);
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
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setValue('description', data?.description);
    setValue('address', data?.address);
    setValue('header', data?.header);
    setValue('phoneNumber', data?.phoneNumber);
    setValue('email', data?.email);
  }, [data]);

  return (
    <TabPanel px={0}>
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex alignItems="space-between" gap="20px">
            <Box w="50%">
              <Controller
                control={control}
                name="header"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Başlıq')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.header)}
                    isRequired
                    id="header"
                  >
                    <FormLabel fontSize="sm" mb={1}>
                      Başlıq
                    </FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={errors?.header ? errors?.header?.message : ''}
                    >
                      <Textarea
                        onChange={onChange}
                        value={value}
                        placeholder={inputPlaceholderText('Başlıq')}
                      />
                    </Tooltip>
                  </FormControl>
                )}
              />
            </Box>
            <Box w="50%">
              <Controller
                control={control}
                name="description"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Açıqlama')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.description)}
                    id="description"
                    isRequired
                  >
                    <FormLabel fontSize="sm" mb={1}>
                      Açıqlama
                    </FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={
                        errors.description ? errors.description.message : ''
                      }
                    >
                      <Textarea
                        onChange={onChange}
                        value={value}
                        placeholder={inputPlaceholderText('Açıqlama')}
                      />
                    </Tooltip>
                  </FormControl>
                )}
              />
            </Box>
          </Flex>
          <br />
          <Flex alignItems="space-between" gap="20px">
            <Box w="50%">
              <Controller
                control={control}
                name="phoneNumber"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Telefon')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.phoneNumber)}
                    id="phoneNumber"
                    isRequired
                  >
                    <FormLabel fontSize="sm" mb={1}>
                      Telefon
                    </FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={
                        errors.phoneNumber ? errors.phoneNumber.message : ''
                      }
                    >
                      <Textarea
                        onChange={onChange}
                        value={value}
                        placeholder={inputPlaceholderText('Telefon')}
                      />
                    </Tooltip>
                  </FormControl>
                )}
              />
            </Box>
            <Box w="50%">
              <Controller
                control={control}
                name="email"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Email')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.email)}
                    id="email"
                    isRequired
                  >
                    <FormLabel fontSize="sm" mb={1}>
                      Email
                    </FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={errors.email ? errors.email.message : ''}
                    >
                      <Textarea
                        onChange={onChange}
                        value={value}
                        placeholder={inputPlaceholderText('Email')}
                      />
                    </Tooltip>
                  </FormControl>
                )}
              />
            </Box>
          </Flex>
          <br />
          <Flex alignItems="space-between" gap="20px">
            <Box w="50%">
              <Controller
                control={control}
                name="address"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Ünvan')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.address)}
                    id="address"
                    isRequired
                  >
                    <FormLabel fontSize="sm" mb={1}>
                      Ünvan
                    </FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={errors.address ? errors.address.message : ''}
                    >
                      <Textarea
                        onChange={onChange}
                        value={value}
                        placeholder={inputPlaceholderText('Ünvan')}
                      />
                    </Tooltip>
                  </FormControl>
                )}
              />
            </Box>
            <Button
              isDisabled={!isValid}
              type="submit"
              isLoading={isSubmitting}
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
    </TabPanel>
  );
}

export default AboutItem;
