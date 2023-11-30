import { AxiosInstance } from 'axios'
import {JobsAPI} from "@/api/jobs";
import {CompaniesAPI} from "@/api/companies";
import {SkillsAPI} from "@/api/skills";

export class Api<T extends unknown> {
  public readonly jobs: JobsAPI
  public readonly companies: CompaniesAPI
    public readonly skills: SkillsAPI

  constructor(axios: AxiosInstance) {
    this.jobs = new JobsAPI(axios)
    this.companies = new CompaniesAPI(axios)
    this.skills = new SkillsAPI(axios)
  }
}
