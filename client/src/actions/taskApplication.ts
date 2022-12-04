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
 */
export const createApplication = (userId: number, taskId: number): void => {
  axios
    .post('/api/applications/', { influencer: userId, marketingTaskId: taskId }, getRequestConfig())
    .then(response => console.log(response))
    .catch(error => console.log(error))
}

export const deleteApplication = (): void => {

}

export const getApplication = (): void => {

}
