import {Injectable} from '@angular/core';
import {BaseApiRepository} from "@framework";

@Injectable({providedIn: 'root'})
export class JobRepository extends BaseApiRepository {

  getAll()
}
