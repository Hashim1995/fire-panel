/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import { modalClose } from '@/models/common';
import { VisaServices } from '@/services/visa-services/visa-services';

import { closeBtn, noText } from '@/utils/constants/texts';
import { truncateText } from '@/utils/functions/functions';
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
  useToast,
  IconButton,
  Tooltip
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { FaCopy } from 'react-icons/fa';
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
              position: 'bottom-right',
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

  const copyToClipboard = (value: string) => {
    const textToCopy = value || noText;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast({
          title: 'Kopyalandı',
          description: `${textToCopy} müvəffəqiyyətlə kopyalandı.`,
          status: 'success',
          duration: 2000,
          isClosable: true
        });
      })
      .catch(() => {
        toast({
          title: 'Xəta baş verdi',
          description: 'Mətn kopyalana bilmədi.',
          status: 'error',
          duration: 2000,
          isClosable: true
        });
      });
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
            <SimpleGrid columns={3} spacing={1} py={2}>
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Ad
                </Text>
              </Box>
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="medium">
                  {selectedId?.firstname || noText}
                </Text>
              </Box>
              <Box p={2} textAlign="end">
                <IconButton
                  aria-label="Copy Firstname"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => copyToClipboard(selectedId?.firstname)}
                />
              </Box>

              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Soyad
                </Text>
              </Box>
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="medium">
                  {selectedId?.lastname || noText}
                </Text>
              </Box>
              <Box p={2} textAlign="end">
                <IconButton
                  aria-label="Copy Lastname"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => copyToClipboard(selectedId?.lastname)}
                />
              </Box>

              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Elektron poçt ünvanı
                </Text>
              </Box>
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="medium">
                  {selectedId?.email || noText}
                </Text>
              </Box>
              <Box p={2} textAlign="end">
                <IconButton
                  aria-label="Copy Email"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => copyToClipboard(selectedId?.email)}
                />
              </Box>

              {/* Add other fields following the same pattern */}
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Əlaqə nömrəsi
                </Text>
              </Box>
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="medium">
                  {selectedId?.phoneNumber || noText}
                </Text>
              </Box>
              <Box p={2} textAlign="end">
                <IconButton
                  aria-label="Copy phonenumber"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => copyToClipboard(selectedId?.phoneNumber)}
                />
              </Box>

              {/* Passport nömrəsi */}
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Passport nömrəsi
                </Text>
              </Box>
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="medium">
                  {selectedId?.passportNo || noText}
                </Text>
              </Box>
              <Box p={2} textAlign="end">
                <IconButton
                  aria-label="Copy passportNo"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => copyToClipboard(selectedId?.passportNo)}
                />
              </Box>

              {/* FIN */}
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  FIN
                </Text>
              </Box>
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="medium">
                  {selectedId?.personalNo || noText}
                </Text>
              </Box>
              <Box p={2} textAlign="end">
                <IconButton
                  aria-label="Copy personalNo"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => copyToClipboard(selectedId?.personalNo)}
                />
              </Box>

              {/* Doğum tarixi */}
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Doğum tarixi
                </Text>
              </Box>
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="medium">
                  {selectedId?.dateOfBirth || noText}
                </Text>
              </Box>
              <Box p={2} textAlign="end">
                <IconButton
                  aria-label="Copy dateofBirth"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => copyToClipboard(selectedId?.dateOfBirth)}
                />
              </Box>

              {/* Ölkə kodu */}
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Ölkə kodu
                </Text>
              </Box>
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="medium">
                  {selectedId?.countryCode || noText}
                </Text>
              </Box>
              <Box p={2} textAlign="end">
                <IconButton
                  aria-label="Copy countryCode"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => copyToClipboard(selectedId?.countryCode)}
                />
              </Box>

              {/* Milliyət */}
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Milliyət
                </Text>
              </Box>
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="medium">
                  {selectedId?.nationality || noText}
                </Text>
              </Box>
              <Box p={2} textAlign="end">
                <IconButton
                  aria-label="Copy nationality"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => copyToClipboard(selectedId?.nationality)}
                />
              </Box>

              {/* Cinsi */}
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Cinsi
                </Text>
              </Box>
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="medium">
                  {selectedId.gender === 1
                    ? 'Kişi'
                    : selectedId.gender === 2
                    ? 'Qadın'
                    : noText}
                </Text>
              </Box>
              <Box p={2} textAlign="end">
                <IconButton
                  aria-label="Copy gender"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() =>
                    copyToClipboard(
                      selectedId.gender === 1
                        ? 'Kişi'
                        : selectedId.gender === 2
                        ? 'Qadın'
                        : noText
                    )
                  }
                />
              </Box>

              {/* Passportun verilmə tarixi */}
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Passportun verilmə tarixi
                </Text>
              </Box>
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="medium">
                  {selectedId?.passportDateOfIssue || noText}
                </Text>
              </Box>
              <Box p={2} textAlign="end">
                <IconButton
                  aria-label="Copy passportDateOfIssue"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() =>
                    copyToClipboard(selectedId?.passportDateOfIssue)
                  }
                />
              </Box>

              {/* Passportun etibarlılıq müddəti */}
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Passportun etibarlılıq müddəti
                </Text>
              </Box>
              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="medium">
                  {selectedId?.passportDateOfExpiry || noText}
                </Text>
              </Box>
              <Box p={2} textAlign="end">
                <IconButton
                  aria-label="Copy passportDateOfExpire"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() =>
                    copyToClipboard(selectedId?.passportDateOfExpiry)
                  }
                />
              </Box>

              <Box p={2} textAlign="start">
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Müraciətçi yetkinlik yaşına çatmış şəxsdir?
                </Text>
              </Box>
              <Box p={2} textAlign="start">
                <Text fontWeight="medium">
                  {selectedId.isAdult === true
                    ? 'Bəli'
                    : selectedId.isAdult === false
                    ? 'Xeyr'
                    : noText}
                </Text>
              </Box>
              <Box p={2} textAlign="end">
                <IconButton
                  aria-label="Copy isAdult"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() =>
                    copyToClipboard(
                      selectedId.isAdult === true
                        ? 'Bəli'
                        : selectedId.isAdult === false
                        ? 'Xeyr'
                        : noText
                    )
                  }
                />
              </Box>
            </SimpleGrid>

            {/* !selectedId?.isAdult */}
            {!selectedId?.isAdult ? (
              <div>
                <Heading marginTop={3} as="h2" size="md">
                  Nümayəndə haqqında məlumat:
                </Heading>

                <SimpleGrid columns={3} spacing={1} py={2}>
                  <Box borderRadius={'base'} p={2}>
                    <Text fontSize="md" fontWeight="semibold" color="gray.600">
                      Adı
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontSize="md" fontWeight="medium">
                      {selectedId?.representative?.firstname || noText}
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} p={2} textAlign="end">
                    <IconButton
                      aria-label="Copy firstname"
                      icon={<FaCopy />}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() =>
                        copyToClipboard(
                          selectedId?.representative?.firstname ?? noText
                        )
                      }
                    />
                  </Box>
                  <Box borderRadius={'base'} p={2}>
                    <Text fontSize="md" fontWeight="semibold" color="gray.600">
                      Soyadı
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontSize="md" fontWeight="medium">
                      {selectedId?.representative?.lastname || noText}
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} p={2} textAlign="end">
                    <IconButton
                      aria-label="Copy lastname"
                      icon={<FaCopy />}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() =>
                        copyToClipboard(
                          selectedId?.representative?.lastname ?? noText
                        )
                      }
                    />
                  </Box>
                  <Box borderRadius={'base'} p={2}>
                    <Text fontSize="md" fontWeight="semibold" color="gray.600">
                      Elektron poçt ünvanı
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontSize="md" fontWeight="medium">
                      {selectedId?.representative?.email || noText}
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} p={2} textAlign="end">
                    <IconButton
                      aria-label="Copy email"
                      icon={<FaCopy />}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() =>
                        copyToClipboard(
                          selectedId?.representative?.email ?? noText
                        )
                      }
                    />
                  </Box>
                  <Box borderRadius={'base'} p={2}>
                    <Text fontSize="md" fontWeight="semibold" color="gray.600">
                      Əlaqə nömrəsi
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontSize="md" fontWeight="medium">
                      {selectedId?.representative?.phoneNumber || noText}
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} p={2} textAlign="end">
                    <IconButton
                      aria-label="Copy phoneNumber"
                      icon={<FaCopy />}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() =>
                        copyToClipboard(
                          selectedId?.representative?.phoneNumber ?? noText
                        )
                      }
                    />
                  </Box>
                  <Box borderRadius={'base'} p={2}>
                    <Text fontSize="md" fontWeight="semibold" color="gray.600">
                      Ünvanı
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontSize="md" fontWeight="medium">
                      {selectedId?.representative?.address || noText}
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} p={2} textAlign="end">
                    <IconButton
                      aria-label="Copy address"
                      icon={<FaCopy />}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() =>
                        copyToClipboard(
                          selectedId?.representative?.address ?? noText
                        )
                      }
                    />
                  </Box>
                </SimpleGrid>
              </div>
            ) : null}

            <SimpleGrid columns={3} spacing={1} py={2}>
              <Box borderRadius={'base'} p={2}>
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Avropa vətəndaşı olan qohumunuz var?
                </Text>
              </Box>
              <Box p={2} textAlign="start">
                <Text fontWeight="medium">
                  {selectedId.hasEuropeanFamilyMember === true
                    ? 'Bəli'
                    : selectedId.hasEuropeanFamilyMember === false
                    ? 'Xeyr'
                    : noText}
                </Text>
              </Box>
              <Box borderRadius={'base'} p={2} textAlign="end">
                <IconButton
                  aria-label="Copy hasEuropeanFamilyMember"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() =>
                    copyToClipboard(
                      selectedId.hasEuropeanFamilyMember === true
                        ? 'Bəli'
                        : selectedId.hasEuropeanFamilyMember === false
                        ? 'Xeyr'
                        : noText
                    )
                  }
                />
              </Box>
            </SimpleGrid>
            {/* selectedId?.hasEuropeanFamilyMember ? */}
            {selectedId?.hasEuropeanFamilyMember ? (
              <div>
                {' '}
                <Heading marginTop={3} as="h2" size="md">
                  Avropa vətəndaşı olan qohum haqqında məlumat:
                </Heading>
                <SimpleGrid columns={3} spacing={1} py={2}>
                  <Box borderRadius={'base'} p={2}>
                    <Text fontSize="md" fontWeight="semibold" color="gray.600">
                      Digər ölkə vətəşdaşlığı məlumatı
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontSize="md" fontWeight="medium">
                      {selectedId?.otherCountryResidenceInformation || noText}
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} p={2} textAlign="end">
                    <IconButton
                      aria-label="Copy otherCountryResidenceInformation"
                      icon={<FaCopy />}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() =>
                        copyToClipboard(
                          selectedId?.otherCountryResidenceInformation
                        )
                      }
                    />
                  </Box>
                  <Box borderRadius={'base'} p={2}>
                    <Text fontSize="md" fontWeight="semibold" color="gray.600">
                      Adı
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontSize="md" fontWeight="medium">
                      {selectedId?.europeanFamilyMember?.firstname || noText}
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} p={2} textAlign="end">
                    <IconButton
                      aria-label="Copy firstname"
                      icon={<FaCopy />}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() =>
                        copyToClipboard(
                          selectedId?.europeanFamilyMember?.firstname
                        )
                      }
                    />
                  </Box>
                  <Box borderRadius={'base'} p={2}>
                    <Text fontSize="md" fontWeight="semibold" color="gray.600">
                      Soyadı
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontSize="md" fontWeight="medium">
                      {selectedId?.europeanFamilyMember?.lastname || noText}
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} p={2} textAlign="end">
                    <IconButton
                      aria-label="Copy lastname"
                      icon={<FaCopy />}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() =>
                        copyToClipboard(
                          selectedId?.europeanFamilyMember?.lastname
                        )
                      }
                    />
                  </Box>
                </SimpleGrid>
                <SimpleGrid columns={3} spacing={1} py={2}>
                  <Box borderRadius={'base'} p={2}>
                    <Text fontSize="md" fontWeight="semibold" color="gray.600">
                      Passport faylı
                    </Text>
                  </Box>
                  <Box borderRadius={'base'} textAlign="start" p={2}>
                    <Text fontSize="md" fontWeight="medium">
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
                              <Tooltip
                                hasArrow
                                placement="top-end"
                                label={item?.uri}
                              >
                                <Text
                                  as="p"
                                  cursor="pointer"
                                  color="blue.500"
                                  whiteSpace="nowrap"
                                  overflow="hidden"
                                  textOverflow="ellipsis"
                                  maxWidth="150px"
                                  onClick={() => downloadFile(item?.uri)}
                                >
                                  {truncateText(item?.uri)}
                                </Text>
                              </Tooltip>
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
        <Button mr={3} variant="outline" onClick={onClose}>
          {closeBtn}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default VisaDetailedViewModal;
