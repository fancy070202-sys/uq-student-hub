'use client'
import { useState } from 'react'

const allCourses = [
  { code: 'MECH1300', name: 'Engineering Mechanics', faculty: '机械工程', difficulty: 4, rating: 3.8, semester: 'Sem 1 & 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '期中考试', pct: 25 }, { name: '作业', pct: 25 }], passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'], description: '静力学、动力学、材料力学基础。机械工程核心必修课。', reviews: [{ text: '考试题目和tutorial很像，一定要把tutorial全部做完。', score: 4 }, { text: '期中之后难度跳升很大，不要落下进度。', score: 3 }] },
  { code: 'MECH2100', name: 'Mechanics of Solids', faculty: '机械工程', difficulty: 4, rating: 3.5, semester: 'Sem 1', topAssess: '期末考试 60%', assessments: [{ name: '期末考试', pct: 60 }, { name: '实验报告', pct: 20 }, { name: '作业', pct: 20 }], passReq: ['期末考试 ≥ 45%（硬性要求）', '总分 ≥ 50%'], description: '应力应变、梁弯曲、扭转分析。MECH1300的延续。', reviews: [{ text: '实验报告很花时间，早点开始写。', score: 3 }, { text: '期末考试难度中等，历年卷子很有用。', score: 4 }] },
  { code: 'MECH2210', name: 'Fluid Mechanics', faculty: '机械工程', difficulty: 4, rating: 3.4, semester: 'Sem 2', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '实验', pct: 20 }, { name: '作业', pct: 25 }], passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'], description: '流体静力学、流体动力学、管道流动、边界层理论。', reviews: [{ text: '伯努利方程要烂熟于心，考试必考。', score: 3 }, { text: '实验课很有意思，但报告要认真写。', score: 4 }] },
  { code: 'MECH2300', name: 'Thermodynamics', faculty: '机械工程', difficulty: 3, rating: 3.6, semester: 'Sem 1', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '期中测验', pct: 25 }, { name: '作业', pct: 20 }], passReq: ['总分 ≥ 50%'], description: '热力学定律、热力学循环、热机效率。', reviews: [{ text: '公式表可以带进考场，把常用公式整理好。', score: 4 }, { text: '作业和考试题型很像，认真做作业。', score: 3 }] },
  { code: 'MECH3200', name: 'Machine Design', faculty: '机械工程', difficulty: 4, rating: 3.7, semester: 'Sem 1', topAssess: '项目 40%', assessments: [{ name: '项目', pct: 40 }, { name: '期末考试', pct: 40 }, { name: '作业', pct: 20 }], passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'], description: '齿轮、轴、轴承、连接件设计。内容实用，有大量工程设计计算。', reviews: [{ text: '项目很实用，直接用到工程实际，好好做。', score: 4 }, { text: '考试计算量大，要练速度。', score: 3 }] },
  { code: 'MECH3301', name: 'Control Engineering', faculty: '机械工程', difficulty: 4, rating: 3.3, semester: 'Sem 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '实验', pct: 25 }, { name: '作业', pct: 25 }], passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'], description: '传递函数、PID控制、频域分析、稳定性判断。数学要求高。', reviews: [{ text: '最难的一门必修课，Laplace变换一定要熟。', score: 3 }, { text: 'MATLAB仿真部分很有意思。', score: 4 }] },
  { code: 'ENGG1100', name: 'Professional Engineering', faculty: '工程', difficulty: 2, rating: 4.1, semester: 'Sem 1', topAssess: '项目报告 60%', assessments: [{ name: '项目报告', pct: 60 }, { name: 'Presentation', pct: 25 }, { name: '个人反思', pct: 15 }], passReq: ['总分 ≥ 50%', '所有作业必须提交'], description: '工程设计入门，团队项目为主。没有考试。', reviews: [{ text: '组队很重要，找靠谱的组员。', score: 4 }, { text: '没有期末考试太舒服了。', score: 5 }] },
  { code: 'ENGG4300', name: 'Engineering Project', faculty: '工程', difficulty: 3, rating: 4.2, semester: 'Sem 1 & 2', topAssess: '论文/报告 60%', assessments: [{ name: '论文/报告', pct: 60 }, { name: 'Presentation', pct: 25 }, { name: '进度汇报', pct: 15 }], passReq: ['总分 ≥ 50%', '必须完成所有里程碑'], description: '毕业设计项目，全年进行。选题很重要。', reviews: [{ text: '选一个好导师比什么都重要，早点联系。', score: 4 }, { text: '时间管理是关键，不要拖到最后一刻。', score: 4 }] },
  { code: 'MATH1051', name: 'Calculus & Linear Algebra I', faculty: '数学', difficulty: 5, rating: 3.2, semester: 'Sem 1 & 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '期中考试', pct: 25 }, { name: '每周测验', pct: 25 }], passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'], description: '微积分、线性代数。工科必修，内容密度极高。', reviews: [{ text: '绝对不能落课，每周内容都建立在上周基础上。', score: 3 }, { text: 'Tutorial worksheet基本就是考试原题。', score: 4 }] },
  { code: 'MATH1052', name: 'Multivariate Calculus & ODEs', faculty: '数学', difficulty: 5, rating: 3.1, semester: 'Sem 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '期中考试', pct: 25 }, { name: '每周测验', pct: 25 }], passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'], description: '多元微积分、常微分方程。MATH1051的延续，难度更高。', reviews: [{ text: 'ODE部分是很多人挂科的地方，重点攻克。', score: 3 }, { text: '和MATH1051一样，tutorial做完就能过。', score: 4 }] },
  { code: 'CSSE1001', name: 'Introduction to Software Engineering', faculty: 'CS/IT', difficulty: 3, rating: 4.1, semester: 'Sem 1 & 2', topAssess: '作业 60%', assessments: [{ name: '作业x3', pct: 60 }, { name: '期末考试', pct: 40 }], passReq: ['期末考试 ≥ 45%（硬性要求）', '总分 ≥ 50%'], description: 'Python入门，不需要任何编程基础。', reviews: [{ text: '作业要早开始，临近deadline系统会很慢。', score: 4 }, { text: 'A2到A3难度跳升明显。', score: 3 }] },
  { code: 'PHYS1001', name: 'Introductory Physics I', faculty: '物理', difficulty: 3, rating: 3.7, semester: 'Sem 1', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '实验', pct: 20 }, { name: '在线测验', pct: 30 }], passReq: ['总分 ≥ 50%'], description: '力学、波动、热学基础。对机械工程学生比较容易。', reviews: [{ text: '在线测验可以多次提交，好好利用。', score: 4 }, { text: '实验报告格式要按模板来，扣分很严。', score: 3 }] },
]

