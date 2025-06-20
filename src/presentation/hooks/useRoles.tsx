import { getPaginationRolesAction } from "../../core/actions/roles/get-pagination-roles.action";
import { useNavigate } from "react-router";
import { useState } from "react"
import { useQuery } from "@tanstack/react-query";

export const useRoles = () => {
    
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
}