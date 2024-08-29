/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
import { modalClose } from '@/models/common';

import { closeBtn, noText } from '@/utils/constants/texts';
import { IVisaExtraOption } from '@/views/visa/models';
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
  Wrap,
  WrapItem,
  Badge
} from '@chakra-ui/react';
import { useState } from 'react';
import { IVisaApplicationItem, IVisaApplicant } from '../models';
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
  const detailedViewModal = useDisclosure();
  const [selectedPerson, setSelectedPerson] = useState<IVisaApplicant>();

  return (
    <ModalContent>
      <ModalHeader>MƏLUMATA BAXIŞ</ModalHeader>

      <ModalCloseButton />
      <ModalBody>
        {selectedId ? (
          <>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box bg={'Highlight'} borderRadius={'base'} p={2}>
                <Text fontWeight="italic">Viza kateqoriyası</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {getEnumLabel(VisaCategories, 1) || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box p={2} bg={'Highlight'} borderRadius={'base'}>
                <Text fontWeight="italic">Giriş ediləcək ölkə</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {getEnumLabel(countriesStatic, selectedId?.entryCountry) ||
                    noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box p={2} bg={'Highlight'} borderRadius={'base'}>
                <Text fontWeight="italic">Gediləcək ölkə</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.country?.title || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box p={2} bg={'Highlight'} borderRadius={'base'}>
                <Text fontWeight="italic">Gediş tarixi</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.departureDate || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box p={2} bg={'Highlight'} borderRadius={'base'}>
                <Text fontWeight="italic">Gediş tarixi</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.returnDate || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box p={2} bg={'Highlight'} borderRadius={'base'}>
                <Text fontWeight="italic">Müraciətin statusu</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {getEnumLabel(VisaLevels, selectedId?.visaLevel) || noText}
                </Text>
              </Box>
            </SimpleGrid>

            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box p={2} bg={'Highlight'} borderRadius={'base'}>
                <Text fontWeight="italic">Müraciət edən şəxs</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.customer?.firstname
                    ? `${selectedId?.customer?.firstname} ${selectedId?.customer?.lastname}`
                    : noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box p={2} bg={'Highlight'} borderRadius={'base'}>
                <Text fontWeight="italic">Elektron poçt ünvanı</Text>
              </Box>
              <Box borderRadius={'base'} textAlign="start" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.customer?.email || noText}
                </Text>
              </Box>
            </SimpleGrid>
            {selectedId?.extraOptions?.length ? (
              <SimpleGrid columns={2} spacing={1} py={2}>
                <Box p={2} bg={'Highlight'} borderRadius={'base'}>
                  <Text fontWeight="italic">Əlavə xidmətlər</Text>
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
