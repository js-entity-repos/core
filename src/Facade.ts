import CountEntities from './signatures/CountEntities';
import CreateEntity from './signatures/CreateEntity';
import GetEntities from './signatures/GetEntities';
import GetEntity from './signatures/GetEntity';
import OverwriteEntity from './signatures/OverwriteEntity';
import PatchEntity from './signatures/PatchEntity';
import RemoveEntities from './signatures/RemoveEntities';
import RemoveEntity from './signatures/RemoveEntity';
import UpsertEntity from './signatures/UpsertEntity';

export default interface Facade<Id, Entity> {
  readonly getEntity: GetEntity<Id, Entity>;
  readonly createEntity: CreateEntity<Id, Entity>;
  readonly overwriteEntity: OverwriteEntity<Id, Entity>;
  readonly patchEntity: PatchEntity<Id, Entity>;
  readonly removeEntity: RemoveEntity<Id>;
  readonly getEntities: GetEntities<Entity>;
  readonly countEntities: CountEntities<Entity>;
  readonly removeEntities: RemoveEntities<Entity>;
  readonly upsertEntity: UpsertEntity<Id, Entity>;
}
