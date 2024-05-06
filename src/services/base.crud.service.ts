export interface BaseCrudService<Tout> {
    create<Tin>(inputDTO: Tin): Promise<Tout>;
    findAll<Tin>(inputDTO?: Tin): Promise<Array<Tout>>;
    findOne<Tin>(inputDTO: Tin): Promise<Tout>;
    update<Tid, Tin>(id: Tid, inputDTO: Tin): Promise<Tout>;
    remove<Tin>(inputDTO: Tin): Promise<{affected?: number}>;
}