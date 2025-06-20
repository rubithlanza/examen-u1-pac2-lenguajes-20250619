import * as Yup from 'yup';
import { RoleModel } from '../../core/models/role.model';


export const rolesInitialValues: RoleModel = {
    name: "",
    description: ""

};

export const roleValidationSchema: Yup.ObjectSchema<RoleModel> =
    Yup.object({
        name: Yup.string()
            .required("El nombre es requerido.")
            .min(3, "El nombre debe tener al menos 3 caracteres.")
            .max(100, "El nombre debe tener menos de 100 caracteres."),
        description: Yup.string()
        .required("La descripción es requerida.")
        .min(15, "La descripción debe tener al menos 15 caracteres.") 
        .max(256, "La descripción debe tener menos de 256 caracteres."),  
    });