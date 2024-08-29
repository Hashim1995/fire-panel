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
  Stack,
  Text,
  Flex,
  Skeleton
} from '@chakra-ui/react';
import { IAppealItem } from '../models';

interface IAppealViewModal extends modalClose {
  selectedId: IAppealItem;
}
function AppealViewModal({ onClose, selectedId }: IAppealViewModal) {
  return (
    <ModalContent>
      <ModalHeader>MƏLUMATA BAXIŞ</ModalHeader>

      <ModalCloseButton />
      <ModalBody>
        {selectedId ? (
          <Flex>
            <Stack p={3} spacing={2} bg="#94bce4" minW="200px">
              <Text fontSize="sm">AD: </Text>
              <Text fontSize="sm">BAŞLIQ: </Text>
              <Text fontSize="sm">EMAİL: </Text>
              <Text fontSize="sm">TELEFON: </Text>
              <Text fontSize="sm">TARIX: </Text>
              <Text fontSize="sm">AÇIQLAMA: </Text>
            </Stack>
            <Stack ml={8} p={3} spacing={2}>
              <Text fontSize="sm">{selectedId?.fullname ?? noText}</Text>
              <Text fontSize="sm"> {selectedId?.title ?? noText}</Text>
              <Text fontSize="sm"> {selectedId?.email ?? noText}</Text>
              <Text fontSize="sm"> {selectedId?.phoneNumber ?? noText}</Text>
              <Text fontSize="sm"> {selectedId?.createdAt ?? noText}</Text>
              <Text fontSize="sm"> {selectedId?.description ?? noText}</Text>
            </Stack>
          </Flex>
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

export default AppealViewModal;
