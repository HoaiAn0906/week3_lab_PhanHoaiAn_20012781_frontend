import { BaseApi } from '@/api/base'

export class SkillsAPI extends BaseApi {
    getSkills(params: any): Promise<any> {
        return this.get('/skills', { params })
    }
}
