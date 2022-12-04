import axios from 'axios'
import { MarketingTask } from '../utils/types'
import { getRequestConfig } from '../utils/utils'

/**
 * Calls API server to retrieve marketing task data given task ID.
 *
 * @param taskId the marketing task ID.
 */
export const getMarketingTaskData = async (taskId: string): Promise<MarketingTask> => {
  return (await axios.get(`/api/tasks/${taskId}`)).data
}

export const updateMarketingTask = (
  data: FormData, callback: VoidFunction, isCreate: boolean, taskId?: number
): void => {
  const promise = isCreate
    ? axios.post('/api/tasks/', data, getRequestConfig())
    : axios.put(`/api/tasks/${taskId!}`, data, getRequestConfig())

  promise
    .then(_ => callback())
    .catch(error => console.log(error))
}
