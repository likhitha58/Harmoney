const commonStyles = `
  font-family: 'Nunito';
  background: #f0f0ff;
  margin: 0;
  padding: 0;
`;

const glassCardStyles = `
  background: rgba(255,255,255,0.85);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow: hidden;
`;

const headerStyles = `
  background: linear-gradient(135deg, #7f56d9, #9d7ff9);
  padding: 18px;
  text-align: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const footerStyles = `
  padding: 16px;
  text-align: center;
  font-size: 12px;
  color: #666;
  background: rgba(127,86,217,0.05);
`;

const wrapperTop = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email</title>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body style="${commonStyles}">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;background:#f0f0ff;">
    <tr>
      <td>
        <table align="center" cellpadding="0" cellspacing="0" width="420" style="${glassCardStyles}">
          <tr>
            <td style="${headerStyles}">
              Harmoney
            </td>
          </tr>
          <tr>
            <td style="padding:30px;text-align:center;">
`;

const wrapperBottom = `
            </td>
          </tr>
          <tr>
            <td style="${footerStyles}">
              This is an automated email from Harmoney.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Goal Created
export const goalCreatedTemplate = (goal, userName) => `
${wrapperTop}
  <h2 style="color:#7f56d9;margin-bottom:10px;">Hi ${userName},</h2>
  <p style="font-size:16px;color:#333;margin-bottom:20px;">
    Your goal <strong>${goal.title}</strong> has been created.
  </p>
  <p style="font-size:14px;color:#555;margin-bottom:30px;line-height:1.6;">
    Target Amount: <strong>₹${goal.targetAmount.toLocaleString()}</strong><br/>
    Status: <strong>Active</strong>
  </p>
${wrapperBottom}
`;

export const goalUpdatedTemplate = (goal, oldAmount, userName) => {
  const updatedAmount = goal.currentSavings || 0;
  const remaining = Math.max(goal.targetAmount - updatedAmount, 0);
  const monthsLeft = goal.months || "N/A";

  return `
${wrapperTop}
  <h2 style="color:#7f56d9;margin-bottom:10px;">Hi ${userName},</h2>
  <p style="font-size:16px;color:#333;margin-bottom:20px;">
    Your goal <strong>${goal.title}</strong> has been updated.
  </p>
  <p style="font-size:14px;color:#555;margin-bottom:20px;line-height:1.6;">
    Savings changed from <strong>₹${oldAmount.toLocaleString()}</strong> 
    to <strong>₹${updatedAmount.toLocaleString()}</strong>.
  </p>
  <p style="font-size:14px;color:#555;margin-bottom:20px;line-height:1.6;">
    Amount left: <strong>₹${remaining.toLocaleString()}</strong><br/>
    Months remaining: <strong>${monthsLeft}</strong>
  </p>
${wrapperBottom}
`;
};

export const goalCompletedTemplate = (goal, userName) => `
${wrapperTop}
  <h2 style="color:#7f56d9;margin-bottom:10px;">Congratulations, ${userName}!</h2>
  <p style="font-size:16px;color:#333;margin-bottom:20px;">
    You have successfully completed your goal: <strong>${goal.title}</strong>.
  </p>
  <p style="font-size:14px;color:#555;margin-bottom:30px;line-height:1.6;">
    Target Amount Achieved: <strong>₹${goal.targetAmount.toLocaleString()}</strong>
  </p>
${wrapperBottom}
`;