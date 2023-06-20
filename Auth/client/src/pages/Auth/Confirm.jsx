import {
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
  } from "@mui/material";
  import { useFormik } from "formik";
  import { paperStyle } from "./AuthStyles";
  import { singInValidations } from "./validations";
  import axios from "axios";
  import { useLocation, useNavigate } from "react-router-dom";
  
  export const ConfirmPage = ({userEmail}) => {
    const navigate = useNavigate();

    const location = useLocation();
    let email = location.state.userEmail;
    console.log("Email on confirmation page",email);
    //use Formik
    const { handleSubmit, handleChange, touched, values, errors } = useFormik({
      initialValues: {
        code: "",
      },
      onSubmit: ({ code }, bag) => {
        axios.post("http://localhost:3000/api/webuser/confirm",{
          email: email,
          code: code
        })
        .then((data)=> {
          navigate("/")
          console.log(data);
        }).catch(err=>{
          console.log(err.response?.data?.message);
        })
      },
    });
    return (
        <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid textAlign="center" marginBottom={2}>
            <Typography variant="h5" fontWeight="bold">
              Confirmation
            </Typography>
            <Typography variant="caption">
              Confirm code sent to your email 
            </Typography>
          </Grid>
          <Grid>
            {errors.general && <Alert severity="error">{errors.general}</Alert>}
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="code"
              label="Code"
              variant="standard"
              placeholder="Enter confirmation code"
              onChange={handleChange}
              value={values.code}
              error={touched.code && Boolean(errors.code)}
              helperText={touched.code && errors.code}
            />
            <Grid marginTop={3}>
              <Button
                fullWidth
                textAlign="center"
                type="submit"
                variant="contained"
                color="primary"
              >
                 Confirm
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    );
  };
  