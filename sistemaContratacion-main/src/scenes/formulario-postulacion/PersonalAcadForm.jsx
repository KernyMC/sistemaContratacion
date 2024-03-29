import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { crearPersonalAcademico } from "../../api/personalAcademico";

const FormularioPacad = () => {
  const [formData, setFormData] = useState({
    pa_nombre: "",
    pa_descripcion: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await crearPersonalAcademico(formData);
    console.log(formData);
  };

  return (
    <div className="register">
      <Box
        component="form"
        bgcolor={"rgba(255, 255, 255, 0.7)"}
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "16px",
        }}
        onSubmit={handleSubmit}
      >
        <Header
          title="Formulario Personal Académico"
          subtitle="Complete el formulario"
        />

        <label>Personal Académico:</label>
        <TextField
          name="pa_nombre"
          value={formData.pa_nombre}
          onChange={handleChange}
          margin="normal"
          required
        />
        <label>Descripción:</label>
        <TextField
          name="pa_descripcion"
          value={formData.pa_descripcion}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "#36ae56", // Verde claro
            color: "#FFFFFF", // Letras blancas
            "&:hover": {
              backgroundColor: "#388E3C", // Verde oscuro al pasar el mouse
            },
          }}
        >
          {" "}
          Enviar
        </Button>
      </Box>
    </div>
  );
};

export default FormularioPacad;
