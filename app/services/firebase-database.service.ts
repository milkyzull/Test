import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseDatabaseService {

  public static SENSOR_NODE = 'Sensor';
  public static ACTUATOR_NODE = 'Actuator';

  constructor(protected ngFireDb : AngularFireDatabase) { }

  public getSensorReference(): any {
    return this.ngFireDb.database.ref(FirebaseDatabaseService.SENSOR_NODE);
  }

  public getActuatorReference(): any {
    return this.ngFireDb.database.ref(FirebaseDatabaseService.ACTUATOR_NODE);
  }
}
