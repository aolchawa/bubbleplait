export class Node {
  constructor(
    public id: number,
    public label: string,
    private physics: boolean = false
  ) { }
}
