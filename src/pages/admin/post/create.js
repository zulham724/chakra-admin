import {
    Container,
    Flex,
    Box,
    Text,
    Input,
    Button,
    Select
} from '@chakra-ui/react'

import FilePicker from 'chakra-ui-file-picker'

import Card from 'components/card/Card'

import AdminLayout from 'layouts/admin'

import React from 'react'

import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import Swal from 'sweetalert2'

import 'react-quill/dist/quill.snow.css';

import { useForm } from 'react-hook-form';

import api from 'services/api'

import { useRouter } from 'next/router'

export default function Page() {

    const router = useRouter()

    // const [file, setFile] = React.useState(null)

    // const [body, setBody] = React.useState("")

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    register('body',{required: true})
    register('file',{required: true})

    const body = watch('body')
    const file = watch('file')

    React.useEffect(()=>{
        handleSubmit()
    },[body,file])

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];

    const onSubmit = async (data) => {
        const {title, excerpt, status, body, file} = data
        // return console.log(data, errors)
        
        Swal.fire({
            title: 'Loading',
            didOpen: () => {
                Swal.showLoading()
            }
        })

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('body', body);
            formData.append('excerpt', excerpt);
            formData.append('status', status);
            file ? formData.append('image', file) : null

            console.log(formData)

            const { data } = await api.post(`/api/admin/post`, formData)

            await Swal.fire({
                title: 'Success',
                text: 'Artikel berhasil dibuat',
                icon: 'success',
            });

            router.push('/admin/post')

        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Oops',
                text: error.response?.data?.message,
                icon: 'error',
                timer: 2000,
            });
        }
    }

    return (
        <AdminLayout>
            <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
                <Card
                    flexDirection='column'
                    w='100%'
                    p={'24px'}
                    overflowX={{ sm: 'scroll', lg: 'hidden' }}
                >
                    <Flex>
                        <Text>Buat Post Baru </Text>
                    </Flex>
                    <Box py="24px">
                        <Flex py="12px"
                            flexDirection="column"
                        >
                            <Input placeholder="Judul"
                                {...register('title',{required:true})}
                            />
                            {errors.title && <Text color="red">Harus diisi.</Text>}
                        </Flex>
                        <Flex py="12px" flexDirection="column">
                            <Input placeholder="Singkat"
                                {...register('excerpt',{required:true})}
                            />
                            {errors.excerpt && <Text color="red">Harus diisi.</Text>}
                        </Flex>
                        <Flex py="12px" flexDirection="column">
                            <Select placeholder='Status'
                                {...register('status',{required:true})}
                            >
                                <option value='PUBLISHED'>PUBLISHED</option>
                                <option value='DRAFT'>DRAFT</option>
                            </Select>
                            {errors.status && <Text color="red">Harus diisi.</Text>}
                        </Flex>
                        <Flex py="12px" flexDirection="column">
                            <FilePicker
                                onFileChange={(fileList) => {
                                    setValue('file',fileList[0])
                                }}
                                value={file}
                                placeholder="Thumbnail"
                                clearButtonLabel="Clear"
                                multipleFiles={false}
                                // accept="application/json"
                                hideClearButton={false}

                            // ref = { myRef }
                            />  
                            {errors.file && <Text color="red">Harus diisi.</Text>}
                        </Flex>
                        <Flex py="12px" flexDirection="column">
                            <ReactQuill modules={modules}
                                formats={formats} theme="snow" 
                                value={body} 
                                onChange={value => {
                                    setValue('body',value)
                                }} 
                                />
                                {errors.body && <Text color="red">Harus diisi.</Text>}
                        </Flex>
                        <Flex mt="48px" justifyContent="flex-end">
                            <Button
                                onClick={
                                    handleSubmit(data=>onSubmit(data))
                                }
                                colorScheme="purple"
                            >
                                Simpan
                            </Button>
                        </Flex>
                    </Box>
                </Card>
            </Box>
        </AdminLayout>
    )
}