import { Link, useParams } from "react-router";
import { Title } from "../../components/shared/Title"
import { useRoles } from "../../hooks/useRoles";
import { FormikProvider, useFormik } from "formik";
import { rolesInitialValues, roleValidationSchema } from "../../../infrastructure/validations/role.validation";
import { useEffect } from "react";
import { Loader } from "../../components/shared/Loader";

export const EditRolePage = () => {
    const { roleId } = useParams();


    const { oneRoleQuery, editRoleMutation } = useRoles(roleId);

    const formik = useFormik({
        initialValues: rolesInitialValues,
        validationSchema: roleValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (formValues) => {
            editRoleMutation.mutate(formValues);            
        }
    });

    useEffect(() => {
        if (oneRoleQuery.isFetched && oneRoleQuery.data?.data) {
            const { name, description } = oneRoleQuery.data.data;

            formik.setValues({
                name: name,
                description : description
            });
        }
    }, [oneRoleQuery.isFetched, oneRoleQuery.data]);

    if (oneRoleQuery.isLoading) {
        return <Loader />
    }

    return (
        <div className="w-full flex flex-col">
            <Title text="Editar Rol" />

            {editRoleMutation.isError && (
                <div className="bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <span>{editRoleMutation.error.message}</span>
                </div>
            )}

            <FormikProvider value={formik} >
                <form onSubmit={formik.handleSubmit} className="mt-6 w-full">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-500 leading-tight focus:outline-none"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className="text-red-500 text-xs mt-1">
                                {formik.errors.name}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="descripcion" className="block text-gray-700 text-sm font-bold mb-2">
                            Descripción
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-500 leading-tight focus:outline-none"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.description && formik.errors.description && (
                            <div className="text-red-500 text-xs mt-1">
                                {formik.errors.description}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center content-center justify-center gap-2">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                        >
                            Guardar
                        </button>

                        <Link
                            to="/roles"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                        >
                            Regresar
                        </Link>
                    </div>

                </form>
            </FormikProvider>

        </div>
    )
}