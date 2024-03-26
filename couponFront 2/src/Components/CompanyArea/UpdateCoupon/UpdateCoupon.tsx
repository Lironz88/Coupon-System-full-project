import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, InputAdornment, ButtonGroup, FormHelperText } from '@mui/material';
import { CouponModel } from '../../../Models/CouponModel'; // Update the import path as necessary
import { CategoryType } from '../../../Models/CategoryType'; // Update the import path as necessary, ensure this is an enum or a similar construct
import globals from '../../../Service/globals';
import jwtAxios from '../../../Service/jwtAxios';
import notify from '../../../Service/NotificationService';
import './UpdateCoupon.css';
import { useDispatch } from 'react-redux';
import * as zod from 'zod';
import { ZodIssue } from 'zod';
import { deleteCoupon as deleteCouponAction } from '../../../redux/couponState'; // Update the import path as necessary
import { UnknownAction } from '@reduxjs/toolkit';

interface LocationState {
  coupon: CouponModel;
}


const today = new Date().toISOString().split('T')[0];

const schema = zod.object({
  title: zod.string().min(1, 'Missing title'),
  category: zod.nativeEnum(CategoryType),
  description: zod.string().min(1, 'Missing description'),
  price: zod.string()
            .min(1, { message: 'Missing price' })
            .transform((val) => parseFloat(val))
            .refine(val => !isNaN(val) && val > 0, { message: 'Price must be greater than 0' }),
  amount: zod.string()
             .min(1, { message: 'Missing amount' })
             .transform((val) => parseInt(val, 10))
             .refine(val => !isNaN(val) && val >= 1, { message: 'Amount must be at least 1' }),
  startDate: zod.string().min(1, { message: 'Missing start date' })
  .refine(date => new Date(date) >= new Date(today), {
    message: 'Start date must be today or in the future',
  }),
endDate: zod.string().min(1, { message: 'Missing end date' }),
image: zod.string().optional(),
}).refine(data => new Date(data.endDate) > new Date(data.startDate), {
  message: 'End date must be after the start date',
  path: ['endDate'],
});

const UpdateCoupon: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const initialState = location.state ? location.state.coupon : {} as CouponModel;
  const [coupon, setCoupon] = useState<CouponModel>(initialState);
  const [validationErrors, setValidationErrors] = useState<ZodIssue[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon({ ...coupon, [event.target.name]: event.target.value });
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCoupon({ ...coupon, category: event.target.value as CategoryType });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = schema.safeParse(coupon);
    if (result.success) {
      jwtAxios.put(`${globals.urls.updateCompanyCoupon}`, coupon)
        .then(() => {
          notify.success("Coupon updated successfully");
          navigate("/company/companyMainPage");
        })
        .catch((error) => {
          notify.error("Failed to update coupon: " + error.message);
        });
    } else {
      setValidationErrors(result.error.issues);
    }
  };

  const removeCoupon = () => {
    if (coupon.id !== undefined) { // Ensure coupon.id is not undefined
      jwtAxios.delete(`${globals.urls.deleteCompanyCoupon}/${coupon.id}`)
        .then(() => {
          notify.success(`Coupon ${coupon.title} was deleted`);
          dispatch(deleteCouponAction(coupon.id!) as UnknownAction);
          navigate("/company/companyMainPage");
        })
        .catch(error => {
          notify.error("Error: " + error.message);
        });
    }
  };

  const getError = (field: string): string | undefined => {
    return validationErrors.find(issue => issue.path.includes(field))?.message;
  };


  return (
    <div className="updateCoupon SolidBox">
      <h2>Update Coupon</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <TextField label="Title" variant="outlined" name="title" value={coupon.title} onChange={handleChange} error={!!getError('title')} helperText={getError('title')} fullWidth margin="normal" />
        
        {/* Description */}
        <TextField label="Description" variant="outlined" name="description" value={coupon.description} onChange={handleChange} error={!!getError('description')} helperText={getError('description')} fullWidth margin="normal" />
        
        {/* Price */}
        <TextField label="Price" type="string" variant="outlined" name="price" value={coupon.price?.toString()} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} error={!!getError('price')} helperText={getError('price')} fullWidth margin="normal" />
        
        {/* Amount */}
        <TextField label="Amount" type="string" variant="outlined" name="amount" value={coupon.amount?.toString()} onChange={handleChange} error={!!getError('amount')} helperText={getError('amount')} fullWidth margin="normal" />
        
        {/* Category */}
        <FormControl fullWidth margin="normal" error={!!getError('category')}>
          <InputLabel>Category</InputLabel>
          <Select value={coupon.category} onChange={handleCategoryChange} label="Category" error={!!getError('category')}>
            {Object.keys(CategoryType).map(key => (
              <MenuItem key={key} value={key}>{key}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{getError('category')}</FormHelperText>
        </FormControl>
        
        {/* Start Date */}
        <TextField label="Start Date" type="date" variant="outlined" name="startDate" value={coupon.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} error={!!getError('startDate')} helperText={getError('startDate')} fullWidth margin="normal" />
        
        {/* End Date */}
        <TextField label="End Date" type="date" variant="outlined" name="endDate" value={coupon.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} error={!!getError('endDate')} helperText={getError('endDate')} fullWidth margin="normal" />
        
        {/* Image URL */}
        <TextField label="Image" variant="outlined" name="image" value={coupon.image || ''} onChange={handleChange} error={!!getError('image')} helperText={getError('image')} fullWidth margin="normal" />
        
        <ButtonGroup fullWidth variant="contained" sx={{ mt: 2 }}>
          <Button type="submit" color="primary">Update</Button>
          <Button color="secondary" onClick={removeCoupon}>Delete</Button>
        </ButtonGroup>
      </form>
      <Button variant="contained" color="error" onClick={() => navigate("/company/companyMainPage")} sx={{ mt: 2 }}>Back</Button>
    </div>
  );
};

export default UpdateCoupon;
