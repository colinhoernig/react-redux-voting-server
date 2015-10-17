import { expect } from 'chai';
import { List } from 'immutable';

describe('immutability', () => {

  describe('a number', () => {

    function increment(currentStat) {
      return currentState + 1;
    }

    it('is immutable', () {
      let state = 10;
      let nextState = increment(state);

      expect(nextState).to.equal(11);
      expect(state).to.equal(10);
    });

  });

  describe('a list', () => {

    function addItem(currentState, item) {
      return currentState.push(item);
    }

    it('is immutable', () => {
      let state = List.of(
        'Travis Rice',
        'Joe Sexton',
        'Jeremy Jones',
        'Alex Andrews'
        );
      let nextState = addItem(state, 'Nicolas Müller');

      expect(nextState).toEqual(List.of(
        'Travis Rice',
        'Joe Sexton',
        'Jeremy Jones',
        'Alex Andrews',
        'Nicolas Müller'
      ));
      expect(state).toEqual(List.of(
        'Travis Rice',
        'Joe Sexton',
        'Jeremy Jones',
        'Alex Andrews',
        'Nicolas Müller'
      ));
    });

  });

});
