import { useSWRPages } from "swr";

export const useGetBlogsPages = () => {
    return useSWRPages('index-page',
    ({offset, withSWR}) => {

    }),
    () => {
        
    }
}