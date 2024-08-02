import {
  Grid,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
  Button,
} from "@mui/material";
import ResponsiveAppBar from "../../components/ResponsiveAppBar/ResponsiveAppBar";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { useCountries } from "../../hooks/services/useCountry";
import { useAddBlog } from "../../hooks/services/useBlog";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddNewBlog = () => {
  const { data: countriesData } = useCountries();
  const [countries, setCountries] = useState("");
  const [date, setDate] = useState(dayjs());
  const navigate = useNavigate();

  const handleChange = (event) => {
    setCountries(event.target.value);
  };

  const {
    mutate: mutateAdd,
    isLoading: isLoadingAdd,
    isSuccess: isSuccessAdd,
    isError: isErrorAdd,
    error: errorAdd,
  } = useAddBlog();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      travelDate: date.format("YYYY-MM-DD"),
    };

    mutateAdd(formattedData, {
      onSuccess: () => {
        toast.success("Uspješno ste dodali blog!");

        setTimeout(() => {
          navigate("/");
        }, 3000);
      },
      onError: () =>
        toast.error("Došlo je do greške prilikom dodavanja bloga!"),
    });
  };

  useEffect(() => {
    setValue("travelDate", date);
  }, [date]);

  return (
    <div>
      <ResponsiveAppBar />
      <div
        style={{
          height: "calc(100vh - 70px)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography marginLeft="20px" marginTop="30px" variant="h4">
          Novi blog
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container columns={2} rowSpacing={3} sx={{ width: "500px" }}>
            <Grid item xs={1}>
              Naslov
            </Grid>
            <Grid item xs={1}>
              <TextField
                {...register("blogTitle")}
                style={{ width: "100%" }}
                placeholder="Naslov"
                size="small"
              />
            </Grid>
            <Grid item xs={1}>
              <Typography>Država</Typography>
            </Grid>
            <Grid item xs={1}>
              <Select
                {...register("countryId")}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={countries}
                label="Country"
                onChange={handleChange}
                fullWidth
                size="small"
              >
                {countriesData?.map((country) => (
                  <MenuItem value={country.countryId} key={country.countryId}>
                    {country.countryName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={1}>
              Datum putovanja
            </Grid>
            <Grid item xs={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    label="Izaberite datum"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={1}>
              Naslovna slika
            </Grid>
            <Grid item xs={1}>
              <TextField
                {...register("coverImageUrl")}
                style={{ width: "100%" }}
                placeholder="link"
                size="small"
              />
            </Grid>
            <Grid item xs={1}>
              Sadržaj
            </Grid>
            <Grid item xs={2}>
              <TextareaAutosize
                {...register("blogContent")}
                style={{ width: 500, height: 100, marginTop: 10 }}
              />
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Button
                type="submit"
                style={{
                  color: "black",
                  border: "black",
                  background: "lightgray",
                  borderRadius: 10,
                  width: 100,
                }}
              >
                Sačuvaj
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default AddNewBlog;
