export class Project{

   private _ProjectID!: number 
    public get ProjectID(): number {
        return this._ProjectID
    }
    public set ProjectID(value: number) {
        this._ProjectID = value
    }
   private _DateFrom!: Date 
    public get DateFrom(): Date {
        return this._DateFrom
    }
    public set DateFrom(value: Date) {
        this._DateFrom = value
    }
   private _DateTo!: Date
    public get DateTo(): Date {
        return this._DateTo
    }
    public set DateTo(value: Date) {
        this._DateTo = value
        this.sumDate = this.dateDiff(this.DateTo, this.DateFrom).day;
    }
    private _sumDate!: number 
    public get sumDate(): number {
        return this._sumDate
    }
    public set sumDate(value: number) {
        this._sumDate = value
    }
   
    
    
    dateDiff(date1: Date, date2: Date) {
        var diff = {} as any;
        var tmp = date1.getTime() - date2.getTime();
        diff.day = Math.floor(tmp / (1000 * 60 * 60 * 24));
        diff.hour = Math.floor(tmp / (1000 * 60 * 60));
        diff.minute = Math.floor(tmp / (1000 * 60));
        diff.second = Math.floor(tmp / 1000);
        return diff;
    }

    toView() {
        
        return `Project Id ${this.ProjectID} 
StartDate ${this.DateFrom.toLocaleDateString()} 
End Date ${this.DateTo.toLocaleDateString()} 
Project Time ${this._sumDate}`;
    }
    constructor() {
        
       
    }

}