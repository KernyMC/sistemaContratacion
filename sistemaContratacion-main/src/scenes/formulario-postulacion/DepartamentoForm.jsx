import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Header from "../../components/Header";
import { crearDepartamento } from "../../api/departamento";

const FormularioDept = () => {
  const [formData, setFormData] = useState({
    dept_nombre: "",
    dept_descripcion: "",
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
    const success = await crearDepartamento(formData);
    console.log(formData);
    setFormData({
      dept_nombre: "",
      dept_descripcion: "",
    });
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
          title="Formulario Departamento"
          subtitle="Complete el formulario"
        />

        <label>Departamento:</label>
        <TextField
          name="dept_nombre"
          value={formData.dept_nombre}
          onChange={handleChange}
          margin="normal"
          required
        />
        <label>Descripción:</label>
        <TextField
          name="dept_descripcion"
          value={formData.dept_descripcion}
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

export default FormularioDept;
