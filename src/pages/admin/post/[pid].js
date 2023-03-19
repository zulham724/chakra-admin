import React from 'react'

import {
    Container,
    Flex,
    Box,
    Text,
    Input,
    Button,
    Select
} from '@chakra-ui/react'

import Card from 'components/card/Card'

import {useRouter} from 'next/router'

import api from 'services/api'

import moment from 'moment'

import AdminLayout from 'layouts/admin'

const Page = ()=>{

    const router = useRouter()
  const { pid } = router.query

  const [post, setPost] = React.useState(null)

  const fetchData = async () => {
    const { data } = await api.get(`/api/admin/post/${pid}`)
    
return Promise.resolve(data)
  }

  React.useEffect(() => {
    async function prepare() {
      const data = await fetchData()
      setPost(data)
      document.getElementById('html').innerHTML = data.body
    }
    prepare();
  },[])

  if(!post) return null

    return (
        <AdminLayout>
            <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
                <Card
                    flexDirection='column'
                    w='100%'
                    p={'24px'}
                    overflowX={{ sm: 'scroll', lg: 'hidden' }}
                >
                    <Text fontSize='3xl' as="b">{post.title}</Text>
                    <Text fontSize='sm'>
                        {moment(post.created_at).format('llll')}
                    </Text>
                    <div id="html"></div>
                </Card>
            </Box>
        </AdminLayout>
    )
}

export default Page