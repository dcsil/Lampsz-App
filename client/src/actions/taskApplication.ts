import axios from 'axios'
import { getRequestConfig } from '../utils/utils'
import { SetState, TaskApplication } from '../utils/types'

/**
 * Calls API server to retrieve all task applications of current user.
 *
 * @param setApplications set state method that sets all applications.
 */
export const getAllApplications = (setApplications: SetState<TaskApplication[]>): void => {
  axios
    .get('/api/applications/', getRequestConfig())
    .then(response => setApplications(response.data))
    .catch(error => console.log(error))
}

/**
 * Creates a new application for current influencer for task with given taskId.
 *
 * @param userId the user ID of currently authenticated user.
 * @param taskId the ID of the task that the user is applying.
 * @param callback callback function for successful API call.
 */
export const createApplication = (userId: number, taskId: number, callback: VoidFunction): void => {
  axios
    .post('/api/applications/', { influencer: userId, marketingTaskId: taskId }, getRequestConfig())
    .then(_ => callback())
    .catch(error => console.log(error))
}

/**
 * Remove current application for task with given ID.
 *
 * @param userId the user ID of currently authenticated user.
 * @param taskId the ID of the task that the user is applying.
 * @param callback callback function for successful API call.
 */
export const deleteApplication = (userId: number, taskId: number, callback: VoidFunction): void => {
  axios
    .delete(`/api/applications/${taskId}/${userId}`, getRequestConfig())
    .then(_ => callback())
    .catch(error => console.log(error))
}

/**
 * Calls API server to determine whether user applied to task with given ID or not.
 *
 * @param userId the user ID of currently authenticated user.
 * @param taskId the ID of the task that the user is applying.
 * @param setApplied
 */
export const getApplication = (userId: number, taskId: number, setApplied: SetState<boolean>): void => {
  axios
    .get(`/api/applications/${taskId}/${userId}`, getRequestConfig())
    .then(_ => setApplied(true))
    .catch(_ => setApplied(false))
}

export const getMarketingTaskApplicants = (taskId: number, callback: VoidFunction): void => {
  axios
    .get(`/api/application/${taskId}`, getRequestConfig())
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
