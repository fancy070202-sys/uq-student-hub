'use client'
import { useState } from 'react'

const gradeOptions = [
  { label: '7 — High Distinction (HD) ≥85%', value: 7 },
  { label: '6 — Distinction (D) 75–84%', value: 6 },
  { label: '5 — Credit (C) 65–74%', value: 5 },
  { label: '4 — Pass (P) 50–64%', value: 4 },
  { label: '3 — Low Pass (LP) 45–49%', value: 3 },
  { label: '2 — Fail (F2) 30–44%', value: 2 },
  { label: '1 — Fail (F1) <30%', value: 1 },
]

export default function GPAPage() {
  const [courses, setCourses] = useState([
    { name: 'MECH1300', grade: 5, units: 2 },
    { name: 'MATH1051', grade: 6, units: 2 },
    { name: 'ENGG1100', grade: 7, units: 2 },
  ])

  const addCourse = () => {
    setCourses([...courses, { name: '', grade: 4, units: 2 }])
  }

  const removeCourse = (i: number) => {
    setCourses(courses.filter((_, idx) => idx !== i))
  }

  const updateCourse = (i: number, field: string, value: string | number) => {
    const updated = [...courses]
    updated[i] = { ...updated[i], [field]: value }
    setCourses(updated)
  }

  const totalUnits = courses.reduce((sum, c) => sum + c.units, 0)
  const gpa = totalUnits > 0
    ? courses.reduce((sum, c) => sum + c.grade * c.units, 0) / totalUnits
    : 0

  const getGPAColor = (g: number) => {
    if (g >= 6) return '#0f6e56'
    if (g >= 5) return '#51247A'
    if (g >= 4) return '#378ADD'
    return '#E24B4A'
  }

  const getGPALabel = (g: number) => {
    if (g >= 6.5) return 'High Distinction 平均'
    if (g >= 5.5) return 'Distinction 平均'
    if (g >= 4.5) return 'Credit 平均'
    if (g >= 3.5) return 'Pass 平均'
    return '需要努力'
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
              background: label === 'GPA计算器' ? '#f3ecf9' : 'transparent',
              color: label === 'GPA计算器' ? '#51247A' : '#6b7280',
              fontSize: '14px', textDecoration: 'none',
              fontWeight: label === 'GPA计算器' ? 600 : 400,
            }}>{label}</a>
          ))}
        </div>
        <div style={{
          background: '#51247A', color: 'white', padding: '8px 18px',
          borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
        }}>免费注册</div>
      </nav>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>GPA 计算器</h1>
        <p style={{ color: '#9ca3af', marginBottom: '32px' }}>UQ 使用 7 分制，输入你的成绩计算 GPA</p>

        <div style={{
          background: 'white', borderRadius: '20px',
          border: '1px solid #e5e7eb', padding: '32px',
          marginBottom: '24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '8px' }}>你的当前 GPA</div>
          <div style={{ fontSize: '72px', fontWeight: 800, color: getGPAColor(gpa), lineHeight: 1 }}>
            {gpa.toFixed(2)}
          </div>
          <div style={{ fontSize: '16px', color: '#9ca3af', marginTop: '4px' }}>/ 7.00</div>
          <div style={{
            display: 'inline-block', marginTop: '12px',
            background: '#f3ecf9', color: '#51247A',
            padding: '6px 16px', borderRadius: '20px',
            fontSize: '13px', fontWeight: 600,
          }}>{getGPALabel(gpa)}</div>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #e5e7eb', padding: '24px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 160px 80px 40px',
            gap: '8px', marginBottom: '12px',
          }}>
            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600 }}>课程名称</div>
            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600 }}>成绩</div>
            <div style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textAlign: 'center' }}>学分</div>
            <div></div>
          </div>

          {courses.map((course, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 160px 80px 40px',
              gap: '8px', marginBottom: '10px', alignItems: 'center',
            }}>
              <input
                type="text"
                value={course.name}
                onChange={e => updateCourse(i, 'name', e.target.value)}
                placeholder="例如 MECH1300"
                style={{ fontSize: '13px', padding: '8px 10px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <select
                value={course.grade}
                onChange={e => updateCourse(i, 'grade', parseInt(e.target.value))}
                style={{ fontSize: '12px', padding: '8px', borderRadius: '8px', border: '1px solid #e5e7eb' }}
              >
                {gradeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <select
                value={course.units}
                onChange={e => updateCourse(i, 'units', parseInt(e.target.value))}
                style={{ fontSize: '13px', padding: '8px', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}
              >
                {[1, 2, 4, 6, 8].map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
              <button
                onClick={() => removeCourse(i)}
                style={{
                  background: '#FCEBEB', color: '#E24B4A',
                  border: 'none', borderRadius: '8px',
                  width: '32px', height: '32px', cursor: 'pointer',
                  fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >×</button>
            </div>
          ))}

          <button
            onClick={addCourse}
            style={{
              marginTop: '8px', width: '100%',
              padding: '10px', borderRadius: '10px',
              border: '1px dashed #C9A8E8',
              background: '#f3ecf9', color: '#51247A',
              fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            }}
          >+ 添加课程</button>
        </div>

        <div style={{
          marginTop: '20px', background: 'white',
          borderRadius: '16px', border: '1px solid #e5e7eb', padding: '20px',
        }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e', marginBottom: '12px' }}>UQ 成绩对照表</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {gradeOptions.map(opt => (
              <div key={opt.value} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                fontSize: '12px', color: '#6b7280',
              }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '6px',
                  background: opt.value >= 6 ? '#E1F5EE' : opt.value >= 5 ? '#EEEDFE' : opt.value >= 4 ? '#E6F1FB' : '#FCEBEB',
                  color: opt.value >= 6 ? '#0f6e56' : opt.value >= 5 ? '#51247A' : opt.value >= 4 ? '#185FA5' : '#E24B4A',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '12px',
                }}>{opt.value}</div>
                {opt.label.split('—')[1]?.trim()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
