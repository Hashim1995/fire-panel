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
  inputValidationText,
  selectPlaceholderText
} from '@/utils/constants/texts';

import { Select } from 'chakra-react-select';
import { roleOptions } from '@/utils/constants/options';
import { UsersServies } from '@/services/user-services/user-services';
import { AxiosError } from 'axios';
import { IUserItem } from '@/models/users';

interface IUserEditModal extends modalClose {
  selectedItem: IUserItem | null;
}
function UserEditModal({
  onClose,
  setRefreshComponent,
  selectedItem
}: IUserEditModal) {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting }
  } = useForm<IUserItem>({
    mode: 'onChange',
    defaultValues: {
      firstname: selectedItem?.firstname,
      lastname: selectedItem?.lastname,
      phoneNumber: selectedItem?.phoneNumber,
      email: selectedItem?.email,
      role: roleOptions?.find((z: any) => z?.label === selectedItem?.role)
    }
  });

  const toast = useToast();

  const onSubmit: SubmitHandler<IUserItem> = async (
    data: IUserItem
  ): Promise<void> => {
    const payload = {
      email: data?.email,
      firstname: data?.firstname,
      lastname: data?.lastname,
      phoneNumber: data?.phoneNumber,
      role: data?.role?.value,
      id: selectedItem?.id || ''
    };
    try {
      const res = await UsersServies.getInstance().updateUser(payload);
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
                name="role"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Rol')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.role)}
                    id="role"
                    isRequired
                  >
                    <FormLabel fontSize="sm" mb={1}>
                      Rol
                    </FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      // @ts-ignore
                      label={errors.role ? errors.role.message : ''}
                    >
                      <div>
                        <Select
                          onChange={onChange}
                          value={value}
                          options={roleOptions}
                          placeholder={selectPlaceholderText('Rol')}
                        />
                      </div>
                    </Tooltip>
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name="firstname"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Ad')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.firstname)}
                    isRequired
                    id="firstname"
                  >
                    <FormLabel fontSize="sm" mb={1}>
                      Ad
                    </FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={errors.firstname ? errors.firstname.message : ''}
                    >
                      <Input
                        onChange={onChange}
                        value={value}
                        type="text"
                        placeholder={inputPlaceholderText('Ad')}
                      />
                    </Tooltip>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="lastname"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Soyad')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.lastname)}
                    id="lastname"
                    isRequired
                  >
                    <FormLabel fontSize="sm" mb={1}>
                      Soyad
                    </FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={errors.lastname ? errors.lastname.message : ''}
                    >
                      <Input
                        onChange={onChange}
                        value={value}
                        type="text"
                        placeholder={inputPlaceholderText('Soyad')}
                      />
                    </Tooltip>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="email"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Email')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.email)}
                    id="email"
                    isRequired
                  >
                    <FormLabel fontSize="sm" mb={1}>
                      Email
                    </FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={errors.email ? errors.email.message : ''}
                    >
                      <Input
                        onChange={onChange}
                        value={value}
                        type="text"
                        placeholder={inputPlaceholderText('Email')}
                      />
                    </Tooltip>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="phoneNumber"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Telefon')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.phoneNumber)}
                    id="phoneNumber"
                    isRequired
                  >
                    <FormLabel fontSize="sm" mb={1}>
                      Telefon
                    </FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={
                        errors.phoneNumber ? errors.phoneNumber.message : ''
                      }
                    >
                      <Input
                        onChange={onChange}
                        value={value}
                        type="text"
                        placeholder={inputPlaceholderText('Telefon')}
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
        <Button mr={3} variant="gray" onClick={onClose}>
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

export default UserEditModal;
