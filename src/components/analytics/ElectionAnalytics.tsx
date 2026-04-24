'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import styles from './ElectionAnalytics.module.css';

const TURNOUT_DATA = [
  { year: '1999', turnout: 59.99 },
  { year: '2004', turnout: 58.07 },
  { year: '2009', turnout: 58.19 },
  { year: '2014', turnout: 66.44 },
  { year: '2019', turnout: 67.40 },
  { year: '2024', turnout: 65.79 },
];

const STATE_SEATS = [
  { state: 'UP', seats: 80 },
  { state: 'MH', seats: 48 },
  { state: 'WB', seats: 42 },
  { state: 'BR', seats: 40 },
  { state: 'TN', seats: 39 },
  { state: 'MP', seats: 29 },
  { state: 'KA', seats: 28 },
  { state: 'GJ', seats: 26 },
  { state: 'RJ', seats: 25 },
  { state: 'AP', seats: 25 },
];

const VOTER_DEMOGRAPHICS = [
  { name: 'Male', value: 49.7, color: '#3b82f6' },
  { name: 'Female', value: 47.2, color: '#ec4899' },
  { name: 'Third Gender', value: 0.01, color: '#8b5cf6' },
  { name: 'First-time', value: 3.09, color: '#22c55e' },
];

const GROWTH_DATA = [
  { year: '1951', voters: 173 },
  { year: '1962', voters: 217 },
  { year: '1971', voters: 274 },
  { year: '1980', voters: 356 },
  { year: '1991', voters: 498 },
  { year: '2004', voters: 671 },
  { year: '2014', voters: 834 },
  { year: '2024', voters: 968 },
];

export function ElectionAnalytics() {
  return (
    <div className={styles.analytics}>
      {/* Top stats */}
      <div className={`widget-grid widget-grid-3 ${styles.topStats}`}>
        <div className={`widget ${styles.miniStat}`}>
          <span className={styles.miniIcon}>📊</span>
          <div>
            <p className="widget-title">Avg. Turnout (Last 6)</p>
            <p className="stat-value">62.6%</p>
          </div>
        </div>
        <div className={`widget ${styles.miniStat}`}>
          <span className={styles.miniIcon}>📈</span>
          <div>
            <p className="widget-title">Peak Turnout</p>
            <p className="stat-value">67.4%</p>
            <span className="stat-change stat-up">↑ 2019</span>
          </div>
        </div>
        <div className={`widget ${styles.miniStat}`}>
          <span className={styles.miniIcon}>👥</span>
          <div>
            <p className="widget-title">Total Electors (2024)</p>
            <p className="stat-value">968M</p>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className={`widget-grid widget-grid-2 ${styles.chartRow}`}>
        <div className="widget">
          <div className="widget-header">
            <span className="widget-title">📊 Voter Turnout Trend</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={TURNOUT_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis domain={[50, 70]} tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 8 }} />
              <Bar dataKey="turnout" fill="var(--saffron-500)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="widget">
          <div className="widget-header">
            <span className="widget-title">📈 Electorate Growth (Millions)</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={GROWTH_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 8 }} />
              <Area type="monotone" dataKey="voters" stroke="var(--navy-500)" fill="url(#blueGrad)" strokeWidth={2} />
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--navy-500)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--navy-500)" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className={`widget-grid widget-grid-2 ${styles.chartRow}`}>
        <div className="widget">
          <div className="widget-header">
            <span className="widget-title">🏛️ Top 10 States by Seats</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={STATE_SEATS} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-default)" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="state" type="category" width={30} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 8 }} />
              <Bar dataKey="seats" fill="var(--green-500)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="widget">
          <div className="widget-header">
            <span className="widget-title">👥 Voter Demographics</span>
          </div>
          <div className={styles.pieContainer}>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={VOTER_DEMOGRAPHICS} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {VOTER_DEMOGRAPHICS.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.legend}>
              {VOTER_DEMOGRAPHICS.map((d) => (
                <div key={d.name} className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: d.color }} />
                  <span>{d.name}: {d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
