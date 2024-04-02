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
  Skeleton,
  Image
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  inputPlaceholderText,
  inputValidationText
} from '@/utils/constants/texts';
import { AboutSerices } from '@/services/about-services/about-services';
import Uploader from '@/components/forms/uploader/uploader';
import { IAboutForm, IAboutItem, IAboutUpsert } from '../models';

interface IAboutItemProps {
  data: IAboutItem;
  setRefreshComponent: Dispatch<SetStateAction<boolean>>;
}
function AboutItem({ data, setRefreshComponent }: IAboutItemProps) {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [photo, setPhoto] = useState<File | null>(null);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting }
  } = useForm<IAboutForm>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<IAboutForm> = async (
    formData: IAboutForm | IAboutUpsert
  ) => {
    setLoading(true);
    const payload = new FormData();
    photo && payload.append('photo', photo || data?.imageUrl);
    payload.append('title', formData?.title);
    payload.append('description', formData?.description);
    payload.append('language', data?.language?.toString());
    payload.append('id', data?.id?.toString());

    try {
      const res = await AboutSerices.getInstance().upsert(payload);
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
    setValue('title', data?.title);
    setValue('imageUrl', data?.imageUrl);
  }, [data]);

  return (
    <TabPanel px={0}>
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex alignItems="space-between" gap="20px">
            <Box w="45%">
              <Controller
                control={control}
                name="title"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Başlıq')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.title)}
                    isRequired
                    id="title"
                  >
                    <FormLabel fontSize="sm" mb={1}>
                      Başlıq
                    </FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={errors?.title ? errors?.title?.message : ''}
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
            <Box w="45%">
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

            <Flex w="10%" alignSelf="end" justifyContent="flex-end">
              <Button
                isDisabled={!isValid}
                type="submit"
                isLoading={isSubmitting}
                alignSelf="end"
              >
                Yenilə
              </Button>
            </Flex>
          </Flex>
          <br />
          <Box>
            <Uploader
              onChange={e => setPhoto(e[0])}
              limit={1}
              accept={[
                'image/png',
                'image/jpg',
                'image/svg',
                'image/webp',
                'image/jpeg'
              ]}
            />
            {!photo && (
              <Box mt={5}>
                <Image
                  border="1px solid black"
                  h={300}
                  w={300}
                  mb={1}
                  objectFit="contain"
                  src={`${import.meta.env.VITE_BASE_URL_IMG}${data?.imageUrl}`}
                />
              </Box>
            )}
          </Box>
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
