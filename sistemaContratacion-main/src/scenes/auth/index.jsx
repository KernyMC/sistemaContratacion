import React, { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../reducers/auth.slice'
import * as Components from '../../components/Components';
import EmailIcon from '@mui/icons-material/Email';

import KeyIcon from '@mui/icons-material/Key';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import PopUpRegistro from "../../components/PopUps/PopUpRegistro";



function validateIdentificationNumber(identificationNumber) {
  if (identificationNumber.length !== 10) {
    return false;
  }

  if (identificationNumber.match(/^[0-9]+$/) === null) {
    return false;
  }

  const verifierDigit = parseInt(identificationNumber.substr(9, 1));

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    const digit = parseInt(identificationNumber.substr(i, 1));
    console.log(digit);

    if (i % 2 === 0) {
      const doubled = digit * 2;
      sum += doubled >= 10 ? doubled - 9 : doubled;
    } else {
      sum += digit;
    }
  }

  const modulus = sum % 10;
  const higher = (10 - modulus) + sum;

  console.log(higher, modulus, sum);

  return modulus === 0 ? (verifierDigit === 0) : ((higher - sum) === verifierDigit);
}

function Auth() {
  const [signIn, setSignIn] = React.useState(true);
  const [fullName, setFullName] = React.useState('');
  const [identificationNumber, setIdentificationNumber] = React.useState('');
  const [identificationType, setIdentificationType] = React.useState('');
  const [senescytTitle, setSenescytTitle] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [formErrors, setFormErrors] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(false);
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const identificationInput = React.useRef(null);
  const signinForm = {
    email: React.useRef(null),
    password: React.useRef(null),
  };

  useEffect(() => {
    setCurrentPage('signin');
  }, []);

  const submitSignin = () => {
    if (signinForm.email.current.value.trim().length === 0) {
      return signinForm.email.current.focus();
    }

    if (signinForm.password.current.value.trim().length === 0) {
      return signinForm.password.current.focus();
    }

    setFormErrors([]);
    dispatch(login());
  };


  const submitRegister = () => {
    setFormErrors([]);
    setCurrentPage('signin');
    setSignIn(true);
  };

  const registerButtonClicked = () => {
    setCurrentPage('signup');
    setSignIn(true);
  }

  const registerNextClick = () => {
    if (identificationNumber.trim().length === 0) {
      return identificationInput.current.focus();
    }

    if (!validateIdentificationNumber(identificationNumber)) {
      return setFormErrors(['identificación inválida']);
    }

    setFormErrors([]);
    setFullName('DIEGO MEDARDO SAAVEDRA GARCIA');
    setIdentificationType('Cédula');
    setGender('MASCULINO');

    setSignIn(false);
  };

  const handleBackClick = () => {
    setCurrentPage('signin');
    setSignIn(true);
  }

  return (
    <div className="authPage">
      <Components.Container style={{ background: "linear-gradient(180deg, #007B49 0%, #00A650 100%)" }}>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form id="createAccount">
            <Components.Title>FORMULARIO DE ADMISIÓN PARA DOCENTES</Components.Title>
            <div className="authForm">
              <div className="row">
                <label>Nombres Completos</label>
                <span>{fullName}</span>
              </div>
              <div className="row">
                <div className="col">
                  <label>Tipo de identificación</label>
                  <span>{identificationType}</span>
                </div>
                <div className="col">
                  <label>Número de identificación</label>
                  <span>{identificationNumber}</span>
                </div>
              </div>
              <div className="row">
                <label htmlFor="gender">Sexo</label>
                <span>{gender}</span>
              </div>
              <div className="row">
                <label htmlFor="senescytTitle">Selecciona tu titulo Senescyt</label>
                <Components.TitleSelect
                  value={senescytTitle}
                  onChange={(e) => setSenescytTitle(e.target.value)}
                >
                  <option value=''>Selecciona tu título Senescyt</option>
                  <option value='Magíster'>Magíster</option>
                  <option value='Doctor/a'>Doctor/a</option>
                  <option value='Licenciado/a'>Licenciado/a</option>
                  <option value='Ingeniero/a'>Ingeniero/a</option>
                  <option value='Arquitecto/a'>Arquitecto/a</option>
                  <option value='Médico/a'>Médico/a</option>
                </Components.TitleSelect>
              </div>
              <div className="row">
                <div className="col">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="email"><EmailIcon /></label>
                    <span style={{ marginLeft: '-3px' }}>Email</span>
                  </div>
                  <Components.Input type='email' placeholder='Email' />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="password"><KeyIcon /></label>
                    <span style={{ marginLeft: '-3px' }}>Contraseña</span>
                  </div>
                
                  <Components.Input type='password' placeholder='Contraseña' />
                </div>
              </div>
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                <Components.Button type="button" onClick={handleBackClick} style={{ borderColor: "white", color: "white", marginRight: "10px" }}>
                  Volver
                </Components.Button>
                <PopUpRegistro type="button" onClick={submitRegister} style={{ backgroundColor: "#007B49", color: "white" }}>
                  
                </PopUpRegistro>
              </div>
            </div>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          {currentPage == 'signin' ? (
            <Components.Form>
              <Components.Title>Formulario de Admisión para docentes</Components.Title>
              <Components.Subtitle></Components.Subtitle>
              <div className="authForm">
                <div className="row">
                  <div className="col">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="email"><EmailIcon /></label>
                      <span style={{ marginLeft: '-3px' }}>Email</span>
                    </div>
                    <Components.Input type='email' placeholder='Email' ref={signinForm.email} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="password"><KeyIcon /></label>
                      <span style={{ marginLeft: '-3px' }}>Contraseña</span>
                  </div>
                    <Components.Input type='password' placeholder='Contraseña' ref={signinForm.password} />
                    
                  </div>
                </div>
                {formErrors.length !== 0 ? (<div className="formErrors">
                  <ul>
                    {formErrors.map((error, index) => (
                      <li>{error}</li>
                    ))}
                  </ul>
                </div>) : null}
                {/* '6Ldicg4TAAAAAEIi-Tlg7YgHxcPCNVHvac92lrdX' */}
                <div style={{ width: "50px", height: "25px" }}></div>
                {/* Use anchor attribute to navigate to the "createAccount" section */}
                <div>
                  <div className="row">
                    <Components.Button onClick={submitSignin} type='button' anchor style={{ backgroundColor: "#007B49", color: "white", marginRight: '15px' }}>
                      Ingresar
                    </Components.Button>
                    <Components.Button onClick={registerButtonClicked} type='button' anchor href="#createAccount" style={{ backgroundColor: "#007B49", color: "white" }}>
                      Registro
                    </Components.Button>
                  </div>
                </div>
              </div>
            </Components.Form>
          ) : currentPage === 'signup' ? (
            <Components.Form>
  <Components.Title>Registro</Components.Title>
  <Components.Subtitle>Ingrese su cédula</Components.Subtitle>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Components.NumericInput
      ref={identificationInput}
      value={identificationNumber}
      onChange={e => setIdentificationNumber(e.target.value)}
      type='number'
      placeholder='Cédula'
      maxDigits={10}
      style={{ marginRight: '10px' }}
    />
    <ContactEmergencyIcon style={{ color: '#777' }} />
  </div>
  {formErrors.length !== 0 ? (<div className="formErrors">
    <ul>
      {formErrors.map((error, index) => (
        <li>{error}</li>
      ))}
    </ul>
  </div>) : null}
  <ReCAPTCHA sitekey="6Ldicg4TAAAAAMXRFd5wWjZa5ihYFlmb95106bPR" size="normal" />
  {/* '6Ldicg4TAAAAAEIi-Tlg7YgHxcPCNVHvac92lrdX' */}
  <div style={{ width: "50px", height: "25px" }}></div>
  {/* Use anchor attribute to navigate to the "createAccount" section */}
  <div className="row">
    <Components.Button type="button" onClick={handleBackClick} style={{ borderColor: "white", color: "white", marginRight: "15px" }}>
      Volver
    </Components.Button>
    <Components.Button onClick={registerNextClick} type='button' anchor href="#createAccount" style={{ backgroundColor: "#007B49", color: "white" }}>
      Siguiente
    </Components.Button>
  </div>
</Components.Form>
          ) : null}
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn} style={{ background: "linear-gradient(180deg, #007B49 0%, #00A650 100%)" }}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn} style={{ 
               background: "linear-gradient(180deg, #007B49 0%, #00A650 100%)", 
                color: "white",
               marginLeft: "-44px" // Puedes ajustar el valor de marginLeft según tus necesidades
            }}>
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/27/Logo_ESPE.png" alt="ESPE" style={{ 
               maxWidth: '300px', 
              filter: 'drop-shadow(-20px 10px 5px rgba(0, 0, 0, 0.6))'
             }} />
            </Components.LeftOverlayPanel>


            <Components.RightOverlayPanel signinIn={signIn} style={{ 
              background: "linear-gradient(180deg, #007B49 0%, #00A650 100%)",
              color: "white",
              marginRight: "-44px" // Puedes ajustar el valor de marginRight según tus necesidades
              }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/27/Logo_ESPE.png" alt="ESPE" style={{ 
                   maxWidth: '350px', 
                  filter: 'drop-shadow(-20px 10px 5px rgba(0, 0, 0, 0.6))' 
                }} />
            </Components.RightOverlayPanel>

          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}

export default Auth;
