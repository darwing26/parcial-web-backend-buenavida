export default interface Repository<E, T> {
    findById: (id: E) => Promise<T>
    save: (item: T) => void
    update: (id: E, item: T) => Promise<void>      
}
