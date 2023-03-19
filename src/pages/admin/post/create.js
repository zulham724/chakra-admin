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

export default function Page() {

    const [post, setPost] = React.useState({
        title: '',
        excerpt: '',
        body: '',
        status: ''
    })

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

    const onSubmit = async () => {
        Swal.fire({
        title: 'Loading',
        didOpen: () => {
            Swal.showLoading()
        }
        })

        try {
        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('body', post.body);
        formData.append('excerpt', post.excerpt);
        formData.append('status', post.status);
        post.image ? formData.append('image', post.image[0]) : null

        console.log(formData,post)

        const { data } = await api.post(`/api/admin/post`, formData)

        Swal.fire({
            title: 'Success',
            text: 'Artikel berhasil dibuat',
            icon: 'success',
            timer: 2000,
        });

        router.push('/articles')

        } catch (error) {
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
                        <Flex py="12px">
                            <Input placeholder="Judul"
                                value={post.title}
            onChange={e => {
              setPost({ ...post, title: e.target.value })
            }}
                            />
                        </Flex>
                        <Flex py="12px">
                            <Input placeholder="Singkat"
                                value={post.excerpt}
            onChange={e => {
              setPost({ ...post, excerpt: e.target.value })
            }}
                            />
                        </Flex>
                        <Flex py="12px">
                            <Select placeholder='Status'>
  <option value='PUBLISHED'>PUBLISHED</option>
  <option value='DRAFT'>DRAFT</option>
</Select>
                        </Flex>
                        <Flex py="12px">
                        <FilePicker
                                onFileChange={(fileList) => {
                                    // do stuff here 
                                    setPost({
                                        image:fileList
                                    })
                                }}
                                placeholder="Thumbnail"
                                clearButtonLabel="Clear"
                                multipleFiles={true}
                                accept="application/json"
                                hideClearButton={false}
                                // ref = { myRef }
                            />
                        </Flex>
                        <Flex py="12px">
                            <ReactQuill modules={modules}
                                formats={formats} theme="snow" value={post.body} onChange={value => {
                                setPost({ ...post, body: value })
                            }} />
                        </Flex>
                        <Flex mt="48px" justifyContent="flex-end">
                            <Button
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