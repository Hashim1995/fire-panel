/* eslint-disable no-nested-ternary */
import { modalClose } from '@/models/common';
import { IUserItem } from '@/models/users';
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
  Flex
} from '@chakra-ui/react';

interface IUsersViewModal extends modalClose {
  selectedItem: IUserItem | null;
}
function UsersViewModal({ onClose, selectedItem }: IUsersViewModal) {
  return (
    <ModalContent>
      <ModalHeader>MƏLUMATA BAXIŞ</ModalHeader>

      <ModalCloseButton />
      <ModalBody>
        <Flex>
          <Stack p={3} spacing={2} bg="#94bce4" minW="200px">
            <Text fontSize="sm">AD: </Text>
            <Text fontSize="sm">SOYAD: </Text>
            <Text fontSize="sm">TELEFON: </Text>
            <Text fontSize="sm">EMAİL: </Text>
          </Stack>
          <Stack ml={8} p={3} spacing={2}>
            <Text fontSize="sm">{selectedItem?.firstname ?? noText}</Text>
            <Text fontSize="sm"> {selectedItem?.lastname ?? noText}</Text>
            <Text fontSize="sm"> {selectedItem?.phoneNumber ?? noText}</Text>
            <Text fontSize="sm"> {selectedItem?.email ?? noText}</Text>
          </Stack>
        </Flex>
      </ModalBody>

      <ModalFooter>
        <Button mr={3} variant="outline" onClick={onClose}>
          {closeBtn}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default UsersViewModal;
