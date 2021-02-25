export class Link {
  constructor(
    public id: number,
    public from: any,
    public to: any,
    public label: string,
    public arrows: string,
    // private physics: boolean = false,
    // private smooth = { enabled: true, type: 'vertical'}
  ) { }
}
