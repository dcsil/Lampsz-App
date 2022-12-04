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

/**
 * Calls API server to update or create marketing task with given data.
 *
 * @param data marketing task data.
 * @param callback callback function for successful API call.
 * @param isCreate flag to determine create or edit operation.
 * @param taskId the ID of the task being edited.
 */
export const updateMarketingTask = (
  data: FormData,
  callback: VoidFunction,
  isCreate: boolean,
  taskId?: number
): void => {
  const promise = isCreate
    ? axios.post('/api/tasks/', data, getRequestConfig())
    : axios.put(`/api/tasks/${taskId!}`, data, getRequestConfig())

  promise
    .then(_ => callback())
    .catch(error => console.log(error))
}

/**
 * Calls API server to permanently delete marketing task of given ID.
 *
 * @param taskId the ID of the task being deleted.
 * @param callback callback function for successful API call.
 */
export const deleteMarketingTask = (taskId: number, callback: VoidFunction): void => {
  axios
    .delete(`/api/tasks/${taskId}`, getRequestConfig())
    .then(response => {
      callback()
      console.log(response)
    })
    .catch(error => console.log(error))
}

/**
 * Calls API server to close the marketing task of given ID.
 *
 * @param taskId the ID of the task being closed.
 * @param active flag to determine whether the marketing task is active or not.
 * @param callback callback function for successful API call.
 */
export const changeMarketingTaskState = (taskId: number, active: boolean, callback: VoidFunction): void => {
  console.log("got here")
  axios
    .patch(`/api/tasks/${taskId}`, { active }, getRequestConfig())
    .then(response => {
      callback()
      console.log(response)
    })
    .catch(error => console.log(error))
}
