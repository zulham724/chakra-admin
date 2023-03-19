import {
    Flex,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue
} from '@chakra-ui/react'
import React, { useMemo } from 'react'
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable
} from 'react-table'

// Custom components
import Card from 'components/card/Card'
import Menu from 'components/menu/MainMenu'
import { TableProps } from 'views/admin/default/variables/columnsData'
export default function ColumnsTable(props) {
    const { columnsData, tableData } = props

    const columns = useMemo(() => columnsData, [columnsData])
    const data = useMemo(() => tableData, [tableData])

    const tableInstance = useTable(
        {
            columns,
            data
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        initialState
    } = tableInstance
    initialState.pageSize = 5

    const textColor = useColorModeValue('secondaryGray.900', 'white')
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')

    const [post, setPosts] =

    return (
        <Card
            flexDirection='column'
            w='100%'
            px='0px'
            overflowX={{ sm: 'scroll', lg: 'hidden' }}
        >
            <Flex px='25px' justify='space-between' mb='20px' align='center'>
                <Text
                    color={textColor}
                    fontSize='22px'
                    fontWeight='700'
                    lineHeight='100%'
                >
                    Filter
                </Text>
            </Flex>
            <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
                <Thead>
                    <Tr>
                            <Th
                                pe='10px'
                                borderColor={borderColor}
                            >
                                <Flex
                                    justify='space-between'
                                    align='center'
                                    fontSize={{ sm: '10px', lg: '12px' }}
                                    color='gray.400'
                                >
                                    Judul
                                </Flex>
                            </Th>
                            <Th
                                pe='10px'
                                borderColor={borderColor}
                            >
                                <Flex
                                    justify='space-between'
                                    align='center'
                                    fontSize={{ sm: '10px', lg: '12px' }}
                                    color='gray.400'
                                >
                                    Singkat
                                </Flex>
                            </Th>
                            <Th
                                pe='10px'
                                borderColor={borderColor}
                            >
                                <Flex
                                    justify='space-between'
                                    align='center'
                                    fontSize={{ sm: '10px', lg: '12px' }}
                                    color='gray.400'
                                >
                                    Thumbnail
                                </Flex>
                            </Th>
                            <Th
                                pe='10px'
                                borderColor={borderColor}
                            >
                                <Flex
                                    justify='space-between'
                                    align='center'
                                    fontSize={{ sm: '10px', lg: '12px' }}
                                    color='gray.400'
                                >
                                    Status
                                </Flex>
                            </Th>
                            <Th
                                pe='10px'
                                borderColor={borderColor}
                            >
                                <Flex
                                    justify='space-between'
                                    align='center'
                                    fontSize={{ sm: '10px', lg: '12px' }}
                                    color='gray.400'
                                >
                                    Aksi
                                </Flex>
                            </Th>
                    </Tr>
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    
                </Tbody>
            </Table>
        </Card>
    )
}
