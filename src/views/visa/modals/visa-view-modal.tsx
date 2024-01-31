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
  Heading
} from '@chakra-ui/react';
import { IVisaApplicationItem } from '../models';
import {
  countriesStatic,
  getEnumLabel,
  VisaCategories,
  VisaLevels,
  VisaStatuses
} from '../options';

interface IVisaViewModal extends modalClose {
  selectedId: IVisaApplicationItem;
}
function VisaViewModal({ onClose, selectedId }: IVisaViewModal) {
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
              <Box bg={'Highlight'} borderRadius={'base'} textAlign="end" p={2}>
                <Text fontWeight="medium">
                  {getEnumLabel(VisaCategories, 3) || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box p={2} bg={'Highlight'} borderRadius={'base'}>
                <Text fontWeight="italic">Giriş ediləcək ölkə</Text>
              </Box>
              <Box bg={'Highlight'} borderRadius={'base'} textAlign="end" p={2}>
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
              <Box bg={'Highlight'} borderRadius={'base'} textAlign="end" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.country?.title || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box p={2} bg={'Highlight'} borderRadius={'base'}>
                <Text fontWeight="italic">Gediş tarixi</Text>
              </Box>
              <Box bg={'Highlight'} borderRadius={'base'} textAlign="end" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.departureDate || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box p={2} bg={'Highlight'} borderRadius={'base'}>
                <Text fontWeight="italic">Gediş tarixi</Text>
              </Box>
              <Box bg={'Highlight'} borderRadius={'base'} textAlign="end" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.returnDate || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box p={2} bg={'Highlight'} borderRadius={'base'}>
                <Text fontWeight="italic">Viza mərhələ statusu</Text>
              </Box>
              <Box bg={'Highlight'} borderRadius={'base'} textAlign="end" p={2}>
                <Text fontWeight="medium">
                  {getEnumLabel(VisaLevels, selectedId?.visaLevel) || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box p={2} bg={'Highlight'} borderRadius={'base'}>
                <Text fontWeight="italic">Viza statusu</Text>
              </Box>
              <Box bg={'Highlight'} borderRadius={'base'} textAlign="end" p={2}>
                <Text fontWeight="medium">
                  {getEnumLabel(VisaStatuses, selectedId?.visaStatus) || noText}
                </Text>
              </Box>
            </SimpleGrid>

            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box p={2} bg={'Highlight'} borderRadius={'base'}>
                <Text fontWeight="italic">Müraciət edən şəxs</Text>
              </Box>
              <Box bg={'Highlight'} borderRadius={'base'} textAlign="end" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.customer?.firstname
                    ? `${selectedId?.customer?.firstname} ${selectedId?.customer?.lastname}`
                    : noText}
                </Text>
              </Box>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={1} py={2}>
              <Box p={2} bg={'Highlight'} borderRadius={'base'}>
                <Text fontWeight="italic">Müraciət edən şəxs email</Text>
              </Box>
              <Box bg={'Highlight'} borderRadius={'base'} textAlign="end" p={2}>
                <Text fontWeight="medium">
                  {selectedId?.customer?.email || noText}
                </Text>
              </Box>
            </SimpleGrid>
            <br />
            {selectedId?.visaApplicants?.length ? (
              <>
                <Heading as="h4" pb={2} size="md">
                  Müraciətçilər - {selectedId?.visaApplicants?.length}
                </Heading>
                <TableContainer>
                  <Table size="md" variant="striped">
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Adı</Th>
                        <Th>Soyadı</Th>
                        <Th>Email</Th>
                        <Th>Telefon Nömrəsi</Th>
                        <Th>Ölkə Kodu</Th>
                        <Th>Milliyyəti</Th>
                        <Th>Doğum Tarixi</Th>
                        <Th>Şəxsi Nömrə</Th>
                        <Th>Cinsi</Th>
                        <Th>Pasport Nömrəsi</Th>
                        <Th>Pasportun Verilmə Tarixi</Th>
                        <Th>Pasportun Bitmə Tarixi</Th>
                        <Th>Yetkinlik Statusu</Th>
                        <Th>Avropa Ailə Üzvü</Th>
                        <Th>Qeydiyyat Məlumatı</Th>
                        {/* Add headers for representative and europeanFamilyMember */}
                        <Th>Himayədar Adı</Th>
                        <Th>Himayədar Soyadı</Th>
                        <Th>Himayədar Email</Th>
                        <Th>Himayədar Telefon Nömrəsi</Th>
                        <Th>Himayədar Ünvanı</Th>
                        <Th>Avropa Ailə Üzvü Adı</Th>
                        <Th>Avropa Ailə Üzvü Soyadı</Th>
                        <Th>Avropa Ailə Üzvü Pasport URL</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {selectedId?.visaApplicants?.map(item => (
                        <Tr key={item.id}>
                          <Td>{item.id}</Td>
                          <Td>{item.firstname}</Td>
                          <Td>{item.lastname}</Td>
                          <Td>{item.email}</Td>
                          <Td>{item.phoneNumber}</Td>
                          <Td>{item.countryCode}</Td>
                          <Td>{item.nationality}</Td>
                          <Td>{item.dateOfBirth}</Td>
                          <Td>{item.personalNo}</Td>
                          <Td>{item.gender === 1 ? 'Kişi' : 'Qadın'}</Td>
                          <Td>{item.passportNo}</Td>
                          <Td>{item.passportDateOfIssue}</Td>
                          <Td>{item.passportDateOfExpiry}</Td>
                          <Td>{item.isAdult ? 'Bəli' : 'Xeyr'}</Td>
                          <Td>
                            {item.hasEuropeanFamilyMember ? 'Bəli' : 'Xeyr'}
                          </Td>
                          <Td>{item.otherCountryResidenceInformation}</Td>
                          {/* Add columns for representative */}
                          <Td>{item.representative?.firstname || '-'}</Td>
                          <Td>{item.representative?.lastname || '-'}</Td>
                          <Td>{item.representative?.email || '-'}</Td>
                          <Td>{item.representative?.phoneNumber || '-'}</Td>
                          <Td>{item.representative?.address || '-'}</Td>
                          {/* Add columns for europeanFamilyMember */}
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

export default VisaViewModal;
