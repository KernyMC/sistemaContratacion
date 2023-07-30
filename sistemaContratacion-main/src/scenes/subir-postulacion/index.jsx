import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { PDFDocument } from "pdf-lib";

const Formulario = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [pageCounts, setPageCounts] = useState({}); // Object to store page counts

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const handleFileChange = (id) => async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async () => {
        const pdfData = new Uint8Array(reader.result);
        try {
          const pdf = await PDFDocument.load(pdfData);
          const pageCount = pdf.getPages().length;
          setPageCounts((prevCounts) => ({
            ...prevCounts,
            [id]: pageCount, // Update the page count for this id
          }));
        } catch (error) {
          console.log("Error reading the PDF file:", error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const formSchema = yup.object().shape({
    // Add validation for other fields if needed
  });

  const uploadBoxStyle = {
    width: "40px",
    height: "40px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Box m="20px" display="flex" flexDirection="column" alignItems="center">
      <Header title="Subir Información" subtitle="Complete el formulario" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{}}
        validationSchema={formSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Documento</TableCell>
                    <TableCell>Archivo</TableCell>
                    <TableCell>Número de páginas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Hoja de vida formato espe */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">
                        Hoja de vida formato espe:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange("resume")}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={uploadBoxStyle}>
                        {pageCounts["resume"] > 0 && (
                          <Typography variant="body2">
                            {pageCounts["resume"]} páginas
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                  {/* Copia de cédula */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">Copia de cédula:</Typography>
                    </TableCell>
                    <TableCell>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange("cedula")}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={uploadBoxStyle}>
                        {pageCounts["cedula"] > 0 && (
                          <Typography variant="body2">
                            {pageCounts["cedula"]} páginas
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                  {/* Certificado de votación */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">
                        Certificado de votación:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange("votingCert")}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={uploadBoxStyle}>
                        {pageCounts["votingCert"] > 0 && (
                          <Typography variant="body2">
                            {pageCounts["votingCert"]} páginas
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                  {/* Certificado de registro de título */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">
                        Certificado de registro de título:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange("titleCert")}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={uploadBoxStyle}>
                        {pageCounts["titleCert"] > 0 && (
                          <Typography variant="body2">
                            {pageCounts["titleCert"]} páginas
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                  {/* Experiencia de docente */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">
                        Experiencia de docente:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange("teacherExp")}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={uploadBoxStyle}>
                        {pageCounts["teacherExp"] > 0 && (
                          <Typography variant="body2">
                            {pageCounts["teacherExp"]} páginas
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                  {/* Certificado de no tener impedimento al ejercer cargo público */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">
                        Certificado de no tener impedimento al ejercer cargo
                        público:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange("teacherPublicImpediment")}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={uploadBoxStyle}>
                        {pageCounts["teacherPublicImpediment"] > 0 && (
                          <Typography variant="body2">
                            {pageCounts["teacherPublicImpediment"]} páginas
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                  {/* Certificado de no tener responsabilidades administrativas: */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">
                        Certificado de no tener responsabilidades
                        administrativas:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange(
                          "administrativeResponsabilities"
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={uploadBoxStyle}>
                        {pageCounts["administrativeResponsabilities"] > 0 && (
                          <Typography variant="body2">
                            {pageCounts["administrativeResponsabilities"]}{" "}
                            páginas
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                  {/* Experiencia profesional */}
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">
                        Experiencia profesional:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange("profesionalExp")}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={uploadBoxStyle}>
                        {pageCounts["profesionalExp"] > 0 && (
                          <Typography variant="body2">
                            {pageCounts["profesionalExp"]} páginas
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="primary" variant="contained">
                Confirmar postulación
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Formulario;
