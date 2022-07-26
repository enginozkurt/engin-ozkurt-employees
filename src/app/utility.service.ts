import { Injectable } from '@angular/core';

import { catchError } from 'rxjs';
import { Project } from './models/Project';
import { Teams } from './models/Teams';

/* This class is a utiliy service that contains the commonly required medthod and variables*/
@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  /* The source file that contains the data */
  inputFile!: File;
  constructor() {}

  /**
   * It takes a file, reads it, and returns an array of strings
   * @param {File} file - File - the file that you want to parse
   * @returns A promise that resolves to an array of strings.
   */
  cvsFileParser(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const lines = e.target.result.split('\n');
        const result: String[] = [];
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].length > 0 && this.isFirstCharIsNumber(lines[i])) {
            result.push(lines[i]);
          }
        }
        resolve(result);
      };
      reader.readAsText(file);
    });
  }

  /**
   * It returns true if the first character of the string is a number
   * @param {string} str - The string to be tested.
   * @returns function isFirstCharIsNumber(str) {
   *     return /^\d/.test(str);
   *   }
   */
  isFirstCharIsNumber(str: string) {
    return /^\d/.test(str);
  }

  projectMaker(projectList: string[]) {
    let list: Project[] = [];
    projectList.forEach((element) => {
      let project = new Project();
      var splitted = element.split(',');
      splitted[3] = splitted[3].replace('\r', '');
      console.log(splitted);
      let date: Date;
      if (splitted[3] == 'NULL') {
        date = new Date();
      } else {
        date = new Date(splitted[3]);
      }
      //  console.log(Number(splitted[1]),this.datepipe.transform(splitted[2], 'yyyy-MM-dd'),this.datepipe.transform(date, 'yyyy-MM-dd'))
      project = new Project();
      project.ProjectID = Number(splitted[1]);
      project.DateFrom = new Date(splitted[2]);
      project.DateTo = date;
      list.push(project);
    });
    list = this.projectMerger(list);
    return list;
  }
  projectMerger(projectList: Project[]): Project[] {
    let list: Project[] = [];

    projectList.forEach((element) => {
      let project = new Project();
      project = element;
      if (list.length == 0) {
        list.push(project);
        return;
      }
      let flag = 0;
      for (let j = 0; j < list.length; j++) {
        if (list[j].ProjectID == project.ProjectID) {
          flag = 1;
          project.DateFrom < list[j].DateFrom
            ? (list[j].DateFrom = project.DateFrom)
            : null;
          project.DateTo > list[j].DateTo
            ? (list[j].DateTo = project.DateTo)
            : null;
        }
        
      }
      if (flag == 0) {
        list.push(project);
      }
    });

    return list;
  }
  teamMaker(teamList: string[]) {
    
    let list:Teams[] = [];

    teamList.forEach((element) => {


      let team = new Teams();
      
      var splitted = element.split(',');
      splitted[3] = splitted[3].replace('\r', '');
      

      let date: Date;
      if (splitted[3] == 'NULL') {
        date = new Date();
      } else {
        date = new Date(splitted[3]);
      }
      //  console.log(Number(splitted[1]),this.datepipe.transform(splitted[2], 'yyyy-MM-dd'),this.datepipe.transform(date, 'yyyy-MM-dd'))
     

      
        
        team.projectId = Number(splitted[1]);
        team.projectStart = new Date(splitted[2]);
        team.projectEnd = date;
      if(list.length == 0){
        team.member1 = splitted[0];
        list.push(team);
        return
      }
      let flag = 0
        for(let i = 0; i < list.length; i++){
          if(list[i].projectId == team.projectId){
            if(list[i].member1 != splitted[0]){
                if(list[i].member2 == null){
                  list[i].member2 =splitted[0];
                }
                if(list[i].projectStart > team.projectStart){
                  list[i].projectStart = team.projectStart;
                }
                if(list[i].projectEnd < team.projectEnd){
                  list[i].projectEnd = team.projectEnd;
                }
                
            }
            flag = 1;
            
          }
        }
        if(flag == 0){
          team.member1 = splitted[0];
          list.push(team);
        }
        
     
      
    });
    return list;

  }
  topTeam(teamList: Teams[]){
    let team:Teams = new Teams();
    teamList.forEach((element) => {
      if(team.projectDays == null){
        team = element;
      }
      if(team.projectDays < element.projectDays){
        team = element;
      }});
    return team;
  }
}
