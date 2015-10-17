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
    const nextState = reduer(undefined, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Jeremy Jones']
    }));
  });

});