const faculties = ['全部', '机械工程', '工程', '数学', 'CS/IT', '物理']

export default function CoursesPage() {
  const [search, setSearch] = useState('')
  const [faculty, setFaculty] = useState('全部')
  const [sortBy, setSortBy] = useState('code')

  const filtered = allCourses
    .filter(c => {
      const matchSearch = c.code.toLowerCase().includes(search.toLowerCase()) || c.name.toLowerCase().includes(search.toLowerCase()) || c.description.includes(search)
      const matchFaculty = faculty === '全部' || c.faculty === faculty
      return matchSearch && matchFaculty
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'difficulty') return a.difficulty - b.difficulty
      return a.code.localeCompare(b.code)
    })

  return (
    <div style={{ minHeight: '100vh', background: '#f8f7ff', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '0 32px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', background: '#51247A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '13px' }}>UQ</div>
          <span style={{ fontWeight: 700, fontSize: '16px', color: '#1a1a2e' }}>StudentHub</span>
        </a>
        <div style={{ display: 'flex', gap: '8px' }}>
          {([['首页', '/'], ['课程', '/courses'], ['校历', '/calendar'], ['GPA计算器', '/gpa']] as [string, string][]).map(([label, href]) => (
            <a key={label} href={href} style={{ padding: '6px 14px', borderRadius: '8px', background: label === '课程' ? '#f3ecf9' : 'transparent', color: label === '课程' ? '#51247A' : '#6b7280', fontSize: '14px', textDecoration: 'none', fontWeight: label === '课程' ? 600 : 400 }}>{label}</a>
          ))}
        </div>
        <div style={{ background: '#51247A', color: 'white', padding: '8px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>免费注册</div>
      </nav>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>课程库</h1>
        <p style={{ color: '#9ca3af', marginBottom: '24px' }}>搜索课程代码或名称，点击展开查看详情</p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="搜索课程代码或名称..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '200px', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none' }}
          />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '14px', background: 'white' }}>
            <option value="code">按课程代码</option>
            <option value="rating">按评分最高</option>
            <option value="difficulty">按难度最低</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {faculties.map(f => (
            <button key={f} onClick={() => setFaculty(f)} style={{
              padding: '6px 14px', borderRadius: '20px', border: '1px solid',
              borderColor: faculty === f ? '#51247A' : '#e5e7eb',
              background: faculty === f ? '#51247A' : 'white',
              color: faculty === f ? 'white' : '#6b7280',
              fontSize: '13px', cursor: 'pointer', fontWeight: faculty === f ? 600 : 400,
            }}>{f}</button>
          ))}
        </div>

        <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '16px' }}>
          找到 {filtered.length} 门课程
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {filtered.map(course => (
            <details key={course.code} style={{ background: 'white', borderRadius: '14px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <summary style={{ padding: '20px', cursor: 'pointer', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#51247A', background: '#f3ecf9', padding: '3px 8px', borderRadius: '6px' }}>{course.code}</span>
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>{course.semester}</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a2e' }}>{course.name}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{course.description}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                    {[1,2,3,4,5].map(i => (<div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i <= course.difficulty ? '#51247A' : '#e5e7eb' }} />))}
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
                <div style={{ background: '#f0faf5', border: '1px solid #9fe1cb', borderRadius: '10px', padding: '12px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#0f6e56', marginBottom: '6px' }}>Pass 要求</div>
                  {course.passReq.map((r, i) => (<div key={i} style={{ fontSize: '12px', color: '#085041', marginBottom: '3px' }}>— {r}</div>))}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a2e', marginBottom: '8px' }}>学生评价</div>
                {course.reviews.map((r, i) => (
                  <div key={i} style={{ background: '#f8f7ff', borderRadius: '8px', padding: '10px 12px', marginBottom: '8px', fontSize: '12px', color: '#6b7280', lineHeight: 1.6, fontStyle: 'italic' }}>
                    {r.text}
                    <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px', fontStyle: 'normal' }}>{'⭐'.repeat(r.score)}{'☆'.repeat(5 - r.score)}</div>
                  </div>
                ))}
              </div>
            </details>
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: '#9ca3af', fontSize: '14px' }}>
              没有找到匹配的课程，试试其他关键词
            </div>
          )}
        </div>
      </div>
    </div>
  )
}