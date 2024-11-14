/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import { modalClose } from '@/models/common';

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
  Modal,
  ModalOverlay,
  useDisclosure,
  Badge,
  Wrap,
  WrapItem,
  IconButton,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import {
  IVisaApplicationItem,
  IVisaApplicant,
  IVisaExtraOption
} from '../models';
import {
  countriesStatic,
  getEnumLabel,
  VisaCategories,
  VisaLevels
} from '../options';
import VisaDetailedViewModal from './visa-detailed-view-modal';

interface IVisaViewModal extends modalClose {
  selectedId: IVisaApplicationItem;
}
function VisaViewModal({ onClose, selectedId }: IVisaViewModal) {
  const toast = useToast();

  const detailedViewModal = useDisclosure();
  const [selectedPerson, setSelectedPerson] = useState<IVisaApplicant>();

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
      <ModalHeader>MƏLUMATA BAXIŞ</ModalHeader>

      <ModalCloseButton />
      <ModalBody>
        {selectedId ? (
          <>
            <SimpleGrid columns={3} spacing={1} py={2}>
              <Box borderRadius={'base'} p={2}>
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Viza kateqoriyası
                </Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontSize="md" fontWeight="medium" color="gray.800">
                  {getEnumLabel(VisaCategories, 1) || noText}
                </Text>
              </Box>
              <Box borderRadius={'base'} p={2} textAlign="end">
                <IconButton
                  aria-label="Copy Visa Category"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() =>
                    copyToClipboard(getEnumLabel(VisaCategories, 1))
                  }
                />
              </Box>
              <Box borderRadius={'base'} p={2}>
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Giriş ediləcək ölkə
                </Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontSize="md" fontWeight="medium" color="gray.800">
                  {getEnumLabel(countriesStatic, selectedId?.entryCountry) ||
                    noText}
                </Text>
              </Box>
              <Box borderRadius={'base'} p={2} textAlign="end">
                <IconButton
                  aria-label="Copy Entry Country"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() =>
                    copyToClipboard(
                      getEnumLabel(countriesStatic, selectedId?.entryCountry)
                    )
                  }
                />
              </Box>
              <Box borderRadius={'base'} p={2}>
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Gediləcək ölkə
                </Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontSize="md" fontWeight="medium" color="gray.800">
                  {selectedId?.country?.title || noText}
                </Text>
              </Box>
              <Box borderRadius={'base'} p={2} textAlign="end">
                <IconButton
                  aria-label="Copy Departure Country"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => copyToClipboard(selectedId?.country?.title)}
                />
              </Box>
              <Box borderRadius={'base'} p={2}>
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Gediş tarixi
                </Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontSize="md" fontWeight="medium" color="gray.800">
                  {selectedId?.departureDate || noText}
                </Text>
              </Box>
              <Box borderRadius={'base'} p={2} textAlign="end">
                <IconButton
                  aria-label="Copy Departure Date"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => copyToClipboard(selectedId?.departureDate)}
                />
              </Box>
              <Box borderRadius={'base'} p={2}>
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Gediş tarixi
                </Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontSize="md" fontWeight="medium" color="gray.800">
                  {selectedId?.returnDate || noText}
                </Text>
              </Box>
              <Box borderRadius={'base'} p={2} textAlign="end">
                <IconButton
                  aria-label="Copy Return Date"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => copyToClipboard(selectedId?.returnDate)}
                />
              </Box>
              <Box borderRadius={'base'} p={2}>
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Viza Müraciətin statusu
                </Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontSize="md" fontWeight="medium" color="gray.800">
                  {getEnumLabel(VisaLevels, selectedId?.visaLevel) || noText}
                </Text>
              </Box>
              <Box borderRadius={'base'} p={2} textAlign="end">
                <IconButton
                  aria-label="Copy Visa Status"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() =>
                    copyToClipboard(
                      getEnumLabel(VisaLevels, selectedId?.visaLevel)
                    )
                  }
                />
              </Box>
              <Box borderRadius={'base'} p={2}>
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Müraciət edən şəxs
                </Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontSize="md" fontWeight="medium" color="gray.800">
                  {selectedId?.customer?.firstname
                    ? `${selectedId?.customer?.firstname} ${selectedId?.customer?.lastname}`
                    : noText}
                </Text>
              </Box>
              <Box borderRadius={'base'} p={2} textAlign="end">
                <IconButton
                  aria-label="Copy Applicant Name"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() =>
                    copyToClipboard(
                      `${selectedId?.customer?.firstname} ${selectedId?.customer?.lastname}`
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
                <Text fontSize="md" fontWeight="medium" color="gray.800">
                  {selectedId?.customer?.email || noText}
                </Text>
              </Box>
              <Box borderRadius={'base'} p={2} textAlign="end">
                <IconButton
                  aria-label="Copy Email"
                  icon={<FaCopy />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => copyToClipboard(selectedId?.customer?.email)}
                />
              </Box>
              <Box borderRadius={'base'} p={2}>
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Müştəri tərəfindən ödənilən
                </Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontSize="md" fontWeight="medium" color="gray.800">
                  {selectedId?.totalAmount
                    ? `${selectedId?.totalAmount} AZN`
                    : 'Ödəniş olunmayıb'}
                </Text>
              </Box>
              <Box borderRadius={'base'} p={2} textAlign="end">
                {selectedId?.totalAmount && (
                  <IconButton
                    aria-label="Copy totalAmount"
                    icon={<FaCopy />}
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() =>
                      copyToClipboard(String(selectedId?.totalAmount))
                    }
                  />
                )}
              </Box>
              <Box borderRadius={'base'} p={2}>
                <Text fontSize="md" fontWeight="semibold" color="gray.600">
                  Geri qaytarılmış məbləğ
                </Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontSize="md" fontWeight="medium" color="gray.800">
                  {selectedId?.refundAmount
                    ? `${selectedId?.refundAmount} AZN`
                    : noText}
                </Text>
              </Box>
              <Box borderRadius={'base'} p={2} textAlign="end">
                {selectedId?.refundAmount && (
                  <IconButton
                    aria-label="Copy refundAmount"
                    icon={<FaCopy />}
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() =>
                      copyToClipboard(String(selectedId?.refundAmount))
                    }
                  />
                )}
              </Box>
            </SimpleGrid>
            {selectedId?.extraOptions?.length ? (
              <SimpleGrid columns={3} spacing={1} py={2}>
                <Box borderRadius={'base'} p={2}>
                  <Text fontSize="md" fontWeight="semibold" color="gray.600">
                    Əlavə xidmətlər
                  </Text>
                </Box>
                <Box borderRadius={'base'} textAlign="start" p={2}>
                  <Wrap>
                    {selectedId?.extraOptions?.map((z: IVisaExtraOption) => (
                      <WrapItem key={z?.id}>
                        <Badge>{z?.title || noText}</Badge>
                      </WrapItem>
                    ))}
                  </Wrap>
                </Box>
              </SimpleGrid>
            ) : null}

            <br />
            {selectedId?.visaApplicants?.length ? (
              <>
                <Heading as="h4" pb={2} size="md">
                  Müraciətçilər - ({selectedId?.visaApplicants?.length})
                </Heading>
                <TableContainer>
                  <Table size="sm" variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Adı</Th>
                        <Th>Soyadı</Th>
                        <Th>Email</Th>
                        <Th>Telefon Nömrəsi</Th>
                        <Th>Pasport no</Th>
                        <Th>FİN</Th>
                        <Th>Doğum Tarixi</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selectedId?.visaApplicants?.map(item => (
                        <Tr
                          onClick={() => {
                            setSelectedPerson(item);
                            detailedViewModal.onOpen();
                          }}
                          cursor="pointer"
                          key={item.id}
                        >
                          <Td>{item.firstname}</Td>
                          <Td>{item.lastname}</Td>
                          <Td>{item.email}</Td>
                          <Td>{item.phoneNumber}</Td>
                          <Td>{item.passportNo}</Td>
                          <Td>{item.personalNo}</Td>
                          <Td>{item.dateOfBirth}</Td>
                          {/* 
                          <Td>{item.countryCode}</Td>
                          <Td>{item.nationality}</Td>
                          <Td>{item.gender === 1 ? 'Kişi' : 'Qadın'}</Td>
                          <Td>{item.passportDateOfIssue}</Td>
                          <Td>{item.passportDateOfExpiry}</Td>
                          <Td>{item.isAdult ? 'Bəli' : 'Xeyr'}</Td>
                          <Td>
                            {item.hasEuropeanFamilyMember ? 'Bəli' : 'Xeyr'}
                          </Td>
                          <Td>{item.otherCountryResidenceInformation}</Td>
                          <Td>{item.representative?.firstname || '-'}</Td>
                          <Td>{item.representative?.lastname || '-'}</Td>
                          <Td>{item.representative?.email || '-'}</Td>
                          <Td>{item.representative?.phoneNumber || '-'}</Td>
                          <Td>{item.representative?.address || '-'}</Td>
                          <Td>{item.europeanFamilyMember?.firstname || '-'}</Td>
                          <Td>{item.europeanFamilyMember?.lastname || '-'}</Td>
                          <Td>
                            {item.europeanFamilyMember?.passportUri ? (
                              <a
                                href={item.europeanFamilyMember.passportUri}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Pasport Linki
                              </a>
                            ) : (
                              '-'
                            )}
                          </Td> */}
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

      <Modal
        scrollBehavior="inside"
        isOpen={detailedViewModal.isOpen}
        size="6xl"
        isCentered
        onClose={detailedViewModal.onClose}
      >
        <ModalOverlay />
        <VisaDetailedViewModal
          onClose={detailedViewModal.onClose}
          selectedId={selectedPerson!}
        />
      </Modal>
    </ModalContent>
  );
}

export default VisaViewModal;
