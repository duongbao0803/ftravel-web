import { addCompany, getAllCompany, getCompanyDetail } from "@/api/companyApi";
import { CompanyInfo } from "@/types/company.types";
import { CustomError } from "@/types/error.types";
import { notification } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";

const useCompanyService = () => {
  const queryClient = useQueryClient();

  const fetchCompanys = async (page: number) => {
    const res = await getAllCompany(page);
    const { data, headers } = res;
    const pagination = JSON.parse(headers["x-pagination"]);
    const totalCount = pagination.TotalCount;
    return { data, totalCount };
  };

  const fetchCompanyDetail = async (companyId: number) => {
    const res = await getCompanyDetail(companyId);
    return res;
  };

  // const getInfoPostDetail = async (postId: string) => {
  //   const res = await getDetailPost(postId);
  //   return res.data.postInfo;
  // };

  // const deletePost = async (postId: string) => {
  //   await removePost(postId);
  //   return postId;
  // };

  const addNewCompany = async (formValues: CompanyInfo) => {
    await addCompany(formValues);
  };

  // const updatePostInfo = async ({
  //   postId,
  //   postInfo,
  // }: {
  //   postId: string;
  //   postInfo: PostInfo;
  // }) => {
  //   await editPostInfo(postId, postInfo);
  // };

  const { data: companyData, isLoading: isFetching } = useQuery(
    "companys",
    () => fetchCompanys(1),
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const addNewCompanyMutation = useMutation(addNewCompany, {
    onSuccess: () => {
      notification.success({
        message: "Tạo thành công",
        description: "Tạo thành phố thành công",
        duration: 2,
      });
      queryClient.invalidateQueries("companys");
    },
    onError: (err: CustomError) => {
      notification.error({
        message: "Tạo thất bại",
        description: `${err?.response?.data?.message}`,
        duration: 2,
      });
    },
  });

  const addNewCompanyItem = async (formValues: CompanyInfo) => {
    await addNewCompanyMutation.mutateAsync(formValues);
  };

  const companys = companyData?.data || [];
  const totalCount = companyData?.totalCount || 0;

  return {
    companys,
    isFetching,
    totalCount,
    addNewCompanyItem,
    fetchCompanyDetail,
  };
};

export default useCompanyService;
