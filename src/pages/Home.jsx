import React, { useEffect, useState } from 'react';
import { Button, Grid2, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';
import axios from 'axios';
import apiUrl from '../../api';
import NavBar from '../components/NavBar';
import SellButton from '../components/SellButton';
import ButtonNewVehicle from '../components/ButtonNewVehicle';
import FormNewVehicle from '../components/FormNewVehicle';
import { useSelector } from 'react-redux';

const Home = () => {
  const isNewVehicleSuccess = useSelector(state => state.data.isNewVehicleSuccess)
  const [vehicles, setVehicles] = useState([])
  const token = localStorage.getItem('token')
  const [modalOpen, setModalOpen] = useState(false)
  const [priceVehicles, setPriceVehicles] = useState([])
  let headers = { headers: { 'Authorization': `Bearer ${token}` } }

  const openModalForm = () => setModalOpen(true)
  const closeModalForm = () => setModalOpen(false)

  useEffect(() => {
    axios.get(apiUrl + 'api/VehiclePrices/read')
      .then(res => {
        setPriceVehicles(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axios.get(apiUrl + 'api/ReadUserVehicle', headers)
      .then(res => {
        setVehicles(res.data.reverse())
      })
      .catch(err => {
        console.log(err)
      })
  }, [isNewVehicleSuccess])

  const carsCount = vehicles.filter(vehicle => vehicle.typeVehicle === true).length
  const bikesCount = vehicles.filter(vehicle => vehicle.typeVehicle === false).length
  const vehicleModels = priceVehicles.map((vehicle) => ({
    name: vehicle.model,
    price: vehicle.price,
  }))

  return (
    <Container>
      <NavBar />
      <ButtonNewVehicle carsCount={carsCount} bikesCount={bikesCount} onClick={openModalForm} />
      <FormNewVehicle open={modalOpen} handleClose={closeModalForm} vehicleModels={vehicleModels} carsCount={carsCount} bikesCount={bikesCount} />
      <Grid2 container spacing={3} mt={3} justifyContent="center" alignItems="center">
        {vehicles.map((vehicle) => (
          <Grid2 item="true" xs={12} sm={6} md={4} key={vehicle.id} >
            <Card sx={{ maxWidth: 345, minWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={vehicle.image || 'https://img.freepik.com/vector-premium/conjunto-colorido-motocicletas-automoviles-transporte-urbano-carretera-diseno-plano-ilustracion-vectorial-aislado-sobre-fondo-blanco_153097-2115.jpg'}
                alt={vehicle.model}
                sx={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '200px'
                }}
              />

              <CardContent>
                <Typography variant="h5" component="div">
                  {vehicle.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Color: {vehicle.color}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kilometraje: {vehicle.mileage} km
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Precio: ${vehicle.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Usado: {vehicle.used ? 'Sí' : 'No'}
                </Typography>
                {vehicle.typeVehicle === false && (
                  <>
                    <Typography variant="body2" color="text.secondary">
                      Cilindraje: {vehicle.cylinder} cc
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Número de velocidades: {vehicle.numOfSpeeds}
                    </Typography>
                  </>
                )}
                <SellButton id={vehicle.id} model={vehicle.model} price={vehicle.value} />
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  )
}

export default Home
