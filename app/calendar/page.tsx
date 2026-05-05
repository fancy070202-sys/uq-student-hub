export default function CalendarPage() {
  const events = [
    {
      date: '24 Feb 2026',
      name: 'Semester 1 开始',
      note: '第一周上课',
      type: 'academic',
      color: '#378ADD', bg: '#E6F1FB',
    },
    {
      date: '31 Mar 2026',
      name: 'Census Date',
      note: '最后一天可以退课不影响成绩和学费',
      type: 'important',
      color: '#7F77DD', bg: '#EEEDFE',
    },
    {
      date: '19 Apr – 4 May 2026',
      name: '期中假期',
      note: '两周不上课，好好休息复习',
      type: 'break',
      color: '#EF9F27', bg: '#FAEEDA',
    },
    {
      date: '29 May 2026',
      name: '最后上课日',
      note: '大部分作业在这周截止',
      type: 'deadline',
      color: '#639922', bg: '#EAF3DE',
    },
    {
      date: '2–13 Jun 2026',
      name: 'SWOT VAC 复习周',
      note: '考试前复习周，没有课',
      type: 'study',
      color: '#1D9E75', bg: '#E1F5EE',
    },
    {
      date: '14–28 Jun 2026',
      name: '期末考试',
      note: '个人考试时间表考试前3周公布',
      type: 'exam',
      color: '#E24B4A', bg: '#FCEBEB',
    },
    {
      date: '11 Jul 2026',
      name: '成绩公布',
      note: '登录 my.UQ 查看成绩',
      type: 'academic',
      color: '#378ADD', bg: '#E6F1FB',
    },
    {
      date: '27 Jul 2026',
      name: 'Semester 2 开始',
      note: '第二学期第一周上课',
      type: 'academic',
      color: '#378ADD', bg: '#E6F1FB',
    },
    {
      date: '31 Aug 2026',
      name: 'Semester 2 Census Date',
      note: '第二学期退课截止日',
      type: 'important',
      color: '#7F77DD', bg: '#EEEDFE',
    },
    {
      date: '26 Sep – 11 Oct 2026',
      name: 'Semester 2 期中假期',
      note: '两周假期',
      type: 'break',
      color: '#EF9F27', bg: '#FAEEDA',
    },
    {
      date: '30 Oct 2026',
      name: 'Semester 2 最后上课日',
      note: '第二学期结束',
      type: 'deadline',
      color: '#639922', bg: '#EAF3DE',
    },
    {
      date: '1–15 Nov 2026',
      name: 'Semester 2 期末考试',
      note: '第二学期考试',
      type: 'exam',
      color: '#E24B4A', bg: '#FCEBEB',
    },
  ]

  const typeLabels: Record<string, string> = {
    academic: '学术',
    important: '重要',
    break: '假期',
    deadline: '截止',
    study: '复习',
    exam: '考试',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7ff', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{
        background: 'white', borderBottom: '1px solid #e5e7eb',
        padding: '0 32px', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px', background: '#51247A',
            borderRadius: '8px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '13px'
          }}>UQ</div>
          <span style={{ fontWeight: 700, fontSize: '16px', color: '#1a1a2e' }}>StudentHub</span>
        </a>
        <div style={{ display: 'flex', gap: '8px' }}>
          {([['首页', '/'], ['课程', '/courses'], ['校历', '/calendar'], ['GPA计算器', '/gpa']] as [string, string][]).map(([label, href]) => (
            <a key={label} href={href} style={{
              padding: '6px 14px', borderRadius: '8px',
              background: label === '校历' ? '#f3ecf9' : 'transparent',
              color: label === '校历' ? '#51247A' : '#6b7280',
              fontSize: '14px', textDecoration: 'none',
              fontWeight: label === '校历' ? 600 : 400,
            }}>{label}</a>
          ))}
        </div>
        <div style={{
          background: '#51247A', color: 'white', padding: '8px 18px',
          borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
        }}>免费注册</div>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>校历 2026</h1>
        <p style={{ color: '#9ca3af', marginBottom: '32px' }}>UQ 全年重要日期一览，不错过任何关键节点</p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {Object.entries(typeLabels).map(([type, label]) => {
            const event = events.find(e => e.type === type)
            return (
              <div key={type} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: event?.bg, color: event?.color,
                padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
              }}>
                {label}
              </div>
            )
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
          {events.map((event, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '14px',
              border: '1px solid #e5e7eb',
              borderLeft: `4px solid ${event.color}`,
              padding: '16px',
            }}>
              <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '6px' }}>{event.date}</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e', marginBottom: '6px' }}>{event.name}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, marginBottom: '10px' }}>{event.note}</div>
              <div style={{
                display: 'inline-block',
                background: event.bg, color: event.color,
                fontSize: '10px', fontWeight: 600,
                padding: '2px 8px', borderRadius: '10px',
              }}>{typeLabels[event.type]}</div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '32px', background: '#f3ecf9',
          borderRadius: '14px', padding: '20px',
          border: '1px solid #e0d0f0',
        }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#51247A', marginBottom: '8px' }}>重要提醒</div>
          <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.8 }}>
            Census Date 是最重要的日期之一 — 过了这天退课会影响成绩单并产生学费费用。如果你在考虑退课，务必在 Census Date 之前决定。
          </div>
        </div>
      </div>
    </div>
  )
}
