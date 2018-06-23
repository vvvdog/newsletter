const dayjs = require('dayjs');
const grabity = require('grabity');

module.exports = {
  parseTelegramUpdate(update) {
    const { update_id, channel_post } = update;
    const { author_signature, date, text } = channel_post;

    // TODO: parse text for tags

    return {
      original_id: update_id,
      author: author_signature,
      sent_at: dayjs(date).toISOString(),
      link: text
    };
  },

  async getOpenGraphData(link) {
    try {
      const data = await grabity.grabIt(link);
      if (Object.keys(data).length === 0) return null;
      return data;
    } catch (e) {
      return null;
    }
  }
}
