import Server from 'socket.io';


/**
 * 1. A client sends an action to the server
 * 2. The server hands the action to the Redux Store
 * 3. The Store calls the reducer and the reducer
 *    executes the logic related to the action
 * 4. The Store updates its state based on the return value of the reducer
 * 5. The Store executes the listener function subscribed by the server
 * 6. The server emits a 'state' event
 * 7. All connected clients - including the one that initiated the
 *    original action - receive the new state.
 */
export default function startServer(store) {
  const io = new Server().attach(8001);

  // This should be optimized, as transferring the whole state with every
  // change could end up causing a lot of data transfer.  Maybe send the relevant
  // subset, or diff of the new/old state, etc.
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
}
