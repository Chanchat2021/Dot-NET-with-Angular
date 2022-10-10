import { ITeam } from './ITeam';

export interface IEventDetails {
  description: string;
  endDate: string;
  location: number;
  name: string;
  rules: string;
  startDate: string;
  banner: string;
  createdBy: string;
  teams: ITeam[];
}
