/**
 * Election process data — structured phases, steps, and timelines
 * for the Indian general election (Lok Sabha) process.
 */

export interface ElectionSubStep {
  id: string;
  title: string;
  description: string;
  keyFact?: string;
  duration?: string;
}

export interface ElectionPhase {
  id: string;
  phase: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
  steps: ElectionSubStep[];
  keyDates?: string;
}

export const ELECTION_PHASES: ElectionPhase[] = [
  {
    id: 'voter-registration',
    phase: 1,
    title: 'Voter Registration & Electoral Roll',
    subtitle: 'Building the foundation of democracy',
    description: 'The Election Commission of India prepares and updates the electoral rolls. Every eligible citizen aged 18+ must register to vote.',
    icon: '📋',
    color: '#3b82f6',
    duration: 'Ongoing (updated annually)',
    steps: [
      {
        id: 'delimitation',
        title: 'Delimitation of Constituencies',
        description: 'Geographic boundaries of constituencies are defined to ensure roughly equal population representation across all seats.',
        keyFact: 'India has 543 Lok Sabha constituencies.',
      },
      {
        id: 'roll-preparation',
        title: 'Electoral Roll Preparation',
        description: 'The ECI compiles the list of eligible voters. New voters are added, deceased voters removed, and details corrected.',
        keyFact: 'India has 960+ million registered voters — the largest electorate in the world.',
      },
      {
        id: 'voter-id',
        title: 'Voter ID Card (EPIC) Issuance',
        description: 'Registered voters receive an Elector Photo Identity Card. You can also register online via the NVSP portal.',
        keyFact: 'You can register online at voters.eci.gov.in',
      },
    ],
  },
  {
    id: 'announcement',
    phase: 2,
    title: 'Election Announcement & Model Code',
    subtitle: 'Setting the stage for fair elections',
    description: 'The ECI announces the election schedule. The Model Code of Conduct immediately comes into effect, binding all parties and government machinery.',
    icon: '📢',
    color: '#f97316',
    duration: '~2 months before polling',
    steps: [
      {
        id: 'schedule',
        title: 'Election Schedule Announcement',
        description: 'The ECI announces polling dates, phases, and counting date at a press conference. Multi-phase elections are common for large states.',
        keyFact: 'General elections are typically held in 7 phases across 5-6 weeks.',
      },
      {
        id: 'mcc',
        title: 'Model Code of Conduct (MCC)',
        description: 'A set of guidelines for political parties and candidates. Bans misuse of government resources, hate speech, and undue influence.',
        keyFact: 'The MCC is voluntary but strictly enforced by the ECI.',
      },
      {
        id: 'notification',
        title: 'Gazette Notification',
        description: 'The formal legal notification is issued, officially calling for elections in each constituency.',
      },
    ],
  },
  {
    id: 'nomination',
    phase: 3,
    title: 'Nomination & Scrutiny',
    subtitle: 'Who can represent you?',
    description: 'Candidates file nomination papers with the Returning Officer. Papers are scrutinized for eligibility, and a window for withdrawal is provided.',
    icon: '📝',
    color: '#8b5cf6',
    duration: '~2-3 weeks',
    steps: [
      {
        id: 'filing',
        title: 'Filing of Nominations',
        description: 'Candidates submit nomination forms along with a security deposit (₹25,000 for general category). They must declare assets, liabilities, and criminal records.',
        keyFact: 'Security deposit is forfeited if candidate gets < 1/6th of total votes.',
      },
      {
        id: 'scrutiny',
        title: 'Scrutiny of Nominations',
        description: 'The Returning Officer examines all papers to verify candidate eligibility — age (25+ for Lok Sabha), citizenship, and other legal requirements.',
      },
      {
        id: 'withdrawal',
        title: 'Withdrawal of Candidature',
        description: 'Candidates may voluntarily withdraw within the designated period. After this, the final list of contesting candidates is published.',
      },
      {
        id: 'symbols',
        title: 'Allotment of Symbols',
        description: 'Recognized parties retain their reserved symbols. Independent and unrecognized party candidates are assigned symbols from the free pool.',
        keyFact: 'The ECI manages a list of "free symbols" for independents.',
      },
    ],
  },
  {
    id: 'campaigning',
    phase: 4,
    title: 'Election Campaigning',
    subtitle: 'Making your voice heard',
    description: 'Parties and candidates campaign through rallies, advertisements, social media, and door-to-door outreach to persuade voters.',
    icon: '📣',
    color: '#ec4899',
    duration: '~2-3 weeks',
    steps: [
      {
        id: 'rallies',
        title: 'Rallies & Roadshows',
        description: 'Public gatherings where candidates present manifestos and appeal to voters. Route permissions must be obtained from authorities.',
      },
      {
        id: 'media',
        title: 'Media & Advertising',
        description: 'Parties use TV, radio, print, and social media. All expenditure is tracked. There are strict spending limits per candidate.',
        keyFact: 'Spending limit: ₹95 lakh for Lok Sabha (as of 2024).',
      },
      {
        id: 'manifesto',
        title: 'Release of Manifestos',
        description: 'Parties publish detailed policy documents outlining their vision and promises to the electorate.',
      },
      {
        id: 'silence',
        title: 'Silence Period (48 hours)',
        description: 'Campaigning must stop 48 hours before polling ends. No appeals, advertisements, or rallies are allowed during this "cooling off" period.',
        keyFact: 'Violation of the silence period is a punishable offence.',
      },
    ],
  },
  {
    id: 'polling',
    phase: 5,
    title: 'Polling Day (Voting)',
    subtitle: 'Your vote, your power',
    description: 'Voters cast their ballot at designated polling stations using Electronic Voting Machines (EVMs). Identity verification is mandatory.',
    icon: '🗳️',
    color: '#22c55e',
    duration: '1 day per phase',
    steps: [
      {
        id: 'identity',
        title: 'Identity Verification',
        description: 'At the polling booth, officials verify your identity using Voter ID, Aadhaar, or other approved photo ID documents.',
        keyFact: '12 types of photo ID are accepted at polling stations.',
      },
      {
        id: 'ink',
        title: 'Indelible Ink Application',
        description: 'A mark of indelible ink is applied to the left index finger to prevent duplicate voting. The ink lasts several weeks.',
        keyFact: 'The ink is manufactured exclusively by Mysore Paints & Varnish Ltd.',
      },
      {
        id: 'evm',
        title: 'Voting on EVM',
        description: 'The voter presses the button next to their chosen candidate on the EVM. A VVPAT slip confirms the vote before it drops into a sealed box.',
        keyFact: 'EVMs are standalone, battery-operated, and cannot be hacked remotely.',
      },
      {
        id: 'nota',
        title: 'NOTA Option',
        description: 'Voters can choose "None of the Above" if they do not wish to vote for any candidate. NOTA was introduced by Supreme Court order in 2013.',
      },
      {
        id: 'sealing',
        title: 'Sealing & Transport',
        description: 'After polling closes, EVMs are sealed and transported under armed security to designated strongrooms for safekeeping until counting day.',
      },
    ],
  },
  {
    id: 'counting',
    phase: 6,
    title: 'Counting & Results',
    subtitle: 'The verdict of the people',
    description: 'On counting day, EVMs are opened at designated centers. Votes are tallied, and winners are declared constituency by constituency.',
    icon: '📊',
    color: '#f59e0b',
    duration: '1-2 days',
    steps: [
      {
        id: 'counting-day',
        title: 'Counting Process',
        description: 'EVMs are opened round by round in the presence of candidates/agents. Postal ballots are counted first, followed by EVM results.',
        keyFact: 'Counting usually begins at 8 AM and results come by evening.',
      },
      {
        id: 'vvpat-verification',
        title: 'VVPAT Verification',
        description: 'VVPAT slips from 5 randomly selected polling stations per constituency are matched with EVM counts for verification.',
      },
      {
        id: 'declaration',
        title: 'Declaration of Results',
        description: 'The Returning Officer declares the candidate with the highest votes as the winner. Results are published on the ECI website in real-time.',
      },
      {
        id: 'government-formation',
        title: 'Government Formation',
        description: 'The party or coalition with majority (272+ seats in Lok Sabha) is invited by the President to form the government.',
        keyFact: '272 seats = simple majority in the 543-member Lok Sabha.',
      },
    ],
  },
];

/** Quick facts for the dashboard */
export const ELECTION_FACTS = [
  { label: 'Total Constituencies', value: '543', icon: '🏛️' },
  { label: 'Registered Voters', value: '960M+', icon: '👥' },
  { label: 'Polling Stations', value: '1M+', icon: '🏫' },
  { label: 'Phases (2024)', value: '7', icon: '📅' },
  { label: 'EVMs Used', value: '5.5M+', icon: '🗳️' },
  { label: 'Election Staff', value: '15M+', icon: '👮' },
];

/** Suggested questions for the AI chat */
export const SUGGESTED_QUESTIONS = [
  'What documents do I need to vote?',
  'How does an EVM work?',
  'What is NOTA and when was it introduced?',
  'Explain the Model Code of Conduct',
  'How are constituency boundaries decided?',
  'What happens if no party gets a majority?',
  'How can I register as a first-time voter?',
  'What is the role of the Election Commission?',
];
