/**
 * Created by Jakub Buriánek on 12.09.2017.
 * This class provides lazy selection on array object, minimizing operations needed
 * to get selection of items.
 * Collection is immutable and uses fluent interface to build query-like pattern.
 * See readme for code samples
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

    /**
     * Return item on given index
     * @param {number} index
     * @param {T} defaultValue
     * @returns {T}
     */
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
     * Select subset of items from start index (including) to end index (including)
     * @param {number} start
     * @param {number} end
     * @returns {Collection<any>}
     */
    public range(start: number, end: number) {
        const length = this.collection.length;
        const result: T[] = [];
        let counter = 0;
        for (let i = 0; i < length; i++) {
            let item = this.collection[i];
            if (this.applyFilter(item, i)) {
                counter++;
                if (counter >= start && counter <= end) {
                    result.push(item);
                }
            }
        }
        return new Collection(result);
    }

    /**
     * Apply all filters, then sort the collection given comparing function
     * Note: javascript sort function is used
     * @param {(a: T, b: T) => number} compareFn
     * @returns {Collection<T>}
     */
    public sort(compareFn: (a: T, b: T) => number = undefined): Collection<T> {
        const clone = this.clone();
        clone.collection.sort(compareFn);
        return clone;
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
