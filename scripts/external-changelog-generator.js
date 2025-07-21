const fs = require('fs');
const path = require('path');

module.exports = {
  prepare: async (pluginConfig, context) => {
    const { nextRelease, commits, logger } = context;
    const version = nextRelease.version;
    const filename = `external-${version}.md`;
    const filePath = path.resolve(process.cwd(), filename);

    const content = `# Public Changelog\n\n## ${version}\n\n${commits
      .map((c) => `- ${c.subject}`)
      .join('\n')}\n`;

    fs.writeFileSync(filePath, content);
    logger.log(`✅ External changelog created: ${filename}`);
  },
};



//Code for fetching external logs from JIRA
// const fs = require('fs');
// const path = require('path');
// const axios = require('axios');

// const extractJiraKeys = (text) => {
//   const matches = text.match(/([A-Z][A-Z0-9]+-\d+)/g);
//   return matches || [];
// };

// const fetchJiraTicket = async (ticketId) => {
//   const host = process.env.JIRA_HOST;
//   const user = process.env.JIRA_USER;
//   const token = process.env.JIRA_API_TOKEN;

//   const auth = Buffer.from(`${user}:${token}`).toString('base64');

//   try {
//     const response = await axios.get(
//       `https://${host}/rest/api/3/issue/${ticketId}`,
//       {
//         headers: {
//           Authorization: `Basic ${auth}`,
//           Accept: 'application/json',
//         },
//       }
//     );
//     return {
//       key: ticketId,
//       summary: response.data.fields.summary,
//       url: `https://${host}/browse/${ticketId}`,
//     };
//   } catch (err) {
//     console.warn(`⚠️ Could not fetch ${ticketId}: ${err.message}`);
//     return null;
//   }
// };

// module.exports = {
//   prepare: async (pluginConfig, context) => {
//     const { nextRelease, commits } = context;

//     const changelogFile = `external-v${nextRelease.version}.md`;

//     const allJiraKeys = new Set();
//     for (const commit of commits) {
//       extractJiraKeys(commit.message).forEach((key) =>
//         allJiraKeys.add(key)
//       );
//     }

//     const ticketDetails = await Promise.all(
//       Array.from(allJiraKeys).map(fetchJiraTicket)
//     );

//     const validTickets = ticketDetails.filter(Boolean);

//     const markdown = `# External Changelog\n\n## Version ${nextRelease.version}\n\n` +
//       validTickets
//         .map((ticket) => `- [${ticket.key}](${ticket.url}) – ${ticket.summary}`)
//         .join('\n') +
//       '\n';

//     fs.writeFileSync(path.resolve(process.cwd(), changelogFile), markdown);

//     context.logger.log(`✅ Generated external changelog at ${changelogFile}`);
//   },
// };
