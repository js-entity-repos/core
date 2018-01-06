import CountEntities from './signatures/CountEntities';
import CreateEntity from './signatures/CreateEntity';
import GetEntities from './signatures/GetEntities';
import GetEntity from './signatures/GetEntity';
import PatchEntity from './signatures/PatchEntity';
import RemoveEntities from './signatures/RemoveEntities';
import RemoveEntity from './signatures/RemoveEntity';
import ReplaceEntity from './signatures/ReplaceEntity';
import Entity from './types/Entity';

export default interface Facade<E extends Entity> {
  readonly getEntity: GetEntity<E>;
  readonly createEntity: CreateEntity<E>;
  readonly replaceEntity: ReplaceEntity<E>;
  readonly patchEntity: PatchEntity<E>;
  readonly removeEntity: RemoveEntity<E>;
  readonly getEntities: GetEntities<E>;
  readonly countEntities: CountEntities<E>;
  readonly removeEntities: RemoveEntities<E>;
}
