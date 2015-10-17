import { expect } from 'chai';
import { List, Map } from 'immutable';
import { setEntries, next } from '../src/core';

import { setEntries } from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Travis Rice', 'Joe Sexton');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({ 'Travis Rice', 'Joe Sexton' }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = List.of('Travis Rice', 'Joe Sexton');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of(
          'Travis Rice',
          'Joe Sexton'
        );
      }));
    });

  });

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Jeremy Jones', 'Alex Andrews')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of(
            'Jeremy Jones',
            'Alex Andrews'
          ),
          entries: List.of('Nicolas Müller')
        })
      }));
    });

  });

});
