import { AxiosError } from "axios";
import { ApiResponse } from "../../../infrastructure/interfaces/api.response";
import { RoleResponse } from "../../../infrastructure/interfaces/role.response";
import { RoleModel } from "../../models/role.model";
import { ApiErrorResponse } from "../../../infrastructure/interfaces/api-error.response";
import { personsApi } from "../../api/persons.api";

export const createRoleAction = async (
    role: RoleModel
): Promise<ApiResponse<RoleResponse>> => {

    try {

        const { data } = await personsApi
            .post<ApiResponse<RoleResponse>>(
                "/roles",
            role
            );

        return data;

    } catch (error) {
        const apiError = error as AxiosError<ApiErrorResponse>;

        if (apiError.response) {
            throw new Error(apiError.response.data.message)
        } else if (apiError.request) {
            throw new Error("Error de conexión.")
        } else {
            throw new Error("Error desconocido.")
        }
    }

}