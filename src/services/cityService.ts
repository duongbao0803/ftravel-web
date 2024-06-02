import { getAllCity } from "@/api/cityApi";
import { useQuery } from "react-query";

const useCityService = () => {
  // const queryClient = useQueryClient();

  const fetchCities = async (page: number) => {
    const res = await getAllCity(page);
    const { data, headers } = res;
    const pagination = JSON.parse(headers["x-pagination"]);
    const totalCount = pagination.TotalCount;
    console.log("check total count", totalCount);
    return { data, totalCount };
  };

  // const getInfoPostDetail = async (postId: string) => {
  //   const res = await getDetailPost(postId);
  //   return res.data.postInfo;
  // };

  // const deletePost = async (postId: string) => {
  //   await removePost(postId);
  //   return postId;
  // };

  // const addNewPost = async (formValues: PostInfo) => {
  //   await addPost(formValues);
  // };

  // const updatePostInfo = async ({
  //   postId,
  //   postInfo,
  // }: {
  //   postId: string;
  //   postInfo: PostInfo;
  // }) => {
  //   await editPostInfo(postId, postInfo);
  // };

  const { data: citiesData, isLoading: isFetching } = useQuery(
    ["cities", 1],
    () => fetchCities(1),
    {
      retry: 3,
      retryDelay: 5000,
    },
  );

  const cities = citiesData?.data || [];
  const totalCount = citiesData?.totalCount || 0;

  return {
    isFetching,
    cities,
    totalCount,
  };
};

export default useCityService;
