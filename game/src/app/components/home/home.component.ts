import { Component, OnDestroy, OnInit } from '@angular/core';
import { APIResponse, Game } from '../../models/models';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  sort: string = '';
  games: Game[] = [];
  subs = new Subscription();

  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router,
              ) {
  }

  ngOnInit(): void {
    this.subs.add(this._route.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacritic', params['game-search'])
      } else {
        this.searchGames('metacritic');
      }
    }))
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  searchGames(sort: string, search?: string) {
    this.subs.add(this._httpService.getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList)
      })
    )
  }

  openGameDetails(id: any) {
    this._router.navigate(['details', id])
  }
}
