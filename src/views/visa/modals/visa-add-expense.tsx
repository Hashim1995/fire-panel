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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
  CheckboxGroup,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Textarea
} from '@chakra-ui/react';
import {
  Controller,
  useForm,
  SubmitHandler,
  useFieldArray
} from 'react-hook-form';

import {
  addBtn,
  closeBtn,
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
import { CountryServices } from '@/services/country-services/country-services';
import { VisaServices } from '@/services/visa-services/visa-services';
import { convertFormDataToQueryParams } from '@/utils/functions/functions';
import { IVisaApplicationItem } from '../models';
import { DocumentTypes } from '../options';

interface IVisaMakeAppointmentModal extends modalClose {
  selectedId: IVisaApplicationItem;
}

function VisaAddExpenseModal({
  onClose,
  setRefreshComponent,
  selectedId
}: IVisaMakeAppointmentModal) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting }
  } = useForm<any>({
    defaultValues: {
      expenseAmount: selectedId?.expense ?? null
    }
  });

  const toast = useToast();

  const onSubmit: SubmitHandler<any> = async (data: any): Promise<void> => {
    const query = {
      expenseAmount: data?.expenseAmount,
      appointmentId: selectedId?.id
    };

    try {
      const res = await VisaServices.getInstance().addExpense(query);
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

  return (
    <ModalContent>
      <ModalHeader> Xərc əlavə et</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box>
          <form
            noValidate
            id="category-add-modal-submit-btn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name={`expenseAmount`}
              rules={{
                required: {
                  value: true,
                  message: inputValidationText('Tarix')
                }
              }}
              render={({ field: { onChange, value, ref } }) => (
                <FormControl
                  isInvalid={Boolean(errors.expenseAmount)}
                  isRequired
                  id="DateOfPublish"
                >
                  <FormLabel fontSize="sm">Xərcin miqdarı</FormLabel>
                  <Input
                    onChange={onChange}
                    value={value}
                    placeholder={'Xərc'}
                    type="number"
                  />
                </FormControl>
              )}
            />
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
          isDisabled={!isDirty || !isValid}
          isLoading={isSubmitting}
        >
          Göndər
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default VisaAddExpenseModal;
