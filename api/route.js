import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const { data, error } = await resend.emails.send({
    from: 'dsaflow.app <noreply@dsaflow.app>',
    to: 'vadagammanikanta2006@gmail.com',
    subject: '✅ You completed Dynamic Programming — keep going!',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background:#0f172a; font-family: 'Segoe UI', sans-serif;">

  <div style="max-width:600px; margin:0 auto; padding:40px 20px;">

    <!-- Header -->
    <div style="text-align:center; margin-bottom:32px;">
      <h1 style="color:#06b6d4; font-size:28px; margin:0; letter-spacing:-1px;">
        dsaflow.app
      </h1>
      <p style="color:#475569; font-size:13px; margin:4px 0 0;">
        FAANG Placement Prep
      </p>
    </div>

    <!-- Main Card -->
    <div style="background:#1e293b; border-radius:16px; padding:40px; border:1px solid #334155;">

      <!-- Badge -->
      <div style="text-align:center; margin-bottom:24px;">
        <span style="background:#022c22; color:#4ade80; 
                     padding:8px 20px; border-radius:999px; 
                     font-size:13px; font-weight:600; 
                     border:1px solid #166534;">
          ✅ Module Completed
        </span>
      </div>

      <!-- Title -->
      <h2 style="color:#f1f5f9; font-size:24px; 
                 text-align:center; margin:0 0 8px;">
        You just finished
      </h2>
      <h2 style="color:#06b6d4; font-size:28px; 
                 text-align:center; margin:0 0 24px;">
        Dynamic Programming
      </h2>

      <!-- Divider -->
      <div style="height:1px; background:#334155; margin:24px 0;"></div>

      <!-- Stats Row -->
      <div style="display:flex; justify-content:space-between; 
                  text-align:center; margin-bottom:32px;">
        <div style="flex:1;">
          <div style="color:#06b6d4; font-size:28px; font-weight:700;">
            18
          </div>
          <div style="color:#64748b; font-size:12px; margin-top:4px;">
            MODULES DONE
          </div>
        </div>
        <div style="flex:1; border-left:1px solid #334155; 
                    border-right:1px solid #334155;">
          <div style="color:#a78bfa; font-size:28px; font-weight:700;">
            43%
          </div>
          <div style="color:#64748b; font-size:12px; margin-top:4px;">
            ROADMAP COMPLETE
          </div>
        </div>
        <div style="flex:1;">
          <div style="color:#f59e0b; font-size:28px; font-weight:700;">
            🔥 12
          </div>
          <div style="color:#64748b; font-size:12px; margin-top:4px;">
            DAY STREAK
          </div>
        </div>
      </div>

      <!-- Next Module -->
      <div style="background:#0f172a; border-radius:12px; 
                  padding:20px; margin-bottom:28px;
                  border:1px solid #1e40af;">
        <p style="color:#64748b; font-size:12px; 
                  margin:0 0 8px; text-transform:uppercase; 
                  letter-spacing:1px;">
          Up Next
        </p>
        <p style="color:#f1f5f9; font-size:18px; 
                  font-weight:600; margin:0 0 4px;">
          Greedy Algorithms
        </p>
        <p style="color:#475569; font-size:13px; margin:0;">
          Activity selection, Huffman encoding, interval scheduling
        </p>
      </div>

      <!-- CTA Button -->
      <div style="text-align:center;">
        <a href="https://dsa-learning-hub-delta.vercel.app"
           style="display:inline-block; background:#06b6d4; 
                  color:#0f172a; font-weight:700; font-size:15px;
                  padding:14px 40px; border-radius:8px; 
                  text-decoration:none; letter-spacing:0.3px;">
          Continue Learning →
        </a>
      </div>

    </div>

    <!-- Pro Tip -->
    <div style="background:#1e1a2e; border-radius:12px; 
                padding:20px; margin-top:16px;
                border:1px solid #4c1d95;">
      <p style="color:#a78bfa; font-size:12px; 
                margin:0 0 6px; font-weight:600;
                text-transform:uppercase; letter-spacing:1px;">
        💡 Interview Tip
      </p>
      <p style="color:#c4b5fd; font-size:14px; 
                margin:0; line-height:1.6;">
        Define your dp state in one precise English sentence 
        before writing any code — if you can't state it clearly, 
        you don't understand the problem yet.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center; margin-top:32px;">
      <p style="color:#334155; font-size:12px; margin:0 0 8px;">
        You're receiving this because you're a dsaflow.app member.
      </p>
      <a href="#" style="color:#475569; font-size:12px;">
        Unsubscribe
      </a>
    </div>

  </div>
</body>
</html>
    `,
  });

  if (error) {
    console.error('Email error:', error);
    return Response.json({ error }, { status: 500 });
  }

  return Response.json({ 
    success: true, 
    message: 'Email sent to vadagammanikanta2006@gmail.com',
    data 
  });
}