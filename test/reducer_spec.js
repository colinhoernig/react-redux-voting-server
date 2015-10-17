import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = { type: 'SET_ENTRIES', entries: ['Jeremy Jones'] };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Jeremy Jones']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Jeremy Jones', 'Alex Andrews']
    });
    const action = { type: 'NEXT' };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jeremy Jones', 'Alex Andrews']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Jeremy Jones', 'Alex Andrews']
      },
      entries: []
    });
    const action = { type: 'VOTE', entry: 'Jeremy Jones' };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jeremy Jones', 'Alex Andrews'],
        tally: { 'Jeremy Jones' : 1 }
      },
      entries: []
    }));
  });

  it('has an initial state', () => {
    const action = { type: 'SET_ENTRIES', entries: ['Jeremy Jones'] };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Jeremy Jones']
    }));
  });

  // Make sure we can use reduce on the actions Map array
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  it('can be used with reduce', () => {
    const actions = [
      { type: 'SET_ENTRIES', entries: ['Jeremy Jones', 'Alex Andrews'] },
      { type: 'NEXT' },
      { type: 'VOTE', entry: 'Jeremy Jones' },
      { type: 'VOTE', entry: 'Alex Andrews' },
      { type: 'VOTE', entry: 'Jeremy Jones' },
      { type: 'NEXT' }
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: 'Jeremy Jones'
    }));
  });

});
