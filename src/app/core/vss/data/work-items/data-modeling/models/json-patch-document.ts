import { Operation } from '.';

export class JsonPatchDocument {
  public constructor(public readonly op: Operation, public readonly path: string, public readonly value: any) { }
}
