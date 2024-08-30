import { useForm, Controller } from "react-hook-form"
import { Button, TextField } from '@mui/material';
import '@/containers/ProductForm/index.scss'
import { useDispatch } from 'react-redux';
import { postModifier } from '@/store/slice/modifiersSlice';

const ModifierForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      price: 0,
    },
  })
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(postModifier(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Modifier Name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            variant="outlined"
            className="form__input"
            fullWidth
            required
            error={errors.name}
            helperText={errors.name ? errors.name.message : ''}
          />
        )}
      />
      <Controller
        name="price"
        control={control}
        rules={{ required: 'Modifier Price is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Price in $"
            variant="outlined"
            className="form__input"
            fullWidth
            required
            error={errors.price}
            helperText={errors.price ? errors.price.message : ''}
          />
        )}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  )
};

export default ModifierForm;
