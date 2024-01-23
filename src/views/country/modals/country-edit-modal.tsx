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
  Tooltip
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

import { useState } from 'react';
import Uploader from '@/components/forms/uploader/uploader';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { IProductItem } from '@/models/product';
import { CountryServices } from '@/services/country-services/country-services';
import { ICountryCreate } from '../models';

interface ICountryEditModal extends modalClose {
  selectedItem: IProductItem | undefined;
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
    control,
    formState: { errors, isValid, isSubmitting, isDirty }
  } = useForm<ICountryCreate>({
    mode: 'onChange'
  });

  const toast = useToast();

  const onSubmit: SubmitHandler<ICountryCreate> = async (
    data: ICountryCreate
  ): Promise<void> => {
    if (!FlagPhoto) {
      toast({
        title: 'Əsas şəkil daxil edilməsi məcburidir',
        status: 'error',
        position: 'top-right',
        duration: 3000,
        isClosable: true
      });
      return;
    }
    if (!CoverPhoto) {
      toast({
        title: 'Arxa fon şəkili daxil edilməsi məcburidir',
        status: 'error',
        position: 'top-right',
        duration: 3000,
        isClosable: true
      });
      return;
    }

    const formData = new FormData();
    // photo && formData.append('Photo', photo);
    data?.Language && formData.append('Language', data?.Language?.value);
    data?.Title && formData.append('Title', data?.Title);
    formData.append('FlagPhoto', FlagPhoto);
    formData.append('CoverPhoto', CoverPhoto);
    formData.append('Description', data?.Description);
    try {
      const res = await CountryServices.getInstance().create(formData);
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

  return (
    <ModalContent>
      <ModalHeader>MƏLUMATIN ƏLAVƏ EDİLMƏSİ</ModalHeader>
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
                name="Language"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Dil')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.Language)}
                    id="Language"
                    isRequired
                  >
                    <FormLabel fontSize="sm" mb={1}>
                      Dil
                    </FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      // @ts-ignore
                      label={errors.Language ? errors.Language.message : ''}
                    >
                      <div>
                        <Select
                          onChange={onChange}
                          value={value}
                          options={languageOptions}
                          placeholder={selectPlaceholderText('Dil')}
                          isClearable
                        />
                      </div>
                    </Tooltip>
                  </FormControl>
                )}
              />
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
        </Box>
        <Box mt={5}>
          <FormLabel fontSize="sm">Əsas şəkili</FormLabel>
          <Uploader
            onChange={e => setFlagPhoto(e[0])}
            limit={1}
            accept={['image/png', 'image/jpg', 'image/jpeg']}
          />
        </Box>
      </ModalBody>

      <ModalFooter>
        <Button mr={3} variant="gray" onClick={onClose}>
          {closeBtn}
        </Button>
        <Button
          form="category-add-modal-submit-btn"
          type="submit"
          isDisabled={!isDirty || !isValid}
          isLoading={isSubmitting}
        >
          {editBtn}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default CountryEditModal;
