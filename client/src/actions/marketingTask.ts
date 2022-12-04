import axios, { AxiosResponse } from 'axios'
import { MarketingTask, SetState } from '../utils/types'
import { getRequestConfig } from '../utils/utils'

/**
 * Calls API server to retrieve all marketing tasks for a specific user.
 *
 * @param userId the user ID to retrieve task for.
 * @param setActiveTasks set state method that sets active marketing tasks.
 * @param setInactiveTasks set state method that sets inactive marketing tasks.
 */
export const getTasks = (
  userId: number,
  setActiveTasks: SetState<MarketingTask[]>,
  setInactiveTasks?: SetState<MarketingTask[]>
): void => {
  axios
    .get((`/api/tasks?user_id=${userId}`), getRequestConfig())
    .then((response: AxiosResponse<MarketingTask[]>) => {
      setActiveTasks(response.data.filter(task => task.active))
      if (setInactiveTasks) {
        setInactiveTasks(response.data.filter(task => !task.active))
      }
    })
    .catch(error => console.log(error))
}

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
    .then(_ => callback())
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
  axios
    .patch(`/api/tasks/${taskId}`, { active }, getRequestConfig())
    .then(_ => callback())
    .catch(error => console.log(error))
}
