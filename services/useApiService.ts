import { useCallback } from 'react';

import { useFetch } from '@/hooks/useFetch';
import { RagmanAssistant } from '@/types/assistant';

export interface GetModelsRequestProps {
  key: string;
}

export interface GetAssistantsResponseProps {
  status: string;
  data: Object;
}

const useApiService = () => {
  const fetchService = useFetch();

  // const getModels = useCallback(
  // 	(
  // 		params: GetManagementRoutineInstanceDetailedParams,
  // 		signal?: AbortSignal
  // 	) => {
  // 		return fetchService.get<GetManagementRoutineInstanceDetailed>(
  // 			`/v1/ManagementRoutines/${params.managementRoutineId}/instances/${params.instanceId
  // 			}?sensorGroupIds=${params.sensorGroupId ?? ''}`,
  // 			{
  // 				signal,
  // 			}
  // 		);
  // 	},
  // 	[fetchService]
  // );

  const getModels = useCallback(
    (params: GetModelsRequestProps, signal?: AbortSignal) => {
      return fetchService.post<GetModelsRequestProps>(`/api/models`, {
        body: { key: params.key },
        headers: {
          'Content-Type': 'application/json',
        },
        signal,
      });
    },
    [fetchService],
  );

  const getAssistants = 
    async () => {
      var data = await fetchService.get<GetAssistantsResponseProps>(`/api/assistants`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("getAssistants");
      console.log(data);
      return data.data as RagmanAssistant[];
    }
  

  return {
    getModels, getAssistants,
  };

};

export default useApiService;
