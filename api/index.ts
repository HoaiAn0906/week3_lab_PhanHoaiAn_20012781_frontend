import { AxiosInstance } from 'axios'
import {JobsAPI} from "~/api/jobs";

export class Api<T extends unknown> {
  public readonly jobs: JobsAPI

  constructor(axios: AxiosInstance) {
    this.jobs = new JobsAPI(axios)
  }
}
