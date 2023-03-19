import React from 'react'
import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Select,
  Badge
} from '@chakra-ui/react'

import Menu from 'components/menu'

import Swal from 'sweetalert2'

import api from 'services/api'

import {useRouter} from 'next/router'

const Component = ({ item, onDelete }) => {

  const router = useRouter()

  const [post, setPost] = React.useState(null)

  React.useEffect(() => {
    setPost(item)
  }, [item])

  const handleChangeStatus = () => {
    // Swal that options PUBLISHED or DRAFT
    Swal.fire({
      title: 'Change Status',
      input: 'select',
      inputOptions: {
        PUBLISHED: 'PUBLISHED',
        DRAFT: 'DRAFT'
      },
      inputPlaceholder: 'Select a status',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to choose something!'
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        api.put(`/api/admin/post/${post.id}`, {
          _method: 'PUT',
          status: result.value
        }).then((res) => {
          setPost({
            ...post,
            status: result.value
          })
        })
      }
    })
  }

  const changeThumbnail = async (e) => {
    Swal.fire({
      title: 'Change Thumbnail',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      },
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to choose something!'
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Uploading...',
          text: 'Please wait...',
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading()
          }
        })
        const formData = new FormData()
        formData.append('image', result.value)
        formData.append('_method', 'PUT')

        api.post(`/api/admin/post/${post.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          setPost({
            ...post,
            image: res.data.image
          })
          Swal.fire({
            title: 'Success',
            text: 'Thumbnail has been changed',
            icon: 'success',
            timer: 2000,
          });
        })
      }
    })

  }

  if (!post) return null

  return (
    <Tr>
      <Td
        fontSize={{ sm: '14px' }}
        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
        borderColor='transparent'
      >
        {post.title}
      </Td>
      <Td
        fontSize={{ sm: '14px' }}
        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
        borderColor='transparent'
      >
        {post.excerpt}
      </Td>
      <Td
        fontSize={{ sm: '14px' }}
        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
        borderColor='transparent'
      >
        <img
          src={`${process.env.CLIENT_STORAGE_URL}/${post.image}`}
          alt={post.title}
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'cover'
          }}
          onClick={changeThumbnail}
        />
      </Td>
      <Td
        fontSize={{ sm: '14px' }}
        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
        borderColor='transparent'
      >
        {
          post.status === 'PUBLISHED' && (
            <Badge
              onClick={handleChangeStatus}
              colorScheme='green'
            >{post.status}</Badge>
          ) 
        }
        {
          post.status === 'DRAFT' && (
            <Badge
              onClick={handleChangeStatus}
              colorScheme='yellow'
            >{post.status}</Badge>
          ) 
        }
      </Td>
      <Td
        fontSize={{ sm: '14px' }}
        minW={{ sm: '150px', md: '200px', lg: 'auto' }}
        borderColor='transparent'
      >
        <Menu actions={[{
          label: 'View',
          onClick: () => {
            // alert('view click')
            router.push(`/admin/post/${post.id}`)
          }
        }, {
          label: 'Edit',
          onClick: () => {
            router.push(`/admin/post/${post.id}/edit`)
            // alert('Edit click')
          },
        }, {
          label: 'Delete',
          onClick: () => {
            onDelete && onDelete(post.id)
          }
        }]} />
      </Td>
    </Tr>
  )
}

export default Component