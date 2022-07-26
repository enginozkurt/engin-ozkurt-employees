import { Teams } from './models/Teams';
import { Component, EventEmitter, Output, ɵisListLikeIterable } from '@angular/core';
import { Project } from './models/Project';
import { UtilityService } from './utility.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employees';
  draggedFiles: any;
  txtData: string[];
  displayableData: string;
  projectList: Project[] = [];
  teamList: Teams[] = [];
  teamtop:Teams= new Teams()
  constructor(private utility:UtilityService,private datepipe: DatePipe) { 
    this.txtData = [];
    this.displayableData = "";
  }

  error!: string;
  fileChanged(event: any){
    
    if(this.utility.inputFile!=null){ 
      this.utility.cvsFileParser(this.utility.inputFile).then((data: any) => {this.txtData = data;});
      console.log("this.txtData = "+this.txtData);

      this.txtData.forEach(element => {
        this.displayableData+=element + '\n';
      });
        
    }
    

  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      let files: FileList = event.target.files;
      this.saveFiles(files,event);
      this.fileChanged(event);
    }else{
      this.error = "No files selected";
    }
  }

  saveFiles(files: FileList, event: any) {
    
    if (files.length > 1) {
      this.error = "Only one file at time allow";
      return false;
    }else {
      this.utility.inputFile = files[0];
      this.error = "";
      this.draggedFiles = files     
    }
    

    return true;
  }
   list:string[] = [];
   project:Project | undefined ;
  onClickSubmit(event: any){
    
    this.projectList = this.utility.projectMaker(this.txtData);
   this.teamList = this.utility.teamMaker(this.txtData);
   console.log("teams");
   
   console.log(this.teamList)
   this.teamtop  = this.utility.topTeam(this.teamList);
  }
  
  
}
