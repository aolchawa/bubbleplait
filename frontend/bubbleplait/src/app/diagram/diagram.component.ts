import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Network, DataSet } from 'vis';
import { Link } from './model/link';
import { Node } from './model/node';



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

  constructor() {
    this._nodeList = [];
    this._linkList = [];
  }

  ngOnInit(): void {
    this.initDummyData();
  }

  ngAfterViewInit(): void {
    this.displayNetwork();
  }

  private displayNetwork() {
    const container = this.el.nativeElement;

    let nodes = new DataSet<any>(this._nodeList);
    let edges = new DataSet<Link>(this._linkList);

    const data = { nodes, edges };

    this.networkInstance = new Network(container, data, {});
  }

  private initDummyData(): void {
    this._nodeList = [
      new Node(1, "Node 1"),
      new Node(2, 'Node 1'),
      new Node(3, 'Node 1'),
      new Node(4, 'Node 1'),
      new Node(5, 'Node 1')
    ];

    this._linkList = [
      new Link(1, 3),
      new Link(1, 3),
      new Link(1, 2),
      new Link(2, 4),
      new Link(2, 5)
    ];
  }
}
