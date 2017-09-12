/// <reference types="jest" />
import Collection from './Collection';

// Initial data
const sampleFruits = ['apple', 'pear', 'banana', 'pineapple', 'kiwi'];

// Sample selectors
const containsLetterA = i => i.indexOf('a') !== -1;
const containsLetterP = i => i.indexOf('p') !== -1;
const everyOddItem = (item, index) => index % 2 === 1;


test('collection can be converted to array', () => {
    const tested = new Collection(sampleFruits);
    expect(tested.toArray()).toEqual(sampleFruits);
});
test('collection can use one filter', () => {
    const tested = new Collection(sampleFruits);
    expect(tested.select(containsLetterA).all().toArray()).toEqual(['apple', 'pear', 'banana', 'pineapple']);
});
test('collection can use two filters', () => {
    const tested = new Collection(sampleFruits);
    expect(tested
        .select(containsLetterA)
        .select(containsLetterP)
        .all()
        .toArray()
    ).toEqual(['apple', 'pear', 'pineapple']);
});
test('collection can filter based on index', () => {
    const tested = new Collection(sampleFruits);
    expect(tested
        .select(everyOddItem)
        .all()
        .toArray()
    ).toEqual(['pear', 'pineapple']);
});
test('collection can select first item', () => {
    const tested = new Collection(sampleFruits);
    expect(tested.first()).toEqual('apple');
});
test('collection can select first item with selector', () => {
    const tested = new Collection(sampleFruits);
    expect(tested
        .select(everyOddItem)
        .first()
    ).toEqual('pear');
});
test('collection can select first item with default value', () => {
    const tested = new Collection([]);
    expect(tested.first(null)).toBeNull();
});
test('collection can select last item', () => {
    const tested = new Collection(sampleFruits);
    expect(tested.last()).toEqual('kiwi');
});
test('collection can select last item with default value', () => {
    const tested = new Collection([]);
    expect(tested.last(null)).toBeNull();
});
test('collection can select last item with selector', () => {
    const tested = new Collection(sampleFruits);
    expect(tested
        .select(everyOddItem)
        .last()
    ).toEqual('pineapple');
});
test('collection can select any item', () => {
    const tested = new Collection(sampleFruits);
    expect(tested.item(2)).toEqual('banana');
});
test('collection can select item item with default value', () => {
    const tested = new Collection([]);
    expect(tested.item(50, null)).toBeNull();
});
test('collection can select any item with selector', () => {
    const tested = new Collection(sampleFruits);
    expect(tested
        .select(everyOddItem)
        .item(1)
    ).toEqual('pear');
});
