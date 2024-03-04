import { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import axios from "axios";
import { obtenerToken } from "../auth/auth";

// import { AcordeonUser } from "./AcordeonUser";
// import { ResetearPassword } from "./ResetearPassword";

import ZoomInIcon from "@mui/icons-material/ZoomIn";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

// import { HabilitarDes } from "./HabilitarDes";
// import { ActualizarUser } from "./ActualizarUser";

// import { useSelector } from "react-redux";

export function BuscarProyecto() {
  const apiKey = import.meta.env.VITE_BASE_URL_BACKEND;

  // const count = useSelector((state) => state.counter.value);

  const [buscar, setBuscar] = useState("");
  const [proyectos, setProyectos] = useState([]);
  const [errorDatoscontratoData, setErrorDatoscontratoData] = useState([]);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [selectedHabilitado, setSelectedHabilitado] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isActualizarUserVisible, setIsActualizarUserVisible] = useState(false);

  const [reloadComponents, setReloadComponents] = useState(false);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setBuscar(value);
  };

 /*  const prevCount = useRef(count);

  useEffect(() => {
    if (prevCount.current !== count) {
      prevCount.current = count;
      handleSearch();
    }
  }, [count]); */

  const handleSearch = async () => {
  
      const url = `${apiKey}/proyectos/buscar/${buscar}`;
    //const token = obtenerToken();
     // const headers = {
     //   Authorization: `Bearer ${token}`,
     // };
      axios.get(url).then((response) => {
        setIsDataLoaded(true)
        setProyectos(response.data)
          console.log('sdsd',response)
      }).catch((error) => {
          console.error('Error:', error)
      })
  };
  const columns = [
    { id: "codigo", label: "CODIGO", minWidth: 50 },
    { id: "nombre", label: "NOMBRE PROYECTO", minWidth: 150 },
    { id: "gestion", label: "GESTION", minWidth: 50 },
    { id: "fecha_aprobacion", label: "FECHA APROBACION", minWidth: 250 },
    { id: "id_responsable", label: "RESPONSABLE", minWidth: 50 },
  ];

  

  /*  const AcordeonUserWrapper = ({
    isVisible,
    userId,
    urltable,
    onHide,
    selectedHabilitado,
  }) => {
    useEffect(() => {
      if (isVisible) {
      }
    }, [isVisible, userId, urltable]);

    return (
      isVisible && (
        <AcordeonUser
          userId={userId}
          urltable={urltable}
          selectedHabilitado={selectedHabilitado}
          hideActualizarUser={() => onHide(false)}
        />
      )
    );
  }; */

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-1 py-1 lg:px-4">
        <Typography
          className="p-3 text-c600 text-2xl"
          variant="h4"
          gutterBottom
        >
          Buscar
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={1}></Grid>
          <Grid xs={10}>
            <TextField
              name="codigo"
              helperText="Ejemplo: AEV-123"
              id="standard-basic"
              label="Codigo del proyecto"
              variant="standard"
              className="w-full "
              value={buscar}
              onChange={handleInputChange}
            />
            <br />{" "}
            <Button
              onClick={handleSearch}
              variant="outlined"
              endIcon={<ZoomInIcon />}
            >
              Buscar
            </Button>
          </Grid>
          <Grid xs={1}></Grid>
        </Grid>
      </div>
      {errorDatoscontratoData && (
        <p className="text-red-700 text-center">{errorDatoscontratoData}</p>
      )}
      {isDataLoaded && (
        <div
          key={reloadComponents}
          className="flex min-h-full flex-col justify-center px-5 py-1 lg:px-4"
        >
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 500 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {proyectos.map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align="center"
                            style={{ textAlign: "center" }}
                          >
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      )}
      {/* <AcordeonUserWrapper
        isVisible={isActualizarUserVisible}
        userId={selectedUserId}
        urltable={urltable}
        selectedHabilitado={selectedHabilitado}
        onHide={setIsActualizarUserVisible}
      /> */}
      <br />
    </>
  );
}
