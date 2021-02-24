import { Link } from "./link";
import { Node } from "./node";

export class DiagramData {
    constructor(
        public nodes: Node[],
        public links: Link[]
    ) { }
}