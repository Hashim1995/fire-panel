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
import { IVisaApplicationItem } from '../models';
import { DocumentTypes } from '../options';

interface IVisaAskModal extends modalClose {
  selectedId: IVisaApplicationItem;
}

function VisaAskModal({
  onClose,
  setRefreshComponent,
  selectedId
}: IVisaAskModal) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting }
  } = useForm<any>({
    defaultValues: {
      applicants:
        selectedId?.visaApplicants.map(applicant => ({
          id: applicant.id,
          documents: DocumentTypes.map(doc => ({
            type: doc.value,
            status: null
          })),
          date: ''
        })) ?? []
    }
  });
  const { fields } = useFieldArray({
    control,
    name: 'applicants'
  });
  const toast = useToast();

  const createPayload = (formData: any) => {
    const requiredDocuments = formData?.applicants.map((applicant: any) => {
      const documentTypes = applicant.documents
        .filter((document: any) => document.status === 'yes')
        .map((document: any) => document.type);

      return {
        visaApplicantId: applicant.id,
        documentTypes
      };
    });
    const meetingDates = formData?.applicants.map((applicant: any) => ({
      visaApplicantId: applicant.id,
      meetingDate: applicant.date
    }));

    return {
      requiredDocuments,
      meetingDates
    };
  };

  const onSubmit: SubmitHandler<any> = async (data: any): Promise<void> => {
    const payload = createPayload(data);

    try {
      const res = await VisaServices.getInstance().askDocument(payload);
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
      <ModalHeader>ƏLAVƏ SƏNƏDLƏRİN TOPLANMASI ÜÇÜN MÜRACİƏT</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box>
          <form
            noValidate
            id="category-add-modal-submit-btn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={4}>
              <Accordion allowMultiple>
                {selectedId?.visaApplicants.map((applicant: any, index) => (
                  <AccordionItem key={applicant?.id}>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {` ${applicant?.firstname}
                          ${applicant?.lastname}`}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Controller
                        control={control}
                        name={`applicants.${index}.date`}
                        // rules={{
                        //   required: {
                        //     value: true,
                        //     message: inputValidationText('Tarix')
                        //   }
                        // }}
                        render={({ field: { onChange, value, ref } }) => (
                          <FormControl
                            isInvalid={Boolean(
                              errors[`applicants.${index}.date`]
                            )}
                            // isRequired
                            id="DateOfPublish"
                          >
                            <FormLabel fontSize="sm">Randevu tarixi</FormLabel>
                            <Tooltip
                              hasArrow
                              placement="top-end"
                              // @ts-ignore
                              label={
                                errors[`applicants.${index}.date`]
                                  ? 'Randevu tarixi xanasını daxil eidlməsi məcburidir'
                                  : ''
                              }
                            >
                              <Input
                                name="date"
                                type="date"
                                ref={ref}
                                placeholder="Tarix"
                                value={value}
                                onChange={onChange}
                              />
                            </Tooltip>
                          </FormControl>
                        )}
                      />
                      <br />

                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Sənəd Tipi</Th>
                            <Th textAlign="center">Lazımdı</Th>
                            {/* <Th isNumeric>Lazım deyil</Th> */}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {DocumentTypes.map((docType, docIndex) => (
                            <Tr key={docType.value}>
                              <Td>{docType.label}</Td>
                              <Td textAlign="center">
                                <Controller
                                  name={`applicants.${index}.documents.${docIndex}.status`}
                                  control={control}
                                  render={({ field }) => (
                                    <Checkbox
                                      isChecked={field.value === 'yes'}
                                      onChange={e =>
                                        field.onChange(
                                          e.target.checked ? 'yes' : null
                                        )
                                      }
                                    />
                                  )}
                                />
                              </Td>
                              {/* <Td>
                                <Controller
                                  name={`applicants.${index}.documents.${docIndex}.status`}
                                  control={control}
                                  render={({ field }) => (
                                    <Checkbox
                                      isChecked={field.value === 'no'}
                                      onChange={e =>
                                        field.onChange(
                                          e.target.checked ? 'no' : null
                                        )
                                      }
                                    />
                                  )}
                                />
                              </Td> */}
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
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
          isDisabled={!isDirty || !isValid}
          isLoading={isSubmitting}
        >
          Göndər
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default VisaAskModal;
