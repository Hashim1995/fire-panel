/* eslint-disable no-plusplus */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-expressions */
// import Uploader from '@/components/forms/uploader/uploader';
import { ElevenService } from '@/services/web-services/web-services-eleven';
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
  Tooltip,
  Container,
  Image
} from '@chakra-ui/react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import JoditEditor from 'jodit-react';

import {
  addBtn,
  closeBtn,
  editBtn,
  inputPlaceholderText,
  inputValidationText,
  selectPlaceholderText
} from '@/utils/constants/texts';
import { Editor } from 'react-draft-wysiwyg';
import { Select } from 'chakra-react-select';
import { languageOptions } from '@/utils/constants/options';
import { AxiosError } from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import ChakraTagInput from '@/components/forms/chakraTagInput';
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import DatePicker from '@/components/forms/date-picker/date-picker';
import Uploader from '@/components/forms/uploader/uploader';
import { format, parseISO } from 'date-fns';

import { BlogServices } from '@/services/blog-services/blog-service';
import { IBlogCreate, IBlogItem, IBlogUpdate } from '../models';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface IBlogEditModal extends modalClose {
  selectedItem: IBlogItem | undefined;
}

function BlogEditModal({
  onClose,
  setRefreshComponent,
  selectedItem
}: IBlogEditModal) {
  // const [photo, setPhoto] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);

  const {
    handleSubmit,
    setValue,
    control,
    setError,
    watch,
    formState: { errors, isValid, isSubmitting, isDirty }
  } = useForm<IBlogUpdate>({
    mode: 'onChange'
  });
  const [content, setContent] = useState<string>('');

  const toast = useToast();

  const onSubmit: SubmitHandler<IBlogUpdate> = async (
    data: IBlogUpdate
  ): Promise<void> => {
    // if (!photo) {
    //   toast({
    //     title: 'Şəkil daxil edilməsi məcburidir',
    //     status: 'error',
    //     position: 'top-right',
    //     duration: 3000,
    //     isClosable: true
    //   });
    //   return;
    // }
    if (content?.length < 50) {
      toast({
        title: 'Kontent ən azı 50 xarakter uzunluğunda olmalıdır',
        status: 'error',
        position: 'top-right',
        duration: 3000,
        isClosable: true
      });
      return;
    }

    const formData = new FormData();
    // photo && formData.append('Photo', photo);
    data?.Language && formData.append('Language', data?.Language?.value);
    data?.Title && formData.append('Title', data?.Title);
    for (let i = 0; i < tags.length; i++) {
      formData.append('Tags[]', tags[i]);
    }
    data?.DateOfPublish &&
      formData.append('DateOfPublish', data?.DateOfPublish);
    formData.append('Photo', photo || selectedItem?.imageUrl);
    formData.append('Description', content);
    formData.append('id', String(selectedItem?.id));
    // formData.append('Description', data?.Description);
    try {
      const res = await BlogServices.getInstance().update(formData);
      if (res.succeeded) {
        toast({
          title: 'Əməliyyat uğurla icra olundu',
          description: 'Bloq  uğurla əlavə edildi',
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
            description:
              'Bloq məlumatlarının əlavə edilməsi zamanı xəta baş verdi',
            status: 'error',
            position: 'top-right',
            duration: 3000,
            isClosable: true
          });
        }
      }
    }
  };

  const handleTagsChange = useCallback(
    (event: SyntheticEvent, tags: string[]) => {
      // @ts-ignore
      setTags(tags);
      if (tags?.length === 0) {
        setError('Tags', { message: 'Ən azı bir açar söz əlavə edilməlidi' });
      }
    },
    []
  );
  const editor = useRef(null);

  useEffect(() => {
    const parsedDate = parseISO(selectedItem?.dateOfPublish);
    const formatDate = format(parsedDate, 'yyyy-MM-dd');
    setTags(selectedItem?.tags || []);

    setContent(selectedItem?.description || '');

    setValue('Title', selectedItem?.title || '');
    setValue('DateOfPublish', formatDate);
  }, [selectedItem]);

  return (
    <ModalContent>
      <ModalHeader>MƏLUMATA DÜZƏLİŞ EDİLMƏSİ</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Box>
          <form
            noValidate
            id="category-add-modal-submit-btn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={4}>
              <Controller
                control={control}
                name="Tags"
                rules={{
                  required: {
                    value: Boolean(!tags?.length),
                    message: inputValidationText('Açar sözlər')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.Tags)}
                    id="Tags"
                    isRequired
                  >
                    <FormLabel fontSize="sm" mb={1}>
                      Açar sözlər
                    </FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={errors.Tags ? errors.Tags.message : ''}
                    >
                      <div>
                        <ChakraTagInput
                          value={value}
                          setValue={setValue}
                          tags={tags}
                          placeholder={inputPlaceholderText(' Açar sözlər')}
                          onChange={onChange}
                          onTagsChange={handleTagsChange}
                        />
                      </div>
                    </Tooltip>
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name="Title"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Başlıq')
                  }
                }}
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.Title)}
                    isRequired
                    id="Title"
                  >
                    <FormLabel fontSize="sm">Başlıq</FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      label={errors.Title ? errors.Title.message : ''}
                    >
                      <Input
                        onChange={onChange}
                        value={value}
                        type="text"
                        placeholder={inputPlaceholderText('Başlıq')}
                      />
                    </Tooltip>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="DateOfPublish"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText('Tarix')
                  }
                }}
                render={({ field: { onChange, value, ref } }) => (
                  <FormControl
                    isInvalid={Boolean(errors.DateOfPublish)}
                    isRequired
                    id="DateOfPublish"
                  >
                    <FormLabel fontSize="sm">Tarix</FormLabel>
                    <Tooltip
                      hasArrow
                      placement="top-end"
                      // @ts-ignore
                      label={
                        errors.DateOfPublish ? errors.DateOfPublish.message : ''
                      }
                    >
                      <Input
                        name="DateOfPublish"
                        type="date"
                        ref={ref}
                        placeholder="Tarix"
                        value={value}
                        onChange={onChange}
                      />
                    </Tooltip>
                  </FormControl>
                )}
              />
              <br />
              {/* <CKEditor
                config={
                  {
                    //   removePlugins: ['Image']
                  }
                }
                editor={ClassicEditor}
                onReady={editor => {
                  // You can store the "editor" and use when it is needed.
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={event => {
                  console.log(event);
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
              /> */}
              <JoditEditor
                ref={editor}
                value={content}
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {}}
              />
              {/* <Editor
                toolbar={{
                  options: [
                    'inline',
                    'blockType',
                    'fontSize',
                    'fontFamily',
                    'list',
                    'textAlign',
                    'link',
                    'emoji'
                  ],
                  inline: {
                    options: ['bold', 'italic', 'underline']
                  },
                  list: { options: ['unordered', 'ordered'] },
                  link: { showOpenOptionOnHover: false }
                }}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              /> */}
            </Stack>
          </form>
        </Box>
        <Box mt={5}>
          <Uploader
            onChange={e => setPhoto(e[0])}
            limit={1}
            accept={['image/png', 'image/jpg', 'image/jpeg']}
          />
          {!photo && (
            <Box mt={5}>
              <Image
                border="1px solid black"
                h={300}
                w={300}
                mb={1}
                objectFit="contain"
                src={`${
                  import.meta.env.VITE_BASE_URL_IMG
                }${selectedItem?.imageUrl}`}
              />
            </Box>
          )}
        </Box>
      </ModalBody>

      <ModalFooter>
        <Button mr={3} variant="gray" onClick={onClose}>
          {closeBtn}
        </Button>
        <Button
          form="category-add-modal-submit-btn"
          type="submit"
          isDisabled={Object.keys(errors).length > 0}
          isLoading={isSubmitting}
        >
          {editBtn}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default BlogEditModal;
