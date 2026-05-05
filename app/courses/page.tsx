export default function CoursesPage() {
  const courses = [
    {
      code: 'MECH1300',
      name: 'Engineering Mechanics',
      difficulty: 4,
      rating: 3.8,
      semester: 'Sem 1 & 2',
      topAssess: '期末考试 50%',
      assessments: [
        { name: '期末考试', pct: 50 },
        { name: '期中考试', pct: 25 },
        { name: '作业', pct: 25 },
      ],
      passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'],
      description: '静力学、动力学、材料力学基础。机械工程核心必修课。',
      reviews: [
        { text: '考试题目和tutorial很像，一定要把tutorial全部做完。', score: 4 },
        { text: '期中之后难度跳升很大，不要落下进度。', score: 3 },
      ],
    },
    {
      code: 'MATH1051',
      name: 'Calculus & Linear Algebra I',
      difficulty: 5,
      rating: 3.2,
      semester: 'Sem 1 & 2',
      topAssess: '期末考试 50%',
      assessments: [
        { name: '期末考试', pct: 50 },
        { name: '期中考试', pct: 25 },
        { name: '每周测验', pct: 25 },
      ],
      passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'],
      description: '微积分、线性代数。工科必修，内容密度极高。',
      reviews: [
        { text: '绝对不能落课，每周内容都建立在上周基础上。', score: 3 },
        { text: 'Tutorial worksheet基本就是考试原题。', score: 4 },
      ],
    },
    {
      code: 'ENGG1100',
      name: 'Professional Engineering',
      difficulty: 2,
      rating: 4.1,
      semester: 'Sem 1',
      topAssess: '项目报告 60%',
      assessments: [
        { name: '项目报告', pct: 60 },
        { name: 'Presentation', pct: 25 },
        { name: '个人反思', pct: 15 },
      ],
      passReq: ['总分 ≥ 50%', '所有作业必须提交'],
      description: '工程设计入门，团队项目为主。没有考试。',
      reviews: [
        { text: '组队很重要，找靠谱的组员。', score: 4 },
        { text: '没有期末考试太舒服了。', score: 5 },
      ],
    },
    {
      code: 'CSSE1001',
      name: 'Introduction to Software Engineering',
      difficulty: 3,
      rating: 4.1,
      semester: 'Sem 1 & 2',
      topAssess: '作业 60%',
      assessments: [
        { name: '作业x3', pct: 60 },
        { name: '期末考试', pct: 40 },
      ],
      passReq: ['期末考试 ≥ 45%（硬性要求）', '总分 ≥ 50%'],
      description: 'Python入门，不需要任何编程基础。',
      reviews: [
        { text: '作业要早开始，临近deadline系统会很慢。', score: 4 },
        { text: 'A2到A3难度跳升明显。', score: 3 },
      ],
    },
  ]

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
              background: label === '课程' ? '#f3ecf9' : 'transparent',
              color: label === '课程' ? '#51247A' : '#6b7280',
              fontSize: '14px', textDecoration: 'none',
              fontWeight: label === '课程' ? 600 : 400,
            }}>{label}</a>
          ))}
        </div>
        <div style={{
          background: '#51247A', color: 'white', padding: '8px 18px',
          borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
        }}>免费注册</div>
      </nav>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>课程库</h1>
        <p style={{ color: '#9ca3af', marginBottom: '32px' }}>点击任意课程查看详细评价、考核占比和Pass要求</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {courses.map(course => (
            <details key={course.code} style={{
              background: 'white', borderRadius: '14px',
              border: '1px solid #e5e7eb', overflow: 'hidden',
            }}>
              <summary style={{
                padding: '20px', cursor: 'pointer', listStyle: 'none',
                display: 'flex', flexDirection: 'column', gap: '8px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{
                    fontSize: '12px', fontWeight: 700, color: '#51247A',
                    background: '#f3ecf9', padding: '3px 8px', borderRadius: '6px',
                  }}>{course.code}</span>
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>{course.semester}</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a2e' }}>{course.name}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{course.description}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                    {[1,2,3,4,5].map(i => (
                      <div key={i} style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: i <= course.difficulty ? '#51247A' : '#e5e7eb',
                      }} />
                    ))}
                    <span style={{ fontSize: '11px', color: '#9ca3af', marginLeft: '4px' }}>难度</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>⭐ {course.rating}</span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>最重: {course.topAssess}</span>
                </div>
              </summary>

              <div style={{ padding: '0 20px 20px', borderTop: '1px solid #f0f0f0' }}>
                <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a2e', marginBottom: '10px' }}>考核占比</div>
                  {course.assessments.map(a => (
                    <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <div style={{ width: '90px', fontSize: '12px', color: '#6b7280' }}>{a.name}</div>
                      <div style={{ flex: 1, height: '6px', background: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${a.pct}%`, height: '100%', background: '#51247A', borderRadius: '3px' }} />
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280', width: '32px', textAlign: 'right' }}>{a.pct}%</div>
                    </div>
                  ))}
                </div>

                <div style={{
                  background: '#f0faf5', border: '1px solid #9fe1cb',
                  borderRadius: '10px', padding: '12px', marginBottom: '16px',
                }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#0f6e56', marginBottom: '6px' }}>Pass 要求</div>
                  {course.passReq.map((r, i) => (
                    <div key={i} style={{ fontSize: '12px', color: '#085041', marginBottom: '3px' }}>— {r}</div>
                  ))}
                </div>

                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a2e', marginBottom: '8px' }}>学生评价</div>
                {course.reviews.map((r, i) => (
                  <div key={i} style={{
                    background: '#f8f7ff', borderRadius: '8px',
                    padding: '10px 12px', marginBottom: '8px',
                    fontSize: '12px', color: '#6b7280', lineHeight: 1.6, fontStyle: 'italic',
                  }}>
                    {r.text}
                    <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px', fontStyle: 'normal' }}>
                      {'⭐'.repeat(r.score)}{'☆'.repeat(5 - r.score)}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
