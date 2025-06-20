import * as Yup from 'yup';

import { CountryModel } from "../../core/models/country.model";

export const countryInitialValues: CountryModel = {
    name: "",
    alphaCode3: "",
};

export const countryValidationSchema: Yup.ObjectSchema<CountryModel> =
    Yup.object({
        name: Yup.string()
            .required("El nombre es requerido.")
            .min(3, "El nombre debe tener al menos 3 caracteres.")
            .max(100, "El nombre debe tener menos de 100 caracteres."),
        alphaCode3: Yup.string()
            .required("Código alfanumérico es requerido.")
            .length(3, "El código alfanumérico debe tener exactamente 3 caracteres")
            .matches(/^[A-Z]{3}$/, "El código alfanumérico debe ser en mayúsculas"),
    });