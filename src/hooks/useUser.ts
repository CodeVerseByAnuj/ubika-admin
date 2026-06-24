import { useQuery } from "@tanstack/react-query";
import { userApiServices } from "@/api-services/user/api";
import { IUser } from "@/api-services/user/types";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => userApiServices.getUser<IUser>(),
    staleTime: 5 * 60 * 1000,
  });
};
