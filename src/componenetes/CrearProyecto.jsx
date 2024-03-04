import { useState } from "react";
import axios from "axios";
import { obtenerToken } from "../auth/auth";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Stack from "@mui/material/Stack";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import { DialogTitle, MenuItem, FormControl } from "@mui/material";

import { FormProvider, useForm, useFormContext } from "react-hook-form"

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AutocompletarUsuario } from "./AutocompletarUsuario";
import { ObtenerProyectoAE } from "./ObtenerProyectoAE";


// import { obtenerUserNivel } from "../utils/userdata";


function FormProyecto() {
    const { register, handleSubmit, formState: { errors } } = useFormContext()
    return (
        <>
            <TextField
                label="Nombre de proyecto"
                type="text"
                defaultValue={""}
                {...register("nombre", {
                    required: {
                        value: true,
                        message: "El nombre es requerido"
                    }
                })}
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
                fullWidth
            />
            <FormControl sx={{
                display: 'grid',
                gridTemplateColumns: { sm: '1fr 1fr' },
                alignItems: 'center',
                gap: 1,
            }}>
                <TextField
                    
                    label="Gestion"
                    type="number"
                    defaultValue={""}
                    {...register("gestion", {
                        required: {
                            value: true,
                            message: "El gestion es requerido"
                        }
                    })}
                    error={!!errors.gestion}
                    helperText={errors.gestion?.message}
                    fullWidth
                />
                <TextField
                    
                    label="fecha_aprobacion"
                    type="date"
                    defaultValue={""}
                    {...register("fecha_aprobacion", {
                        required: {
                            value: true,
                            message: "El fecha_aprobacion es requerido"
                        }
                    })}
                    error={!!errors.fecha_aprobacion}
                    helperText={errors.fecha_aprobacion?.message}
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>
        </>
    );
}

export function CrearProyecto() {
    const domin = import.meta.env.VITE_BASE_URL_BACKEND;

    const apiCreate = `${domin}/proyectos`;
    //const token = obtenerToken();
    //const headers = {
    //  Authorization: `Bearer ${token}`,
    //};
    const [open, setOpen] = useState(false);
    const methods = useForm();
    const { handleSubmit,reset } = useForm()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (data) => {
        console.log('data',data)
        axios.post(apiCreate,data).then((response) => {
            console.log('sdsd',response)
        }).catch((error) => {
            reset()
            console.error('Error:', error)
        })
    };
    return (
        <>
            <Stack className="pl-7" spacing={2} direction="row">
                <Button
                    variant="outlined"
                    endIcon={<AddCircleOutlineOutlinedIcon />}
                    onClick={handleClickOpen}
                >
                    Crear Proyecto
                </Button>
            </Stack>

            <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md" >
                <form onSubmit={methods.handleSubmit(onSubmit)} >
                    <DialogTitle>CREACION DE PROYECTO</DialogTitle>
                    <DialogContent sx={{ '& .MuiTextField-root': { marginBottom: 1, marginTop: 1 } }}>
                        <FormProvider {...methods}>
                            <ObtenerProyectoAE />
                            <FormProyecto />
                        </FormProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined">Cerrar</Button>
                        <Button variant="contained" type="submit">
                            Crear
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
