import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../../models/models';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  // @ts-ignore
  game: Game;
  gameId: string = '';
  gamRating: any = 0;
  subs = new Subscription();

  constructor(private _route: ActivatedRoute,
              private _service: HttpService,

              ) { }

  ngOnInit(): void {
    this.subs.add(
      this._route.params
        .subscribe(p => {
          this.gameId = p['id'];
          this._getGameDetails(this.gameId);
        })
    )

  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  getColor(gamRating: number): string {
    if (gamRating > 75) {
      return '#5ee432'
    } else if (gamRating> 50) {
      return '#fffa50'
    } else if (gamRating> 30) {
      return '#f7aa38'
    } else {
      return '#ef4655'
    }
  }

  private _getGameDetails(gameId: string) {
    this.subs.add(this._service.getGameDetails(gameId)
      .subscribe((g) => {
        this.game = g;

        setTimeout(() => {
          this.gamRating = this.game.metacritic
        }, 1000)
      })
    )
  }
}
