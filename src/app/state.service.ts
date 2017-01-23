import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { List } from 'immutable';
import { merge } from 'ramda';
import { Link, D3Node } from '../non-angular/interfaces/twiglet';
import {
  BackendService,
  BackendServiceStub,
  ChangeLogService,
  ChangeLogServiceStub,
  ModelService,
  ModelServiceStub,
  UserStateService,
  TwigletService,
  TwigletServiceStub,
} from '../non-angular/services-helpers';

@Injectable()
export class StateService {
  private apiUrl: string = 'http://localhost:3000';
  public twiglet: TwigletService;
  public userState: UserStateService;
  public backendService: BackendService;
  server = {};

  constructor(private http: Http) {
    this.userState = new UserStateService();
    this.twiglet = new TwigletService(http, this.userState);
    this.backendService = new BackendService(http);
  }

  logIn(body) {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let url = this.apiUrl + '/login';

    return this.http.post(url, body, options).map((res: Response) => {
      res.json();
      console.log(res);
    });
  }
}

export class StateServiceStub {
  public twiglet: TwigletService;
  public userState: UserStateService;
  public backendService: BackendService;

  constructor(private http: Http) {
    this.userState = new UserStateService();
    this.twiglet = new TwigletServiceStub(http, this.userState);
    this.backendService = new BackendServiceStub(http);
  }

  loadTwiglet(id, name) {

  }

  getTwiglets() {
    return Observable.of([ { _id: 'id1', name: 'name1'}, { _id: 'id2', name: 'name2' } ]);
  }
}
