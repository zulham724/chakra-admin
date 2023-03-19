import {
    Container,
    Flex,
    Box,
    Text
} from '@chakra-ui/react'

import Card from 'components/card/Card'

import AdminLayout from 'layouts/admin'

import React from 'react'

export default function Page() {
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
                </Card>
            </Box>
        </AdminLayout>
    )
}