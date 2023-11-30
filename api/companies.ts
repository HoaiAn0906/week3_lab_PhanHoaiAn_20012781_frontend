import { BaseApi } from '@/api/base'

export class CompaniesAPI extends BaseApi {
    getCompanies(params: any): Promise<any> {
        return this.get('/companies', { params })
    }
}
