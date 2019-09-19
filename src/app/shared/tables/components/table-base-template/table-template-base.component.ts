export abstract class TableTemplateBaseComponent {
  protected tryFetchingRowId(event: any): string | undefined {
    let target = <any>event.target;
    if (target) {
      while (target.localName && target.localName !== 'td') {
        target = target.parentNode;
      }

      if (target.getAttribute) {
        return target.getAttribute('data-row-id');
      }

      return undefined;
    }

    return undefined;
  }
}
