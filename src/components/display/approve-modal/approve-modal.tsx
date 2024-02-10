import { modalClose } from '@/models/common';
import { closeBtn } from '@/utils/constants/texts';
import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Heading,
  Text,
  Box
} from '@chakra-ui/react';
import { FiAlertCircle } from 'react-icons/fi';

interface IApproveModal extends modalClose {
  modalTitle?: string;
  header?: string;
  text?: string;
  event: () => void;
  eventText?: string;
  approveModalButtonLoading?: boolean;
}

function ApproveModal({
  modalTitle,
  onClose,
  eventText,
  approveModalButtonLoading,
  header,
  text,
  event
}: IApproveModal) {
  return (
    <ModalContent>
      <ModalHeader>{modalTitle ?? 'Təsdiq'}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex>
          <Box mr={5}>
            <FiAlertCircle
              color="blue.500"
              className="sidebar-item-icon"
              fontSize={90}
            />
          </Box>
          <Box>
            <Heading size="lg">
              {header ??
                'Əməliyyat təsdiqlənəcək, davam etmək istədiyinizə əminsinizmi?'}
            </Heading>
            <Text>{text ?? 'Məlumatlar təsdiqlənəcək!'}</Text>
          </Box>
        </Flex>
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          {closeBtn}
        </Button>
        <Button
          type="button"
          isDisabled={approveModalButtonLoading}
          isLoading={approveModalButtonLoading}
          onClick={event}
        >
          {eventText ?? 'Təsdiqlə'}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default ApproveModal;
