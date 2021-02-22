import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Network, DataSet } from 'vis';
import { Link } from './model/link';
import { Node } from './model/node';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit, AfterViewInit {
  @ViewChild('network') el: ElementRef;
  private networkInstance: any;

  // Data Model
  private _nodeList: Node[];
  private _linkList: Link[];

  constructor(private http: HttpClient) {
    this._nodeList = [];
    this._linkList = [];
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.displayNetwork();
  }

  private displayNetwork() {
    this.http.get('/diagram/').subscribe(response => {
      const nodes_json = response["nodes"];
      const links_json = response["links"];

      for (let node of nodes_json) {
        const id = node['pk']
        const label = node['fields']['label'];
        this._nodeList.push(new Node(id, label));
      }

      for (let link of links_json) {
        const id = link['pk']
        const node_from = link['fields']['node_from'];
        const node_to = link['fields']['node_to'];
        const label = link['fields']['label']
        const arrows = link['fields']['arrows']
        this._linkList.push(new Link(
          id,
          node_from,
          node_to,
          label,
          arrows));
      }

      const container = this.el.nativeElement;

      let nodes = new DataSet<Node>(this._nodeList);
      let edges = new DataSet<Link>(this._linkList);

      const data = { nodes, edges };

      let options = {};

      this.networkInstance = new Network(container, data, options);

      for (let link of this._linkList) {
        if (link.label == 'label1') {
          this.networkInstance.body.data.edges.update({ id: link.id, color: { color: '#ff383f', highlight: '#ff383f' } });
        }
      }
    });

  }

}
