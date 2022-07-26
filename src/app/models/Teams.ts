export class Teams{
    
    private _member1!: string
    private _member2!: string
    private _projectId!: number
    
    private _projectStart!: Date 
    private _projectEnd!: Date
    private _projectDays!: number

    public get projectId(): number {
        return this._projectId
    }
    public set projectId(value: number) {
        this._projectId = value
    }

    public get projectEnd(): Date {
        return this._projectEnd
    }
    public set projectEnd(value: Date) {
        this._projectEnd = value
        this._projectDays = this.dateDiff( this.projectEnd,this.projectStart).day;
    }
    public get projectStart(): Date {
        return this._projectStart
    }
    public set projectStart(value: Date) {
        this._projectStart = value
    }
    

    
    
    public get member1(): string {
        return this._member1
    }
    public set member1(value: string) {
        this._member1 = value
    }
    
    public get member2(): string {
        return this._member2
    }
    public set member2(value: string) {
        this._member2 = value
    }
    
    public get projectDays(): number {
        return this._projectDays
    }
    public set projectDays(value: number) {
        this._projectDays = value
    }


    toView() {
            
            return `Member 1 ${this.member1} 
            Member 2 ${this.member2} 
            Project Id ${this.projectId} 
            StartDate ${this.projectStart.toLocaleDateString()} 
            End Date ${this.projectEnd.toLocaleDateString()} 
            Project Time ${this._projectDays}`;
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
}