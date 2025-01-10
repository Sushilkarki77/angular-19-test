import { Injectable } from '@angular/core';
import { ResultObject, Team, TeamsMap } from './app-state.service';

@Injectable({
  providedIn: 'root'
})
export class TableUtilsService {

  processTableData(resultRawData: Array<ResultObject>): Array<Team> {
      if (resultRawData.length == 0) { return []; }

      const teamMap: TeamsMap = {};
  
      resultRawData.forEach(key => {
  
        const team: Team = teamMap[key.teamOne.toLowerCase()] ? teamMap[key.teamOne.toLowerCase()] : {
          name: key.teamOne,
          points: 0,
          goalDifference: 0,
          numberOfMatch: 0,
          win: 0,
          loose: 0,
          tie: 0
        }
  
        const team2: Team = teamMap[key.teamTwo.toLowerCase()] ? teamMap[key.teamTwo.toLowerCase()] : {
          name: key.teamTwo,
          points: 0,
          goalDifference: 0,
          numberOfMatch: 0,
          win: 0,
          loose: 0,
          tie: 0
        }
  
  
        if (key.score > key.score2) {
          team.win = team.win + 1;
          team.goalDifference = team.goalDifference + (key.score - key.score2);
          team.points = team.points + 3;
          team.numberOfMatch = team.numberOfMatch + 1;
  
          team2.loose = team2.loose + 1;
          team2.goalDifference = team2.goalDifference + (key.score2 - key.score);
          team2.numberOfMatch = team2.numberOfMatch + 1;
        } else if (key.score2 > key.score) {
  
          team2.win = team2.win + 1;
          team2.goalDifference = team2.goalDifference + (key.score2 - key.score);
          team2.points = team2.points + 3;
          team2.numberOfMatch = team2.numberOfMatch + 1;
  
          team.loose = team.loose + 1;
          team.goalDifference = team.goalDifference + (key.score - key.score2);
          team.numberOfMatch = team.numberOfMatch + 1;
        } else {
          team.tie = team.tie + 1;
          team2.tie = team2.tie + 1;
          team.numberOfMatch = team.numberOfMatch + 1;
  
  
          team.points = team.points + 1;
          team2.points = team2.points + 1;
          team2.numberOfMatch = team2.numberOfMatch + 1;
  
        }
  
        teamMap[key.teamOne.toLowerCase()] = team;
        teamMap[key.teamTwo.toLowerCase()] = team2;
  
      });

      return Object.values(teamMap).sort((a,b) => b.points -a.points);

  
    }
}
