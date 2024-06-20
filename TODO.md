- [x] **expo: logout button**

- [x] **expo: the input bar will be cleared when a message is sent**

- [x] **expo: the messages feed will scroll to the bottom when a message is sent or received**

- [x] **expo: the css weirdness of the screens will be cleaned up**
there will be a consistent background, margin and padding, and a max width.

- [x] **expo: messages will be displayed in boxes with the sender and date at the bottom**

- [ ] **expo: typing enter will send a message and shift + enter will be a new line**

- [ ] **expo: in the login screen, tab will go to the next field and enter will submit**

- [ ] **node: get messages after query parameter**
in the messages controller, add an optional query parameter to only get messages after a a given messages. i need to choose whether to do it by date or by message id, either will work. i think using message id would probably be simpler.  note: edit-delete records filter will be by date. perhaps may as well make filter one by date also.

- [ ] **expo: use local storage to save messages on each device**
when the app first loads, it will load the messages from local storage to its state. then it will fetch messages with id after the last message in its local storage and add them to its state. then it will save all messages in its state back to local storage.
the app will also load failed messages to its state from local storage on first load. when a message fails to send, it will add the failed message to its state, and will write the failed messages array to local storage.

- [ ] **expo: messages search**
the messages feed will have a search bar at the top. typing three or more characters will cause the feed to only show messages matching the filter. there will be a button to clear the search. when the search is active there will be a thick border around the search bar and messages feed, or some similar indicator for the user to know that they are in search.

- [ ] **expo: android push notification**
the android app will send push notifications when new messages are received.

- [ ] **expo: android app build automation**

- [x] **expo: chat screen set focus back on the text input if it is expanded.**

- [ ] **expo: display failed messages with buttons to resend or delete.**

- [ ] **expo: put a hamburger dropdown menu at top of window.**

- [ ] **expo: make a ui theme.**

- [ ] **expo: make multiple themes and allow the user to switch between them.**

- [ ] **node: create a edit-delete-records table. every time a message is edited or deleted, add a record to this table**

- [ ] **node: create an endpoint to get edit delete records, with an after-date filter query parameter**

- [ ] **full stack: add edit-delete-status to the messages table. it is a string (enum?) and its values are "created", "edited" and "deleted"**

- [ ] **node: create endpoints to edit and delete messages**
 when a message is deleted, clear all of its content (keeping the dates and sender info but clearing text) and change the edit-delete-status to "deleted. create a record in the edit-delete table, and send a websocket signal of which message was deleted. Similar steps for edited, but overwrite content instead of clearing**

- [ ] **expo: add logic to the MainContext and SocketContext to support editing and deleting messages, and re-fetching and replacing edited and deleted messages on receipt of websocket signal.**

- [ ] **full stack: users can sign up with a code. create a sign-up-codes table, a sign up endpoint, and a page for sign up in the frontend**

- [ ] **full stack: users change their username and password**

- [ ] **node: add admin boolean to the users schema. make/modify endpoints where only admins are authorized to create a user, change a users password, or make a user an admin**

- [ ] **expo: there is an admin screen that shows the list of users. admins can toggle admin status of other users, change users passwords, create users**

- [ ] **full stack: there is an access codes screen where admins can create and delete access codes"**

- [ ] **full stack: work out the details of changing the database schema and server and frontend logic so that there are multiple chats, and a user can create a chat and invite others to a chat**

- [ ] **full stack: work out the details for sending photos and videos**

- [ ] **full stack: work out the details for embedding links**
