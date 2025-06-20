import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react"
import { getPaginationRolesAction } from "../../core/actions/roles/get-pagination-roles.action";
import { useNavigate } from "react-router";
import { RoleModel } from "../../core/models/role.model";
import { createRoleAction } from "../../core/actions/roles/create-roles.action";
import { editRoleAction } from "../../core/actions/roles/edit-roles.action";
import { getOneRoleAction } from "../../core/actions/roles/get-one-roles.action";
import { deleteRoleAction } from "../../core/actions/roles/delete-roles.action";

export const useRoles = (roleId?: string) => {
    
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10);
const [searchTerm, setSearchTerm] = useState("");

const navigate = useNavigate();

const rolePaginationQuery = useQuery({
    queryKey: ["roles", page, pageSize, searchTerm], // Unique key 
    queryFn: () => getPaginationRolesAction(page, pageSize, searchTerm),
    staleTime: 1000 * 60 * 5, // 5M
    refetchOnWindowFocus: false,
    
});

const oneRoleQuery = useQuery({
    queryKey: ["roles", roleId],
    queryFn: () => getOneRoleAction(roleId!),
    enabled: !!roleId,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const createRoleMutation = useMutation({
    mutationFn: (role: RoleModel) => createRoleAction(role),
    onSuccess: (data) => {
      if(data.status) {
        navigate("/roles");
      }
    },
    onError: (data) => {
      console.log(data);
    }
  });

  const editRoleMutation = useMutation({
    mutationFn: (role: RoleModel) => editRoleAction(role, roleId!),
    onSuccess: (data) => {
      if(data.status) {
        refreshRoles();
        navigate("/roles");
      }
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const deleteRoleMutation = useMutation({
    mutationFn: () => deleteRoleAction(roleId!),
    onSuccess: (data) => {
      if(data.status) {
        refreshRoles();
        navigate("/roles");
      }
    },
    onError: (data) => {
      console.log(data);
    },
  });

  const refetch = rolePaginationQuery.refetch;

  const refreshCountries = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    // Properties
    page,
    pageSize,
    searchTerm,
    rolePaginationQuery,
    oneRoleQuery,
    createRoleMutation,
    editRoleMutation,
    deleteRoleMutation,

    // Methods
    setPage,
    setPageSize,
    setSearchTerm,
    refreshCountries,
  }
}

function refreshRoles() {
  throw new Error("Function not implemented.");
}
