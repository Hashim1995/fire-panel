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
  Textarea,
  RadioGroup,
  Radio
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
import { DocumentTypes, getEnumLabel } from '../options';

interface IVisaReviewModal extends modalClose {
  selectedId: IVisaApplicationItem;
}

function VisaReviewModal({
  onClose,
  setRefreshComponent,
  selectedId
}: IVisaReviewModal) {
  const [approveModalButtonLoading, setApproveModalButtonLoading] =
    useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting }
  } = useForm<any>({
    defaultValues: {
      applicants:
        selectedId?.visaApplicants.map((applicant: any) => ({
          id: applicant.id,
          documents: applicant.visaDocuments.reduce((acc: any, doc: any) => {
            acc[doc.id] = { status: '1' };
            return acc;
          }, {})
        })) ?? []
    }
  });
  const { fields } = useFieldArray({
    control,
    name: 'applicants'
  });
  const toast = useToast();

  function transformDocuments(
    documents: Record<
      string,
      {
        status: string;
      }
    >
  ) {
    return Object.entries(documents).map(([documentId, { status }]) => ({
      documentId: parseInt(documentId),
      isConfirmed: status !== '2'
    }));
  }
  const onSubmit: SubmitHandler<any> = async (data: any): Promise<void> => {
    const payload = {
      documents: data.applicants.flatMap((applicant: any) =>
        transformDocuments(applicant.documents)
      ),
      visaAppointmentId: selectedId?.id,
      note: data.note
    };

    console.log(payload, 'akif');

    try {
      const res = await VisaServices.getInstance().reviewDocumentS(payload);
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

  const downloadFile = async (url: string) => {
    try {
      const res = await VisaServices.getInstance().download(url);
      if (res.succeeded) {
        if (res.succeeded) {
          // Since response.data is already a blob, you don't need to convert it
          const url = URL.createObjectURL(res.data);
          const a = document.createElement('a');
          a.href = url;
          a.download = url; // Specify the filename here
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
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

  const approveItem = async () => {
    setApproveModalButtonLoading(true);
    try {
      const res = await VisaServices.getInstance().confirm({
        appointmentId: selectedId?.id
      });
      if (res.succeeded) {
        toast({
          title: 'Əməliyyat uğurla icra olundu',
          status: 'success',
          position: 'top-right',
          duration: 3000,
          isClosable: true
        });
      }

      setApproveModalButtonLoading(false);
      onClose && onClose();
      setRefreshComponent && setRefreshComponent((prev: boolean) => !prev);
    } catch (error: unknown) {
      setApproveModalButtonLoading(false);
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
      <ModalHeader>
        İSTİFADƏÇİ TƏRƏFİNDƏN GÖNDƏRİLƏN SƏNƏDLƏRİN YOXLANILMASI
      </ModalHeader>
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
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Sənəd Tipi</Th>
                            <Th textAlign={'center'}>Status</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {applicant?.visaDocuments.map((document: any) => (
                            <Tr key={document.id}>
                              <Td
                                onClick={() => downloadFile(document?.uri)}
                                style={{
                                  cursor: 'pointer'
                                }}
                              >
                                {getEnumLabel(
                                  DocumentTypes,
                                  document.documentType
                                )}
                              </Td>
                              <Td colSpan={2} textAlign={'center'}>
                                <Controller
                                  name={`applicants.${index}.documents.${document.id}.status`}
                                  control={control}
                                  render={({ field }) => (
                                    <RadioGroup
                                      defaultValue={'1'}
                                      onChange={field.onChange}
                                      value={field.value}
                                    >
                                      <Stack
                                        direction="row"
                                        justifyContent="center"
                                      >
                                        <Radio value={'1'}>Düz</Radio>
                                        <Radio value={'2'}>Səhv</Radio>
                                      </Stack>
                                    </RadioGroup>
                                  )}
                                />
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
              <Box>
                <Controller
                  control={control}
                  name="note"
                  rules={{
                    required: {
                      value: true,
                      message: inputValidationText('Əlavə qeyd')
                    }
                  }}
                  render={({ field: { onChange, value } }) => (
                    <FormControl
                      isInvalid={Boolean(errors.note)}
                      isRequired
                      id="note"
                    >
                      <FormLabel fontSize="sm" mb={1}>
                        Əlavə qeyd
                      </FormLabel>
                      <Tooltip
                        hasArrow
                        placement="top-end"
                        // @ts-ignore
                        label={errors?.note ? errors?.note?.message : ''}
                      >
                        <Textarea
                          onChange={onChange}
                          value={value}
                          placeholder={inputPlaceholderText('Əlavə qeyd')}
                        />
                      </Tooltip>
                    </FormControl>
                  )}
                />
              </Box>
            </Stack>
          </form>
        </Box>
      </ModalBody>

      <ModalFooter>
        <Button mr={3} variant="gray" onClick={onClose}>
          {closeBtn}
        </Button>
        <Button
          mr={3}
          type="button"
          onClick={approveItem}
          isLoading={approveModalButtonLoading}
        >
          Təsdiqlə
        </Button>
        <Button
          form="category-add-modal-submit-btn"
          type="submit"
          isDisabled={!isDirty || !isValid}
          isLoading={isSubmitting}
        >
          Geri qaytar
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default VisaReviewModal;
