import { IconButton, TextField, Typography, Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import axios from "axios";

export const ObtenerProyectoAE = () => {
    const { register, formState: { errors }, setValue, getValues, reset } = useFormContext()

    const completarCampos = (proyecto) => {
        setValue('nombre', proyecto.nombre)
    }
    const apiBuscarProyecto = () => {
        const api = import.meta.env.VITE_API_URL + `api/procesos/adjudicado/nombre/`;
        axios.get(api).then((response) => {
            completarCampos(response?.proy)
            console.log('settear campos ')
        }).catch((error) => {
            reset();
            console.error('Error:', error)
        })
    }
    return (
        <>
            <Box sx={{ display: 'flex', directionFlex: 'row', alignItems: 'end' }}>
                <Typography variant='caption' color="steelblue" sx={{ mb: 2 }}>Obtenga el datos proyecto:</Typography>
                <TextField
                    placeholder="Codigo"
                    variant="standard"
                    type="text"
                    defaultValue={""}
                    {...register("codigo", {
                        required: {
                            value: true,
                            message: "El codigo es requerido"
                        }
                    })}
                    error={!!errors.codigo}
                    helperText={errors.codigo?.message}

                />
                <IconButton edge="end" aria-label="obtener proyecto" color="primary">
                    <ZoomInIcon onClick={apiBuscarProyecto} />
                </IconButton>
            </Box>

        </>
    );
};