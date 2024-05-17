import { Request, Response } from 'express';

export default class EmployeesController {
  public async create(request: Request, response: Response) {
    return response.status(200).json({});
  }
}
