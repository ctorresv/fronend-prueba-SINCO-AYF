import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../api';
import { Modal, Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, FormHelperText, Checkbox, FormControlLabel, Typography, Snackbar, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setNewVehicleSuccess } from '../redux/slice/dataUpload';
import { useSelector } from 'react-redux';

const AddVehicleModal = ({ open, handleClose, vehicleModels, carsCount, bikesCount, }) => {

  const isNewVehicleSuccess = useSelector(state => state.data.isNewVehicleSuccess)
  const [placeholderValue, setPlaceholderValue] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
  const token = localStorage.getItem('token')
  let headers = { headers: { 'Authorization': `Bearer ${token}` } }

  const [formData, setFormData] = useState({
    used: false,
    model: '',
    color: '',
    mileage: '',
    value: '',
    image: '',
    numOfSpeeds: 0,
    cylinder: '',
    TypeVehicle: true,
  })

  const isFormValid = () => {
    if (!formData.model || !formData.color || !formData.mileage || !formData.value || !formData.image) {
      return false
    }
    // Si es una moto
    if (!formData.TypeVehicle && (!formData.numOfSpeeds || !formData.cylinder)) {
      return false
    }
    return true
  }

  const handleChange = (event) => {
    const modelName = event.target.value
    const model = vehicleModels.find(m => m.name === modelName)
    if (model) {
      setPlaceholderValue(model.price)
    }
    
    const { name, value } = event.target
    let newValue = value;

    if (['mileage', 'value', 'numOfSpeeds'].includes(name)) {
      newValue = Number(value)
    }

    if (name === 'used') {
      setFormData((prev) => ({
        ...prev,
        used: event.target.checked,
      }));
      return
    }

    if (name === 'value') {
      const suggestedPrice = placeholderValue;
      const minimumValue = formData.used ? suggestedPrice * 0.85 : 0;

      if (value && Number(value) > 250000000) {
        setErrors((prev) => ({
          ...prev,
          value: 'Value cannot exceed 250,000,000',
        }));
      } else if (formData.used && value && Number(value) < minimumValue) {
        setErrors((prev) => ({
          ...prev,
          value: `Value cannot be less than 85% of the suggested price: ${minimumValue}`,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          value: '',
        }))
      }
    }

    if (name === 'cylinder') {
      if (value && Number(value) > 400) {
        setErrors((prev) => ({
          ...prev,
          cylinder: 'Cylinder cannot exceed 400',
        }))
      } else {
        setErrors((prev) => ({
          ...prev,
          cylinder: '',
        }))
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }))
  }

  useEffect(() => {
    if (carsCount >= 10 && formData.TypeVehicle) {
      setErrors((prev) => ({ ...prev, maxVehicles: 'No puedes añadir más autos.' }))
      setIsSubmitDisabled(true)
    } else if (bikesCount >= 15 && !formData.TypeVehicle) {
      setErrors((prev) => ({ ...prev, maxVehicles: 'No puedes añadir más motos.' }))
      setIsSubmitDisabled(true)
    } else if (carsCount >= 10 && bikesCount >= 15) {
      setErrors((prev) => ({ ...prev, maxVehicles: 'No puedes añadir más vehículos. Límite alcanzado.' }));
      setIsSubmitDisabled(true)
    } else {
      setErrors((prev) => ({ ...prev, maxVehicles: '' }))
      setIsSubmitDisabled(false)
    }
  }, [carsCount, bikesCount, formData.TypeVehicle])

  const newVehicle = () => {
    axios.post(apiUrl + 'api/Vehicle/add', formData, headers)
      .then(res => {
        console.log('creado: ', res)
        dispatch(setNewVehicleSuccess(!isNewVehicleSuccess))
        handleClose()
        setOpenSnackbar(true)
      })
      .catch(err => {
        console.log('error al crear: ', err)
      })
  }

  const hasErrors = Object.values(errors).some(error => error !== '')

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 400,
            padding: 4,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            select
          >
            {vehicleModels.map((model) => (
              <MenuItem key={model.name} value={model.name}>
                {model.name}
              </MenuItem>
            ))} </TextField>
          <TextField
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
          <TextField
            label="Mileage"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            type="number"
          />
          <TextField
            label="Value"
            name="value"
            value={formData.value}
            placeholder={'Suggested price: ' + placeholderValue.toString()}
            onChange={handleChange}
            error={!!errors.value}
          />
          {errors.value && (
            <FormHelperText error>{errors.value}</FormHelperText>
          )}
          <TextField
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
          <FormControl>
            <InputLabel>Type Vehicle</InputLabel>
            <Select
              name="TypeVehicle"
              value={formData.TypeVehicle ? 'Car' : 'Bike'}
              onChange={(event) => {
                const isCar = event.target.value === 'Car'
                setFormData((prev) => ({
                  ...prev,
                  TypeVehicle: isCar,
                  numOfSpeeds: isCar ? '' : prev.numOfSpeeds,
                  cylinder: isCar ? '' : prev.cylinder,
                }))
              }}
            >
              <MenuItem value="Car">Car</MenuItem>
              <MenuItem value="Bike">Bike</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                name="used"
                checked={formData.used}
                onChange={handleChange}
              />
            }
            label="Is Used"
          />
          {!formData.TypeVehicle && (
            <>
              <TextField
                label="Number of Speeds"
                name="numOfSpeeds"
                value={Number(formData.numOfSpeeds)}
                onChange={handleChange}
                type="number"
              />
              <TextField
                label="Cylinder"
                name="cylinder"
                value={Number(formData.cylinder)}
                onChange={handleChange}
                error={!!errors.cylinder}
              />
              {errors.cylinder && (
                <FormHelperText error>{errors.cylinder}</FormHelperText>
              )}
            </>
          )}
          {errors.maxVehicles && <Typography color="error">{errors.maxVehicles}</Typography>}
          <Button variant="contained" onClick={newVehicle} disabled={!isFormValid() || hasErrors}>
            Submit
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Vehículo añadido exitosamente.
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddVehicleModal
