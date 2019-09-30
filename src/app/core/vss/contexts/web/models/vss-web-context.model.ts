import { VssCollection, VssProject, VssUser } from '.';

export class VssWebContext {
  public constructor(
    public readonly collection: VssCollection,
    public readonly project: VssProject,
    public readonly user: VssUser) {
  }
}
