import { expect } from 'chai';
import { List, Map } from 'immutable';
import { setEntries, next, vote } from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Travis Rice', 'Joe Sexton');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of(
          'Travis Rice',
          'Joe Sexton'
        )
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = List.of('Travis Rice', 'Joe Sexton');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of(
          'Travis Rice',
          'Joe Sexton'
        )
      }));
    });

  });

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of(
          'Jeremy Jones',
          'Alex Andrews',
          'Nicolas Müller'
        )
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of(
            'Jeremy Jones',
            'Alex Andrews'
          )
        }),
        entries: List.of('Nicolas Müller')
      }));
    });

  });

  describe('vote', () => {

    it('creates a tally for a voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of(
            'Jeremy Jones',
            'Alex Andrews'
          )
        }),
        entries: List()
      });
      const nextState = vote(state, 'Jeremy Jones');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of(
            'Jeremy Jones',
            'Alex Andrews'
          ),
          tally: Map({
            'Jeremy Jones': 1
          })
        }),
        entries: List()
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of(
            'Jeremy Jones',
            'Alex Andrews'
          ),
          tally: Map({
            'Jeremy Jones': 5,
            'Alex Andrews': 2
          }),
          entries: List()
        })
      });
      const nextState = vote(state, 'Jeremy Jones');

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of(
            'Jeremy Jones',
            'Alex Andrews'
          ),
          tally: Map({
            'Jeremy Jones': 6,
            'Alex Andrews': 2
          }),
          entries: List()
        })
      }));
    });

    it('puts winner of current vote back bottom of entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Jeremy Jones', 'Alex Andrews'),
          tally: Map({
            'Jeremy Jones': 5,
            'Alex Andrews': 2
          })
        }),
        entries: List.of('Travis Rice', 'Joe Sexton', 'Nicolas Müller')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Travis Rice', 'Joe Sexton')
        }),
        entries: List.of('Nicolas Müller', 'Jeremy Jones')
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Jeremy Jones', 'Alex Andrews'),
          tally: Map({
            'Jeremy Jones': 3,
            'Alex Andrews': 3
          })
        }),
        entries: List.of('Travis Rice', 'Joe Sexton', 'Nicolas Müller')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Travis Rice', 'Joe Sexton')
        }),
        entries: List.of('Nicolas Müller', 'Jeremy Jones', 'Alex Andrews')
      }))
    });

  });

});
