import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { ELEMENT_DATA } from '../../assets/dataSource';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ThemePalette} from '@angular/material/core';
import {MatSort} from '@angular/material/sort';
import { Observable, combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators'

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})

export class TableComponentComponent implements OnInit {
  @Input() yearFilter: Observable<string>;
  @Input() nameFilter: Observable<string>;
  @Input() genreFilter: Observable<string>;

  public displayedColumns: string[] = ["name", "season", "network", "premiere"]
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor() {}
  ngOnInit(){

    combineLatest([
      this.yearFilter.pipe(startWith('')),
      this.nameFilter.pipe(startWith('')),
      this.genreFilter.pipe(startWith(''))
    ])
      .subscribe(([year, name, genre]) => {
        this.dataSource = new MatTableDataSource(ELEMENT_DATA.filter(element => {
          return element.name.includes(name) && (element.chips.includes(genre) || !genre) && element.premiere.includes(year);
        }))
        this.dataSource.sort = this.sort;
        this.dataSource = this.dataSource;
        this.dataSource.paginator = this.paginator;
      })
  }
}
export interface ChipColor {
  name: string;
  color: ThemePalette;
}

export class ChipsStackedExample {
  availableColors: ChipColor[] = [
    {name: 'drama', color: 'primary'},
    {name: 'crime', color: 'accent'},
    {name: 'horror', color: 'accent'},
    {name: 'tragedy', color: 'warn'},
    {name: 'dark comedy', color: 'warn'},
  ];
}
