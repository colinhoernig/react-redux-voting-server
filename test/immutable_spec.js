import { expect } from 'chai';
import { List, Map } from 'immutable';

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

      expect(nextState).to.equal(List.of(
        'Travis Rice',
        'Joe Sexton',
        'Jeremy Jones',
        'Alex Andrews',
        'Nicolas Müller'
      ));
      expect(state).to.equal(List.of(
        'Travis Rice',
        'Joe Sexton',
        'Jeremy Jones',
        'Alex Andrews',
        'Nicolas Müller'
      ));
    });

  });

  describe('a tree', () => {

    function addItem(currentState, item) {
      return currentState.update(
        'items',
        items.push(item);
      );
    }

    it('is immutable', () => {
      let state = Map({
        items: List.of(
          'Travis Rice',
          'Joe Sexton',
          'Jeremy Jones',
          'Alex Andrews'
        )
      });
      let nextState = addItem(state, 'Nicolas Müller');

      expect(nextState).to.equal(Map({
        'Travis Rice',
        'Joe Sexton',
        'Jeremy Jones',
        'Alex Andrews',
        'Nicolas Müller'
      }));
      expect(state).to.equal(Map({
        'Travis Rice',
        'Joe Sexton',
        'Jeremy Jones',
        'Alex Andrews'
      }));
    })

  });

});
