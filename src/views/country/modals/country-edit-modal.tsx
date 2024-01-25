/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
// import Uploader from '@/components/forms/uploader/uploader';
import { modalClose } from '@/models/common';
import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  useToast,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Tooltip,
  Image
} from '@chakra-ui/react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import {
  closeBtn,
  editBtn,
  inputPlaceholderText,
  inputValidationText,
  selectPlaceholderText
} from '@/utils/constants/texts';
import { Select } from 'chakra-react-select';
import { languageOptions } from '@/utils/constants/options';
import { AxiosError } from 'axios';

import { useEffect, useState } from 'react';
import Uploader from '@/components/forms/uploader/uploader';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { IProductItem } from '@/models/product';
import { CountryServices } from '@/services/country-services/country-services';
import { ICountryCreate, ICountryItem, ICountryUpdate } from '../models';

interface ICountryEditModal extends modalClose {
  selectedItem: ICountryItem | undefined;
}

function CountryEditModal({
  onClose,
  setRefreshComponent,
  selectedItem
}: ICountryEditModal) {
  const [FlagPhoto, setFlagPhoto] = useState<File | null>(null);
  const [CoverPhoto, setCoverPhoto] = useState<File | null>(null);

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid, isSubmitting, isDirty }
  } = useForm<ICountryUpdate>({
    mode: 'onChange'
  });

  const toast = useToast();

  const onSubmit: SubmitHandler<ICountryUpdate> = async (
    data: ICountryUpdate
  ): Promise<void> => {
    // if (!FlagPhoto) {
    //   toast({
    //     title: 'Əsas şəkil daxil edilməsi məcburidir',
    //     status: 'error',
    //     position: 'top-right',
    //     duration: 3000,
    //     isClosable: true
    //   });
    //   return;
    // }
    // if (!CoverPhoto) {
    //   toast({
    //     title: 'Arxa fon şəkili daxil edilməsi məcburidir',
    //     status: 'error',
    //     position: 'top-right',
    //     duration: 3000,
    //     isClosable: true
    //   });
    //   return;
    // }

    const formData = new FormData();
    // photo && formData.append('Photo', photo);
    data?.Language && formData.append('Language', data?.Language?.value);
    data?.Title && formData.append('Title', data?.Title);
    formData.append('FlagPhoto', FlagPhoto || selectedItem?.flagUrl);
    formData.append('CoverPhoto', CoverPhoto || selectedItem?.coverUrl);
    formData.append('id', String(selectedItem?.id));
    formData.append('Description', data?.Description);
    try {
      const res = await CountryServices.getInstance().update(formData);
      if (res.succeeded) {
        toast({
          title: 'Əməliyyat uğurla icra olundu',
          description: 'Bloq  uğurla əlavə edildi',
          status: 'success',
          position: 'top-right',
          duration: 3000,
          isClosable: true
        });
        onClose && onClose();
        setRefreshComponent && setRefreshComponent((prev: boolean) => !prev);
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
            description:
              'Bloq məlumatlarının əlavə edilməsi zamanı xəta baş verdi',
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
    setValue('Title', selectedItem?.title || '');
    setValue('Description', selectedItem?.description || '');
  }, [selectedItem]);

  return (
    <ModalContent>
      <ModalHeader>MƏLUMATA DÜZƏLİŞ EDİLMƏSİ</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box>
          <form
            noValidate
            id="category-add-modal-submit-btn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={4}>
              <Controller
                control={control}
                name="Title"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Başlıq')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.Title)}
                    isRequired
                    id="Title"
                  >
                    <FormLabel fontSize="sm">Başlıq</FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={errors.Title ? errors.Title.message : ''}
                    >
                      <Input
                        onChange={onChange}
                        value={value}
                        type="text"
                        placeholder={inputPlaceholderText('Başlıq')}
                      />
                    </Tooltip>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="Description"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Açıqlama')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.Description)}
                    isRequired
                    id="Description"
                  >
                    <FormLabel fontSize="sm">Açıqlama</FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={
                        errors.Description ? errors.Description.message : ''
                      }
                    >
                      <Input
                        onChange={onChange}
                        value={value}
                        type="text"
                        placeholder={inputPlaceholderText('Açıqlama')}
                      />
                    </Tooltip>
                  </FormControl>
                )}
              />

              <br />
            </Stack>
          </form>
        </Box>
        <Box mt={5}>
          <FormLabel fontSize="sm">Kover şəkili</FormLabel>
          <Uploader
            onChange={e => setCoverPhoto(e[0])}
            limit={1}
            accept={['image/png', 'image/jpg', 'image/jpeg']}
          />
          {!CoverPhoto && (
            <Box mt={5}>
              <Image
                border="1px solid black"
                h={300}
                w={300}
                mb={1}
                objectFit="contain"
                src={`${
                  import.meta.env.VITE_BASE_URL_IMG
                }${selectedItem?.coverUrl}`}
              />
            </Box>
          )}
        </Box>
        <Box mt={5}>
          <FormLabel fontSize="sm">Əsas şəkili</FormLabel>
          <Uploader
            onChange={e => setFlagPhoto(e[0])}
            limit={1}
            accept={['image/png', 'image/jpg', 'image/jpeg']}
          />
          {!FlagPhoto && (
            <Box mt={5}>
              <Image
                border="1px solid black"
                h={300}
                w={300}
                mb={1}
                objectFit="contain"
                src={`${
                  import.meta.env.VITE_BASE_URL_IMG
                }${selectedItem?.flagUrl}`}
              />
            </Box>
          )}
        </Box>
      </ModalBody>

      <ModalFooter>
        <Button mr={3} variant="gray" onClick={onClose}>
          {closeBtn}
        </Button>
        <Button
          form="category-add-modal-submit-btn"
          type="submit"
          isDisabled={Object.keys(errors).length > 0}
          isLoading={isSubmitting}
        >
          {editBtn}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default CountryEditModal;
