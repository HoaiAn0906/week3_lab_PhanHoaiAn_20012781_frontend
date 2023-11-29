import { BaseApi } from '@/api/base'

export class JobsAPI extends BaseApi {
    getJobs(params: any): Promise<any> {
        return this.get('/jobs', { params })
    }

    getJob(id: any): Promise<any> {
        return this.get(`/jobs/${id}`)
    }

    createJob(data: any): Promise<any> {
        return this.post('/jobs', data)
    }

    deleteJob(id: any): Promise<any> {
        return this.delete(`/jobs/${id}`)
    }
}
