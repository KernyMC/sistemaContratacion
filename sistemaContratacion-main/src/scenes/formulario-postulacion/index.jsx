import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Header from "../../components/Header";
import PopUpPostulacion from "../../components/PopUps/PopUpPostulacion";
import { pedirPostulaciones } from "../../api/postulacion";
import { useState } from "react";
import { useEffect } from "react";
import { pedirContratacion } from "../../api/contratacionTipo";
import { pedirPersonalAcademico } from "../../api/personalAcademico";
import { pedirCampoEspecifico } from "../../api/campoEspecifico";
import { pedirCampoAmplio } from "../../api/campoAmplio";
import { pedirSede } from "../../api/sede";
import { pedirDepartamento } from "../../api/departamento";
import { pedirActividad } from "../../api/actividad";


const FormularioPostulacion = () => {
  const [postulacion,setPostulacion] = useState([])
  const [contratacion,setContratacion] = useState([])
  const [personalAcademico,setPersonalAcademico] = useState([])
  const [campoEspecifico,setCampoEspecifico] = useState([])
  const [campoAmplio,setCampoAmplio] = useState([])
  const [departamento,setDepartamento] = useState([])
  const [sede,setSede] = useState([])
  const [actividad,setActividad] = useState([])
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const [seleccionados, setSeleccionados] = useState({
    postulation: "",
    contratacion: "",
    personalAcademico: "",
    campoEspecifico: "",
    campoAmplio: "",
    departamento: "",
    sede: "",
    actividad: "",
  });

  // Función para manejar el clic en el botón "Enviar"
  const handleEnviarClick = (values) => {
    // Obtener los valores seleccionados del objeto 'values'
    const {
      postulation,
      contratacion,
      personalAcademico,
      campoEspecifico,
      campoAmplio,
      departamento,
      sede,
      actividad,
    } = values;

    // Guardar los valores seleccionados en el estado 'seleccionados'
    setSeleccionados({
      postulation,
      contratacion,
      personalAcademico,
      campoEspecifico,
      campoAmplio,
      departamento,
      sede,
      actividad,
    });
  };


  useEffect(() => {
    const PedirPosutlacion = async () => {
      try {
        const res = await pedirPostulaciones();
        const res1 = await pedirContratacion();
        const res2 =await pedirPersonalAcademico();
        const res3 = await pedirCampoEspecifico();
        const res4 = await pedirCampoAmplio();
        const res5 = await pedirSede();
        const res6 = await pedirDepartamento();
        const res7 = await pedirActividad();
        setPostulacion(res.data);
        setContratacion(res1.data);
        setPersonalAcademico(res2.data);
        setCampoEspecifico(res3.data);
        setCampoAmplio(res4.data);
        setSede(res5.data);
        setDepartamento(res6.data);
        setActividad(res7.data);
      } catch (error) {
        console.log(error);
      }
    };
    PedirPosutlacion();
  }, []);

  const [postulacion1Selected, setPostulacion1Selected] = useState(false); 
  const [postulacion2Selected, setPostulacion2Selected] = useState(false);
  const [postulacion3Selected, setPostulacion3Selected] = useState(false);
  const [postulacion4Selected, setPostulacion4Selected] = useState(false);
  const [postulacion5Selected, setPostulacion5Selected] = useState(false);
  const [postulacion6Selected, setPostulacion6Selected] = useState(false);
  const [postulacion7Selected, setPostulacion7Selected] = useState(false);
  return (
    <Box m="20px">
      <Header title="Formato de Documentos" subtitle="Complete el formulario" />

      <Formik
         onSubmit={(values) => {
          // Al hacer clic en Enviar, llamamos a handleEnviarClick para guardar los valores seleccionados
          handleEnviarClick(values);

          // Luego, llamamos a handleFormSubmit para procesar el formulario si es necesario
          handleFormSubmit(values);
        }}
        initialValues={initialValues}
        validationSchema={formSchema}>
            {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="20px">
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Seleccionar Postulación:
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  value={values.postulation}
                  onChange={(event) => {
                    handleChange(event); // Default handleChange function to update the selected value
                    setPostulacion1Selected(true); // Set the variable to true when the MenuItem 1 is selected
                  }}
                  onBlur={handleBlur}
                  name="postulation"
                  error={!!touched.postulation && !!errors.postulation}
                >
                  {postulacion.length > 0 ? (
                    postulacion.map((option) => (
                      <MenuItem key={option.post_id} value={option.post_periodo}>
                        {option.post_periodo}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando postulaciones...</MenuItem>
                  )}
                </Select>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Seleccionar Tipo de Contratación:
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  value={values.contratacion}
                  onChange={(event) => {
                    handleChange(event); // Default handleChange function to update the selected value
                    setPostulacion2Selected(true); // Set the variable to true when the MenuItem 1 is selected
                  }}
                  onBlur={handleBlur}
                  name="contratacion"
                  error={!!touched.contratacion && !!errors.contratacion}
                  disabled={!postulacion1Selected} // Disable the MenuItem until MenuItem 1 is selected
                >
                  {contratacion.length > 0 ? (
                    contratacion.map((option) => (
                      <MenuItem key={option.con_id} value={option.con_nombre}>
                        {option.con_nombre}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando postulaciones...</MenuItem>
                  )}
                </Select>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Seleccionar Campo Específico:
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  value={values.campoEspecifico}
                  onChange={(event) => {
                    handleChange(event); // Default handleChange function to update the selected value
                    setPostulacion3Selected(true); // Set the variable to true when the MenuItem 1 is selected
                  }}
                  onBlur={handleBlur}
                  name="personalAcademico"
                  error={
                    !!touched.campoEspecifico && !!errors.campoEspecifico
                  }
                  disabled={!postulacion2Selected} // Disable the MenuItem until MenuItem 1 is selected
                >
                  {campoEspecifico.length > 0 ? (
                    campoEspecifico.map((option) => (
                      <MenuItem key={option.ce_id} value={option.ce_nombre}>
                        {option.ce_nombre}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando campo estpecífico...</MenuItem>
                  )}
                </Select>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Seleccionar Campo Amplio:
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  value={values.campoAmplio}
                  onChange={(event) => {
                    handleChange(event); // Default handleChange function to update the selected value
                    setPostulacion4Selected(true); // Set the variable to true when the MenuItem 1 is selected
                  }}
                  onBlur={handleBlur}
                  name="campoAmplio"
                  error={
                    !!touched.campoAmplio && !!errors.campoAmplio
                  }
                  disabled={!postulacion3Selected} // Disable the MenuItem until MenuItem 1 is selected
                >
                  {campoAmplio.length > 0 ? (
                    campoAmplio.map((option) => (
                      <MenuItem key={option.ca_id} value={option.ca_nombre}>
                        {option.ca_nombre}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando postulaciones...</MenuItem>
                  )}
                </Select>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Seleccionar Sede:
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  value={values.sede}
                  onChange={(event) => {
                    handleChange(event); // Default handleChange function to update the selected value
                    setPostulacion5Selected(true); // Set the variable to true when the MenuItem 1 is selected
                  }}
                  onBlur={handleBlur}
                  name="sede"
                  error={
                    !!touched.sede && !!errors.sede
                  }
                  disabled={!postulacion4Selected} // Disable the MenuItem until MenuItem 1 is selected
                >
                  {sede.length > 0 ? (
                    sede.map((option) => (
                      <MenuItem key={option.sede_id} value={option.sede_nombre}>
                        {option.sede_nombre}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando postulaciones...</MenuItem>
                  )}
                </Select>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Seleccionar Departamento:
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  value={values.departamento}
                  onChange={(event) => {
                    handleChange(event); // Default handleChange function to update the selected value
                    setPostulacion6Selected(true); // Set the variable to true when the MenuItem 1 is selected
                  }}
                  onBlur={handleBlur}
                  name="departamento"
                  error={
                    !!touched.departamento && !!errors.departamento
                  }
                  disabled={!postulacion5Selected} // Disable the MenuItem until MenuItem 1 is selected
                >
                  {departamento.length > 0 ? (
                    departamento.map((option) => (
                      <MenuItem key={option.dept_id} value={option.dept_nombre}>
                        {option.dept_nombre +" - "+ option.dept_descripcion}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando postulaciones...</MenuItem>
                  )}
                </Select>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Seleccionar Tipo de Personal Académico:
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  value={values.personalAcademico}
                  onChange={(event) => {
                    handleChange(event);
                    setPostulacion7Selected(true); 
                  }}
                  onBlur={handleBlur}
                  name="personalAcademico"
                  error={
                    !!touched.personalAcademico && !!errors.personalAcademico
                  }
                  disabled={!postulacion6Selected} 
                >
                  {personalAcademico.length > 0 ? (
                    personalAcademico.map((option) => (
                      <MenuItem key={option.pa_id} value={option.pa_nombre}>
                        {option.pa_nombre}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando postulaciones...</MenuItem>
                  )}
                </Select>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Seleccionar Actividad:
                </Typography>
                <Select
                  fullWidth
                  variant="filled"
                  value={values.actividad}
                  onChange={(event) => {
                    handleChange(event); 
                  }}
                  onBlur={handleBlur}
                  name="actividad"
                  error={
                    !!touched.actividad && !!errors.actividad
                  }
                  disabled={!postulacion7Selected} // Disable the MenuItem until MenuItem 1 is selected
                >
                  {actividad.length > 0 ? (
                    actividad.map((option) => (
                      <MenuItem key={option.act_id} value={option.act_nombre}>
                        {option.act_nombre}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Cargando actividades...</MenuItem>
                  )}
                </Select>
              </Box>
              <Box display="flex" justify-content="space-between" gap>
                <Card sx={{ maxWidth: 220 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        justify-content="center"
                      >
                        Vacantes
                      </Typography>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="Vacantes"
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: 220 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Tiempo
                      </Typography>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="Tiempo"
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>

              <Box display="flex" justifyContent="center">
                <PopUpPostulacion type="submit" color="primary" variant="contained" values={seleccionados}>
                  Enviar
                </PopUpPostulacion>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const formSchema = yup.object().shape({
  postulation: yup.string().required("Campo requerido"),
  contratacion: yup.string().required("Campo requerido"),
  personalAcademico: yup.string().required("Campo requerido"),
  textoVacio: yup.string().required("Campo requerido"),
});

const initialValues = {
  postulation: "",
  contratacion: "",
  personalAcademico: "",
  textoVacio: "",
};

export default FormularioPostulacion;
