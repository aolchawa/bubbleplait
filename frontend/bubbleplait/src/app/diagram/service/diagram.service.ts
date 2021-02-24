import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DiagramData } from '../model/diagram-data';
import { Link } from '../model/link';
import { Node } from '../model/node';

@Injectable({
  providedIn: 'root'
})
export class DiagramService {

  private _diagramData$: Subject<DiagramData>;

  private _highlightedRoute$: Subject<string> = new Subject<string>();

  constructor(private _http: HttpClient) {
    this._diagramData$ = new Subject<DiagramData>();
  }

  public highlightRoute(value: string): void {
    this._highlightedRoute$.next(value);
  }

  public getHighlightedRoute$(): Subject<string> {
    return this._highlightedRoute$;
  }

  public retrieveData() {
    this._http.get('http://localhost:8000/diagram/').subscribe(response => {

      const jsonNodes = response["nodes"];
      const jsonLinks = response["links"];

      let nodes: Node[] = this.readJsonNodes(jsonNodes);
      let links: Link[] = this.readJsonLinks(jsonLinks);

      let diagramData = new DiagramData(nodes, links);
      this._diagramData$.next(diagramData);
    });
  }

  public getDiagramData$(): Subject<DiagramData> {
    return this._diagramData$;
  }

  private readJsonNodes(jsonNodes: string): Node[] {
    let nodes: Node[] = [];

    for (let node of jsonNodes) {
      const id = node['pk']
      const label = node['fields']['label'];
      nodes.push(new Node(id, label));
    }

    return nodes;
  }

  private readJsonLinks(jsonLinks: string): Link[] {
    let links: Link[] = [];

    for (let link of jsonLinks) {
      const id = link['pk']
      const node_from = link['fields']['node_from'];
      const node_to = link['fields']['node_to'];
      const label = link['fields']['label']
      const arrows = link['fields']['arrows']
      links.push(new Link(
        id,
        node_from,
        node_to,
        label,
        arrows));
    }

    return links;
  }
}