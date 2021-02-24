import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DiagramService } from 'src/app/diagram/service/diagram.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();

  private _diagramData$: Subscription;
  private _linkLabels: string[];

  constructor(
    private _diagramService: DiagramService
  ) {
    this._linkLabels = [];
    this._diagramData$ = this._diagramService.getDiagramData$().subscribe(diagramData => {
      let linkSet = new Set<string>();
      for (let link of diagramData.links) {
        linkSet.add(link.label);
      }
      this._linkLabels = Array.from(linkSet);
    });
  }

  ngOnInit(): void { }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  public highlightRoute(value: string): void {
    this._diagramService.highlightRoute(value);
  }

  public getLinks(): string[] {
    return this._linkLabels;
  }

  public ngOnDestroy(): void {
    this._diagramData$.unsubscribe();
  }
}
