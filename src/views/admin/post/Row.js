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

const Component = ({ item, onDelete }) => {

  const [post, setPost] = React.useState(null)

  React.useEffect(() => {
    setPost(item)
  }, [item])

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
              colorScheme='green'
            >{post.status}</Badge>
          ) 
        }
        {
          post.status === 'DRAFT' && (
            <Badge
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
            alert('view click')
          }
        }, {
          label: 'Edit',
          onClick: () => {
            alert('Edit click')
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