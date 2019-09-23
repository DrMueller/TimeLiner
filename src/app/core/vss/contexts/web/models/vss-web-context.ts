import { VssProject, VssUser } from '.';

export class VssWebContext {
  public constructor(public readonly project: VssProject, public readonly user: VssUser) {
  }
}
