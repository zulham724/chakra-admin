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
    Grid,
    GridItem,
    Select,
    Input,
    Button
} from '@chakra-ui/react'

import {
    useQuery,
    useQueryClient,
    QueryClientProvider,
} from 'react-query'

import Swal from 'sweetalert2'

import ReactPaginate from 'react-paginate';

import React from 'react'

import api from 'services/api'

import { useRouter } from 'next/router'

import { useDebounce } from 'use-debounce';

// Custom components
import Card from 'components/card/Card'

import Row from './Row'

export default function ColumnsTable(props) {

    const queryClient = useQueryClient()

    const textColor = useColorModeValue('secondaryGray.900', 'white')
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')

    const [pageCount, setPageCount] = React.useState(0)
    const [total, setTotal] = React.useState(null)
    const [from, setFrom] = React.useState(0)
    const [to, setTo] = React.useState(0)

    const perPages = [
        { value: 5, label: '5' },
        { value: 10, label: '10' },
        { value: 15, label: '15' },
        { value: 20, label: '20' },
        { value: 25, label: '25' },
    ]

    const [search, setSearch] = React.useState('')

    const [queries, setQueries] = React.useState({
        page: 1,
        per_page: 5,
        search: '',
        status: ''
    })

    const [debouncedSearch] = useDebounce(search, 500)

    const router = useRouter()

    const _fetchData = async () => {

        const query = Object.keys(queries).reduce((acc, key) => {
            // jika string tambahkan jika value nya ada dan isi string nya lebih dari 0
            if (typeof queries[key] === 'string' && queries[key].length > 0) {
                return `${acc}&${key}=${queries[key]}`
            } else if (queries[key]) {
                return `${acc}&${key}=${queries[key]}`
            }

            return acc
        }, '?')

        const { data } = await api.get(`api/admin/post${query}`)
        const { data: results, total, from, to } = data

        setTotal(total)
        setFrom(from)
        setTo(to)

        setPageCount(
            Math.ceil(total / queries.per_page)
        )

        return results
    }

    const { isLoading, isError, data: items, error } = useQuery('fetchPosts', _fetchData)

    React.useEffect(() => {
        function run(){
            queryClient.prefetchQuery('fetchPosts', _fetchData)
        }
        run()
    }, [queries])

    React.useEffect(() => {
        function run(){
            setQueries({
                ...queries,
                search: debouncedSearch
            })
        }
        run()
    }, [debouncedSearch])

    const handleDelete = id => {
        Swal.fire({
            title: 'Apa anda yakin?',
            text: 'Post tidak akan bisa dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                api.post(`/api/admin/post/${id}`, {
                    _method: 'delete'
                }).then((res) => {
                    queryClient.prefetchQuery('fetchPosts', _fetchData)

                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                })
            }
        })
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    return (
        <QueryClientProvider client={queryClient}>
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
                    <Button
                        colorScheme="purple"
                        onClick={()=>{
                            router.push('/admin/post/create')
                        }}
                    >Tambah</Button>
                </Flex>
                <Grid
                    templateColumns='repeat(5, 1fr)'
                    gap={6}
                    px='25px'
                    mb='20px'
                >
                    <GridItem colSpan={2}>
                        <Select placeholder='Status' value={queries.status} onChange={e => setQueries({ ...queries, status: e.target.value })}>
                            <option value='PUBLISHED'>PUBLISHED</option>
                            <option value='DRAFT'>DRAFT</option>
                        </Select>
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Input placeholder='Cari' value={search} onChange={
                            e => setSearch(e.target.value)
                        } />
                    </GridItem>

                </Grid>
                <Table variant='simple' color='gray.500' mb='24px'>
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
                    <Tbody>
                        {
                            items.map((item,index) => {
                                return (
                                    <Row item={item} key={index} onDelete={handleDelete}/>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </Card>
            <Flex
                justifyContent="flex-end"
                align="center"
                pt={4}
            >
                <Select
                    placeholder='Rows per page'
                    width="80px"
                    size="sm"
                    value={queries.per_page}
                    onChange={e =>
                        setQueries({
                            ...queries,
                            per_page: e.target.value
                        })
                    }
                >
                    {
                        perPages.map((perPage, index) => {
                            return (
                                <option key={index} value={perPage.value}>{perPage.label}</option>
                            )
                        })
                    }
                </Select>
                <Flex mx="20px">
                    <Text fontSize='sm'>{from} - {to} of {total}</Text>
                </Flex>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={event => {
                        setQueries({
                            ...queries,
                            page: event.selected + 1
                        })
                    }}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </Flex>
        </QueryClientProvider>
    )
}
