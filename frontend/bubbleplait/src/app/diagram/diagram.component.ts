import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Network, DataSet } from 'vis';
import { DiagramData } from './model/diagram-data';
import { Link } from './model/link';
import { Node } from './model/node';
import { DiagramService } from './service/diagram.service';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit, OnDestroy {
  @ViewChild('network') el: ElementRef;

  private _networkInstance: any;

  private _diagramData$: Subscription;
  private _diagramData: DiagramData;

  private _highlightedRoute$: Subscription;

  constructor(private _diagramService: DiagramService) {
    this._diagramData$ = null;
    this._highlightedRoute$ = this._diagramService.getHighlightedRoute$().subscribe(label => {
      this.highlightRoute(label);
    });
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.displayNetwork();
  }

  ngOnDestroy(): void {
    if (this._diagramData$ != null) {
      this._diagramData$.unsubscribe();
    }

    if (this._highlightedRoute$ != null) {
      this._highlightedRoute$.unsubscribe();
    }
  }

  private displayNetwork() {
    this._diagramData$ = this._diagramService.getDiagramData$().subscribe(diagramData => {
      this._diagramData = diagramData;

      const container = this.el.nativeElement;

      let nodes = new DataSet<Node>(diagramData.nodes);
      let edges = new DataSet<Link>(diagramData.links);

      const data = { nodes, edges };

      let options = {
        edges: {
          color: {
            color: 'black',
            highlight: 'black'
          }
        }
      };

      this._networkInstance = new Network(container, data, options);
    });
    this._diagramService.retrieveData();
  }

  private highlightRoute(label: string): void {
    for (let link of this._diagramData.links) {
      if (link.label == label) {
        this._networkInstance.body.data.edges.update({ id: link.id, color: { color: '#ff383f', highlight: '#ff383f' } });
      } else {
        this._networkInstance.body.data.edges.update({ id: link.id, color: { color: 'black', highlight: 'black' } });
      }
    }
  }

}
