import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { BsArrowDownUp } from 'react-icons/bs'
import useLocalStorage from '../../hooks/useLocalStorage'
import { UserListButton } from '../BasicButton/UserListButton'
import BillRegisterModal from '../Modal/BillRegisterModal'
import { ClientsInfo } from './ClientsInfo'

export const ClientsList = (props) => {
    const { getItem } = useLocalStorage()
    const [data, setData] = React.useState([])
    const [openRegister, setOpenRegister] = React.useState()

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getItem('token')}`
        }
    }
    React.useEffect(() => {
        fetch('https://charges-be.herokuapp.com/customer', options)
            .then((data) => { return data.json() })
            .then((value) => { setData(value) })
    }, [])

    const registerOpenHandler = (id) => { setOpenRegister(id) }
    const registerCloseHandler = () => { setOpenRegister(undefined) }
    const registerClose = () => { setOpenRegister(false) }

    return (
        <TableContainer>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'><UserListButton startIcon={<BsArrowDownUp />} text='Cliente' /></TableCell>
                        <TableCell align='center'><UserListButton text='CPF' /></TableCell>
                        <TableCell align='center'><UserListButton text='E-mail' /></TableCell>
                        <TableCell align='center'><UserListButton text='Telefone' /></TableCell>
                        <TableCell align='center'><UserListButton text='Status' /></TableCell>
                        <TableCell align='center'><UserListButton text='Criar Cobrança' /></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((client) => {
                            return (
                                <>
                                    <ClientsInfo
                                        key={client.id}
                                        id={client.id}
                                        name={client.name}
                                        cpf={client.cpf}
                                        phone={client.phone}
                                        email={client.email}
                                        status={client.status}

                                        open={props.open}
                                        closeHandler={props.closeHandler}
                                        onClick={() => { registerOpenHandler(client.id) }}
                                        value={client.name}
                                    />
                                    <BillRegisterModal
                                        open={openRegister === client.id}
                                        onClose={registerCloseHandler}
                                        closeModal={() => { registerClose() }}
                                        name={client.name}
                                        customerId={client.id}
                                        isPaid={false}
                                    />
                                </>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}