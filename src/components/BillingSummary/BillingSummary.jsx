import React, {useCallback} from "react";
import { Box, Grid, Typography } from "@mui/material";
import { style } from "../../config/theme/styles";

export const BillingSummary = (props) => {

    const centToBRL = useCallback((cents) =>{
      const valueInBRL = (Number(cents) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      return valueInBRL
    },[])

  return (
    <Grid
      container
      gap={5}
      padding="20px 40px"
      borderRadius="20px"
      {...props}   
    >
      <img 
        src={props.img}
        alt='Ícone de Cobranças'
      />
      <Box
        flexGrow="1"
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        gap={1}
      >
        <Typography sx={style.billSummary}>
          {props.label}
        </Typography>
        <Typography
          style={{ fontSize: '1.5rem' }}
          sx={style.billSummary}
        >
          {centToBRL(props.value)}
        </Typography>
      </Box>
    </Grid>)
}