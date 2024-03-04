import { IconButton, TextField, Typography, Box,Autocomplete} from "@mui/material";
import { useFormContext } from "react-hook-form";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import axios from "axios";

export const AutocompletarUsuario = () => {
    const { register, formState: { errors }, setValue, getValues } = useFormContext()
    

    return (
        <>
            <Typography variant='caption' color="steelblue" >Seleccione al usuario que se ha responsable del proyecto</Typography>
            <Autocomplete
                size='small'
                options={[]}
                getOptionLabel={(option) => ``}
                fullWidth
                onInputChange={(e) => {
                    //e.target.value && obtainNamesProcessAdj(e.target.value)
                }}
                onChange={(e, newValue) => {
                  //  handleAutocompleteChange(newValue)
                }}
                renderInput={(params) => (
                    <TextField
                        variant='filled'
                        label="ENCARGADO DEL PROYECTO"
                        type="text"
                        {...params}
                        defaultValue={""}
                        {...register("usuario")}
                        error={!!errors.usuario}
                        helperText={errors?.usuario?.message}
                    />
                )}
            />
           
        </>
    )}