import { VssProject, VssUser } from '.';

export class VssContext {
  public constructor(public readonly project: VssProject, public readonly user: VssUser) {
  }
}
