import { useMemo, useState } from 'react';
import {
  FaBug,
  FaDatabase,
  FaFileUpload,
  FaLock,
  FaSearch,
  FaShieldAlt,
  FaTerminal,
  FaUserShield,
} from 'react-icons/fa';

const users = [
  { id: 1, email: 'admin@abasecurity.local', password: 'admin123', role: 'admin', name: 'Admin Security' },
  { id: 2, email: 'user@abasecurity.local', password: 'password123', role: 'user', name: 'Regular User' },
];

const records = [
  { id: 1, ownerId: 1, title: 'Admin payroll report', classification: 'Restricted' },
  { id: 2, ownerId: 2, title: 'User profile backup', classification: 'Private' },
  { id: 3, ownerId: 2, title: 'Training module notes', classification: 'Internal' },
  { id: 4, ownerId: 1, title: 'Security incident draft', classification: 'Confidential' },
];

const wafModes = {
  off: 'OFF',
  detect: 'Detection Only',
  block: 'Blocking Mode',
};

const wafRules = [
  {
    type: 'SQL Injection',
    severity: 'High',
    pattern: /('|--|;|union\s+select|or\s+1\s*=\s*1|sleep\s*\(|drop\s+table)/i,
  },
  {
    type: 'Cross-Site Scripting',
    severity: 'High',
    pattern: /(<script|<\/script|onerror\s*=|onload\s*=|javascript:|alert\s*\(|<img)/i,
  },
  {
    type: 'Path Traversal',
    severity: 'Medium',
    pattern: /(\.\.\/|\.\.\\|%2e%2e|\/etc\/passwd|windows\/win.ini)/i,
  },
  {
    type: 'Suspicious Upload',
    severity: 'Medium',
    pattern: /(\.php|\.phtml|\.jsp|\.asp|\.exe|\.sh|\.bat|\.svg)/i,
  },
];

const starterLogs = [
  {
    id: 1,
    time: '09:00:01',
    surface: 'System',
    type: 'Lab Started',
    mode: 'Detection Only',
    payload: 'AbaSecurity Lab initialized',
    blocked: false,
  },
];

function nowTime() {
  return new Date().toLocaleTimeString('en-US', { hour12: false });
}

function detectPayload(value) {
  return wafRules.filter((rule) => rule.pattern.test(value));
}

function secureText(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function Panel({ title, icon: Icon, children, action }) {
  return (
    <section className="lab-panel">
      <div className="lab-panel-head">
        <div className="lab-panel-title">
          <span className="lab-panel-icon"><Icon /></span>
          <h2>{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function FindingPill({ finding }) {
  return (
    <span className={`finding-pill finding-${finding.severity.toLowerCase()}`}>
      {finding.type}
    </span>
  );
}

export default function AbaSecurityLab() {
  const [wafMode, setWafMode] = useState('detect');
  const [secureMode, setSecureMode] = useState(false);
  const [logs, setLogs] = useState(starterLogs);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [session, setSession] = useState(null);
  const [loginResult, setLoginResult] = useState('Coba login normal atau payload SQLi pada email/password.');
  const [failedLogins, setFailedLogins] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(records);
  const [searchMessage, setSearchMessage] = useState('Gunakan fitur pencarian untuk melihat simulasi SQL Injection.');
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([
    { id: 1, author: 'student', body: 'Komentar aman pertama dari user.' },
  ]);
  const [uploadMessage, setUploadMessage] = useState('Upload file hanya disimpan sebagai simulasi di browser.');
  const [uploads, setUploads] = useState([]);
  const [objectId, setObjectId] = useState('1');
  const [objectResult, setObjectResult] = useState('Login sebagai user lalu coba akses object ID yang bukan milik user.');

  const addLog = (entry) => {
    setLogs((current) => [
      {
        id: Date.now() + Math.random(),
        time: nowTime(),
        mode: wafModes[wafMode],
        ...entry,
      },
      ...current,
    ].slice(0, 25));
  };

  const inspect = (surface, payload) => {
    const findings = detectPayload(payload);
    if (wafMode !== 'off' && findings.length) {
      addLog({
        surface,
        type: findings.map((finding) => finding.type).join(', '),
        payload,
        blocked: wafMode === 'block',
      });
    }

    return {
      findings,
      blocked: wafMode === 'block' && findings.length > 0,
    };
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const payload = `${loginForm.email} ${loginForm.password}`;
    const waf = inspect('Login', payload);

    if (waf.blocked) {
      setLoginResult('WAF memblokir payload login yang mencurigakan.');
      return;
    }

    const sqlBypass = detectPayload(payload).some((finding) => finding.type === 'SQL Injection');
    if (!secureMode && sqlBypass) {
      const admin = users[0];
      setSession(admin);
      setLoginResult('Vulnerable mode: login berhasil dibypass sebagai admin (simulasi SQL Injection).');
      addLog({ surface: 'Authentication', type: 'Auth Bypass', payload, blocked: false });
      return;
    }

    const found = users.find(
      (user) => user.email === loginForm.email && user.password === loginForm.password,
    );

    if (found) {
      setSession(found);
      setFailedLogins(0);
      setLoginResult(`Login berhasil sebagai ${found.name} (${found.role}).`);
      addLog({ surface: 'Authentication', type: 'Successful Login', payload: found.email, blocked: false });
      return;
    }

    const nextFailures = failedLogins + 1;
    setFailedLogins(nextFailures);
    setLoginResult(`Login gagal. Failed attempts: ${nextFailures}.`);
    addLog({
      surface: 'Authentication',
      type: nextFailures >= 3 ? 'Brute Force Detection' : 'Failed Login',
      payload: loginForm.email || 'empty email',
      blocked: false,
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const waf = inspect('Search', searchTerm);

    if (waf.blocked) {
      setSearchResult([]);
      setSearchMessage('WAF memblokir query pencarian yang mencurigakan.');
      return;
    }

    const sqlFound = waf.findings.some((finding) => finding.type === 'SQL Injection');
    if (!secureMode && sqlFound) {
      setSearchResult(records);
      setSearchMessage('Vulnerable mode: query SQLi mengembalikan semua record.');
      return;
    }

    const keyword = searchTerm.toLowerCase();
    setSearchResult(records.filter((record) => record.title.toLowerCase().includes(keyword)));
    setSearchMessage(secureMode && sqlFound
      ? 'Secure mode: input terdeteksi, tetapi query tetap aman karena parameterized query.'
      : 'Pencarian normal berjalan.');
  };

  const handleComment = (event) => {
    event.preventDefault();
    const waf = inspect('Comment', commentInput);

    if (waf.blocked) return;

    setComments((current) => [
      ...current,
      {
        id: Date.now(),
        author: session?.name || 'guest',
        body: secureMode ? secureText(commentInput) : commentInput,
      },
    ]);
    setCommentInput('');
  };

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const payload = `${file.name} ${file.type}`;
    const waf = inspect('Upload', payload);
    const suspicious = detectPayload(file.name).some((finding) => finding.type === 'Suspicious Upload');

    if (waf.blocked || (secureMode && suspicious)) {
      setUploadMessage('Upload ditolak: file terdeteksi berisiko.');
      event.target.value = '';
      return;
    }

    setUploads((current) => [
      {
        id: Date.now(),
        name: file.name,
        type: file.type || 'unknown',
        size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
        risk: suspicious ? 'High' : 'Low',
      },
      ...current,
    ]);
    setUploadMessage(suspicious
      ? 'Vulnerable mode: file mencurigakan diterima sebagai simulasi.'
      : 'File diterima sebagai simulasi.');
    event.target.value = '';
  };

  const handleObjectAccess = (event) => {
    event.preventDefault();
    const id = Number(objectId);
    const object = records.find((record) => record.id === id);

    if (!object) {
      setObjectResult('Object tidak ditemukan.');
      return;
    }

    if (!session) {
      setObjectResult('Login terlebih dahulu untuk menguji Broken Access Control.');
      return;
    }

    const allowed = session.role === 'admin' || object.ownerId === session.id;
    if (!secureMode || allowed) {
      setObjectResult(`Object returned: ${object.title} (${object.classification}).`);
      addLog({
        surface: 'Object Access',
        type: allowed ? 'Authorized Access' : 'Broken Access Control',
        payload: `object_id=${id}, user=${session.email}`,
        blocked: false,
      });
      return;
    }

    setObjectResult('Secure mode: akses ditolak karena object bukan milik user.');
    addLog({
      surface: 'Object Access',
      type: 'Unauthorized Access Blocked',
      payload: `object_id=${id}, user=${session.email}`,
      blocked: true,
    });
  };

  const stats = useMemo(() => {
    const suspicious = logs.filter((log) => !['Lab Started', 'Successful Login'].includes(log.type)).length;
    const blocked = logs.filter((log) => log.blocked).length;
    return { suspicious, blocked, total: logs.length };
  }, [logs]);

  const commentSrcDoc = `
    <html>
      <body style="font-family:Arial,sans-serif;background:#f8fafc;color:#0f172a;padding:12px">
        ${comments.map((comment) => `
          <article style="border:1px solid #cbd5e1;border-radius:10px;padding:10px;margin-bottom:8px">
            <strong>${secureText(comment.author)}</strong>
            <div>${secureMode ? comment.body : comment.body}</div>
          </article>
        `).join('')}
      </body>
    </html>
  `;

  return (
    <>
      <style>{`
        .lab-page {
          min-height: 100vh;
          padding: 5rem 0 6rem;
          color: var(--text-main);
        }
        .lab-container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 1.25rem;
          position: relative;
          z-index: 2;
        }
        .lab-hero {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        @media (min-width: 900px) {
          .lab-hero { grid-template-columns: 1.25fr 0.75fr; }
        }
        .lab-hero-card,
        .lab-panel {
          background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 24px;
          box-shadow: var(--shadow-card);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .lab-hero-card {
          padding: clamp(1.5rem, 4vw, 2.5rem);
        }
        .lab-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          color: #93c5fd;
          background: rgba(37, 99, 235, 0.14);
          border: 1px solid rgba(96, 165, 250, 0.22);
          font-size: 0.78rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }
        .lab-title {
          font-size: clamp(2rem, 5vw, 4rem);
          line-height: 1.05;
          font-weight: 900;
          background: linear-gradient(135deg, #60a5fa, #38bdf8 48%, #a78bfa);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }
        .lab-subtitle {
          max-width: 720px;
          color: var(--text-soft);
          line-height: 1.75;
          font-size: 1rem;
        }
        .lab-controls {
          padding: 1.25rem;
          display: grid;
          gap: 1rem;
          align-content: start;
        }
        .lab-control-row {
          display: grid;
          gap: 0.45rem;
        }
        .lab-control-row label {
          color: var(--text-main);
          font-size: 0.82rem;
          font-weight: 800;
        }
        .lab-select,
        .lab-input,
        .lab-textarea {
          width: 100%;
          box-sizing: border-box;
          border-radius: 14px;
          border: 1px solid var(--line);
          background: rgba(15, 23, 42, 0.74);
          color: var(--text-main);
          padding: 0.8rem 0.9rem;
          font: inherit;
          outline: none;
        }
        .lab-textarea { min-height: 94px; resize: vertical; }
        .lab-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 940px) {
          .lab-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        .lab-panel {
          padding: 1.25rem;
        }
        .lab-panel-head {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1rem;
        }
        .lab-panel-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .lab-panel-icon {
          width: 42px;
          height: 42px;
          border-radius: 13px;
          display: grid;
          place-items: center;
          color: #60a5fa;
          background: rgba(37, 99, 235, 0.16);
        }
        .lab-panel h2 {
          color: var(--text-main);
          font-size: 1.05rem;
          font-weight: 900;
        }
        .lab-form {
          display: grid;
          gap: 0.75rem;
        }
        .lab-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          align-items: center;
        }
        .lab-btn {
          border: 0;
          border-radius: 14px;
          padding: 0.8rem 1rem;
          font: inherit;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg, #2563eb, #38bdf8);
          cursor: pointer;
          box-shadow: 0 12px 30px rgba(37, 99, 235, 0.28);
        }
        .lab-btn.secondary {
          color: #93c5fd;
          background: rgba(15, 23, 42, 0.72);
          border: 1px solid rgba(96, 165, 250, 0.24);
          box-shadow: none;
        }
        .lab-result,
        .lab-note {
          color: var(--text-soft);
          line-height: 1.65;
          font-size: 0.9rem;
        }
        .lab-note {
          padding: 0.8rem 0.9rem;
          border-radius: 14px;
          background: rgba(37, 99, 235, 0.1);
          border: 1px solid rgba(96, 165, 250, 0.18);
        }
        .lab-table {
          width: 100%;
          border-collapse: collapse;
          overflow: hidden;
          border-radius: 16px;
          font-size: 0.86rem;
        }
        .lab-table th,
        .lab-table td {
          text-align: left;
          padding: 0.72rem;
          border-bottom: 1px solid var(--line);
          color: var(--text-soft);
        }
        .lab-table th {
          color: var(--text-main);
          background: rgba(37, 99, 235, 0.1);
        }
        .comment-frame {
          width: 100%;
          height: 190px;
          border: 1px solid var(--line);
          border-radius: 16px;
          background: #fff;
        }
        .log-list {
          display: grid;
          gap: 0.7rem;
          max-height: 430px;
          overflow: auto;
          padding-right: 0.25rem;
        }
        .log-item {
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 0.8rem;
          background: rgba(15, 23, 42, 0.54);
        }
        .log-top {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.45rem;
        }
        .log-type {
          color: var(--text-main);
          font-weight: 900;
          font-size: 0.86rem;
        }
        .log-meta,
        .log-payload {
          color: var(--text-soft);
          font-size: 0.78rem;
          overflow-wrap: anywhere;
        }
        .finding-pill,
        .mode-pill {
          display: inline-flex;
          border-radius: 999px;
          padding: 0.3rem 0.62rem;
          font-size: 0.72rem;
          font-weight: 900;
          border: 1px solid var(--line);
        }
        .finding-high { color: #fecaca; background: rgba(239, 68, 68, 0.16); border-color: rgba(239, 68, 68, 0.28); }
        .finding-medium { color: #fed7aa; background: rgba(245, 158, 11, 0.16); border-color: rgba(245, 158, 11, 0.28); }
        .mode-pill { color: #bfdbfe; background: rgba(37, 99, 235, 0.14); }
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.65rem;
        }
        .stat-box {
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 0.85rem;
          background: rgba(15, 23, 42, 0.48);
        }
        .stat-box strong {
          display: block;
          color: var(--text-main);
          font-size: 1.45rem;
          line-height: 1;
        }
        .stat-box span {
          display: block;
          margin-top: 0.35rem;
          color: var(--text-soft);
          font-size: 0.72rem;
          font-weight: 800;
        }
        html[data-theme='light'] .lab-select,
        html[data-theme='light'] .lab-input,
        html[data-theme='light'] .lab-textarea,
        html[data-theme='light'] .lab-btn.secondary,
        html[data-theme='light'] .log-item,
        html[data-theme='light'] .stat-box {
          background: rgba(248, 250, 252, 0.92);
          color: #132033;
        }
        html[data-theme='light'] .finding-high { color: #b91c1c; }
        html[data-theme='light'] .finding-medium { color: #b45309; }
      `}</style>

      <main className="lab-page">
        <div className="lab-container">
          <div className="lab-hero">
            <section className="lab-hero-card">
              <span className="lab-kicker"><FaShieldAlt /> OWASP Top 10 Training Lab</span>
              <h1 className="lab-title">AbaSecurity Lab</h1>
              <p className="lab-subtitle">
                Lab interaktif untuk menguji SQL Injection, XSS, Broken Access Control,
                file upload vulnerability, authentication security, brute force detection,
                mini WAF, security logging, dan admin monitoring dalam lingkungan aman.
              </p>
            </section>

            <aside className="lab-hero-card lab-controls">
              <div className="lab-control-row">
                <label htmlFor="waf-mode">Mini WAF Mode</label>
                <select
                  id="waf-mode"
                  className="lab-select"
                  value={wafMode}
                  onChange={(event) => setWafMode(event.target.value)}
                >
                  {Object.entries(wafModes).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="lab-actions">
                <button
                  type="button"
                  className={`lab-btn ${secureMode ? '' : 'secondary'}`}
                  onClick={() => setSecureMode((current) => !current)}
                >
                  {secureMode ? 'Secure Mode ON' : 'Vulnerable Mode ON'}
                </button>
                <span className="mode-pill">{wafModes[wafMode]}</span>
              </div>
              <p className="lab-note">
                Gunakan payload hanya di lab ini. Semua data di halaman ini adalah simulasi
                dan tidak menyentuh sistem pihak lain.
              </p>
            </aside>
          </div>

          <div className="lab-grid">
            <Panel title="Authentication Lab" icon={FaLock}>
              <form className="lab-form" onSubmit={handleLogin}>
                <input
                  className="lab-input"
                  placeholder="Email, contoh: admin@abasecurity.local"
                  value={loginForm.email}
                  onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                />
                <input
                  className="lab-input"
                  placeholder="Password, contoh: admin123"
                  value={loginForm.password}
                  onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                />
                <div className="lab-actions">
                  <button className="lab-btn" type="submit">Test Login</button>
                  <button
                    className="lab-btn secondary"
                    type="button"
                    onClick={() => {
                      setLoginForm({ email: "' OR '1'='1' --", password: 'anything' });
                    }}
                  >
                    Fill SQLi Payload
                  </button>
                </div>
                <p className="lab-result">{loginResult}</p>
                {session && <p className="lab-note">Current session: {session.name} ({session.role})</p>}
              </form>
            </Panel>

            <Panel title="SQL Injection Search" icon={FaDatabase}>
              <form className="lab-form" onSubmit={handleSearch}>
                <input
                  className="lab-input"
                  placeholder="Cari data, contoh: profile atau ' OR 1=1 --"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <div className="lab-actions">
                  <button className="lab-btn" type="submit"><FaSearch /> Search</button>
                  <button
                    className="lab-btn secondary"
                    type="button"
                    onClick={() => setSearchTerm("' OR 1=1 --")}
                  >
                    Fill SQLi Payload
                  </button>
                </div>
                <p className="lab-result">{searchMessage}</p>
              </form>
              <table className="lab-table">
                <thead>
                  <tr><th>ID</th><th>Title</th><th>Class</th></tr>
                </thead>
                <tbody>
                  {searchResult.map((record) => (
                    <tr key={record.id}>
                      <td>{record.id}</td>
                      <td>{record.title}</td>
                      <td>{record.classification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>

            <Panel title="XSS Comment Lab" icon={FaBug}>
              <form className="lab-form" onSubmit={handleComment}>
                <textarea
                  className="lab-textarea"
                  placeholder={"Coba payload: <img src=x onerror=alert('XSS')>"}
                  value={commentInput}
                  onChange={(event) => setCommentInput(event.target.value)}
                />
                <div className="lab-actions">
                  <button className="lab-btn" type="submit">Post Comment</button>
                  <button
                    className="lab-btn secondary"
                    type="button"
                    onClick={() => setCommentInput("<img src=x onerror=alert('XSS')>")}
                  >
                    Fill XSS Payload
                  </button>
                </div>
                <p className="lab-result">
                  Preview komentar berjalan di sandbox iframe. Secure mode akan menampilkan payload sebagai teks aman.
                </p>
              </form>
              <iframe
                className="comment-frame"
                title="AbaSecurity XSS sandbox"
                sandbox={secureMode ? '' : 'allow-scripts'}
                srcDoc={commentSrcDoc}
              />
            </Panel>

            <Panel title="File Upload Lab" icon={FaFileUpload}>
              <div className="lab-form">
                <input className="lab-input" type="file" onChange={handleUpload} />
                <p className="lab-result">{uploadMessage}</p>
                <table className="lab-table">
                  <thead>
                    <tr><th>File</th><th>Type</th><th>Risk</th></tr>
                  </thead>
                  <tbody>
                    {uploads.map((file) => (
                      <tr key={file.id}>
                        <td>{file.name}</td>
                        <td>{file.type}</td>
                        <td>{file.risk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>

            <Panel title="Broken Access Control" icon={FaUserShield}>
              <form className="lab-form" onSubmit={handleObjectAccess}>
                <input
                  className="lab-input"
                  placeholder="Object ID"
                  value={objectId}
                  onChange={(event) => setObjectId(event.target.value)}
                />
                <div className="lab-actions">
                  <button className="lab-btn" type="submit">Access Object</button>
                  <button className="lab-btn secondary" type="button" onClick={() => setObjectId('1')}>
                    Try Admin Object
                  </button>
                </div>
                <p className="lab-result">{objectResult}</p>
              </form>
            </Panel>

            <Panel title="Admin Security Dashboard" icon={FaTerminal}>
              <div className="stat-grid">
                <div className="stat-box"><strong>{stats.total}</strong><span>Total Logs</span></div>
                <div className="stat-box"><strong>{stats.suspicious}</strong><span>Suspicious</span></div>
                <div className="stat-box"><strong>{stats.blocked}</strong><span>Blocked</span></div>
              </div>
              <div className="log-list" style={{ marginTop: '1rem' }}>
                {logs.map((log) => {
                  const findings = detectPayload(log.payload || '');
                  return (
                    <article className="log-item" key={log.id}>
                      <div className="log-top">
                        <span className="log-type">{log.type}</span>
                        <span className="mode-pill">{log.blocked ? 'Blocked' : log.mode}</span>
                      </div>
                      <p className="log-meta">{log.time} - {log.surface}</p>
                      <p className="log-payload">{log.payload}</p>
                      <div className="lab-actions" style={{ marginTop: '0.55rem' }}>
                        {findings.map((finding) => <FindingPill key={`${log.id}-${finding.type}`} finding={finding} />)}
                      </div>
                    </article>
                  );
                })}
              </div>
            </Panel>
          </div>
        </div>
      </main>
    </>
  );
}
