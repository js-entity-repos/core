import CountEntities from './CountEntities';
import CreateEntity from './CreateEntity';
import GetEntities from './GetEntities';
import GetEntity from './GetEntity';
import OverwriteEntity from './OverwriteEntity';
import PatchEntity from './PatchEntity';
import RemoveEntities from './RemoveEntities';
import RemoveEntity from './RemoveEntity';
import UpsertEntity from './UpsertEntity';

export type CountEntitiesSignature<Entity> = CountEntities<Entity>;
export type CreateEntitySignature<Entity> = CreateEntity<Entity>;
export type GetEntitiesSignature<Entity> = GetEntities<Entity>;
export type GetEntitySignature<Id, Entity> = GetEntity<Id, Entity>;
export type OverwriteEntitySignature<Id, Entity> = OverwriteEntity<Id, Entity>;
export type PatchEntitySignature<Id, Entity> = PatchEntity<Id, Entity>;
export type RemoveEntitiesSignature<Entity> = RemoveEntities<Entity>;
export type RemoveEntitySignature<Id> = RemoveEntity<Id>;
export type UpsertEntitySignature<Id, Entity> = UpsertEntity<Id, Entity>;
