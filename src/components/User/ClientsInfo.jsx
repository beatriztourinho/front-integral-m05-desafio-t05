import React, { useEffect, useRef, useState } from 'react'
import { TableCell, TableRow, Typography } from '@mui/material'
import { style } from '../../config/theme/styles'
import { UserListButton } from '../BasicButton/UserListButton'
import { FiFilePlus } from 'react-icons/fi'
import ClientDetails from '../../pages/ClientDetails'
import { useNavigate } from 'react-router-dom'

export const ClientsInfo = (props) => {
    const navigate = useNavigate
    const textRef = useRef()
    const [statusColor, setStatusColor] = useState(null)
    const statusColorHandler = () => {
        if (textRef.current.innerHTML === 'inadimplente') {
            return {
                color: '#971D1D',
                font: "700 16px/19px 'Nunito', sans-serif",
                textTransform: 'capitalize',
                background: '#FFEFEF',
                borderRadius: '8px',
            }
        }
        if (textRef.current.innerHTML === 'em dia') {
            return {
                color: '#1FA7AF',
                font: "700 16px/19px 'Nunito', sans-serif",
                textTransform: 'capitalize',
                background: '#EEF6F6',
                borderRadius: '8px',
            }
        }
    }

    useEffect(() => {
        setStatusColor(statusColorHandler())
    }, [])

    const handleOpenDetails = () => {
        navigate('/client')
    }

    return (
        <TableRow>
            <TableCell onClick={handleOpenDetails}><Typography sx={style.userInfoText}>{props.name}</Typography></TableCell>
            <TableCell onClick={handleOpenDetails}><Typography sx={style.userInfoText}>{props.cpf}</Typography></TableCell>
            <TableCell onClick={handleOpenDetails}><Typography sx={style.userInfoText}>{props.email}</Typography></TableCell>
            <TableCell onClick={handleOpenDetails}><Typography sx={style.userInfoText}>{props.phone}</Typography></TableCell>
            <TableCell onClick={handleOpenDetails} align='center'><Typography ref={textRef} sx={statusColor}>{props.status}</Typography></TableCell>
            <TableCell align='center'><UserListButton onClick={props.onClick} text={<FiFilePlus size={30} color='#DA0175' />} /></TableCell>
        </TableRow>
    )
}