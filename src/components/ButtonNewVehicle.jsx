import { Button, Box, Typography } from '@mui/material';
import React from 'react'

function ButtonNewVehicle({ carsCount, bikesCount, onClick }) {
    return (
        <Button variant="contained" color="primary" sx={{ mt: '5px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 'auto' }} onClick={onClick}>
            Añadir Nuevo Vehículo
            <div>
                <h2>Carros: {carsCount}/10</h2>
                <h2>Motos: {bikesCount}/15</h2>
            </div>
        </Button>
    )
}
export default ButtonNewVehicle