# Message Lake
Messaging Application to address the channel-categorization problem

## Chat Channel Problem
Group M = [a, b, c]  
Group O = [c, d, e]  

Each of the above groups has a chat channel.

A message from c needs to go to everyone in group O, plus b (but not a). Sending the message to channel O will leave out b, but sending it to both channels will include a. In a chat-channel design, this can be solved by creating a new Group P = [b, c, d, e]. But imagine now e has to send a message to c and a.

What if d needs to send a message to c and e, but doesn't know that a would have liked to see it?

(The above problem is a sibling to the challenge of categorizing files in tree-like directories.)

## Lake Strategy

The _Lake_ strategy is to have readers, instead of writers, determine who sees what. Organization members create Feeds based on what messages they would like to see. Messages could be retrieved in any way that allows this. Tagging outgoing messages is the naive approach, and using machine learning to assess the relevance of messages to a users' feeds would be better.

a has feeds scanning for new messages related to [x, y]
d sends a message related to y, and now a, and all other followers of y, see it.

Senders simply throw message into the Lake, and it is the program's job to fish them out.

One big challenge with this is that senders will not tolerate uncertainty about the delivery of their messages, so the system has to be able to guarantee that.

---

## Setup
1. npm install
2. npm start
3. 127.0.0.1:3000
