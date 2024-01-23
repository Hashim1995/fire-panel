/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
import { IGlobalResponse, modalClose } from '@/models/common';
import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Input
} from '@chakra-ui/react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { closeBtn, inputPlaceholderText } from '@/utils/constants/texts';
import { useEffect } from 'react';
import { IPopularList, IPopularUptade } from '@/models/populars';
import { PopularService } from '@/services/popular-services/popular-services';

interface ICategoryEditModal extends modalClose {
  selectedItem: IPopularList | undefined;
}
function PopularEditModal({
  onClose,
  setRefreshComponent,
  selectedItem
}: ICategoryEditModal) {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
    setValue
  } = useForm<IPopularUptade>({
    mode: 'onChange',
    defaultValues: {
      id: selectedItem?.id,
      oldPrice: ''
    }
  });

  const onSubmit: SubmitHandler<IPopularUptade> = async (
    data: IPopularUptade
  ): Promise<void> => {
    const body: IPopularUptade = {
      id: selectedItem?.id,
      oldPrice: Number(data?.oldPrice) || ''
    };
    if (selectedItem?.id) {
      const res: IGlobalResponse =
        await PopularService.getInstance().oldPriceUptade(body);
      if (res?.succeeded) {
        onClose && onClose();
        setRefreshComponent && setRefreshComponent((prev: boolean) => !prev);
      }
    }
  };

  useEffect(() => {
    if (selectedItem?.oldPrice) {
      setValue('oldPrice', selectedItem?.oldPrice);
    }
  }, []);

  return (
    <ModalContent>
      <ModalHeader>MƏLUMATA DÜZƏLİŞ EDİLMƏSİ</ModalHeader>

      <ModalCloseButton />
      <ModalBody>
        <Box>
          <form
            noValidate
            id="category-edit-modal-submit-btn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={4}>
              <Controller
                control={control}
                name="oldPrice"
                render={({ field: { onChange, value } }) => (
                  <FormControl id="oldPrice">
                    <FormLabel>Köhnə qiymət</FormLabel>
                    <Input
                      onChange={onChange}
                      value={value || ''}
                      type="text"
                      placeholder={inputPlaceholderText('Köhnə qiymət')}
                    />
                  </FormControl>
                )}
              />
            </Stack>
          </form>
        </Box>
      </ModalBody>

      <ModalFooter>
        <Button mr={3} variant="gray" onClick={onClose}>
          {closeBtn}
        </Button>
        <Button
          form="category-edit-modal-submit-btn"
          type="submit"
          isDisabled={!isValid}
          isLoading={isSubmitting}
        >
          Düzəliş
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default PopularEditModal;
