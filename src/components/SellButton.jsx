import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import apiUrl from '../../api';
import { useDispatch } from 'react-redux';
import { setNewVehicleSuccess } from '../redux/slice/dataUpload';
import { useSelector } from 'react-redux';

const SellButton = ({ id, model, price }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', document: '', model: '', price: '' })
  const isNewVehicleSuccess = useSelector(state => state.data.isNewVehicleSuccess)
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const isFormValid = () => {
    if (!formData.name || !formData.document) {
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedFormData = {
      ...formData,
      model: model,
      price: String(price)
    }
    axios.post(apiUrl + 'api/Sales', updatedFormData)
      .then(res => {
        console.log('crecion exitosa', res)
        setOpenSnackbar(true)
        axios.delete(apiUrl + `api/DeleteVehicle/${id}`)
          .then(res => {
            console.log(res)
            dispatch(setNewVehicleSuccess(!isNewVehicleSuccess))
          })
          .catch(err => {
            setErrorMessage(err.response.data)
            console.log(err)
          })
      })
      .catch(err => {
        setErrorMessage(err.response.data)
        console.log(err)
      })
    console.log('Id cart:', updatedFormData)
    handleClose()
  }

  return (
    <>
      <Button variant="contained" onClick={handleOpen} style={{ marginTop: '6px' }} >
        Sell
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 400,
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mx: 'auto',
            mt: 8,
          }}
        >
          <Typography variant="h6">Sell a Vehicle</Typography>

          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Document"
            name="document"
            value={formData.document}
            onChange={handleChange}
            fullWidth
            required
          />
          {errorMessage && (
            <Typography variant="body2" color="red" align="center">
              {errorMessage}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit} disabled={!isFormValid()}>
              Submit
            </Button>
          </Box>
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

export default SellButton
