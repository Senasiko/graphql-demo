module.exports = {
  async sendMessage(_, { fromUserId, toUserId, content }, { pubSub }) {
    pubSub.publish('message', { messageAdded: { toUserId, content, fromUserId } })
    return {
      fromUserId, toUserId, content
    }
  }
}
