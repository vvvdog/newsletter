const _ = require('lodash');
const dayjs = require('dayjs');
const grabity = require('grabity');

module.exports = {
  parseTelegramUpdate(update) {
    const { update_id, channel_post } = update;
    const { author_signature, date, text } = channel_post;

    // TODO: parse text, get link/tags/refer
    if (text.startsWith('http://') || text.startsWith('https://')) {
      let textGroups = text.split(' ');
      const link = textGroups.shift();

      const restText = textGroups.join(' ');
      const restTextGroups = restText.split(' #');

      const refer = restTextGroups.shift();
      // const tags = restTextGroups;

      return {
        original_id: update_id,
        author: author_signature,
        sent_at: dayjs(date).toISOString(),
        link,
        refer
      };
    }
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
