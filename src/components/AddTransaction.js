import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from 'moment';
import { toast } from 'react-toastify';
import useFinance from '../hooks/useFinance';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';

const validationSchema = yup.object().shape({
    createdAt: yup.date().required('Transaction Date is required'),
    name: yup.string().required('Transaction name is required'),
    amount: yup.string().required('Amount is required'),
    type: yup.string().required('Transaction type is required'),
  });

const AddTransaction = () => {
    const {addNewFinancialData} = useFinance()

    const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
          createdAt: undefined,
          name: '',
          amount: '',
          type: ''
        },
      });

      const notify = (params) => {
        toast(params,{
            autoClose:2000,
            style:{
             backgroundColor:"green",
             color:"white"
            }
        })
      }

      const onSubmit = async (data) => {
        try{
            const utcDate = moment(data.createdAt).format('YYYY-MM-DD')
            const payload = {
                name : data.name,
                createdAt : utcDate,
                amount : data.amount,
                type : data.type
            }
            await addNewFinancialData(payload)
            notify("Transaction details created successfully")
            reset()
        }catch(error){
            console.log(error)
        }
      }
    return (
        <Stack>
            <Typography variant="h4">Add New Transaction</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="column" spacing={3}>
                <FormControl fullWidth error={!!errors.createdAt}>
            <Controller
              name="createdAt"
              control={control}
              render={({ field }) => <TextField type="date" {...field}/>}
            />
            {errors.createdAt && <Typography color="error">{errors.createdAt.message}</Typography>}
          </FormControl>

          <FormControl fullWidth error={!!errors.name}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <TextField id="outlined-adornment-name" label="Transaction Name" {...field} />}
            />
            {errors.name && <Typography color="error">{errors.name.message}</Typography>}
          </FormControl>

          <FormControl fullWidth error={!!errors.gender}>
            <InputLabel htmlFor="select-transactiontype">Select a transaction type</InputLabel>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select id="select-transactiontype" label="Select a transaction type" {...field}>
                  {["income","expense"]?.map(item => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.type && <Typography color="error">{errors.type.message}</Typography>}
          </FormControl>

          <FormControl fullWidth error={!!errors.amount}>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => <TextField id="outlined-adornment-amount" type="number" label="Amount" {...field} />}
            />
            {errors.amount && <Typography color="error">{errors.amount.message}</Typography>}
          </FormControl>

          <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={2}>
            <Button onClick={()=>reset()} variant='contained'>Clear Form</Button>
            <Button variant='contained' type="submit">Submit</Button>
          </Stack>
                </Stack>
            </form>
        </Stack>
    )
}

export default AddTransaction