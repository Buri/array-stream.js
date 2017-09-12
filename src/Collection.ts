/**
 * Created by Jakub Buriánek on 12.09.2017.
 * Optimized collection
 */
class Collection<T> {
    private collection: T[] = [];
    private filters: ((item: T, index: number) => boolean)[] = [];

    /**
     * Constructor
     * @param items
     * @param filters
     */
    constructor(items: T[] = [], filters: ((item: T, index: number) => boolean)[] = []) {
        this.collection = [...items];
        this.filters = [...filters];
    }

    /**
     * Return clone of current collection
     * Required to keep collections immutable
     * @returns {Collection<T>}
     */
    public clone(): Collection<T> {
        return new Collection(this.collection, this.filters);
    }

    /**
     * Add filter
     * @param query
     * @returns {Collection<T>}
     */
    public select(query: (item: T, index: number) => boolean): Collection<T> {
        const clone = this.clone();
        clone.filters.push(query);
        return clone;
    }

    /**
     * Return all matching results in current collection
     * @returns {Collection<T>}
     */
    public all() {
        return new Collection(this.collection.filter(this.applyFilter.bind(this)));
    }

    /**
     * Return first item matching criteria
     * @param defaultValue
     * @returns {T}
     */
    public first(defaultValue: T = undefined): T | undefined {
        const length = this.collection.length;
        for (let i = 0; i < length; i++) {
            let item = this.collection[i];
            if (this.applyFilter(item, i)) {
                return item;
            }
        }
        return defaultValue;
    }

    /**
     * Return last item matching criteria
     * @param defaultValue
     * @returns {T}
     */
    public last(defaultValue: T = undefined): T | undefined {
        for (let i = this.collection.length - 1; i >= 0; i--) {
            let item = this.collection[i];
            if (this.applyFilter(item, i)) {
                return item;
            }
        }
        return defaultValue;
    }

    public item(index: number, defaultValue: T = undefined): T | undefined {
        for (let i = this.collection.length - 1; i >= 0; i--) {
            let item = this.collection[i];
            if (this.applyFilter(item, i) && i === index) {
                return item;
            }
        }
        return defaultValue;
    }


    /**
     * Return contents of current Collection as array
     * @returns {T[]}
     */
    public toArray(): T[] {
        return [...this.collection];
    }

    /**
     * Take all filters and try to apply them on given item
     * @param item
     * @returns {boolean}
     */
    private applyFilter(item: T, index: number): boolean {
        const length = this.filters.length;
        for (let i = 0; i < length; i++) {
            if (!this.filters[i](item, index)) {
                return false;
            }
        }
        return true;
    }
}

export default Collection;
