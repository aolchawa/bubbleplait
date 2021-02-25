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
            color: 'gray',
            highlight: 'gray'
          },
          font: {
            color: 'white',
            strokeWidth: 0,
          }
        },
        physics:{
          enabled: true,
          barnesHut: {
            theta: 0.5,
            gravitationalConstant: -100,
            centralGravity: 0.0,
            springLength: 95,
            springConstant: 0.04,
            damping: 1,
            avoidOverlap: 0
          },
          forceAtlas2Based: {
            theta: 0.5,
            gravitationalConstant: -50,
            centralGravity: 0.01,
            springConstant: 0.08,
            springLength: 100,
            damping: 0.4,
            avoidOverlap: 0
          },
          repulsion: {
            centralGravity: 0.2,
            springLength: 200,
            springConstant: 0.05,
            nodeDistance: 100,
            damping: 0.09
          },
          hierarchicalRepulsion: {
            centralGravity: 0.0,
            springLength: 100,
            springConstant: 0.01,
            nodeDistance: 120,
            damping: 0.09,
            avoidOverlap: 0
          },
          maxVelocity: 50,
          minVelocity: 0.1,
          solver: 'barnesHut',
          stabilization: {
            enabled: true,
            iterations: 1000,
            updateInterval: 100,
            onlyDynamicEdges: false,
            fit: true
          },
          timestep: 0.5,
          adaptiveTimestep: true,
          wind: { x: 0, y: 0 }
        }
      };

      this._networkInstance = new Network(container, data, options);
    });
    
    this._diagramService.retrieveData();
  }

  private highlightRoute(label: string): void {
    for (let link of this._diagramData.links) {
      if (label == null) {
        this._networkInstance.body.data.edges.update({ id: link.id, color: { color: 'gray', highlight: 'gray' }, hidden: false });        
      } else if (link.label == label) {
        this._networkInstance.body.data.edges.update({ id: link.id, color: { color: 'red', highlight: 'red' }, hidden: false});
      } else {
        this._networkInstance.body.data.edges.update({ id: link.id, hidden: true });
      }
    }
  }

}
