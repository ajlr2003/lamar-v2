import { useState, useMemo } from 'react'
import SubCostTrendChart from './SubCostTrendChart.jsx'
import SubScheduleChart  from './SubScheduleChart.jsx'
import SubPieChart       from './SubPieChart.jsx'
import '../../styles/SubsidiariesPage.css'

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SUBSIDIARIES = [
  {
    id: 1,
    name: 'TechCorp Solutions',
    sector: 'Technology',
    region: 'North America',
    risk: 'Low Risk',
    ceo: 'John Smith',
    activeProjects: 12,
    totalBudget: '$24.5M',
    costVariance: -2.3,
    schedule: 92,
    scheduleLabel: 'On Track',
    contractors: 18,
    completion: 67,
    kpis: {
      activeProjects: { value: 12,       trend: '+2 this month',  color: '#16a34a' },
      totalBudget:    { value: '$24.5M',  sub: 'Allocated',        color: '#1e293b' },
      costVariance:   { value: '-2.3%',   sub: 'Under budget',     color: '#16a34a' },
      schedule:       { value: '92%',     sub: 'On track',         color: '#d97706' },
      contractors:    { value: 18,        sub: 'Active',           color: '#1e293b' },
      completion:     { value: '67%',     sub: 'Overall',          color: '#3b5bdb' },
    },
    kpiDetails: {
      activeProjects: { title: 'Active Projects Breakdown',  rows: [{ label: 'Construction Phase', value: '5 projects' }, { label: 'Planning Phase', value: '4 projects' }, { label: 'Completion Phase', value: '3 projects' }, { label: 'On Schedule', value: '10 / 12' }, { label: 'At Risk', value: '2 / 12', color: '#dc2626' }] },
      totalBudget:    { title: 'Budget Allocation',           rows: [{ label: 'Total Allocated', value: '$24.5M' }, { label: 'Spent to Date', value: '$16.4M' }, { label: 'Remaining', value: '$8.1M', color: '#16a34a' }, { label: 'Q2 Forecast', value: '$26.2M' }, { label: 'Contingency Used', value: '12%' }] },
      costVariance:   { title: 'Cost Variance Details',       rows: [{ label: 'Budget', value: '$24.5M' }, { label: 'Actual Cost', value: '$23.9M' }, { label: 'Variance', value: '-$0.6M', color: '#16a34a' }, { label: 'YTD Variance', value: '-2.3%', color: '#16a34a' }, { label: 'Status', value: 'Under Budget', color: '#16a34a' }] },
      schedule:       { title: 'Schedule Performance',        rows: [{ label: 'On-Time Rate', value: '92%' }, { label: 'Delayed Projects', value: '1' }, { label: 'Avg Delay', value: '4 days' }, { label: 'Milestones Met', value: '18 / 20' }, { label: 'Next Milestone', value: 'Apr 15' }] },
      contractors:    { title: 'Contractor Overview',         rows: [{ label: 'Active Contractors', value: '18' }, { label: 'Top Performer', value: 'BuildTech Inc' }, { label: 'Avg Score', value: '8.4 / 10', color: '#16a34a' }, { label: 'Under Review', value: '2', color: '#d97706' }, { label: 'Total Contract Value', value: '$18.5M' }] },
      completion:     { title: 'Completion Status',           rows: [{ label: 'Overall Progress', value: '67%' }, { label: 'Completed', value: '8 projects', color: '#16a34a' }, { label: 'In Progress', value: '4 projects' }, { label: 'Target EOY', value: '95%' }, { label: 'Projected EOY', value: '91%', color: '#d97706' }] },
    },
    contractorsList: [
      { name: 'BuildTech Inc',  type: 'General Construction', projects: 5, value: '$8.2M', status: 'Active' },
      { name: 'ElectroSystems', type: 'Electrical & Systems',  projects: 3, value: '$4.5M', status: 'Active' },
      { name: 'MechaPro Ltd',   type: 'Mechanical Services',   projects: 4, value: '$6.1M', status: 'Review' },
    ],
    updates: [
      { title: 'Project Alpha milestone completed',          body: 'Phase 2 construction completed ahead of schedule. Moving to final inspection.', time: '2 hours ago', accent: '#3b5bdb' },
      { title: 'Budget optimization achieved',               body: 'Cost savings of $450K identified through procurement optimization.',           time: '5 hours ago', accent: '#16a34a' },
      { title: 'Contractor performance review scheduled',    body: 'Quarterly review meeting set for BuildTech Inc on March 25th.',               time: '1 day ago',   accent: '#d97706' },
    ],
    projectsList: [
      { name: 'Project Alpha - Data Center Expansion',   pm: 'Michael Chen',   started: 'Jan 15, 2024', status: 'On Track', budget: '$5.2M', spent: '$3.1M', progress: 67, due: 'Jun 30, 2024' },
      { name: 'Project Beta - Cloud Infrastructure',     pm: 'Sarah Williams', started: 'Feb 1, 2024',  status: 'At Risk',  budget: '$3.8M', spent: '$2.4M', progress: 52, due: 'May 15, 2024' },
      { name: 'Project Gamma - Security Upgrade',        pm: 'David Rodriguez',started: 'Dec 10, 2023', status: 'On Track', budget: '$2.1M', spent: '$1.8M', progress: 85, due: 'Apr 20, 2024' },
      { name: 'Project Delta - Network Modernization',   pm: 'Emily Taylor',   started: 'Jan 5, 2024',  status: 'Delayed',  budget: '$4.5M', spent: '$2.1M', progress: 38, due: 'Jul 10, 2024' },
      { name: 'Project Epsilon - Office HQ Renovation',  pm: 'James Park',     started: 'Mar 1, 2024',  status: 'On Track', budget: '$2.8M', spent: '$0.6M', progress: 21, due: 'Sep 30, 2024' },
    ],
    financials: {
      totalBudget: '$24.5M',  totalBudgetSub: 'Across 12 projects',
      totalSpent:  '$16.2M',  totalSpentSub:  '66% of budget',
      costSavings: '$560K',   costSavingsSub: 'Under budget',
      pie: [
        { label: 'Labor Costs',            pct: 34.7, value: '$8.5M',  color: '#3b5bdb' },
        { label: 'Equipment & Materials',  pct: 17.1, value: '$4.2M',  color: '#10b981' },
        { label: 'Other',                  pct: 13.5, value: '$3.3M',  color: '#8b5cf6' },
        { label: 'Consulting',             pct: 12.7, value: '$3.1M',  color: '#f59e0b' },
        { label: 'Software & Licenses',    pct: 11.4, value: '$2.8M',  color: '#7c3aed' },
        { label: 'Operations',             pct: 10.6, value: '$2.6M',  color: '#ec4899' },
      ],
      topExpenses: [
        { name: 'Labor Costs',          type: 'Construction & Engineering', value: '$8.5M' },
        { name: 'Equipment & Materials',type: 'Hardware & Infrastructure',  value: '$4.2M' },
        { name: 'Consulting Services',  type: 'Technical & Management',     value: '$3.1M' },
        { name: 'Software & Licenses',  type: 'SaaS & Development',        value: '$2.8M' },
      ],
      projectSummary: [
        { label: 'Total Projects',  sub: 'Active & Completed', value: '12' },
        { label: 'Avg. Budget',     sub: 'Per Project',        value: '$2.04M' },
        { label: 'Avg. Progress',   sub: 'Completion',         value: '67%' },
        { label: 'Avg. Duration',   sub: 'Timeline',           value: '18 months' },
      ],
    },
    risks: {
      critical: 3, medium: 5,
      items: [
        { title: 'Supply Chain Disruption', desc: 'Key equipment suppliers facing delays. Alternative sourcing needed.', time: '2 days ago',  severity: 'Critical' },
        { title: 'Labor Shortage',          desc: 'Critical skills shortage in specialized engineering roles.',           time: '1 week ago',  severity: 'Medium' },
        { title: 'Regulatory Changes',      desc: 'New environmental regulations affecting construction timelines.',       time: '1 month ago', severity: 'Medium' },
      ],
    },
  },
  {
    id: 2,
    name: 'HealthPlus Medical',
    sector: 'Healthcare',
    region: 'Europe',
    risk: 'Medium Risk',
    ceo: 'Maria Garcia',
    activeProjects: 8,
    totalBudget: '$18.2M',
    costVariance: +5.7,
    schedule: 74,
    scheduleLabel: 'Delayed',
    contractors: 11,
    completion: 54,
    kpis: {
      activeProjects: { value: 8,        trend: '-1 this month', color: '#dc2626' },
      totalBudget:    { value: '$18.2M',  sub: 'Allocated',       color: '#1e293b' },
      costVariance:   { value: '+5.7%',   sub: 'Over budget',     color: '#dc2626' },
      schedule:       { value: '74%',     sub: 'Delayed',         color: '#dc2626' },
      contractors:    { value: 11,        sub: 'Active',          color: '#1e293b' },
      completion:     { value: '54%',     sub: 'Overall',         color: '#3b5bdb' },
    },
    kpiDetails: {
      activeProjects: { title: 'Active Projects Breakdown',  rows: [{ label: 'On Schedule', value: '5 / 8' }, { label: 'Delayed', value: '3 / 8', color: '#dc2626' }, { label: 'Critical', value: '1', color: '#dc2626' }, { label: 'Planning', value: '2' }, { label: 'Execution', value: '6' }] },
      totalBudget:    { title: 'Budget Allocation',           rows: [{ label: 'Total Allocated', value: '$18.2M' }, { label: 'Spent to Date', value: '$14.8M' }, { label: 'Remaining', value: '$3.4M', color: '#d97706' }, { label: 'Q2 Forecast', value: '$19.8M' }, { label: 'Contingency Used', value: '68%', color: '#dc2626' }] },
      costVariance:   { title: 'Cost Variance Details',       rows: [{ label: 'Budget', value: '$18.2M' }, { label: 'Actual Cost', value: '$19.2M' }, { label: 'Variance', value: '+$1.0M', color: '#dc2626' }, { label: 'YTD Variance', value: '+5.7%', color: '#dc2626' }, { label: 'Status', value: 'Over Budget', color: '#dc2626' }] },
      schedule:       { title: 'Schedule Performance',        rows: [{ label: 'On-Time Rate', value: '74%' }, { label: 'Delayed Projects', value: '3', color: '#dc2626' }, { label: 'Avg Delay', value: '18 days', color: '#dc2626' }, { label: 'Milestones Met', value: '11 / 18' }, { label: 'Next Milestone', value: 'Apr 3' }] },
      contractors:    { title: 'Contractor Overview',         rows: [{ label: 'Active Contractors', value: '11' }, { label: 'Top Performer', value: 'MedBuild Co' }, { label: 'Avg Score', value: '7.1 / 10', color: '#d97706' }, { label: 'Under Review', value: '3', color: '#dc2626' }, { label: 'Total Contract Value', value: '$12.4M' }] },
      completion:     { title: 'Completion Status',           rows: [{ label: 'Overall Progress', value: '54%' }, { label: 'Completed', value: '4 projects' }, { label: 'In Progress', value: '4 projects' }, { label: 'Target EOY', value: '90%' }, { label: 'Projected EOY', value: '78%', color: '#dc2626' }] },
    },
    contractorsList: [
      { name: 'MedBuild Co',    type: 'Medical Facilities',  projects: 3, value: '$5.1M', status: 'Active' },
      { name: 'CleanSpace Ltd', type: 'Sanitation & HVAC',   projects: 4, value: '$4.2M', status: 'Review' },
      { name: 'SafeElec GmbH',  type: 'Electrical Systems',  projects: 4, value: '$3.1M', status: 'Active' },
    ],
    updates: [
      { title: 'Ward 4 construction delayed',  body: 'Structural inspection flagged two issues. Estimated 3-week delay.', time: '1 hour ago',  accent: '#dc2626' },
      { title: 'New contractor onboarded',     body: 'SafeElec GmbH added for electrical phase of Hamburg facility.',    time: '3 hours ago', accent: '#16a34a' },
      { title: 'Budget review meeting set',    body: 'Finance team to review Q2 overrun on April 2nd.',                  time: '2 days ago',  accent: '#d97706' },
    ],
    projectsList: [
      { name: 'Hamburg Medical Wing',          pm: 'Klaus Bauer',     started: 'Nov 12, 2023', status: 'Delayed',  budget: '$4.8M', spent: '$4.1M', progress: 71, due: 'Apr 30, 2024' },
      { name: 'Lyon Diagnostic Centre',        pm: 'Sophie Morel',    started: 'Jan 8, 2024',  status: 'On Track', budget: '$3.2M', spent: '$1.4M', progress: 44, due: 'Aug 20, 2024' },
      { name: 'Madrid Clinic Expansion',       pm: 'Carlos Ruiz',     started: 'Feb 14, 2024', status: 'At Risk',  budget: '$5.5M', spent: '$2.2M', progress: 40, due: 'Oct 15, 2024' },
      { name: 'Amsterdam Lab Upgrade',         pm: 'Lena Visser',     started: 'Mar 5, 2024',  status: 'Delayed',  budget: '$2.9M', spent: '$1.8M', progress: 28, due: 'Jul 1, 2024'  },
    ],
    financials: {
      totalBudget: '$18.2M', totalBudgetSub: 'Across 8 projects',
      totalSpent:  '$14.8M', totalSpentSub:  '81% of budget',
      costSavings: '-$1.0M', costSavingsSub: 'Over budget',
      pie: [
        { label: 'Labor Costs',           pct: 38.2, value: '$5.7M', color: '#3b5bdb' },
        { label: 'Medical Equipment',     pct: 22.4, value: '$3.3M', color: '#10b981' },
        { label: 'Compliance & Legal',    pct: 14.1, value: '$2.1M', color: '#8b5cf6' },
        { label: 'Consulting',            pct: 12.2, value: '$1.8M', color: '#f59e0b' },
        { label: 'IT & Software',         pct:  8.1, value: '$1.2M', color: '#7c3aed' },
        { label: 'Operations',            pct:  5.0, value: '$0.7M', color: '#ec4899' },
      ],
      topExpenses: [
        { name: 'Labor Costs',        type: 'Clinical & Engineering',   value: '$5.7M' },
        { name: 'Medical Equipment',  type: 'Diagnostic & Surgical',    value: '$3.3M' },
        { name: 'Compliance & Legal', type: 'Regulatory Affairs',       value: '$2.1M' },
        { name: 'Consulting',         type: 'Technical & Management',   value: '$1.8M' },
      ],
      projectSummary: [
        { label: 'Total Projects',  sub: 'Active & Completed', value: '8' },
        { label: 'Avg. Budget',     sub: 'Per Project',        value: '$2.28M' },
        { label: 'Avg. Progress',   sub: 'Completion',         value: '54%' },
        { label: 'Avg. Duration',   sub: 'Timeline',           value: '14 months' },
      ],
    },
    risks: {
      critical: 4, medium: 3,
      items: [
        { title: 'Construction Permit Delays', desc: 'Hamburg city council holding structural review. 3-week impact expected.',    time: '1 day ago',   severity: 'Critical' },
        { title: 'Budget Overrun Risk',        desc: 'Q2 contingency pool 68% depleted. Escalation review required.',             time: '3 days ago',  severity: 'Critical' },
        { title: 'Contractor Performance',     desc: 'CleanSpace Ltd failing HVAC quality checks on two sites.',                  time: '1 week ago',  severity: 'Medium' },
      ],
    },
  },
  {
    id: 3,
    name: 'Finance Group Ltd',
    sector: 'Finance',
    region: 'Asia Pacific',
    risk: 'Low Risk',
    ceo: 'David Chen',
    activeProjects: 15,
    totalBudget: '$31.0M',
    costVariance: -1.2,
    schedule: 96,
    scheduleLabel: 'Ahead',
    contractors: 22,
    completion: 78,
    kpis: {
      activeProjects: { value: 15,       trend: '+3 this month', color: '#16a34a' },
      totalBudget:    { value: '$31.0M',  sub: 'Allocated',       color: '#1e293b' },
      costVariance:   { value: '-1.2%',   sub: 'Under budget',    color: '#16a34a' },
      schedule:       { value: '96%',     sub: 'Ahead',           color: '#16a34a' },
      contractors:    { value: 22,        sub: 'Active',          color: '#1e293b' },
      completion:     { value: '78%',     sub: 'Overall',         color: '#3b5bdb' },
    },
    kpiDetails: {
      activeProjects: { title: 'Active Projects Breakdown',  rows: [{ label: 'On Schedule', value: '14 / 15', color: '#16a34a' }, { label: 'Delayed', value: '1 / 15' }, { label: 'Critical', value: '0', color: '#16a34a' }, { label: 'Planning', value: '3' }, { label: 'Execution', value: '12' }] },
      totalBudget:    { title: 'Budget Allocation',           rows: [{ label: 'Total Allocated', value: '$31.0M' }, { label: 'Spent to Date', value: '$24.1M' }, { label: 'Remaining', value: '$6.9M', color: '#16a34a' }, { label: 'Q2 Forecast', value: '$32.0M' }, { label: 'Contingency Used', value: '8%', color: '#16a34a' }] },
      costVariance:   { title: 'Cost Variance Details',       rows: [{ label: 'Budget', value: '$31.0M' }, { label: 'Actual Cost', value: '$30.6M' }, { label: 'Variance', value: '-$0.4M', color: '#16a34a' }, { label: 'YTD Variance', value: '-1.2%', color: '#16a34a' }, { label: 'Status', value: 'Under Budget', color: '#16a34a' }] },
      schedule:       { title: 'Schedule Performance',        rows: [{ label: 'On-Time Rate', value: '96%', color: '#16a34a' }, { label: 'Delayed Projects', value: '1' }, { label: 'Avg Delay', value: '2 days' }, { label: 'Milestones Met', value: '28 / 30', color: '#16a34a' }, { label: 'Next Milestone', value: 'Apr 8' }] },
      contractors:    { title: 'Contractor Overview',         rows: [{ label: 'Active Contractors', value: '22' }, { label: 'Top Performer', value: 'AsiaBuild Corp' }, { label: 'Avg Score', value: '9.1 / 10', color: '#16a34a' }, { label: 'Under Review', value: '1' }, { label: 'Total Contract Value', value: '$24.6M' }] },
      completion:     { title: 'Completion Status',           rows: [{ label: 'Overall Progress', value: '78%', color: '#16a34a' }, { label: 'Completed', value: '11 projects', color: '#16a34a' }, { label: 'In Progress', value: '4 projects' }, { label: 'Target EOY', value: '98%' }, { label: 'Projected EOY', value: '97%', color: '#16a34a' }] },
    },
    contractorsList: [
      { name: 'AsiaBuild Corp', type: 'General Construction', projects: 7, value: '$9.8M', status: 'Active' },
      { name: 'DataInfra Ltd',  type: 'IT Infrastructure',    projects: 5, value: '$7.2M', status: 'Active' },
      { name: 'GreenSpace Co',  type: 'Landscaping & Civil',  projects: 3, value: '$4.1M', status: 'Active' },
    ],
    updates: [
      { title: 'Singapore HQ phase complete', body: 'Foundation and structural work finished 6 days ahead of schedule.', time: '30 min ago',  accent: '#16a34a' },
      { title: 'New project approved',        body: 'Board approved expansion of Tokyo data center. $4.2M allocated.',   time: '4 hours ago', accent: '#3b5bdb' },
      { title: 'Q1 audit passed',             body: 'All 15 projects passed compliance audit with zero findings.',        time: '3 days ago',  accent: '#16a34a' },
    ],
    projectsList: [
      { name: 'Singapore HQ Expansion',       pm: 'Wei Liang',      started: 'Sep 1, 2023',  status: 'On Track', budget: '$8.4M', spent: '$6.8M', progress: 81, due: 'May 30, 2024' },
      { name: 'Tokyo Data Center Phase 2',    pm: 'Yuki Tanaka',    started: 'Jan 20, 2024', status: 'On Track', budget: '$4.2M', spent: '$0.9M', progress: 18, due: 'Dec 1, 2024'  },
      { name: 'Sydney Office Fit-Out',        pm: 'Rachel Nguyen',  started: 'Nov 5, 2023',  status: 'Ahead',    budget: '$3.1M', spent: '$2.7M', progress: 88, due: 'Apr 10, 2024' },
      { name: 'Hong Kong Branch Renovation', pm: 'Kevin Chan',     started: 'Feb 10, 2024', status: 'On Track', budget: '$2.8M', spent: '$1.0M', progress: 35, due: 'Aug 15, 2024' },
      { name: 'Seoul Risk Centre Build',      pm: 'Ji-Ho Park',     started: 'Mar 1, 2024',  status: 'Delayed',  budget: '$3.5M', spent: '$0.7M', progress: 15, due: 'Nov 30, 2024' },
    ],
    financials: {
      totalBudget: '$31.0M', totalBudgetSub: 'Across 15 projects',
      totalSpent:  '$24.1M', totalSpentSub:  '78% of budget',
      costSavings: '$390K',  costSavingsSub: 'Under budget',
      pie: [
        { label: 'Labor Costs',          pct: 32.1, value: '$7.7M', color: '#3b5bdb' },
        { label: 'Construction',         pct: 24.6, value: '$5.9M', color: '#10b981' },
        { label: 'IT & Infrastructure',  pct: 18.3, value: '$4.4M', color: '#8b5cf6' },
        { label: 'Consulting',           pct: 12.0, value: '$2.9M', color: '#f59e0b' },
        { label: 'Compliance',           pct:  7.5, value: '$1.8M', color: '#7c3aed' },
        { label: 'Operations',           pct:  5.5, value: '$1.3M', color: '#ec4899' },
      ],
      topExpenses: [
        { name: 'Labor Costs',         type: 'Finance & Engineering', value: '$7.7M' },
        { name: 'Construction',        type: 'Civil & Structural',    value: '$5.9M' },
        { name: 'IT & Infrastructure', type: 'Systems & Networks',    value: '$4.4M' },
        { name: 'Consulting',          type: 'Strategy & PMO',        value: '$2.9M' },
      ],
      projectSummary: [
        { label: 'Total Projects',  sub: 'Active & Completed', value: '15' },
        { label: 'Avg. Budget',     sub: 'Per Project',        value: '$2.07M' },
        { label: 'Avg. Progress',   sub: 'Completion',         value: '78%' },
        { label: 'Avg. Duration',   sub: 'Timeline',           value: '16 months' },
      ],
    },
    risks: {
      critical: 1, medium: 2,
      items: [
        { title: 'Seoul Permit Delay',       desc: 'Local authority review of structural plans delayed by 3 weeks.', time: '2 days ago', severity: 'Critical' },
        { title: 'FX Rate Exposure',         desc: 'JPY/USD movement impacting Tokyo project budget by ~$120K.',    time: '1 week ago', severity: 'Medium' },
        { title: 'Subcontractor Capacity',   desc: 'AsiaBuild Corp reporting resource constraints for Q2.',         time: '2 weeks ago',severity: 'Medium' },
      ],
    },
  },
  {
    id: 4,
    name: 'Energy Solutions',
    sector: 'Energy',
    region: 'Middle East',
    risk: 'High Risk',
    ceo: 'Ahmed Al-Rashid',
    activeProjects: 6,
    totalBudget: '$42.0M',
    costVariance: +12.4,
    schedule: 61,
    scheduleLabel: 'Critical',
    contractors: 9,
    completion: 38,
    kpis: {
      activeProjects: { value: 6,        trend: 'No change',    color: '#64748b' },
      totalBudget:    { value: '$42.0M',  sub: 'Allocated',     color: '#1e293b' },
      costVariance:   { value: '+12.4%',  sub: 'Over budget',   color: '#dc2626' },
      schedule:       { value: '61%',     sub: 'Critical',      color: '#dc2626' },
      contractors:    { value: 9,         sub: 'Active',        color: '#1e293b' },
      completion:     { value: '38%',     sub: 'Overall',       color: '#3b5bdb' },
    },
    kpiDetails: {
      activeProjects: { title: 'Active Projects Breakdown',  rows: [{ label: 'On Schedule', value: '2 / 6' }, { label: 'Delayed', value: '3 / 6', color: '#dc2626' }, { label: 'Critical', value: '1', color: '#dc2626' }, { label: 'Planning', value: '1' }, { label: 'Execution', value: '5' }] },
      totalBudget:    { title: 'Budget Allocation',           rows: [{ label: 'Total Allocated', value: '$42.0M' }, { label: 'Spent to Date', value: '$28.6M' }, { label: 'Remaining', value: '$13.4M', color: '#d97706' }, { label: 'Q2 Forecast', value: '$48.2M', color: '#dc2626' }, { label: 'Contingency Used', value: '89%', color: '#dc2626' }] },
      costVariance:   { title: 'Cost Variance Details',       rows: [{ label: 'Budget', value: '$42.0M' }, { label: 'Actual Cost', value: '$47.2M' }, { label: 'Variance', value: '+$5.2M', color: '#dc2626' }, { label: 'YTD Variance', value: '+12.4%', color: '#dc2626' }, { label: 'Status', value: 'Critically Over', color: '#dc2626' }] },
      schedule:       { title: 'Schedule Performance',        rows: [{ label: 'On-Time Rate', value: '61%', color: '#dc2626' }, { label: 'Delayed Projects', value: '3', color: '#dc2626' }, { label: 'Avg Delay', value: '34 days', color: '#dc2626' }, { label: 'Milestones Met', value: '7 / 16' }, { label: 'Next Milestone', value: 'Overdue', color: '#dc2626' }] },
      contractors:    { title: 'Contractor Overview',         rows: [{ label: 'Active Contractors', value: '9' }, { label: 'Top Performer', value: 'PetroBuild LLC' }, { label: 'Avg Score', value: '5.8 / 10', color: '#dc2626' }, { label: 'Under Review', value: '4', color: '#dc2626' }, { label: 'Total Contract Value', value: '$31.0M' }] },
      completion:     { title: 'Completion Status',           rows: [{ label: 'Overall Progress', value: '38%', color: '#dc2626' }, { label: 'Completed', value: '2 projects' }, { label: 'In Progress', value: '4 projects' }, { label: 'Target EOY', value: '80%' }, { label: 'Projected EOY', value: '55%', color: '#dc2626' }] },
    },
    contractorsList: [
      { name: 'PetroBuild LLC', type: 'Oil & Gas Construction', projects: 3, value: '$14.2M', status: 'Review' },
      { name: 'DesertCivil Co', type: 'Civil Engineering',      projects: 2, value: '$9.8M',  status: 'Active' },
      { name: 'PowerGrid Ltd',  type: 'Electrical & Grid',      projects: 4, value: '$7.0M',  status: 'Review' },
    ],
    updates: [
      { title: 'Refinery phase critically delayed', body: 'Supply chain issues causing 5-week delay on Phase 3 equipment delivery.', time: '45 min ago',  accent: '#dc2626' },
      { title: 'Emergency board review called',     body: 'CEO Al-Rashid requested emergency session to address cost overruns.',      time: '2 hours ago', accent: '#dc2626' },
      { title: 'Contractor audit initiated',        body: 'PetroBuild LLC under formal performance audit for Q1 failures.',           time: '1 day ago',   accent: '#d97706' },
    ],
    projectsList: [
      { name: 'Riyadh Refinery Phase 3',       pm: 'Omar Khalid',    started: 'Jun 1, 2023',  status: 'Delayed',  budget: '$18.2M', spent: '$14.6M', progress: 42, due: 'Aug 31, 2024' },
      { name: 'Abu Dhabi Solar Farm',          pm: 'Hassan Malik',   started: 'Oct 10, 2023', status: 'At Risk',  budget: '$12.5M', spent: '$5.8M',  progress: 31, due: 'Dec 15, 2024' },
      { name: 'Dubai Grid Modernisation',      pm: 'Fatima Al-Zaabi',started: 'Jan 15, 2024', status: 'On Track', budget: '$6.4M',  spent: '$2.1M',  progress: 28, due: 'Jan 30, 2025' },
      { name: 'Kuwait Pipeline Extension',     pm: 'Tariq Nasser',   started: 'Feb 1, 2024',  status: 'Delayed',  budget: '$4.9M',  spent: '$6.1M',  progress: 22, due: 'Sep 30, 2024' },
    ],
    financials: {
      totalBudget: '$42.0M', totalBudgetSub: 'Across 6 projects',
      totalSpent:  '$28.6M', totalSpentSub:  '68% of budget',
      costSavings: '-$5.2M', costSavingsSub: 'Over budget',
      pie: [
        { label: 'Equipment & Plant',   pct: 41.2, value: '$11.8M', color: '#3b5bdb' },
        { label: 'Labor Costs',         pct: 26.4, value: '$7.6M',  color: '#10b981' },
        { label: 'Materials',           pct: 14.8, value: '$4.2M',  color: '#8b5cf6' },
        { label: 'Logistics',           pct:  9.3, value: '$2.7M',  color: '#f59e0b' },
        { label: 'Consulting',          pct:  5.1, value: '$1.5M',  color: '#7c3aed' },
        { label: 'Other',               pct:  3.2, value: '$0.9M',  color: '#ec4899' },
      ],
      topExpenses: [
        { name: 'Equipment & Plant',  type: 'Refinery & Grid Assets',   value: '$11.8M' },
        { name: 'Labor Costs',        type: 'Engineering & Operations',  value: '$7.6M'  },
        { name: 'Materials',          type: 'Piping, Steel & Concrete',  value: '$4.2M'  },
        { name: 'Logistics',          type: 'Transport & Customs',       value: '$2.7M'  },
      ],
      projectSummary: [
        { label: 'Total Projects',  sub: 'Active & Completed', value: '6' },
        { label: 'Avg. Budget',     sub: 'Per Project',        value: '$7.0M'  },
        { label: 'Avg. Progress',   sub: 'Completion',         value: '38%'  },
        { label: 'Avg. Duration',   sub: 'Timeline',           value: '22 months' },
      ],
    },
    risks: {
      critical: 5, medium: 2,
      items: [
        { title: 'Refinery Phase 3 Equipment Delay', desc: 'Critical turbine components stuck in customs. 5-week impact.',    time: '45 min ago',  severity: 'Critical' },
        { title: 'Cost Overrun — Kuwait Pipeline',   desc: 'Spend already exceeds approved budget. Requires board approval.', time: '1 day ago',   severity: 'Critical' },
        { title: 'Contractor Audit — PetroBuild',    desc: 'Formal quality audit triggered after three failed inspections.',  time: '2 days ago',  severity: 'Medium'   },
      ],
    },
  },
  {
    id: 5,
    name: 'Retail Chain Co',
    sector: 'Retail',
    region: 'North America',
    risk: 'Medium Risk',
    ceo: 'Lisa Thompson',
    activeProjects: 9,
    totalBudget: '$15.8M',
    costVariance: +3.1,
    schedule: 83,
    scheduleLabel: 'On Track',
    contractors: 14,
    completion: 61,
    kpis: {
      activeProjects: { value: 9,        trend: '+1 this month',    color: '#16a34a' },
      totalBudget:    { value: '$15.8M',  sub: 'Allocated',          color: '#1e293b' },
      costVariance:   { value: '+3.1%',   sub: 'Slightly over',      color: '#d97706' },
      schedule:       { value: '83%',     sub: 'On Track',           color: '#d97706' },
      contractors:    { value: 14,        sub: 'Active',             color: '#1e293b' },
      completion:     { value: '61%',     sub: 'Overall',            color: '#3b5bdb' },
    },
    kpiDetails: {
      activeProjects: { title: 'Active Projects Breakdown',  rows: [{ label: 'On Schedule', value: '7 / 9' }, { label: 'Delayed', value: '2 / 9', color: '#d97706' }, { label: 'Critical', value: '0', color: '#16a34a' }, { label: 'Planning', value: '2' }, { label: 'Execution', value: '7' }] },
      totalBudget:    { title: 'Budget Allocation',           rows: [{ label: 'Total Allocated', value: '$15.8M' }, { label: 'Spent to Date', value: '$11.2M' }, { label: 'Remaining', value: '$4.6M' }, { label: 'Q2 Forecast', value: '$16.4M' }, { label: 'Contingency Used', value: '41%' }] },
      costVariance:   { title: 'Cost Variance Details',       rows: [{ label: 'Budget', value: '$15.8M' }, { label: 'Actual Cost', value: '$16.3M' }, { label: 'Variance', value: '+$0.5M', color: '#d97706' }, { label: 'YTD Variance', value: '+3.1%', color: '#d97706' }, { label: 'Status', value: 'Slightly Over', color: '#d97706' }] },
      schedule:       { title: 'Schedule Performance',        rows: [{ label: 'On-Time Rate', value: '83%' }, { label: 'Delayed Projects', value: '2', color: '#d97706' }, { label: 'Avg Delay', value: '9 days' }, { label: 'Milestones Met', value: '14 / 18' }, { label: 'Next Milestone', value: 'Apr 10' }] },
      contractors:    { title: 'Contractor Overview',         rows: [{ label: 'Active Contractors', value: '14' }, { label: 'Top Performer', value: 'RetailBuild Inc' }, { label: 'Avg Score', value: '7.8 / 10', color: '#d97706' }, { label: 'Under Review', value: '2', color: '#d97706' }, { label: 'Total Contract Value', value: '$11.2M' }] },
      completion:     { title: 'Completion Status',           rows: [{ label: 'Overall Progress', value: '61%' }, { label: 'Completed', value: '5 projects' }, { label: 'In Progress', value: '4 projects' }, { label: 'Target EOY', value: '95%' }, { label: 'Projected EOY', value: '88%', color: '#d97706' }] },
    },
    contractorsList: [
      { name: 'RetailBuild Inc', type: 'Retail Fit-Out',        projects: 4, value: '$5.2M', status: 'Active' },
      { name: 'SignagePro',      type: 'Signage & Display',      projects: 3, value: '$2.8M', status: 'Active' },
      { name: 'CoolSystems Co',  type: 'HVAC & Refrigeration',  projects: 2, value: '$3.2M', status: 'Review' },
    ],
    updates: [
      { title: 'Dallas store opening delayed', body: 'Permit approval pushed back by city council. New opening set for May 12.', time: '3 hours ago', accent: '#d97706' },
      { title: 'Chicago fit-out complete',     body: 'Flagship Chicago store completed on schedule and under budget.',            time: '1 day ago',   accent: '#16a34a' },
      { title: 'Q2 expansion approved',        body: 'Board approved 4 additional store locations for Q3 rollout.',               time: '2 days ago',  accent: '#3b5bdb' },
    ],
    projectsList: [
      { name: 'Chicago Flagship Store',        pm: 'Marcus Webb',    started: 'Oct 1, 2023',  status: 'On Track', budget: '$3.2M', spent: '$3.0M',  progress: 94, due: 'Apr 15, 2024' },
      { name: 'Dallas New Location',           pm: 'Angela Price',   started: 'Jan 10, 2024', status: 'Delayed',  budget: '$2.8M', spent: '$1.2M',  progress: 36, due: 'Jun 1, 2024'  },
      { name: 'Houston Renovation',            pm: 'Troy Barnes',    started: 'Feb 20, 2024', status: 'On Track', budget: '$1.9M', spent: '$0.6M',  progress: 28, due: 'Aug 30, 2024' },
      { name: 'Phoenix Store Remodel',         pm: 'Sandra Lee',     started: 'Mar 5, 2024',  status: 'At Risk',  budget: '$2.4M', spent: '$0.4M',  progress: 15, due: 'Oct 1, 2024'  },
    ],
    financials: {
      totalBudget: '$15.8M', totalBudgetSub: 'Across 9 projects',
      totalSpent:  '$11.2M', totalSpentSub:  '71% of budget',
      costSavings: '-$490K', costSavingsSub: 'Slightly over',
      pie: [
        { label: 'Fit-Out & Construction', pct: 42.0, value: '$4.7M', color: '#3b5bdb' },
        { label: 'Fixtures & Fittings',    pct: 21.4, value: '$2.4M', color: '#10b981' },
        { label: 'Signage & Branding',     pct: 14.3, value: '$1.6M', color: '#8b5cf6' },
        { label: 'HVAC & Utilities',       pct: 12.5, value: '$1.4M', color: '#f59e0b' },
        { label: 'IT & POS Systems',       pct:  5.4, value: '$0.6M', color: '#7c3aed' },
        { label: 'Other',                  pct:  4.4, value: '$0.5M', color: '#ec4899' },
      ],
      topExpenses: [
        { name: 'Fit-Out & Construction', type: 'Retail Build',          value: '$4.7M' },
        { name: 'Fixtures & Fittings',    type: 'Furniture & Display',   value: '$2.4M' },
        { name: 'Signage & Branding',     type: 'Exterior & Interior',   value: '$1.6M' },
        { name: 'HVAC & Utilities',       type: 'Climate & Power',       value: '$1.4M' },
      ],
      projectSummary: [
        { label: 'Total Projects',  sub: 'Active & Completed', value: '9' },
        { label: 'Avg. Budget',     sub: 'Per Project',        value: '$1.76M' },
        { label: 'Avg. Progress',   sub: 'Completion',         value: '61%'  },
        { label: 'Avg. Duration',   sub: 'Timeline',           value: '10 months' },
      ],
    },
    risks: {
      critical: 2, medium: 4,
      items: [
        { title: 'Dallas Permit Rejection',    desc: 'City council denied permit. Re-application required — 6 week delay.', time: '3 hours ago', severity: 'Critical' },
        { title: 'Phoenix Cost Overrun Risk',  desc: 'Material costs up 18%. Contingency budget may be insufficient.',      time: '4 days ago',  severity: 'Medium'   },
        { title: 'Contractor Capacity',        desc: 'CoolSystems Co unable to meet Q2 HVAC delivery commitments.',         time: '1 week ago',  severity: 'Medium'   },
      ],
    },
  },
  {
    id: 6,
    name: 'Manufacturing Inc',
    sector: 'Manufacturing',
    region: 'Europe',
    risk: 'Low Risk',
    ceo: 'Robert Mueller',
    activeProjects: 11,
    totalBudget: '$28.3M',
    costVariance: -0.8,
    schedule: 91,
    scheduleLabel: 'On Track',
    contractors: 19,
    completion: 72,
    kpis: {
      activeProjects: { value: 11,       trend: '+2 this month', color: '#16a34a' },
      totalBudget:    { value: '$28.3M',  sub: 'Allocated',      color: '#1e293b' },
      costVariance:   { value: '-0.8%',   sub: 'Under budget',   color: '#16a34a' },
      schedule:       { value: '91%',     sub: 'On Track',       color: '#d97706' },
      contractors:    { value: 19,        sub: 'Active',         color: '#1e293b' },
      completion:     { value: '72%',     sub: 'Overall',        color: '#3b5bdb' },
    },
    kpiDetails: {
      activeProjects: { title: 'Active Projects Breakdown',  rows: [{ label: 'On Schedule', value: '10 / 11', color: '#16a34a' }, { label: 'Delayed', value: '1 / 11' }, { label: 'Critical', value: '0', color: '#16a34a' }, { label: 'Planning', value: '3' }, { label: 'Execution', value: '8' }] },
      totalBudget:    { title: 'Budget Allocation',           rows: [{ label: 'Total Allocated', value: '$28.3M' }, { label: 'Spent to Date', value: '$20.4M' }, { label: 'Remaining', value: '$7.9M', color: '#16a34a' }, { label: 'Q2 Forecast', value: '$29.0M' }, { label: 'Contingency Used', value: '14%', color: '#16a34a' }] },
      costVariance:   { title: 'Cost Variance Details',       rows: [{ label: 'Budget', value: '$28.3M' }, { label: 'Actual Cost', value: '$28.1M' }, { label: 'Variance', value: '-$0.2M', color: '#16a34a' }, { label: 'YTD Variance', value: '-0.8%', color: '#16a34a' }, { label: 'Status', value: 'Under Budget', color: '#16a34a' }] },
      schedule:       { title: 'Schedule Performance',        rows: [{ label: 'On-Time Rate', value: '91%' }, { label: 'Delayed Projects', value: '1' }, { label: 'Avg Delay', value: '6 days' }, { label: 'Milestones Met', value: '20 / 22' }, { label: 'Next Milestone', value: 'Apr 18' }] },
      contractors:    { title: 'Contractor Overview',         rows: [{ label: 'Active Contractors', value: '19' }, { label: 'Top Performer', value: 'EuroBuild GmbH' }, { label: 'Avg Score', value: '8.7 / 10', color: '#16a34a' }, { label: 'Under Review', value: '1' }, { label: 'Total Contract Value', value: '$19.8M' }] },
      completion:     { title: 'Completion Status',           rows: [{ label: 'Overall Progress', value: '72%' }, { label: 'Completed', value: '7 projects', color: '#16a34a' }, { label: 'In Progress', value: '4 projects' }, { label: 'Target EOY', value: '96%' }, { label: 'Projected EOY', value: '94%', color: '#16a34a' }] },
    },
    contractorsList: [
      { name: 'EuroBuild GmbH', type: 'Industrial Construction', projects: 6, value: '$9.4M', status: 'Active' },
      { name: 'AutomaTech AG',  type: 'Automation & Robotics',   projects: 4, value: '$7.1M', status: 'Active' },
      { name: 'PipeMaster Ltd', type: 'Plumbing & Pipework',     projects: 3, value: '$3.3M', status: 'Active' },
    ],
    updates: [
      { title: 'Munich plant upgrade done',  body: 'Automated assembly line upgrade completed 3 days ahead of schedule.',   time: '1 hour ago',  accent: '#16a34a' },
      { title: 'ISO 9001 recertified',       body: 'Manufacturing Inc successfully recertified. Valid through 2027.',        time: '1 day ago',   accent: '#16a34a' },
      { title: 'New automation contract',    body: 'AutomaTech AG awarded $2.4M contract for Stuttgart plant phase 2.',      time: '3 days ago',  accent: '#3b5bdb' },
    ],
    projectsList: [
      { name: 'Munich Assembly Line Upgrade',  pm: 'Franz Hofmann',  started: 'Aug 15, 2023', status: 'On Track', budget: '$7.2M', spent: '$6.9M',  progress: 96, due: 'Apr 30, 2024' },
      { name: 'Stuttgart Automation Phase 2',  pm: 'Ingrid Keller',  started: 'Jan 1, 2024',  status: 'On Track', budget: '$5.8M', spent: '$1.4M',  progress: 22, due: 'Nov 30, 2024' },
      { name: 'Berlin Warehouse Expansion',    pm: 'Thomas Braun',   started: 'Nov 10, 2023', status: 'Delayed',  budget: '$4.1M', spent: '$3.4M',  progress: 71, due: 'May 15, 2024' },
      { name: 'Frankfurt QA Lab Build',        pm: 'Monika Stein',   started: 'Feb 5, 2024',  status: 'On Track', budget: '$3.5M', spent: '$0.8M',  progress: 19, due: 'Sep 1, 2024'  },
      { name: 'Hamburg Parts Facility',        pm: 'Dieter Vogt',    started: 'Mar 10, 2024', status: 'On Track', budget: '$2.9M', spent: '$0.2M',  progress: 6,  due: 'Feb 28, 2025' },
    ],
    financials: {
      totalBudget: '$28.3M', totalBudgetSub: 'Across 11 projects',
      totalSpent:  '$20.4M', totalSpentSub:  '72% of budget',
      costSavings: '$230K',  costSavingsSub: 'Under budget',
      pie: [
        { label: 'Labor Costs',         pct: 31.5, value: '$6.4M', color: '#3b5bdb' },
        { label: 'Equipment & Machinery',pct:28.2, value: '$5.8M', color: '#10b981' },
        { label: 'Construction',        pct: 19.7, value: '$4.0M', color: '#8b5cf6' },
        { label: 'Automation Systems',  pct: 11.3, value: '$2.3M', color: '#f59e0b' },
        { label: 'Compliance & QA',     pct:  5.8, value: '$1.2M', color: '#7c3aed' },
        { label: 'Other',               pct:  3.5, value: '$0.7M', color: '#ec4899' },
      ],
      topExpenses: [
        { name: 'Labor Costs',           type: 'Engineering & Operations',  value: '$6.4M' },
        { name: 'Equipment & Machinery', type: 'Industrial Assets',          value: '$5.8M' },
        { name: 'Construction',          type: 'Civil & Structural',         value: '$4.0M' },
        { name: 'Automation Systems',    type: 'Robotics & Software',        value: '$2.3M' },
      ],
      projectSummary: [
        { label: 'Total Projects',  sub: 'Active & Completed', value: '11' },
        { label: 'Avg. Budget',     sub: 'Per Project',        value: '$2.57M' },
        { label: 'Avg. Progress',   sub: 'Completion',         value: '72%'  },
        { label: 'Avg. Duration',   sub: 'Timeline',           value: '19 months' },
      ],
    },
    risks: {
      critical: 1, medium: 3,
      items: [
        { title: 'Berlin Warehouse Schedule Risk', desc: 'Structural steel delivery 2 weeks late. Completion at risk.',           time: '2 days ago',  severity: 'Critical' },
        { title: 'Supply Chain — Steel Prices',    desc: 'European steel prices up 14% YTD. Impacts 3 active projects.',         time: '1 week ago',  severity: 'Medium'   },
        { title: 'PipeMaster Capacity Warning',    desc: 'Contractor flagged potential under-resourcing on Frankfurt project.',   time: '2 weeks ago', severity: 'Medium'   },
      ],
    },
  },
]

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const RISK_CLASS = {
  'Low Risk':    'sp-badge-low',
  'Medium Risk': 'sp-badge-med',
  'High Risk':   'sp-badge-high',
}
const SCHEDULE_CLASS = {
  'On Track': 'sp-sched-track',
  'Ahead':    'sp-sched-ahead',
  'Delayed':  'sp-sched-delay',
  'Critical': 'sp-sched-crit',
}
const PROJ_STATUS_COLOR = {
  'On Track': '#3b5bdb',
  'Ahead':    '#16a34a',
  'At Risk':  '#d97706',
  'Delayed':  '#dc2626',
}
const PROJ_STATUS_CLASS = {
  'On Track': 'sp-badge-low',
  'Ahead':    'sp-badge-low',
  'At Risk':  'sp-badge-med',
  'Delayed':  'sp-badge-high',
}
const RISK_SEV_CLASS = {
  'Critical': 'sp-badge-high',
  'Medium':   'sp-badge-med',
  'Low':      'sp-badge-low',
}
const TABS      = ['Overview', 'Projects', 'Financials', 'Risks']
const KPI_KEYS  = ['activeProjects', 'totalBudget', 'costVariance', 'schedule', 'contractors', 'completion']
const KPI_LABELS = {
  activeProjects: 'Active Projects',
  totalBudget:    'Total Budget',
  costVariance:   'Cost Variance',
  schedule:       'Schedule',
  contractors:    'Contractors',
  completion:     'Completion',
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function SubsidiariesPage() {
  const [search,      setSearch]      = useState('')
  const [sector,      setSector]      = useState('All Sectors')
  const [riskFilter,  setRiskFilter]  = useState('All Risk Levels')
  const [region,      setRegion]      = useState('All Regions')
  const [selected,    setSelected]    = useState(null)
  const [activeTab,   setActiveTab]   = useState('Overview')
  const [activeKpi,   setActiveKpi]   = useState(null)
  const [projStatus,  setProjStatus]  = useState('All Statuses')
  const [exportMsg,   setExportMsg]   = useState(false)
  const [compareMsg,  setCompareMsg]  = useState(false)

  const filtered = useMemo(() => SUBSIDIARIES.filter(s => {
    if (search      && !s.name.toLowerCase().includes(search.toLowerCase())) return false
    if (sector      !== 'All Sectors'    && s.sector !== sector)      return false
    if (riskFilter  !== 'All Risk Levels'&& s.risk   !== riskFilter)  return false
    if (region      !== 'All Regions'    && s.region !== region)      return false
    return true
  }), [search, sector, riskFilter, region])

  function handleExport()  { setExportMsg(true);  setTimeout(() => setExportMsg(false),  2000) }
  function handleCompare() { setCompareMsg(true); setTimeout(() => setCompareMsg(false), 2000) }

  /* ── DETAIL VIEW ── */
  if (selected) {
    const s = selected

    const visibleProjects = projStatus === 'All Statuses'
      ? s.projectsList
      : s.projectsList.filter(p => p.status === projStatus)

    return (
      <div className="sp">
        {/* Breadcrumb */}
        <div className="sp-breadcrumb">
          <button className="sp-bc-link" onClick={() => { setSelected(null); setActiveKpi(null); setActiveTab('Overview'); setProjStatus('All Statuses') }}>Subsidiaries</button>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          <span className="sp-bc-current">{s.name}</span>
        </div>
        <h1 className="page-title">{s.name}</h1>

        {/* Profile card */}
        <div className="sp-profile-card">
          <div className="sp-profile-left">
            <div className="sp-profile-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
            </div>
            <div>
              <div className="sp-profile-name">{s.name}</div>
              <div className="sp-profile-sub">{s.sector} • {s.region}</div>
              <div className="sp-profile-meta">
                <span className={`sp-badge ${RISK_CLASS[s.risk]}`}>{s.risk}</span>
                <span className="sp-profile-ceo">CEO: {s.ceo}</span>
              </div>
            </div>
          </div>
          <div className="sp-profile-actions">
            <button className="sp-btn-outline" onClick={handleExport}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export
            </button>
            <button className="sp-btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit Details
            </button>
          </div>
        </div>

        {/* KPI bar */}
        <div className="sp-kpi-bar">
          {KPI_KEYS.map(key => {
            const kpi = s.kpis[key]
            const isActive = activeKpi === key
            return (
              <button
                key={key}
                className={`sp-kpi-cell${isActive ? ' sp-kpi-active' : ''}`}
                onClick={() => setActiveKpi(isActive ? null : key)}
              >
                <div className="sp-kpi-val" style={{ color: kpi.color }}>{kpi.value}</div>
                <div className="sp-kpi-label">{KPI_LABELS[key]}</div>
                <div className="sp-kpi-sub">{kpi.trend || kpi.sub}</div>
              </button>
            )
          })}
        </div>

        {/* KPI detail panel */}
        {activeKpi && s.kpiDetails[activeKpi] && (
          <div className="sp-kpi-detail">
            <div className="sp-kpi-detail-header">
              <span className="sp-kpi-detail-title">{s.kpiDetails[activeKpi].title}</span>
              <button className="sp-kpi-detail-close" onClick={() => setActiveKpi(null)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="sp-kpi-detail-rows">
              {s.kpiDetails[activeKpi].rows.map((r, i) => (
                <div key={i} className="sp-kpi-detail-row">
                  <span className="sp-kpi-detail-lbl">{r.label}</span>
                  <span className="sp-kpi-detail-v" style={{ color: r.color || '#1e293b' }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="section-card" style={{ padding: 0 }}>
          <div className="sp-tabs">
            {TABS.map(t => (
              <button key={t} className={`sp-tab${activeTab === t ? ' sp-tab-active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
            ))}
          </div>

          <div className="sp-tab-body">

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'Overview' && (
              <>
                <div className="charts-row" style={{ marginBottom: 20 }}>
                  <div className="chart-card">
                    <div className="chart-header">
                      <span className="chart-title">Cost vs Budget Trend</span>
                      <div className="legend">
                        <span className="legend-item"><span className="legend-dot" style={{ background: '#3b82f6' }}/>Budget</span>
                        <span className="legend-item"><span className="legend-dot" style={{ background: '#10b981' }}/>Actual Cost</span>
                      </div>
                    </div>
                    <SubCostTrendChart />
                  </div>
                  <div className="chart-card">
                    <div className="chart-header">
                      <span className="chart-title">Schedule Performance</span>
                    </div>
                    <SubScheduleChart />
                  </div>
                </div>

                <div className="section-title" style={{ marginBottom: 12 }}>Key Contractors</div>
                <div className="sp-contractors-grid">
                  {s.contractorsList.map((c, i) => (
                    <div key={i} className="sp-contractor-card">
                      <div className="sp-cont-top">
                        <div className="sp-cont-name">{c.name}</div>
                        <span className={`sp-badge ${c.status === 'Active' ? 'sp-badge-low' : 'sp-badge-med'}`}>{c.status}</span>
                      </div>
                      <div className="sp-cont-type">{c.type}</div>
                      <div className="sp-cont-bottom">
                        <span>{c.projects} Projects</span>
                        <span className="sp-cont-val">{c.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="section-title" style={{ marginTop: 20, marginBottom: 12 }}>Recent Updates</div>
                <div className="sp-updates">
                  {s.updates.map((u, i) => (
                    <div key={i} className="sp-update-item" style={{ borderLeftColor: u.accent }}>
                      <div className="sp-update-top">
                        <span className="sp-update-title">{u.title}</span>
                        <span className="sp-update-time">{u.time}</span>
                      </div>
                      <div className="sp-update-body">{u.body}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── PROJECTS TAB ── */}
            {activeTab === 'Projects' && (
              <>
                <div className="sp-proj-header">
                  <span className="sp-proj-heading">Active Projects ({s.projectsList.length})</span>
                  <div className="sp-proj-actions">
                    <select className="sp-select" value={projStatus} onChange={e => setProjStatus(e.target.value)}>
                      <option>All Statuses</option>
                      <option>On Track</option>
                      <option>At Risk</option>
                      <option>Delayed</option>
                      <option>Ahead</option>
                    </select>
                    <button className="sp-btn-primary" onClick={() => alert('New Project form — coming soon')}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      New Project
                    </button>
                  </div>
                </div>

                <div className="sp-proj-list">
                  {visibleProjects.length === 0 ? (
                    <div className="sp-proj-empty">No projects match the selected status.</div>
                  ) : visibleProjects.map((p, i) => (
                    <div key={i} className="sp-proj-item">
                      <div className="sp-proj-row1">
                        <span className="sp-proj-name">{p.name}</span>
                        <span className={`sp-badge ${PROJ_STATUS_CLASS[p.status]}`}>{p.status}</span>
                      </div>
                      <div className="sp-proj-row2">PM: {p.pm} • Started: {p.started}</div>
                      <div className="sp-proj-row3">
                        <div className="sp-proj-col">
                          <div className="sp-proj-col-label">Budget</div>
                          <div className="sp-proj-col-val">{p.budget}</div>
                        </div>
                        <div className="sp-proj-col">
                          <div className="sp-proj-col-label">Spent</div>
                          <div className="sp-proj-col-val">{p.spent}</div>
                        </div>
                        <div className="sp-proj-col">
                          <div className="sp-proj-col-label">Progress</div>
                          <div className="sp-proj-col-val" style={{ color: PROJ_STATUS_COLOR[p.status] }}>{p.progress}%</div>
                        </div>
                        <div className="sp-proj-col">
                          <div className="sp-proj-col-label">Due Date</div>
                          <div className="sp-proj-col-val">{p.due}</div>
                        </div>
                      </div>
                      <div className="sp-proj-bar-track">
                        <div
                          className="sp-proj-bar-fill"
                          style={{ width: `${p.progress}%`, background: PROJ_STATUS_COLOR[p.status] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── FINANCIALS TAB ── */}
            {activeTab === 'Financials' && (
              <>
                {/* Summary banners */}
                <div className="sp-fin-banners">
                  <div className="sp-fin-banner sp-fin-banner-blue">
                    <div className="sp-fin-banner-label">Total Budget Allocated</div>
                    <div className="sp-fin-banner-val">{s.financials.totalBudget}</div>
                    <div className="sp-fin-banner-sub">{s.financials.totalBudgetSub}</div>
                  </div>
                  <div className="sp-fin-banner sp-fin-banner-green">
                    <div className="sp-fin-banner-label">Total Spent</div>
                    <div className="sp-fin-banner-val">{s.financials.totalSpent}</div>
                    <div className="sp-fin-banner-sub">{s.financials.totalSpentSub}</div>
                  </div>
                  <div className="sp-fin-banner sp-fin-banner-purple">
                    <div className="sp-fin-banner-label">Cost Savings</div>
                    <div className="sp-fin-banner-val">{s.financials.costSavings}</div>
                    <div className="sp-fin-banner-sub">{s.financials.costSavingsSub}</div>
                  </div>
                </div>

                {/* Pie chart */}
                <div className="sp-fin-pie-section">
                  <div className="section-title" style={{ marginBottom: 16 }}>Budget Breakdown by Category</div>
                  <SubPieChart slices={s.financials.pie} />
                </div>

                {/* Bottom tables */}
                <div className="sp-fin-tables">
                  <div className="sp-fin-table-col">
                    <div className="sp-fin-table-title">Top Expenses</div>
                    {s.financials.topExpenses.map((e, i) => (
                      <div key={i} className="sp-fin-table-row">
                        <div>
                          <div className="sp-fin-exp-name">{e.name}</div>
                          <div className="sp-fin-exp-type">{e.type}</div>
                        </div>
                        <div className="sp-fin-exp-val">{e.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="sp-fin-table-col">
                    <div className="sp-fin-table-title">Project Summary</div>
                    {s.financials.projectSummary.map((r, i) => (
                      <div key={i} className="sp-fin-table-row">
                        <div>
                          <div className="sp-fin-exp-name">{r.label}</div>
                          <div className="sp-fin-exp-type">{r.sub}</div>
                        </div>
                        <div className="sp-fin-exp-val">{r.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* ── RISKS TAB ── */}
            {activeTab === 'Risks' && (
              <>
                {/* Risk banners */}
                <div className="sp-risk-banners">
                  <div className="sp-risk-banner sp-risk-banner-red">
                    <div className="sp-risk-banner-label">Critical Risks</div>
                    <div className="sp-risk-banner-count">{s.risks.critical}</div>
                    <div className="sp-risk-banner-sub">High Impact</div>
                  </div>
                  <div className="sp-risk-banner sp-risk-banner-yellow">
                    <div className="sp-risk-banner-label">Medium Risks</div>
                    <div className="sp-risk-banner-count">{s.risks.medium}</div>
                    <div className="sp-risk-banner-sub">Moderate Impact</div>
                  </div>
                </div>

                {/* Risk items */}
                <div className="sp-risk-list">
                  {s.risks.items.map((r, i) => (
                    <div key={i} className="sp-risk-item">
                      <div className="sp-risk-item-top">
                        <span className="sp-risk-item-title">{r.title}</span>
                        <span className={`sp-badge ${RISK_SEV_CLASS[r.severity]}`}>{r.severity}</span>
                      </div>
                      <div className="sp-risk-item-desc">{r.desc}</div>
                      <div className="sp-risk-item-footer">
                        <span className="sp-risk-item-time">{r.time}</span>
                        <button className="sp-risk-view-link">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    )
  }

  /* ── LIST VIEW ── */
  return (
    <div className="sp">
      <h1 className="page-title">Subsidiaries</h1>
      <p className="page-sub">Manage and monitor your portfolio companies</p>

      {exportMsg  && <div className="sp-toast">Export started — file will download shortly.</div>}
      {compareMsg && <div className="sp-toast">Select subsidiaries to compare (feature in progress).</div>}

      <div className="section-card sp-toolbar">
        <div className="sp-search-wrap">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="sp-search" type="text" placeholder="Search subsidiaries..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="sp-select" value={sector} onChange={e => setSector(e.target.value)}>
          <option>All Sectors</option>
          <option>Technology</option>
          <option>Healthcare</option>
          <option>Finance</option>
          <option>Energy</option>
          <option>Retail</option>
          <option>Manufacturing</option>
        </select>
        <select className="sp-select" value={riskFilter} onChange={e => setRiskFilter(e.target.value)}>
          <option>All Risk Levels</option>
          <option>Low Risk</option>
          <option>Medium Risk</option>
          <option>High Risk</option>
        </select>
        <select className="sp-select" value={region} onChange={e => setRegion(e.target.value)}>
          <option>All Regions</option>
          <option>North America</option>
          <option>Europe</option>
          <option>Asia Pacific</option>
          <option>Middle East</option>
        </select>
        <div className="sp-toolbar-actions">
          <button className="sp-btn-outline" onClick={handleExport}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
          <button className="sp-btn-outline" onClick={handleCompare}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            Compare
          </button>
          <button className="sp-btn-primary" onClick={() => alert('Add Subsidiary form — coming soon')}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Subsidiary
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="sp-empty">No subsidiaries match your filters.</div>
      ) : (
        <div className="sp-cards-grid">
          {filtered.map(s => (
            <div key={s.id} className="sp-card" onClick={() => { setSelected(s); setActiveTab('Overview'); setActiveKpi(null); setProjStatus('All Statuses') }}>
              <div className="sp-card-head">
                <div>
                  <div className="sp-card-name">{s.name}</div>
                  <div className="sp-card-meta">{s.sector} • {s.region}</div>
                </div>
                <span className={`sp-badge ${RISK_CLASS[s.risk]}`}>{s.risk}</span>
              </div>
              <div className="sp-card-rows">
                <div className="sp-card-row">
                  <span className="sp-card-row-lbl">Active Projects</span>
                  <span className="sp-card-row-val sp-val-blue">{s.activeProjects}</span>
                </div>
                <div className="sp-card-row">
                  <span className="sp-card-row-lbl">Cost Variance</span>
                  <span className="sp-card-row-val" style={{ color: s.costVariance <= 0 ? '#16a34a' : '#dc2626' }}>
                    {s.costVariance > 0 ? '+' : ''}{s.costVariance}%
                  </span>
                </div>
                <div className="sp-card-row">
                  <span className="sp-card-row-lbl">Schedule</span>
                  <span className={`sp-badge ${SCHEDULE_CLASS[s.scheduleLabel]}`}>{s.scheduleLabel}</span>
                </div>
              </div>
              <div className="sp-card-footer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span className="sp-card-ceo">{s.ceo}, CEO</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}