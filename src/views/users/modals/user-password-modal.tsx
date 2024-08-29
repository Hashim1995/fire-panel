/* eslint-disable no-useless-escape */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
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
  Tooltip
} from '@chakra-ui/react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import {
  closeBtn,
  editBtn,
  inputPlaceholderText,
  inputValidationText
} from '@/utils/constants/texts';

import { UsersServies } from '@/services/user-services/user-services';
import { AxiosError } from 'axios';
import { IUserChangePassword, IUserItem } from '@/models/users';

interface IUserChangePasswordModal extends modalClose {
  selectedItem: IUserItem | null;
}
function UserChangePasswordModal({
  onClose,
  setRefreshComponent,
  selectedItem
}: IUserChangePasswordModal) {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting }
  } = useForm<IUserChangePassword>({
    mode: 'onChange'
  });

  const toast = useToast();

  const onSubmit: SubmitHandler<IUserChangePassword> = async (
    data: IUserChangePassword
  ): Promise<void> => {
    const payload = {
      password: data?.password,
      id: selectedItem?.id || ''
    };
    try {
      const res = await UsersServies.getInstance().changePassword(payload);
      if (res?.succeeded) {
        toast({
          title: 'Əməliyyat uğurla icra olundu',
          description: 'İstifadəçi məlumatları uğurla dəyişdirild',
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
        console.log(error.response?.data);

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
      <ModalHeader>MƏLUMATA DÜZƏLİŞ EDİLMƏSİ</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box>
          <form
            noValidate
            id="user-add-modal-submit-btn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={4}>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Şifrə')
                  },
                  minLength: {
                    value: 8,
                    message: 'Şifrə ən azı 8 simvol olmalıdır'
                  },
                  validate: {
                    RequireDigit: (value: any) =>
                      /[0-9]/.test(value) || 'Şifrəda ən azı 1 rəqəm olmalıdır',
                    RequireLowercase: (value: any) =>
                      /[a-z]/.test(value) ||
                      'Şifrədə ən az 1 kiçik hərf olmalıdır',
                    RequireUppercase: (value: any) =>
                      /[A-Z]/.test(value) ||
                      'Şifrədə ən az 1 böyük hərf olmalıdır',
                    RequireSpecialCharacter: (value: any) =>
                      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) ||
                      'Şifrədə ən az 1 xüsusi simvol  olmalıdır'
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.password)}
                    id="password"
                    isRequired
                  >
                    <FormLabel fontSize="sm" mb={1}>
                      Şifrə
                    </FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={errors.password ? errors.password.message : ''}
                    >
                      <Input
                        onChange={onChange}
                        value={value}
                        type="text"
                        placeholder={inputPlaceholderText('Şifrə')}
                      />
                    </Tooltip>
                  </FormControl>
                )}
              />
            </Stack>
          </form>
        </Box>
      </ModalBody>

      <ModalFooter>
        <Button mr={3} variant="outline" onClick={onClose}>
          {closeBtn}
        </Button>
        <Button
          form="user-add-modal-submit-btn"
          type="submit"
          isDisabled={!isValid}
          isLoading={isSubmitting}
        >
          {editBtn}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default UserChangePasswordModal;
