import axios from 'axios'
import { MarketingTask } from '../utils/types'

/**
 * Calls API server to retrieve marketing task data given task ID.
 *
 * @param taskId the marketing task ID.
 */
export const getMarketingTaskData = async (taskId: string): Promise<MarketingTask> => {
  return (await axios.get(`/api/tasks/${taskId}`)).data
}
