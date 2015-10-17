import { expect } from 'chai';

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

});
