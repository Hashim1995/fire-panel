/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import { modalClose } from '@/models/common';
import { VisaServices } from '@/services/visa-services/visa-services';

import { closeBtn, noText } from '@/utils/constants/texts';
import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Skeleton,
  TableContainer,
  SimpleGrid,
  Box,
  Table,
  Th,
  Td,
  Tr,
  Thead,
  Tbody,
  Heading,
  useToast
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { IVisaApplicant } from '../models';
import { DocumentTypes, getEnumLabel } from '../options';

interface IVisaDetailedViewModal extends modalClose {
  selectedId: IVisaApplicant;
}
function VisaDetailedViewModal({
  onClose,
  selectedId
}: IVisaDetailedViewModal) {
  const toast = useToast();

  const downloadFile = async (param: string) => {
    try {
      const res = await VisaServices.getInstance().download(param);
      console.log(res);
      const url = URL.createObjectURL(res);
      const a = document.createElement('a');
      a.href = url;
      a.download = param; // Specify the filename here
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
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
      <ModalHeader>
        MÜRACİƏTÇİLƏR HAQQINDA MƏLUMATA BAXIŞ -
        {` ${selectedId?.firstname}
                          ${selectedId?.lastname}`}
      </ModalHeader>

      <ModalCloseButton />
      <ModalBody>
        {selectedId ? (
          <>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                <Text fontWeight="italic">Ad</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.firstname || noText}
                </Text>
              </Box>
            </SimpleGrid>

            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                <Text fontWeight="italic">Soyad</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.lastname || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                <Text fontWeight="italic">Elektron poçt ünvanı</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">{selectedId?.email || noText}</Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                <Text fontWeight="italic">Əlaqə nömrəsi</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.phoneNumber || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                <Text fontWeight="italic">Passport nömrəsi</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.passportNo || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                <Text fontWeight="italic">FİN</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.personalNo || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                <Text fontWeight="italic">Doğum tarixi</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.dateOfBirth || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                <Text fontWeight="italic">Ölkə kodu</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.countryCode || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                <Text fontWeight="italic">Milliyət</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.nationality || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                <Text fontWeight="italic">Cinsi</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId.gender === 1
                    ? 'Kişi'
                    : selectedId.gender === 2
                    ? 'Qadın'
                    : noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                <Text fontWeight="italic">Passportun verilmə tarixi</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.passportDateOfIssue || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                <Text fontWeight="italic">Passportun etibarlılıq müddəti</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.passportDateOfExpiry || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                <Text fontWeight="italic">
                  Müraciətçi yetkinlik yaşına çatmış şəxsdir?
                </Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId.isAdult === true
                    ? 'Bəli'
                    : selectedId.isAdult === false
                    ? 'Xeyr'
                    : noText}
                </Text>
              </Box>
            </SimpleGrid>

            {!selectedId?.isAdult ? (
              <div>
                <Heading marginTop={3} as="h2" size="md">
                  Nümayəndə haqqında məlumat:
                </Heading>
                <SimpleGrid columns={2} spacing={1} py={2}>
                  <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                    <Text fontWeight="italic">Adı</Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontWeight="medium">
                      {selectedId?.representative?.firstname || noText}
                    </Text>
                  </Box>
                </SimpleGrid>
                <SimpleGrid columns={2} spacing={1} py={2}>
                  <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                    <Text fontWeight="italic">Soyadı</Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontWeight="medium">
                      {selectedId?.representative?.lastname || noText}
                    </Text>
                  </Box>
                </SimpleGrid>
                <SimpleGrid columns={2} spacing={1} py={2}>
                  <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                    <Text fontWeight="italic">Elektron poçt ünvanı</Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontWeight="medium">
                      {selectedId?.representative?.email || noText}
                    </Text>
                  </Box>
                </SimpleGrid>
                <SimpleGrid columns={2} spacing={1} py={2}>
                  <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                    <Text fontWeight="italic">Əlaqə nömrəsi</Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontWeight="medium">
                      {selectedId?.representative?.phoneNumber || noText}
                    </Text>
                  </Box>
                </SimpleGrid>
                <SimpleGrid columns={2} spacing={1} py={2}>
                  <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                    <Text fontWeight="italic">Ünvanı</Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontWeight="medium">
                      {selectedId?.representative?.address || noText}
                    </Text>
                  </Box>
                </SimpleGrid>
              </div>
            ) : null}

            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                <Text fontWeight="italic">
                  Avropa vətəndaşı olan qohumunuz var?
                </Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId.hasEuropeanFamilyMember === true
                    ? 'Bəli'
                    : selectedId.hasEuropeanFamilyMember === false
                    ? 'Xeyr'
                    : noText}
                </Text>
              </Box>
            </SimpleGrid>

            {selectedId?.hasEuropeanFamilyMember ? (
              <div>
                {' '}
                <Heading marginTop={3} as="h2" size="md">
                  Avropa vətəndaşı olan qohum haqqında məlumat:
                </Heading>
                <SimpleGrid columns={2} spacing={1} py={2}>
                  <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                    <Text fontWeight="italic">
                      Digər ölkə vətəşdaşlığı məlumatı
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontWeight="medium">
                      {selectedId?.otherCountryResidenceInformation || noText}
                    </Text>
                  </Box>
                </SimpleGrid>
                <SimpleGrid columns={2} spacing={1} py={2}>
                  <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                    <Text fontWeight="italic">Adı</Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontWeight="medium">
                      {selectedId?.europeanFamilyMember?.firstname || noText}
                    </Text>
                  </Box>
                </SimpleGrid>
                <SimpleGrid columns={2} spacing={1} py={2}>
                  <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                    <Text fontWeight="italic">Soyadı</Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontWeight="medium">
                      {selectedId?.europeanFamilyMember?.lastname || noText}
                    </Text>
                  </Box>
                </SimpleGrid>
                <SimpleGrid columns={2} spacing={1} py={2}>
                  <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                    <Text fontWeight="italic">Passport faylı</Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontWeight="medium">
                      {selectedId.europeanFamilyMember?.passportUri ? (
                        <p
                          aria-hidden
                          style={{
                            cursor: 'pointer',
                            color: 'blue'
                          }}
                          onClick={() =>
                            downloadFile(
                              selectedId.europeanFamilyMember?.passportUri
                            )
                          }
                        >
                          Pasport Linki
                        </p>
                      ) : (
                        '-'
                      )}
                    </Text>
                  </Box>
                </SimpleGrid>{' '}
              </div>
            ) : null}

            <br />
            {selectedId?.visaDocuments?.length ? (
              <>
                <Heading as="h4" pb={2} size="md">
                  Sənədlər - ({selectedId?.visaDocuments?.length})
                </Heading>
                <TableContainer>
                  <Table size="md" variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Sənəd növü</Th>
                        <Th>Təsdiqlənmə statusu</Th>
                        <Th>URL</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selectedId?.visaDocuments?.map(item => (
                        <Tr key={item.id}>
                          <Td>
                            {' '}
                            {getEnumLabel(DocumentTypes, item?.documentType) ||
                              noText}
                          </Td>
                          <Td>
                            {' '}
                            {item.isConfirmed === true
                              ? 'Bəli'
                              : item.isConfirmed === false
                              ? 'Xeyr'
                              : noText}
                          </Td>

                          <Td>
                            {item?.uri ? (
                              <p
                                aria-hidden
                                style={{
                                  cursor: 'pointer',
                                  color: 'blue'
                                }}
                                onClick={() => downloadFile(item?.uri)}
                              >
                                {item?.uri}
                              </p>
                            ) : (
                              '-'
                            )}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            ) : null}
          </>
        ) : (
          <Skeleton height={200} />
        )}
      </ModalBody>

      <ModalFooter>
        <Button mr={3} variant="gray" onClick={onClose}>
          {closeBtn}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default VisaDetailedViewModal;
