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
import { AxiosError } from 'axios';

import { useEffect, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { OptionsServices } from '@/services/options-services/options-services';
import { IOptionCreate, IOptionItem, IOptionUpdate } from '../models';

interface ICountryEditModal extends modalClose {
  selectedItem: IOptionItem | undefined;
}

function CountryEditModal({
  onClose,
  setRefreshComponent,
  selectedItem
}: ICountryEditModal) {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting, isDirty }
  } = useForm<IOptionCreate>({
    mode: 'onChange'
  });

  const toast = useToast();

  const onSubmit: SubmitHandler<IOptionCreate> = async (
    data: IOptionCreate
  ): Promise<void> => {
    const payload: IOptionUpdate = {
      title: data?.title,
      amount: data?.amount,
      id: selectedItem?.id || 0
    };

    try {
      const res = await OptionsServices.getInstance().update(payload);
      if (res.succeeded) {
        toast({
          title: 'Əməliyyat uğurla icra olundu',
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
    setValue('title', selectedItem?.title || '');
    setValue('amount', selectedItem?.amount || 0);
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
                    <FormLabel fontSize="sm">Başlıq</FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={errors.title ? errors.title.message : ''}
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
                name="amount"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Məbləğ')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.amount)}
                    isRequired
                    id="amount"
                  >
                    <FormLabel fontSize="sm">Məbləğ</FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={errors.amount ? errors.amount.message : ''}
                    >
                      <Input
                        onChange={onChange}
                        value={value}
                        type="text"
                        placeholder={inputPlaceholderText('Məbləğ')}
                      />
                    </Tooltip>
                  </FormControl>
                )}
              />

              <br />
            </Stack>
          </form>
        </Box>
      </ModalBody>

      <ModalFooter>
        <Button mr={3} variant="outline" onClick={onClose}>
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
