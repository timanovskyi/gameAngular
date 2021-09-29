import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor(private _router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this._router.navigate(['search', form.value.search])
  }
}
