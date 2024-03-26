import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { store } from "../../../redux/store";
import notify, { SccMsg } from "../../../Service/NotificationService";
import { CouponModel } from "../../../Models/CouponModel";
import { CategoryType } from "../../../Models/CategoryType";
import jwtAxios from "../../../Service/jwtAxios";
import globals from "../../../Service/globals";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import "./AddCoupon.css";
import { addCoupon } from "../../../redux/couponState";
import axios from "axios";

const today = new Date().toISOString().split('T')[0];

const couponSchema = zod.object({
  title: zod.string().min(1, { message: 'Missing title' }),
  category: zod.string().min(1, { message: 'Missing category' }),
  description: zod.string().min(1, { message: 'Missing description' }),
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

function AddCoupon(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<CouponModel>({
        resolver: zodResolver(couponSchema)
    });
    const [category, setCategory] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
        setValue('category', event.target.value);
    };

    const send = async (data: CouponModel) => {
        const companyId = store.getState().companyState.company[0]?.id;
        if (!companyId) {
            notify.error("No company ID found. Operation aborted.");
            return;
        }
        data.companyId = companyId;

        try {
            const response = await jwtAxios.post(globals.urls.addCompanyCoupon, data);
            if (response && response.data && response.status < 300) {
                notify.success(SccMsg.COUPON_ADD);
                store.dispatch(addCoupon(response.data));
                navigate("/company/companyMainPage");
            } else {
                notify.error("Something went wrong, please try again.");
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                notify.error(err.response?.data.details || "An error occurred during the request.");
            } else {
                notify.error("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="addCoupon SolidBox">
            <Typography variant="h3" className="HeadLine">Add Coupon:</Typography>
            <br /><hr />
            <form onSubmit={handleSubmit(send)}>
                <TextField label="Title" variant="outlined" fullWidth {...register("title")} error={!!errors.title} helperText={errors.title?.message} />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="categoryLabel">Category</InputLabel>
                    <Select labelId="categoryLabel" value={category} onChange={handleChange}>
                        {Object.values(CategoryType).map((type) => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField label="Description" variant="outlined" fullWidth {...register("description")} error={!!errors.description} helperText={errors.description?.message} margin="normal" />
                <TextField label="Price" type="number" variant="outlined" fullWidth {...register("price")} error={!!errors.price} helperText={errors.price?.message} margin="normal" />
                <TextField label="Amount" type="number" variant="outlined" fullWidth {...register("amount")} error={!!errors.amount} helperText={errors.amount?.message} margin="normal" />
                <Typography variant="h6" className="HeadLine">Start Date</Typography>
                <TextField type="date" variant="outlined" fullWidth {...register("startDate")} error={!!errors.startDate} helperText={errors.startDate?.message} margin="normal" />
                <Typography variant="h6" className="HeadLine">End Date</Typography>
                <TextField type="date" variant="outlined" fullWidth {...register("endDate")} error={!!errors.endDate} helperText={errors.endDate?.message} margin="normal" />
                <TextField label="Image URL" variant="outlined" fullWidth {...register("image")} margin="normal" />
                <ButtonGroup variant="contained" fullWidth style={{ marginTop: 20 }}>
                    <Button type="submit" color="primary">Add</Button>
                </ButtonGroup>
            </form>
            <br />
            <Button variant="contained" color="error" onClick={() => navigate("/company/companyMainPage")}>Back</Button>
        </div>
    );
}

export default AddCoupon;
