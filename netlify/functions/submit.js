exports.handler = async (event, context) => {
  // Check if the environment variable for submissions exists, if not, create an empty array
  if (!process.env.SUBMISSIONS) {
      process.env.SUBMISSIONS = JSON.stringify([]);
  }

  if (event.httpMethod === 'POST') {
      const { number } = JSON.parse(event.body);
      const submission = { number, timestamp: new Date().toISOString() };

      // Retrieve current submissions from the environment variable
      const submissions = JSON.parse(process.env.SUBMISSIONS);
      submissions.push(submission);

      // Update the environment variable with the new submission
      process.env.SUBMISSIONS = JSON.stringify(submissions);

      return {
          statusCode: 200,
          body: JSON.stringify({ message: '提交成功', submission }),
      };
  } else if (event.httpMethod === 'GET') {
      const submissions = JSON.parse(process.env.SUBMISSIONS);
      return {
          statusCode: 200,
          body: JSON.stringify(submissions),
      };
  } else {
      return {
          statusCode: 405,
          body: JSON.stringify({ message: `Method ${event.httpMethod} Not Allowed` }),
      };
  }
};
