import { useCallback } from 'react';

import { useFetch } from '@/hooks/useFetch';
import { RagmanAssistant } from '@/types/assistant';

export interface GetModelsRequestProps {
  key: string;
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

  const getAssistants = useCallback(
    () => {
      return fetchService.get<RagmanAssistant[]>(`/api/assistants`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    [fetchService],
  );

  return {
    getModels, getAssistants,
  };

};

export default useApiService;
