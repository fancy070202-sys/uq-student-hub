'use client'
import { useState } from 'react'

const allCourses = [
  // 机械工程
  { code: 'MECH1300', name: 'Engineering Mechanics', faculty: '机械工程', difficulty: 4, rating: 3.8, semester: 'Sem 1 & 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '期中考试', pct: 25 }, { name: '作业', pct: 25 }], passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'], description: '静力学、动力学、材料力学基础。机械工程核心必修课。', reviews: [{ text: '考试题目和tutorial很像，一定要把tutorial全部做完。', score: 4 }, { text: '期中之后难度跳升很大，不要落下进度。', score: 3 }] },
  { code: 'MECH2100', name: 'Mechanics of Solids', faculty: '机械工程', difficulty: 4, rating: 3.5, semester: 'Sem 1', topAssess: '期末考试 60%', assessments: [{ name: '期末考试', pct: 60 }, { name: '实验报告', pct: 20 }, { name: '作业', pct: 20 }], passReq: ['期末考试 ≥ 45%（硬性要求）', '总分 ≥ 50%'], description: '应力应变、梁弯曲、扭转分析。MECH1300的延续。', reviews: [{ text: '实验报告很花时间，早点开始写。', score: 3 }, { text: '历年卷子很有用。', score: 4 }] },
  { code: 'MECH2210', name: 'Fluid Mechanics', faculty: '机械工程', difficulty: 4, rating: 3.4, semester: 'Sem 2', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '实验', pct: 20 }, { name: '作业', pct: 25 }], passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'], description: '流体静力学、流体动力学、管道流动、边界层理论。', reviews: [{ text: '伯努利方程要烂熟于心。', score: 3 }, { text: '实验报告要认真写。', score: 4 }] },
  { code: 'MECH2300', name: 'Thermodynamics', faculty: '机械工程', difficulty: 3, rating: 3.6, semester: 'Sem 1', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '期中测验', pct: 25 }, { name: '作业', pct: 20 }], passReq: ['总分 ≥ 50%'], description: '热力学定律、热力学循环、热机效率。考试可带公式表。', reviews: [{ text: '公式表整理好带进去，重点是知道用哪个。', score: 4 }, { text: '作业和考试题型很像。', score: 3 }] },
  { code: 'MECH2400', name: 'Manufacturing Processes', faculty: '机械工程', difficulty: 3, rating: 3.7, semester: 'Sem 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '实验报告', pct: 30 }, { name: '作业', pct: 20 }], passReq: ['总分 ≥ 50%'], description: '铸造、焊接、机加工、表面处理工艺。实验课很有意思。', reviews: [{ text: '实验课能亲手操作机器，很好玩。', score: 5 }, { text: '期末考试记忆为主，整理好笔记。', score: 4 }] },
  { code: 'MECH3200', name: 'Machine Design', faculty: '机械工程', difficulty: 4, rating: 3.7, semester: 'Sem 1', topAssess: '项目 40%', assessments: [{ name: '项目', pct: 40 }, { name: '期末考试', pct: 40 }, { name: '作业', pct: 20 }], passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'], description: '齿轮、轴、轴承、连接件设计。实用性强。', reviews: [{ text: '项目很实用，认真做。', score: 4 }, { text: '考试计算量大，要练速度。', score: 3 }] },
  { code: 'MECH3301', name: 'Control Engineering', faculty: '机械工程', difficulty: 4, rating: 3.3, semester: 'Sem 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '实验', pct: 25 }, { name: '作业', pct: 25 }], passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'], description: '传递函数、PID控制、频域分析、稳定性判断。数学要求高。', reviews: [{ text: '最难的必修课，Laplace变换要熟。', score: 3 }, { text: 'MATLAB实验部分有意思。', score: 4 }] },
  { code: 'MECH3400', name: 'Heat Transfer', faculty: '机械工程', difficulty: 4, rating: 3.4, semester: 'Sem 1', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '项目', pct: 25 }, { name: '作业', pct: 20 }], passReq: ['总分 ≥ 50%'], description: '传导、对流、辐射换热。热力学的延伸，公式繁多。', reviews: [{ text: '公式很多，要整理成表格记忆。', score: 3 }, { text: '项目用ANSYS仿真，提前学一下软件。', score: 4 }] },
  { code: 'MECH4400', name: 'Finite Element Methods', faculty: '机械工程', difficulty: 4, rating: 3.6, semester: 'Sem 2', topAssess: '项目 50%', assessments: [{ name: '项目', pct: 50 }, { name: '期末考试', pct: 35 }, { name: '作业', pct: 15 }], passReq: ['总分 ≥ 50%'], description: '有限元分析理论与ANSYS应用。现代工程必备技能。', reviews: [{ text: 'ANSYS软件要多练，项目分数高。', score: 4 }, { text: '理论部分比较抽象，多看lecture notes。', score: 3 }] },
  { code: 'MECH4600', name: 'Vibration & Acoustics', faculty: '机械工程', difficulty: 4, rating: 3.5, semester: 'Sem 1', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '实验', pct: 25 }, { name: '作业', pct: 25 }], passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'], description: '单自由度系统、多自由度系统、声学基础。', reviews: [{ text: '数学推导很多，要自己动手推一遍才能理解。', score: 3 }, { text: '实验数据处理很重要，MATLAB要会用。', score: 4 }] },
  // 工程通用
  { code: 'ENGG1100', name: 'Professional Engineering', faculty: '工程', difficulty: 2, rating: 4.1, semester: 'Sem 1', topAssess: '项目报告 60%', assessments: [{ name: '项目报告', pct: 60 }, { name: 'Presentation', pct: 25 }, { name: '个人反思', pct: 15 }], passReq: ['总分 ≥ 50%'], description: '工程设计入门，团队项目为主。没有考试。', reviews: [{ text: '组队很重要，找靠谱的组员。', score: 4 }, { text: '没有期末考试太舒服了。', score: 5 }] },
  { code: 'ENGG1500', name: 'Engineering Thermodynamics', faculty: '工程', difficulty: 3, rating: 3.6, semester: 'Sem 2', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '期中测验', pct: 25 }, { name: '作业', pct: 20 }], passReq: ['总分 ≥ 50%'], description: '热力学第一、二定律，热力学循环基础。', reviews: [{ text: '理解原理比背公式重要。', score: 4 }, { text: '作业直接影响期末，认真对待。', score: 3 }] },
  { code: 'ENGG2800', name: 'Engineering Estimation', faculty: '工程', difficulty: 3, rating: 3.8, semester: 'Sem 1', topAssess: '项目 45%', assessments: [{ name: '项目', pct: 45 }, { name: '期末考试', pct: 40 }, { name: '测验', pct: 15 }], passReq: ['总分 ≥ 50%'], description: '工程成本估算、项目管理基础。实用性强，对未来工作很有帮助。', reviews: [{ text: '项目做真实的工程预算，很实用。', score: 4 }, { text: 'Excel要用得好，能省很多时间。', score: 4 }] },
  { code: 'ENGG4300', name: 'Engineering Project', faculty: '工程', difficulty: 3, rating: 4.2, semester: 'Sem 1 & 2', topAssess: '论文/报告 60%', assessments: [{ name: '论文/报告', pct: 60 }, { name: 'Presentation', pct: 25 }, { name: '进度汇报', pct: 15 }], passReq: ['总分 ≥ 50%'], description: '毕业设计项目，全年进行。选题很重要。', reviews: [{ text: '选一个好导师比什么都重要。', score: 4 }, { text: '时间管理是关键。', score: 4 }] },
  // 数学
  { code: 'MATH1051', name: 'Calculus & Linear Algebra I', faculty: '数学', difficulty: 5, rating: 3.2, semester: 'Sem 1 & 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '期中考试', pct: 25 }, { name: '每周测验', pct: 25 }], passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'], description: '微积分、线性代数。工科必修，内容密度极高。', reviews: [{ text: '绝对不能落课。', score: 3 }, { text: 'Tutorial worksheet基本就是考试原题。', score: 4 }] },
  { code: 'MATH1052', name: 'Multivariate Calculus & ODEs', faculty: '数学', difficulty: 5, rating: 3.1, semester: 'Sem 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '期中考试', pct: 25 }, { name: '每周测验', pct: 25 }], passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'], description: '多元微积分、常微分方程。MATH1051的延续，难度更高。', reviews: [{ text: 'ODE部分是很多人挂科的地方。', score: 3 }, { text: 'Tutorial做完就能过。', score: 4 }] },
  { code: 'MATH2001', name: 'Advanced Calculus & Analysis', faculty: '数学', difficulty: 5, rating: 3.0, semester: 'Sem 1', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '作业', pct: 30 }, { name: '测验', pct: 15 }], passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'], description: '实分析、级数、偏微分方程。数学专业核心课，抽象性强。', reviews: [{ text: '证明题很多，逻辑要严密。', score: 3 }, { text: '作业很难但做完收获很大。', score: 3 }] },
  { code: 'MATH2010', name: 'Analysis of ODEs', faculty: '数学', difficulty: 4, rating: 3.3, semester: 'Sem 2', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '作业', pct: 30 }, { name: '测验', pct: 15 }], passReq: ['总分 ≥ 50%'], description: '常微分方程的理论与应用，相平面分析，稳定性理论。', reviews: [{ text: '相图要会画，考试必考。', score: 3 }, { text: '作业量大但题型固定。', score: 4 }] },
  { code: 'MATH3401', name: 'Complex Analysis', faculty: '数学', difficulty: 5, rating: 3.2, semester: 'Sem 1', topAssess: '期末考试 60%', assessments: [{ name: '期末考试', pct: 60 }, { name: '作业', pct: 25 }, { name: '测验', pct: 15 }], passReq: ['总分 ≥ 50%'], description: '复变函数、围道积分、留数定理。数学和工程专业选修。', reviews: [{ text: '留数定理是重点，多练计算。', score: 4 }, { text: '内容优美，对学数学的人来说很有意思。', score: 4 }] },
  { code: 'STAT2003', name: 'Mathematical Probability', faculty: '数学', difficulty: 4, rating: 3.5, semester: 'Sem 1', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '作业', pct: 30 }, { name: '测验', pct: 15 }], passReq: ['总分 ≥ 50%'], description: '概率论基础、随机变量、分布函数。理工科选修热门课。', reviews: [{ text: '比高中概率难很多，要认真对待。', score: 3 }, { text: '作业帮助很大，不要跳过。', score: 4 }] },
  // CS/IT
  { code: 'CSSE1001', name: 'Introduction to Software Engineering', faculty: 'CS/IT', difficulty: 3, rating: 4.1, semester: 'Sem 1 & 2', topAssess: '作业 60%', assessments: [{ name: '作业x3', pct: 60 }, { name: '期末考试', pct: 40 }], passReq: ['期末考试 ≥ 45%（硬性要求）', '总分 ≥ 50%'], description: 'Python入门，不需要编程基础。工科热门选修。', reviews: [{ text: '作业要早开始。', score: 4 }, { text: 'A2到A3难度跳升明显。', score: 3 }] },
  { code: 'CSSE2002', name: 'Programming in the Large', faculty: 'CS/IT', difficulty: 4, rating: 3.6, semester: 'Sem 1 & 2', topAssess: '作业 50%', assessments: [{ name: '作业x2', pct: 50 }, { name: '期末考试', pct: 50 }], passReq: ['期末考试 ≥ 45%（硬性要求）', '总分 ≥ 50%'], description: 'Java面向对象编程、设计模式、软件工程原则。', reviews: [{ text: 'Java比Python难，要多练。', score: 3 }, { text: '设计模式很有用。', score: 4 }] },
  { code: 'COMP3506', name: 'Algorithms & Data Structures', faculty: 'CS/IT', difficulty: 5, rating: 3.4, semester: 'Sem 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '作业x3', pct: 35 }, { name: '测验', pct: 15 }], passReq: ['期末考试 ≥ 45%（硬性要求）', '总分 ≥ 50%'], description: '排序、搜索、树、图、动态规划。CS核心课，找工作必考。', reviews: [{ text: 'CS最难的课之一，刷题要趁早。', score: 3 }, { text: 'LeetCode配合一起练，事半功倍。', score: 4 }] },
  { code: 'COMP3702', name: 'Artificial Intelligence', faculty: 'CS/IT', difficulty: 4, rating: 3.8, semester: 'Sem 2', topAssess: '作业 45%', assessments: [{ name: '作业x3', pct: 45 }, { name: '期末考试', pct: 45 }, { name: '测验', pct: 10 }], passReq: ['总分 ≥ 50%'], description: '搜索算法、约束满足、马尔可夫决策过程、强化学习基础。', reviews: [{ text: '作业很难但很有意思，有时候要跑几个小时代码。', score: 4 }, { text: 'Python要很熟练才行。', score: 3 }] },
  { code: 'COMP4702', name: 'Machine Learning', faculty: 'CS/IT', difficulty: 4, rating: 4.0, semester: 'Sem 1', topAssess: '项目 40%', assessments: [{ name: '项目', pct: 40 }, { name: '期末考试', pct: 40 }, { name: '作业', pct: 20 }], passReq: ['总分 ≥ 50%'], description: '监督学习、无监督学习、神经网络基础。目前最热门的CS课。', reviews: [{ text: '数学基础要好，线性代数和统计都要会。', score: 4 }, { text: '项目用真实数据集，很有成就感。', score: 5 }] },
  { code: 'INFS1200', name: 'Introduction to Information Systems', faculty: 'CS/IT', difficulty: 2, rating: 4.0, semester: 'Sem 1 & 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '项目', pct: 30 }, { name: '测验', pct: 20 }], passReq: ['总分 ≥ 50%'], description: 'SQL数据库、信息系统基础。适合非CS专业选修。', reviews: [{ text: 'SQL多练查询语句。', score: 4 }, { text: '项目不难，做一个简单数据库应用。', score: 4 }] },
  { code: 'COMP3301', name: 'Operating Systems', faculty: 'CS/IT', difficulty: 5, rating: 3.3, semester: 'Sem 1', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '作业', pct: 35 }, { name: '测验', pct: 15 }], passReq: ['期末考试 ≥ 45%（硬性要求）', '总分 ≥ 50%'], description: '进程管理、内存管理、文件系统、并发。C语言编程密集。', reviews: [{ text: 'C语言要很熟，调试bug花很多时间。', score: 3 }, { text: '理解了操作系统原理，对其他课帮助很大。', score: 4 }] },
  { code: 'COMP3400', name: 'Computer Networks', faculty: 'CS/IT', difficulty: 3, rating: 3.7, semester: 'Sem 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '作业x2', pct: 30 }, { name: '测验', pct: 20 }], passReq: ['总分 ≥ 50%'], description: 'TCP/IP协议栈、网络层、传输层、应用层协议。', reviews: [{ text: 'Wireshark抓包实验很有意思。', score: 4 }, { text: '协议层次要记清楚，考试常考。', score: 3 }] },
  // 物理
  { code: 'PHYS1001', name: 'Introductory Physics I', faculty: '物理', difficulty: 3, rating: 3.7, semester: 'Sem 1', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '实验', pct: 20 }, { name: '在线测验', pct: 30 }], passReq: ['总分 ≥ 50%'], description: '力学、波动、热学基础。', reviews: [{ text: '在线测验可以多次提交。', score: 4 }, { text: '实验报告格式要按模板。', score: 3 }] },
  { code: 'PHYS1002', name: 'Introductory Physics II', faculty: '物理', difficulty: 3, rating: 3.6, semester: 'Sem 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '实验', pct: 20 }, { name: '在线测验', pct: 30 }], passReq: ['总分 ≥ 50%'], description: '电磁学、光学、近代物理基础。PHYS1001的延续。', reviews: [{ text: '电磁学部分是难点，多做练习。', score: 3 }, { text: '光学部分相对容易。', score: 4 }] },
  { code: 'PHYS2041', name: 'Quantum Physics', faculty: '物理', difficulty: 5, rating: 3.0, semester: 'Sem 1', topAssess: '期末考试 60%', assessments: [{ name: '期末考试', pct: 60 }, { name: '作业', pct: 25 }, { name: '测验', pct: 15 }], passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'], description: '量子力学基础、薛定谔方程、氢原子模型。', reviews: [{ text: '数学基础要非常扎实。', score: 3 }, { text: '作业非常难但做完之后考试就不怕了。', score: 3 }] },
  { code: 'PHYS2100', name: 'Electromagnetism', faculty: '物理', difficulty: 4, rating: 3.3, semester: 'Sem 2', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '作业', pct: 30 }, { name: '测验', pct: 15 }], passReq: ['总分 ≥ 50%'], description: 'Maxwell方程组、电磁波、电磁感应。物理专业核心课。', reviews: [{ text: 'Maxwell方程要理解透彻，不能死背。', score: 3 }, { text: '向量微积分要很熟。', score: 3 }] },
  { code: 'PHYS3071', name: 'Condensed Matter Physics', faculty: '物理', difficulty: 5, rating: 3.1, semester: 'Sem 1', topAssess: '期末考试 60%', assessments: [{ name: '期末考试', pct: 60 }, { name: '作业', pct: 25 }, { name: '测验', pct: 15 }], passReq: ['总分 ≥ 50%'], description: '晶体结构、能带理论、半导体物理。高年级物理选修。', reviews: [{ text: '内容很深，需要量子力学基础。', score: 3 }, { text: '和材料科学联系紧密。', score: 4 }] },
  // 商科
  { code: 'ECON1010', name: 'Introductory Microeconomics', faculty: '商科', difficulty: 2, rating: 3.9, semester: 'Sem 1 & 2', topAssess: '期末考试 60%', assessments: [{ name: '期末考试', pct: 60 }, { name: 'Essay', pct: 25 }, { name: 'Tutorial', pct: 15 }], passReq: ['总分 ≥ 50%'], description: '供需、弹性、市场结构、消费者理论。多选题为主。', reviews: [{ text: '把课件看熟就能过。', score: 4 }, { text: 'Essay选题要早。', score: 3 }] },
  { code: 'ECON1020', name: 'Introductory Macroeconomics', faculty: '商科', difficulty: 2, rating: 3.8, semester: 'Sem 1 & 2', topAssess: '期末考试 60%', assessments: [{ name: '期末考试', pct: 60 }, { name: 'Essay', pct: 25 }, { name: 'Tutorial', pct: 15 }], passReq: ['总分 ≥ 50%'], description: 'GDP、通胀、货币政策、财政政策。', reviews: [{ text: 'IS-LM模型是重点。', score: 4 }, { text: '比ECON1010稍难。', score: 4 }] },
  { code: 'ECON2010', name: 'Intermediate Microeconomics', faculty: '商科', difficulty: 3, rating: 3.5, semester: 'Sem 1', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '期中考试', pct: 25 }, { name: 'Tutorial', pct: 20 }], passReq: ['总分 ≥ 50%'], description: '博弈论、信息经济学、一般均衡理论。比入门课难很多。', reviews: [{ text: '博弈论部分很有趣，但数学要好。', score: 4 }, { text: '期中和期末都要认真准备。', score: 3 }] },
  { code: 'ACCT1101', name: 'Accounting for Decision Making', faculty: '商科', difficulty: 3, rating: 3.5, semester: 'Sem 1 & 2', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '期中测验', pct: 25 }, { name: '作业', pct: 20 }], passReq: ['总分 ≥ 50%'], description: '财务报表、会计原则、成本分析。商科必修。', reviews: [{ text: '借贷关系要搞清楚。', score: 3 }, { text: '做题要细心。', score: 4 }] },
  { code: 'ACCT2101', name: 'Financial Accounting', faculty: '商科', difficulty: 3, rating: 3.4, semester: 'Sem 1 & 2', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '期中测验', pct: 25 }, { name: '作业', pct: 20 }], passReq: ['总分 ≥ 50%'], description: '财务报告准则、复杂会计处理、财务分析。ACCT1101延续。', reviews: [{ text: '准则很多，要记清楚每个情况的处理方式。', score: 3 }, { text: '期末考试题型固定，历年题很有用。', score: 4 }] },
  { code: 'FINM1415', name: 'Introduction to Finance', faculty: '商科', difficulty: 3, rating: 3.7, semester: 'Sem 1 & 2', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '期中测验', pct: 25 }, { name: 'Tutorial', pct: 20 }], passReq: ['总分 ≥ 50%'], description: '时间价值、股票债券估值、资本预算、风险收益。', reviews: [{ text: 'Excel计算题要多练。', score: 4 }, { text: '时间价值是核心，先把这部分搞懂。', score: 4 }] },
  { code: 'MGTS1301', name: 'Introduction to Management', faculty: '商科', difficulty: 2, rating: 4.0, semester: 'Sem 1 & 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '小组项目', pct: 30 }, { name: '个人反思', pct: 20 }], passReq: ['总分 ≥ 50%'], description: '管理理论、组织行为、领导力。记忆为主，容易拿高分。', reviews: [{ text: '背理论就能过。', score: 5 }, { text: '小组项目选好队友。', score: 4 }] },
  { code: 'MKTG1501', name: 'Marketing Principles', faculty: '商科', difficulty: 2, rating: 4.1, semester: 'Sem 1 & 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '小组项目', pct: 35 }, { name: '测验', pct: 15 }], passReq: ['总分 ≥ 50%'], description: '4P营销组合、市场调研、消费者行为、品牌管理。', reviews: [{ text: '内容很实用，对创业很有帮助。', score: 5 }, { text: '小组项目做真实品牌分析，很有意思。', score: 4 }] },
  // 法律
  { code: 'LAWS1100', name: 'Foundations of Law', faculty: '法律', difficulty: 3, rating: 3.8, semester: 'Sem 1 & 2', topAssess: '期末考试 60%', assessments: [{ name: '期末考试', pct: 60 }, { name: '法律备忘录', pct: 25 }, { name: 'Tutorial', pct: 15 }], passReq: ['总分 ≥ 50%'], description: '澳洲法律体系、判例法、法律推理基础。', reviews: [{ text: 'IRAC格式要练熟。', score: 4 }, { text: 'Tutorial要积极参与。', score: 4 }] },
  { code: 'LAWS1200', name: 'Foundations of Criminal Law', faculty: '法律', difficulty: 3, rating: 3.7, semester: 'Sem 1 & 2', topAssess: '期末考试 60%', assessments: [{ name: '期末考试', pct: 60 }, { name: '研究Essay', pct: 30 }, { name: 'Tutorial', pct: 10 }], passReq: ['总分 ≥ 50%'], description: '犯罪构成要件、辩护理由、刑事司法程序。', reviews: [{ text: '案例要记很多，做好笔记整理。', score: 3 }, { text: 'Essay要早动手。', score: 4 }] },
  { code: 'LAWS2100', name: 'Contract Law', faculty: '法律', difficulty: 4, rating: 3.6, semester: 'Sem 1', topAssess: '期末考试 65%', assessments: [{ name: '期末考试', pct: 65 }, { name: 'Essay', pct: 25 }, { name: 'Tutorial', pct: 10 }], passReq: ['总分 ≥ 50%'], description: '合同要约承诺、合同条款、违约救济。法律专业核心课。', reviews: [{ text: '案例法要背很多，整理好案例卡片。', score: 3 }, { text: '期末开卷考，注释要做好。', score: 4 }] },
  { code: 'LAWS2110', name: 'Torts Law', faculty: '法律', difficulty: 4, rating: 3.5, semester: 'Sem 2', topAssess: '期末考试 65%', assessments: [{ name: '期末考试', pct: 65 }, { name: 'Essay', pct: 25 }, { name: 'Tutorial', pct: 10 }], passReq: ['总分 ≥ 50%'], description: '侵权行为、过失、诽谤、隐私权。和合同法一起是法律核心。', reviews: [{ text: '过失判断框架要熟练，考试常考。', score: 4 }, { text: '案例非常多，要有选择地记。', score: 3 }] },
  { code: 'LAWS3100', name: 'Corporations Law', faculty: '法律', difficulty: 4, rating: 3.6, semester: 'Sem 1', topAssess: '期末考试 60%', assessments: [{ name: '期末考试', pct: 60 }, { name: '研究Essay', pct: 30 }, { name: 'Tutorial', pct: 10 }], passReq: ['总分 ≥ 50%'], description: '公司设立、董事义务、股东权利、公司清算。商法核心。', reviews: [{ text: 'Corporations Act要熟悉，开卷考要会找条文。', score: 4 }, { text: '实务性强，对商科学生也很有用。', score: 4 }] },
  // 生物医学
  { code: 'BIOL1020', name: 'Biology: Diversification of Life', faculty: '生物医学', difficulty: 3, rating: 3.9, semester: 'Sem 1', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '实验', pct: 25 }, { name: '在线测验', pct: 25 }], passReq: ['总分 ≥ 50%'], description: '细胞生物学、遗传学、进化论基础。生物医学必修。', reviews: [{ text: '内容很多，要早点复习。', score: 3 }, { text: '实验很有趣。', score: 4 }] },
  { code: 'BIOL2202', name: 'Genetics & Evolution', faculty: '生物医学', difficulty: 4, rating: 3.6, semester: 'Sem 1', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '作业', pct: 25 }, { name: '实验', pct: 20 }], passReq: ['总分 ≥ 50%'], description: '孟德尔遗传学、分子遗传学、进化机制。', reviews: [{ text: '遗传题要多练，题型固定。', score: 4 }, { text: '进化部分内容多要记。', score: 3 }] },
  { code: 'CHEM1100', name: 'Chemistry 1', faculty: '生物医学', difficulty: 4, rating: 3.3, semester: 'Sem 1 & 2', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '实验', pct: 25 }, { name: '在线测验', pct: 20 }], passReq: ['期末考试 ≥ 40%（硬性要求）', '总分 ≥ 50%'], description: '原子结构、化学键、有机化学基础、反应动力学。', reviews: [{ text: '有机化学部分难度大。', score: 3 }, { text: '实验安全规范要严格遵守。', score: 3 }] },
  { code: 'BIOC2000', name: 'Biochemistry & Molecular Biology', faculty: '生物医学', difficulty: 4, rating: 3.5, semester: 'Sem 2', topAssess: '期末考试 55%', assessments: [{ name: '期末考试', pct: 55 }, { name: '实验报告', pct: 25 }, { name: '测验', pct: 20 }], passReq: ['总分 ≥ 50%'], description: '蛋白质结构、酶学、DNA复制转录翻译。生化核心课。', reviews: [{ text: '代谢通路要记很多，做思维导图帮助很大。', score: 3 }, { text: '实验技能很实用，以后研究要用到。', score: 4 }] },
  { code: 'MEDI2010', name: 'Human Anatomy', faculty: '生物医学', difficulty: 4, rating: 3.8, semester: 'Sem 1', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '实验考核', pct: 30 }, { name: '在线测验', pct: 20 }], passReq: ['总分 ≥ 50%', '实验考核 ≥ 50%'], description: '人体系统解剖学，重点是肌肉骨骼和内脏系统。', reviews: [{ text: '内容量巨大，每周都要复习。', score: 3 }, { text: '解剖实验室课很有意思，机会难得。', score: 5 }] },
  // 心理学
  { code: 'PSYC1020', name: 'Foundations of Psychology', faculty: '心理学', difficulty: 2, rating: 4.2, semester: 'Sem 1 & 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '作业x2', pct: 35 }, { name: '参与研究', pct: 15 }], passReq: ['总分 ≥ 50%'], description: '认知、发展、社会、临床心理学基础。内容有趣，通识选修热门。', reviews: [{ text: '内容很有意思，不像理工科那么枯燥。', score: 5 }, { text: '作业要联系实际生活来分析，不要死背理论。', score: 4 }] },
  { code: 'PSYC2010', name: 'Research Methods in Psychology', faculty: '心理学', difficulty: 3, rating: 3.5, semester: 'Sem 1', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: '实验报告', pct: 35 }, { name: '测验', pct: 15 }], passReq: ['总分 ≥ 50%'], description: '实验设计、统计分析、APA格式写作。心理学必修。', reviews: [{ text: 'SPSS统计软件要学会。', score: 3 }, { text: 'APA格式要严格按照要求，否则扣分很多。', score: 3 }] },
  { code: 'PSYC3020', name: 'Abnormal Psychology', faculty: '心理学', difficulty: 3, rating: 4.0, semester: 'Sem 2', topAssess: '期末考试 50%', assessments: [{ name: '期末考试', pct: 50 }, { name: 'Essay', pct: 30 }, { name: 'Tutorial', pct: 20 }], passReq: ['总分 ≥ 50%'], description: '各类心理障碍的诊断、成因与治疗。内容引人入胜。', reviews: [{ text: 'DSM-5诊断标准要熟悉。', score: 4 }, { text: 'Essay要结合最新研究文献。', score: 4 }] },
]

const faculties = ['全部', '机械工程', '工程', '数学', 'CS/IT', '物理', '商科', '法律', '生物医学', '心理学']

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
          <input type="text" placeholder="搜索课程代码或名称..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: '200px', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none' }} />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid #e5e7eb', fontSize: '14px', background: 'white' }}>
            <option value="code">按课程代码</option>
            <option value="rating">按评分最高</option>
            <option value="difficulty">按难度最低</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {faculties.map(f => (
            <button key={f} onClick={() => setFaculty(f)} style={{ padding: '6px 14px', borderRadius: '20px', border: '1px solid', borderColor: faculty === f ? '#51247A' : '#e5e7eb', background: faculty === f ? '#51247A' : 'white', color: faculty === f ? 'white' : '#6b7280', fontSize: '13px', cursor: 'pointer', fontWeight: faculty === f ? 600 : 400 }}>{f}</button>
          ))}
        </div>

        <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '16px' }}>找到 {filtered.length} 门课程</div>

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
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: '#9ca3af', fontSize: '14px' }}>没有找到匹配的课程，试试其他关键词</div>
          )}
        </div>
      </div>
    </div>
  )
}