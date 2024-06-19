- [x] **expo: logout button**

- [x] **expo: the input bar will be cleared when a message is sent**

- [x] **expo: the messages feed will scroll to the bottom when a message is sent or received**

- [x] **expo: the css weirdness of the screens will be cleaned up**
there will be a consistent background, margin and padding, and a max width.

- [x] **expo: messages will be displayed in boxes with the sender and date at the bottom**

- [ ] **expo: typing enter will send a message and shift + enter will be a new line**

- [ ] **expo: in the login screen, tab will go to the next field and enter will submit**

- [ ] **node: get messages after query parameter**
in the messages controller, add an optional query parameter to only get messages after a a given messages. i need to choose whether to do it by date or by message id, either will work. i think using message id would probably be simpler.

- [ ] **expo: use local storage to save messages on each device**
when the app first loads, it will load the messages from local storage to its state. then it will fetch messages with id after the last message in its local storage and add them to its state. then it will save all messages in its state back to local storage.
the app will also load failed messages to its state from local storage on first load. when a message fails to send, it will add the failed message to its state, and will write the failed messages array to local storage.

- [ ] **expo: messages search**
the messages feed will have a search bar at the top. typing three or more characters will cause the feed to only show messages matching the filter. there will be a button to clear the search. when the search is active there will be a thick border around the search bar and messages feed, or some similar indicator for the user to know that they are in search.

- [ ] **expo: android push notification**
the android app will send push notifications when new messages are received.

- [ ] **expo: android app build automation**

- [x] **set focus back on the text input if it is expanded**