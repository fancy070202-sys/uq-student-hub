export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f7ff',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* 顶部导航 */}
      <nav style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 32px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px',
            background: '#51247A',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: '13px'
          }}>UQ</div>
          <span style={{ fontWeight: 700, fontSize: '16px', color: '#1a1a2e' }}>StudentHub</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['首页', '课程', '校历', 'GPA计算器'].map(item => (
            <button key={item} style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              background: 'transparent',
              color: '#6b7280',
              cursor: 'pointer',
              fontSize: '14px',
            }}>{item}</button>
          ))}
        </div>
        <div style={{
          background: '#51247A',
          color: 'white',
          padding: '8px 18px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
        }}>免费注册</div>
      </nav>

      {/* Hero 区域 */}
      <div style={{
        textAlign: 'center',
        padding: '80px 20px 60px',
        maxWidth: '700px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'inline-block',
          background: '#ede9fe',
          color: '#7c3aed',
          padding: '4px 14px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: 600,
          marginBottom: '20px',
        }}>专为 UQ 学生打造</div>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 800,
          color: '#1a1a2e',
          lineHeight: 1.2,
          marginBottom: '16px',
        }}>
          选课不再踩雷<br />
          <span style={{ color: '#51247A' }}>每门课都看得透透的</span>
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#6b7280',
          lineHeight: 1.7,
          marginBottom: '32px',
        }}>
          课程难度、考核占比、学长评价、Pass要求——<br />
          选课前全部告诉你
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <a href="/courses" style={{
  background: '#51247A',
  color: 'white',
  padding: '14px 28px',
  borderRadius: '10px',
  border: 'none',
  fontSize: '16px',
  fontWeight: 700,
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-block',
}}>开始探索课程 →</a>
          <button style={{
            background: 'white',
            color: '#51247A',
            padding: '14px 28px',
            borderRadius: '10px',
            border: '2px solid #51247A',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
          }}>查看校历</button>
        </div>
      </div>

      {/* 数据统计 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        padding: '30px 20px',
        background: 'white',
        borderTop: '1px solid #f0f0f0',
        borderBottom: '1px solid #f0f0f0',
      }}>
        {[
          { num: '200+', label: '课程收录' },
          { num: '1,500+', label: '学生评价' },
          { num: '50+', label: '专业覆盖' },
          { num: '95%', label: '用户满意度' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#51247A' }}>{stat.num}</div>
            <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '2px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 课程卡片 */}
      <div style={{ maxWidth: '900px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1a1a2e', marginBottom: '8px' }}>
          热门课程
        </h2>
        <p style={{ color: '#9ca3af', marginBottom: '28px' }}>点击查看完整评价和考核详情</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          {[
            {
              code: 'MECH1300',
              name: 'Engineering Mechanics',
              difficulty: 4,
              rating: 3.8,
              tag: '机械必修',
              tagColor: '#dbeafe',
              tagText: '#1d4ed8',
              topAssess: '期末考试 50%',
            },
            {
              code: 'MATH1051',
              name: 'Calculus & Linear Algebra I',
              difficulty: 5,
              rating: 3.2,
              tag: '数学',
              tagColor: '#fce7f3',
              tagText: '#9d174d',
              topAssess: '期末考试 50%',
            },
            {
              code: 'ENGG1100',
              name: 'Professional Engineering',
              difficulty: 2,
              rating: 4.1,
              tag: '工程入门',
              tagColor: '#d1fae5',
              tagText: '#065f46',
              topAssess: '项目报告 60%',
            },
          ].map(course => (
            <div key={course.code} style={{
              background: 'white',
              borderRadius: '14px',
              padding: '20px',
              border: '1px solid #e5e7eb',
              cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{
                  fontSize: '12px', fontWeight: 700,
                  color: '#51247A', background: '#f3ecf9',
                  padding: '3px 8px', borderRadius: '6px'
                }}>{course.code}</span>
                <span style={{
                  fontSize: '11px', fontWeight: 600,
                  color: course.tagText, background: course.tagColor,
                  padding: '3px 8px', borderRadius: '6px'
                }}>{course.tag}</span>
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a2e', marginBottom: '12px', lineHeight: 1.3 }}>
                {course.name}
              </div>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                {[1,2,3,4,5].map(i => (
                  <div key={i} style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: i <= course.difficulty ? '#51247A' : '#e5e7eb'
                  }} />
                ))}
                <span style={{ fontSize: '12px', color: '#9ca3af', marginLeft: '6px' }}>难度</span>
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>
                ⭐ {course.rating} · 最重: {course.topAssess}
              </div>
              <div style={{
                fontSize: '12px', color: '#51247A',
                fontWeight: 600, textAlign: 'right'
              }}>查看详情 →</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        color: '#9ca3af',
        fontSize: '13px',
        borderTop: '1px solid #f0f0f0',
        marginTop: '40px',
      }}>
        UQ StudentHub · 由 UQ 学生为 UQ 学生打造
      </div>
    </div>
  )
}
