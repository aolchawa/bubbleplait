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
      console.log(this._nodeList);

      for (let link of links_json) {
        const node_from = link['fields']['node_from'];
        const node_to = link['fields']['node_to'];
        this._linkList.push(new Link(node_from, node_to));
      }
      console.log(this._linkList);

      const container = this.el.nativeElement;

      let nodes = new DataSet<any>(this._nodeList);
      let edges = new DataSet<Link>(this._linkList);

      const data = { nodes, edges };

      this.networkInstance = new Network(container, data, {});
    });



  }

}
