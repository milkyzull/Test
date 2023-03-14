import { Component, OnInit } from '@angular/core';
import { FirebaseDatabaseService } from '../services/firebase-database.service';

@Component({
  selector: 'app-home', 
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public ServoStatus: string;
  public MotionStatus: string;
  public RFIDStatus: number;
  private timer:any;

  public servoStatus : any = {
    on : 'Unlock',
    off : 'Lock'
  }
  public currentServoStatus : string;
  public isServoToggled : boolean;
 
  constructor(protected fbDbService: FirebaseDatabaseService) { }

  ngOnInit() {
    this.loadServoStatusData();
    this.loadMotionStatusData();
    this.loadRFIDStatusData();
  }

  public toggleServo(toggle : boolean) {
    if(toggle) {
      this.currentServoStatus = this.servoStatus.on;
      this.fbDbService.getActuatorReference().child("Servo").set(this.currentServoStatus);
    }else{
      this.currentServoStatus = this.servoStatus.off;
      this.fbDbService.getActuatorReference().child("Servo").set(this.currentServoStatus);
    }
  }

  public submitServoValue(value : string) {
    this.fbDbService.getActuatorReference().child("Servo").set(value);
  }
  private loadServoStatusData() : any {
    const servoValueDataReference = this.fbDbService.getActuatorReference();
    servoValueDataReference.child("Servo").on('value', (snapshot) => {
      this.ServoStatus = snapshot.val();
      this.currentServoStatus = snapshot.val();
      if(this.currentServoStatus == this.servoStatus.on) {
        this.isServoToggled = true;
      }else {
        this.isServoToggled = false;
      }
    });
  }

  private loadMotionStatusData(): any {
    const MotionStatusDataReference = this.fbDbService.getSensorReference();
    MotionStatusDataReference.child("PIR").on('value',(snapshot) =>{
    this.MotionStatus = snapshot.val();
  });
  }

  private loadRFIDStatusData(): any {
    const RFIDStatusDataReference = this.fbDbService.getSensorReference();
    RFIDStatusDataReference.child("RFID").on('value',(snapshot) =>{
    this.RFIDStatus = snapshot.val();
  });
  }
 
}
