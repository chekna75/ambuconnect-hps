import { BaseService } from '../services/base/BaseService';
import { CheckHealthData } from "./data-contracts";
import { AxiosError } from "axios";

export class Brain extends BaseService {
  private static instance: Brain;

  private constructor() {
    super();
  }

  public static getInstance(): Brain {
    if (!Brain.instance) {
      Brain.instance = new Brain();
    }
    return Brain.instance;
  }

  async checkHealth(): Promise<CheckHealthData> {
    try {
      const response = await this.api.get<CheckHealthData>('/_healthz');
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }
}
