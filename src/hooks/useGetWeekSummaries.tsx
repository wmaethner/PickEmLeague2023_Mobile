import { SummariesApi, SummarySchema } from "../apis";
import useApi from "./useApi";

export const useGetWeekSummaries = async (week: number): Promise<SummarySchema[]> => {
  const api = await useApi(SummariesApi);
  return (await api.getWeekSummary({ week })).data;
};