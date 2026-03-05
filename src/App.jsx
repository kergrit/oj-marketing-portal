import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  FileText,
  ChevronLeft,
  ChevronRight,
  Save,
  Target,
  DollarSign,
  Globe,
  MapPin,
  User,
  Phone,
  Mail,
  Zap,
  Clock,
  Layout,
  Store,
  ArrowRight,
  Menu,
  X,
  ClipboardCheck,
  CalendarDays,
  Wallet,
  TrendingUp,
  FileEdit,
  Trash2,
  ShieldCheck,
  UserX,
  Lock,
  CheckCircle2,
  Calendar,
  FileSpreadsheet,
  BarChart3,
  Upload,
  Image as ImageIcon,
  AlertCircle,
  Eye,
  Link,
  Receipt,
  Tag,
  Bell,
} from 'lucide-react';

// --- Constants & Mock Data ---
const MOCK_DEALER_INFO = {
  dealerPrefix: 'AGE',
  dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง',
  contactPerson: 'สมชาย มีความสุข',
  mobilePhone: '081-234-5678',
  email: 'somchai.m@omodajaecoo.co.th',
};

const ONLINE_OPTIONS = ['Livestream', 'Post on Facebook', 'Post on TikTok', 'Other'];
const OFFLINE_OPTIONS = ['Roadshow', 'OJ Club', 'Showroom event', 'Other'];

const VEHICLE_MODELS = ['OMODA C5 EV', 'JAECOO 5 EV', 'JAECOO 6 EV', 'JAECOO 7 PHEV'];
const MONTHS_TH = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

const IMAGE_URLS = [
  'https://scontent.fbkk11-1.fna.fbcdn.net/v/t39.30808-6/646792893_770856792764211_2807835162608794121_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=13d280&_nc_ohc=LFxtunO_HccQ7kNvwFTCvAH&_nc_oc=AdlzzAFOplKF_W3RtwBI8zMD9V8-iF5mJ972kb2bs71zQbP0N6ZpcUPwfMyzeMDACU0&_nc_zt=23&_nc_ht=scontent.fbkk11-1.fna&_nc_gid=CSId5y3fGp_DX2dAjn1NNA&_nc_ss=8&oh=00_Afy_3KGZOs8wkBS4Ui92mC6oFb2o3JhjvQNMXCbWc3fjRw&oe=69ADF105',
  'https://scontent.fbkk11-1.fna.fbcdn.net/v/t39.30808-6/637116914_762366920279865_3412820716645565533_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=13d280&_nc_ohc=cdFYPCmX0UMQ7kNvwF8-fRU&_nc_oc=AdkMie2FOSlJR5uU_PJwzImPIrGalS1WmkMZN3c0cxqlktSZzjg_s9JxupNsJLLkO44&_nc_zt=23&_nc_ht=scontent.fbkk11-1.fna&_nc_gid=J_t-tV5iIdvy8PY0cxdyuA&_nc_ss=8&oh=00_AfxiJJvlbNwrqM2Aw_8Dz883b-UL5955CkMGWeXtlkLmmQ&oe=69ADDA1D',
  'https://scontent.fbkk11-1.fna.fbcdn.net/v/t39.30808-6/634159857_761075990408958_9130079082940697238_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=bjmNYU6ZdNYQ7kNvwG0PPwn&_nc_oc=Adnbz0ptDtx1su-41hfgRwvFGq1Sn2vWTBT6RqdOg1Dcd4Jfuzekz6PbpVOVV5dN9KQ&_nc_zt=23&_nc_ht=scontent.fbkk11-1.fna&_nc_gid=mlXPItTqiuGD_ov91EZhNw&_nc_ss=8&oh=00_Afzez-ETxd5K0FAjTHwbxLxbS8mHxuv3rRbhvyeeIF24JQ&oe=69ADE58B',
  'https://scontent.fbkk11-1.fna.fbcdn.net/v/t39.30808-6/634676245_761072630409294_420807277751393028_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_ohc=M7lguZZeyysQ7kNvwH__190&_nc_oc=AdmsRmKqmS3C4JtypUosswoFqNZ7ROfTAFEbVDMzHQ9fg7TZUMLQgxDxujN_0jddElI&_nc_zt=23&_nc_ht=scontent.fbkk11-1.fna&_nc_gid=jwqieKFUaNCKZJ4XZ0r4QA&_nc_ss=8&oh=00_AfwjqQM_QmL1xZEsRAmDoN-MFW-wt2dF8PYQsx6V8FWKmA&oe=69ADF7E4',
  'https://scontent.fbkk11-1.fna.fbcdn.net/v/t39.30808-6/636852841_759457940570763_1285755686301647881_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=F4NLWn29zHcQ7kNvwH9u8JQ&_nc_oc=Adn2_alnmbku6OerkP4OOlJrYXJjis_h0pGPyR6t_nAyj19FG8BADhNL-qbcK3epSlI&_nc_zt=23&_nc_ht=scontent.fbkk11-1.fna&_nc_gid=jfWWIqwYNXtu_Arp0PaH3A&_nc_ss=8&oh=00_AfzefhXKZ9LiS4gJq9sdARkFSyM0y1xJVyCsPgdNnEoL9g&oe=69ADEFAE',
  'https://scontent.fbkk11-1.fna.fbcdn.net/v/t39.30808-6/641544534_765130570003500_2520080160026114002_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=Xjv4Ub6XUzEQ7kNvwFidBMn&_nc_oc=Adk-tQUKboJlbR4-BiQxd0l9RKI1O1W_JVWRvUK6dJBgwtbx-L2WJ5Te_-cgIZ2fkP4&_nc_zt=23&_nc_ht=scontent.fbkk11-1.fna&_nc_gid=vUEyBf89tDRFQbIS0Og9tg&_nc_ss=8&oh=00_AfwjqQM_QmL1xZEsRAmDoN-MFW-wt2dF8PYQsx6V8FWKmA&oe=69ADE792',
];

const IMAGE_URLS_REPORT = [
  'https://scontent.fbkk12-1.fna.fbcdn.net/v/t39.30808-6/596929600_704459586070599_4928072107502547792_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_ohc=hP_VVrvMpKEQ7kNvwHB8qEb&_nc_oc=Adlo1pgKw4492xZJD0c9IoWWd6v4DWKROq1XYFxE8UQDq6rTSeyfRO0cta2CbVgqybubySIfjATSMR3xsjo9ulXV&_nc_zt=23&_nc_ht=scontent.fbkk12-1.fna&_nc_gid=8vutIEFC90DMJXYKF8W94g&_nc_ss=8&oh=00_AfzEtXHAk1roksNEq-NMaEyXNc4Hdc8lev3GHx6Qkfsp4g&oe=69AE3418',
  'https://scontent.fbkk9-3.fna.fbcdn.net/v/t39.30808-6/594764235_704459569403934_7457947108750926698_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=13d280&_nc_ohc=ApNyTmE2YQQQ7kNvwGs6pjC&_nc_oc=Adn2BloTPw57aa_eVbqXMdLBUMkn15dwHBkiT7MPZ56N5zTts5vVJPlbXpSbMLYDE-KtoyBcWe4j9ZVCZXldRpT6&_nc_zt=23&_nc_ht=scontent.fbkk9-3.fna&_nc_gid=zTCkfJHrJW4caE1r5eL4Bg&_nc_ss=8&oh=00_Afz4KZLCti9ek7fSXLHx1_0ahJwJQLhuhgVfw_6wenI6EA&oe=69AE35BC',
  'https://scontent.fbkk8-4.fna.fbcdn.net/v/t39.30808-6/597569199_706711295845428_72929563007478556_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_ohc=i0SCutMuQEYQ7kNvwGkp64j&_nc_oc=AdmaW6sDrQFHJLRlqaGPhEkkU8Uxm3ZpqtUHRO_4d1kC3xfI0KWK46gR383Tt-7RjhB1DDbE5_jaS6YLg2B00dOK&_nc_zt=23&_nc_ht=scontent.fbkk8-4.fna&_nc_gid=RID3Ea9IZIqZ37KL264AAw&_nc_ss=8&oh=00_Afx0UCaFlXI-hnNkxZMNV58UinF4A8i2VzY0F0jMB6kFAw&oe=69AE4377',
  'https://scontent.fbkk12-5.fna.fbcdn.net/v/t39.30808-6/596561760_704459579403933_5543759194828244134_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=13d280&_nc_ohc=XWraE9iu4RgQ7kNvwHrp9Ci&_nc_oc=AdlD352aRem4_XXpXhrwy5Xt4wuuJwZMtUSJ_te7PDId-6gUYOMmOvJSgASW-TCUfVW-mQMfk72fWllK9ezbGmw0&_nc_zt=23&_nc_ht=scontent.fbkk12-5.fna&_nc_gid=Aobt0k2AZlR-_IDDU6xxrw&_nc_ss=8&oh=00_AfxYp441lnbY18tmoekkVrUdqSyoGEl9kiZWBgbxjh6mNA&oe=69AE3368'
];

const MOCK_PLANS = [
  {
    id: 1,
    docNo: 'AGE20260304v1',
    month: 'กรกฎาคม',
    year: '2569',
    status: 'Approved',
    totalBudget: 450000,
    leads: 300,
    bookings: 20,
    onlineData: [
      { activity: 'Post on Facebook', otherDetail: 'โพสต์โปรโมท OMODA C5 EV', date: '2026-07-05', location: 'Facebook Page' },
      { activity: 'Livestream', otherDetail: 'ไลฟ์สดแนะนำฟีเจอร์รถ OMODA C5 EV', date: '2026-07-12', location: 'TikTok / FB' },
      { activity: 'Post on Facebook', otherDetail: 'ยิงโฆษณาแคมเปญหลัก OMODA', date: '2026-07-19', location: 'Meta Ads' },
      { activity: 'Post on TikTok', otherDetail: 'รีวิวสั้นๆ 15 วินาที OMODA C5', date: '2026-07-26', location: 'TikTok' },
    ],
    offlineData: [
      { activity: 'Roadshow', otherDetail: 'จัดแสดงที่ห้างสรรพสินค้าชั้นนำ', date: '2026-07-01', location: 'Central World' },
      { activity: 'Showroom event', otherDetail: 'งานเปิดตัว OMODA C5 EV รุ่นพิเศษ', date: '2026-07-15', location: 'Showroom Ram' },
      { activity: 'OJ Club', otherDetail: 'กิจกรรมสมาชิกคลับ OMODA & JAECOO', date: '2026-07-20', location: 'Showroom Ram' },
      { activity: 'Other', otherDetail: 'กิจกรรมแจกรางวัลผู้จอง OMODA', date: '2026-07-31', location: 'Showroom Ram' },
    ],
    onlineBudget: 250000,
    offlineBudget: 200000,
    approvalData: {
      date: '2026-03-04',
      time: '10:30',
      name: 'ธนาวุฒิ อนุมัติไว (Admin)',
      email: 'thanawut.a@omodajaecoo.co.th',
      phone: '02-111-2233',
    },
  },
  {
    id: 2,
    docNo: 'AGE20260304v2',
    month: 'สิงหาคม',
    year: '2569',
    status: 'Pending',
    totalBudget: 380000,
    leads: 250,
    bookings: 15,
    onlineData: [
      { activity: 'Post on TikTok', otherDetail: 'ทำคอนเทนต์เปิดตัว JAECOO 6 EV', date: '2026-08-10', location: 'Social Media' },
      { activity: 'Post on Facebook', otherDetail: 'โปรโมทโปรโมชั่น JAECOO ประจำเดือน', date: '2026-08-15', location: 'Facebook' },
      { activity: '', otherDetail: '', date: '', location: '' },
      { activity: '', otherDetail: '', date: '', location: '' },
    ],
    offlineData: [
      { activity: 'Showroom event', otherDetail: 'คาราวานทดลองขับ JAECOO 6 EV รอบเมือง', date: '2026-08-05', location: 'ถนนสุขุมวิท' },
      { activity: 'Showroom event', otherDetail: 'ธีมแคมเปญฤดูฝน JAECOO', date: '2026-08-01', location: 'Showroom' },
      { activity: '', otherDetail: '', date: '', location: '' },
      { activity: '', otherDetail: '', date: '', location: '' },
    ],
    onlineBudget: 200000,
    offlineBudget: 180000,
  },
  {
    id: 3,
    docNo: 'AGE20260304v3',
    month: 'กันยายน',
    year: '2569',
    status: 'Draft',
    totalBudget: 150000,
    leads: 100,
    bookings: 5,
    onlineData: Array(4)
      .fill()
      .map(() => ({ activity: '', otherDetail: '', date: '', location: '' })),
    offlineData: Array(4)
      .fill()
      .map(() => ({ activity: '', otherDetail: '', date: '', location: '' })),
    onlineBudget: 80000,
    offlineBudget: 70000,
  },
];

const MOCK_CONTENT_REQUESTS = [
  {
    id: 101,
    title: 'สื่อโฆษณา Facebook OMODA C5 EV',
    usage: 'โปรโมทแคมเปญเดือนมีนาคม',
    date: '2026-03-04',
    time: '09:15',
    status: 'Pending',
    files: [{ name: 'omoda_c5_front.jpg', url: IMAGE_URLS[0] }],
  },
  {
    id: 102,
    title: 'ภาพกราฟิกงาน Roadshow',
    usage: 'ภาพบรรยากาศงานโชว์รูม',
    date: '2026-03-01',
    time: '08:00',
    status: 'Approved',
    files: [{ name: 'jaecoo_event_1.jpg', url: IMAGE_URLS[2] }],
    approvalData: {
      date: '2026-03-02',
      time: '14:20',
      name: 'ศิริมา อนุมัติเก่ง (Marketing Admin)',
      email: 'sirima.k@omodajaecoo.co.th',
      phone: '02-999-8877',
    },
  },
  {
    id: 103,
    title: 'แคมเปญ JAECOO 7 PHEV',
    usage: 'แจ้งโปรโมชั่นประจำไตรมาส',
    date: '2026-02-25',
    time: '11:45',
    status: 'Rejected',
    files: [{ name: 'jaecoo_7_profile.png', url: IMAGE_URLS[4] }],
    rejectReason:
      'องค์ประกอบของภาพไม่เป็นไปตาม Corporate Identity (CI) ล่าสุด กรุณาปรับปรุงโทนสีและ Layout ให้ทันสมัยขึ้น',
    rejectData: {
      date: '2026-02-26',
      name: 'ระวีวรรณ ตรวจละเอียด (Content QC)',
      email: 'raweewan.t@omodajaecoo.co.th',
      phone: '02-555-4433',
    },
  },
  {
    id: 104,
    title: 'ชุดภาพโปรโมท JAECOO 6 (ร่าง)',
    usage: 'เตรียมสื่อสำหรับเปิดสาขาใหม่ไตรมาส 3',
    date: '2026-03-04',
    status: 'Draft',
    files: [
      { name: 'jaecoo_6_draft.jpg', url: IMAGE_URLS[5] },
      { name: 'omoda_interior.jpg', url: IMAGE_URLS[1] },
    ],
  },
];

const CLAIM_TYPE_OPTIONS = ['Space rental', 'POS production', 'Customer giveaway'];

const MOCK_REPORT_CLAIMS = [
  {
    id: 201,
    docNo: 'RPT-AGE-2026-001',
    planDocNo: 'AGE20260304v1',
    month: 'กรกฎาคม',
    year: '2569',
    status: 'Approved',
    date: '2026-07-31',
    onlineActivityType: 'Post on Facebook',
    onlineRows: [
      { url: 'https://facebook.com/post/xxx', impression: '15000', leads: '45' },
      { url: 'https://meta.business/ads/yyy', impression: '8200', leads: '22' },
    ],
    offlineActivityType: 'Roadshow',
    offlineFiles: [
      { name: 'roadshow_1.jpg', url: IMAGE_URLS_REPORT[0] },
      { name: 'roadshow_2.jpg', url: IMAGE_URLS_REPORT[1] },
      { name: 'roadshow_3.jpg', url: IMAGE_URLS_REPORT[2] },
      { name: 'roadshow_4.jpg', url: IMAGE_URLS_REPORT[3] },
    ],
    onlineActualBudget: 230000,
    offlineActualBudget: 185000,
    claimRows: [
      { activityType: 'offline', claimType: 'Space rental', detail: 'ค่าเช่าพื้นที่ Central World', price: '85000', receiptFile: { name: 'receipt_1.jpg', url: IMAGE_URLS_REPORT[0] } },
      { activityType: 'offline', claimType: 'Customer giveaway', detail: 'ของแจกผู้เข้าร่วมงาน', price: '40000', receiptFile: { name: 'receipt_2.jpg', url: IMAGE_URLS_REPORT[1] } },
    ],
    approvalData: {
      date: '2026-08-05',
      time: '16:00',
      name: 'ธนาวุฒิ อนุมัติไว (Admin)',
      email: 'thanawut.a@omodajaecoo.co.th',
      phone: '02-111-2233',
    },
  },
  {
    id: 202,
    docNo: 'RPT-AGE-2026-002',
    planDocNo: 'AGE20260304v2',
    month: 'สิงหาคม',
    year: '2569',
    status: 'Pending',
    date: '2026-08-28',
    time: '13:30',
    onlineActivityType: 'Post on TikTok',
    onlineRows: [{ url: 'https://tiktok.com/@xxx', impression: '5000', leads: '12' }],
    offlineActivityType: '',
    offlineFiles: [],
    onlineActualBudget: 0,
    offlineActualBudget: 0,
    claimRows: [{ activityType: 'online', claimType: '', detail: '', price: '', receiptFile: null }],
  },
  {
    id: 203,
    docNo: 'RPT-AGE-2026-003',
    planDocNo: null,
    month: 'กันยายน',
    year: '2569',
    status: 'Draft',
    date: '',
    onlineActivityType: '',
    onlineRows: [{ url: '', impression: '', leads: '' }],
    offlineActivityType: '',
    offlineFiles: [],
    onlineActualBudget: 0,
    offlineActualBudget: 0,
    claimRows: [{ activityType: 'online', claimType: '', detail: '', price: '', receiptFile: null }],
  },
];

// --- Shared Components ---
const StatusBadge = ({ status, large = false }) => {
  const styles = {
    Approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Rejected: 'bg-rose-50 text-rose-700 border-rose-200',
    Draft: 'bg-slate-100 text-slate-600 border-slate-300',
  };
  return (
    <span
      className={`inline-flex items-center justify-center font-bold border uppercase whitespace-nowrap ${large ? 'w-[5.5rem] py-1 text-xs' : 'w-[4.25rem] py-0.5 text-[9px]'} ${styles[status] || 'bg-slate-50'}`}
    >
      {status === 'Pending' && <Clock size={large ? 14 : 10} className="mr-1" />}
      {status === 'Approved' && <CheckCircle2 size={large ? 14 : 10} className="mr-1" />}
      {status === 'Rejected' && <X size={large ? 14 : 10} className="mr-1" />}
      {status === 'Draft' && <FileEdit size={large ? 14 : 10} className="mr-1" />}
      {status || ''}
    </span>
  );
};

const SummaryCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 border border-slate-300 shadow-sm flex items-center justify-between font-sans rounded-sm">
    <div className="space-y-0.5">
      <p className="text-[10px] text-slate-400 font-bold uppercase">{title}</p>
      <p className="text-2xl font-black text-slate-800 tracking-tighter">{value}</p>
    </div>
    <div className="bg-slate-50 p-2 border border-slate-100 rounded-sm">{icon}</div>
  </div>
);

const InfoItem = ({ label, value, icon, accent = null }) => {
  let borderClass = 'border-slate-100';
  let iconClass = 'text-indigo-600 opacity-80';
  let textClass = 'text-slate-800';
  if (accent === 'emerald') {
    borderClass = 'border-emerald-200';
    iconClass = 'text-emerald-600';
    textClass = 'text-emerald-800';
  } else if (accent === 'rose') {
    borderClass = 'border-rose-200';
    iconClass = 'text-rose-600';
    textClass = 'text-rose-800';
  }
  return (
    <div className={`space-y-1 border-l-4 ${borderClass} pl-4 py-0.5 font-sans`}>
      <div className="flex items-center gap-2">
        <span className={iconClass}>{icon}</span>
        <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">{label}</p>
      </div>
      <p className={`text-sm font-black truncate ${textClass}`}>{value}</p>
    </div>
  );
};

const TargetInputBox = ({ label, readOnly, defaultValue }) => (
  <div className="space-y-1.5 font-sans">
    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{label}</label>
    <div className="relative">
      <input
        disabled={readOnly}
        type="number"
        placeholder="0"
        defaultValue={defaultValue}
        className="w-full pr-12 py-2 px-4 border-2 border-slate-400 focus:border-indigo-500 outline-none text-2xl font-black shadow-sm tracking-tighter disabled:bg-slate-100 disabled:border-slate-300 disabled:text-slate-600 rounded-sm"
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">Units</span>
    </div>
  </div>
);

const ModelTargetList = ({ title, models, unit, readOnly, initialValue }) => {
  const getInitialValues = () =>
    models.map((_, idx) =>
      initialValue ? Math.floor(initialValue / models.length) + (idx === 0 ? initialValue % models.length : 0) : 0
    );
  const [values, setValues] = useState(getInitialValues);
  const total = values.reduce((a, b) => a + (Number(b) || 0), 0);

  const handleChange = (idx, val) => {
    const n = Number(val) || 0;
    setValues((prev) => {
      const next = [...prev];
      next[idx] = n;
      return next;
    });
  };

  return (
    <div className="space-y-2 bg-slate-50 p-4 border border-slate-200 shadow-inner rounded-sm font-sans">
      <div className="flex items-center justify-between border-b border-slate-300 pb-2 mb-2 font-black">
        <h4 className="text-slate-800 text-[11px] uppercase">{title}</h4>
        <span className="text-[10px] text-slate-400 uppercase">{unit}</span>
      </div>
      {models.map((model, idx) => (
        <div key={model} className="flex items-center justify-between py-1 group border-b border-slate-100 last:border-0">
          <span className="text-sm font-bold text-slate-600 tracking-tight">{model}</span>
          <input
            disabled={readOnly}
            type="number"
            min={0}
            value={values[idx]}
            onChange={(e) => handleChange(idx, e.target.value)}
            className="w-24 text-right border-2 border-slate-400 py-1 px-2 text-sm font-bold focus:border-indigo-500 outline-none shadow-sm disabled:bg-white disabled:border-slate-200 rounded-sm"
            placeholder="0"
          />
        </div>
      ))}
      <div className="flex items-center justify-between py-2 pt-3 mt-1 border-t-2 border-slate-300 font-black bg-white/50 -mx-2 px-2 -mb-1 rounded-sm">
        <span className="text-xs text-slate-600 uppercase">Total {unit.toLowerCase()}</span>
        <span className="text-lg font-black text-indigo-700 tabular-nums">{total.toLocaleString()}</span>
      </div>
    </div>
  );
};

const ActivitySectionForm = ({
  title,
  type,
  icon,
  accent,
  options,
  data,
  budget,
  setBudget,
  targetMode,
  setTargetMode,
  readOnly,
  onChange,
  targetValues,
}) => {
  const accentClasses = {
    indigo: { header: 'bg-indigo-600', budget: 'bg-indigo-700 text-indigo-50' },
    slate: { header: 'bg-slate-800', budget: 'bg-slate-900 text-slate-50' },
  };
  return (
    <section className="bg-white border border-slate-300 shadow-sm overflow-hidden mb-6 font-sans rounded-sm">
      <div
        className={`${accentClasses[accent].header} px-5 py-2 flex items-center justify-between text-white font-black`}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-sm">{icon}</div>
          <h3 className="text-[11px] uppercase tracking-tight">{title} Planning</h3>
        </div>
      </div>

      <div className="p-3 bg-slate-50 border-b border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px]">
          {data.map((week, idx) => (
            <div key={idx} className="space-y-3 p-4 bg-white border border-slate-200 group rounded-sm shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-1 font-bold text-indigo-600">
                <span className="text-[10px] uppercase tracking-widest">Week {idx + 1}</span>
                <CalendarDays size={14} className="text-slate-300" />
              </div>
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="font-black text-slate-500 uppercase flex items-center gap-1.5 tracking-tight">
                    <Zap size={12} className="text-indigo-500" /> กิจกรรม
                  </label>
                  <select
                    disabled={readOnly}
                    className="w-full border-2 border-slate-400 text-xs font-bold py-1.5 px-2 bg-white focus:border-indigo-500 outline-none transition-all shadow-sm disabled:bg-slate-100 disabled:border-slate-300 rounded-sm"
                    value={week.activity}
                    onChange={(e) => onChange(type, idx, 'activity', e.target.value)}
                  >
                    <option value="">-- เลือกกิจกรรม --</option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 uppercase flex items-center gap-1.5 tracking-tight">
                    <ArrowRight size={12} className="text-indigo-500" /> รายละเอียด
                  </label>
                  <textarea
                    disabled={readOnly}
                    placeholder="..."
                    className="w-full border-2 border-slate-400 text-xs font-bold py-1.5 px-2 bg-white min-h-[44px] focus:border-indigo-500 outline-none transition-all shadow-sm disabled:bg-white disabled:border-slate-200 rounded-sm"
                    rows={2}
                    value={week.otherDetail}
                    onChange={(e) => onChange(type, idx, 'otherDetail', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 uppercase flex items-center gap-1.5 tracking-tight">
                    <Clock size={12} className="text-indigo-500" /> วันที่จัด
                  </label>
                  <input
                    disabled={readOnly}
                    type="date"
                    className="w-full border-2 border-slate-400 text-xs font-bold py-1.5 px-2 bg-white shadow-sm focus:border-indigo-500 outline-none transition-all disabled:bg-slate-100 rounded-sm"
                    value={week.date}
                    onChange={(e) => onChange(type, idx, 'date', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-500 uppercase flex items-center gap-1.5 tracking-tight">
                    <MapPin size={12} className="text-indigo-500" /> สถานที่
                  </label>
                  <textarea
                    disabled={readOnly}
                    placeholder="..."
                    className="w-full border-2 border-slate-400 text-xs font-bold py-1.5 px-2 bg-white min-h-[50px] focus:border-indigo-500 outline-none transition-all shadow-sm disabled:bg-white disabled:border-slate-200 rounded-sm"
                    rows={2}
                    value={week.location}
                    onChange={(e) => onChange(type, idx, 'location', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between mb-5 font-sans">
          <div className="flex items-center gap-2.5 font-bold text-slate-700">
            <Target size={18} />
            <h4 className="text-[11px] uppercase">Monthly Targets : {title.toUpperCase()}</h4>
          </div>
          <div className="inline-flex bg-slate-200 p-0.5 border border-slate-300 rounded-sm">
            {['ALL', 'MODEL'].map((m) => (
              <button
                key={m}
                onClick={() => setTargetMode(m)}
                className={`px-4 py-1.5 text-[10px] font-black transition-all ${targetMode === m ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500'}`}
              >
                {m === 'ALL' ? 'รวมรุ่น' : 'แยกตามรุ่น'}
              </button>
            ))}
          </div>
        </div>
        {targetMode === 'ALL' ? (
          <div className="grid grid-cols-2 gap-8 font-sans">
            <TargetInputBox
              label={`Monthly Leads Target (${title})`}
              readOnly={readOnly}
              defaultValue={targetValues?.leads || 0}
            />
            <TargetInputBox
              label={`Monthly Booking Target (${title})`}
              readOnly={readOnly}
              defaultValue={targetValues?.bookings || 0}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
            <ModelTargetList
              title="Lead Target by Model"
              models={VEHICLE_MODELS}
              unit="LEADS"
              readOnly={readOnly}
              initialValue={targetValues?.leads || 0}
            />
            <ModelTargetList
              title="Booking Target by Model"
              models={VEHICLE_MODELS}
              unit="UNITS"
              readOnly={readOnly}
              initialValue={targetValues?.bookings || 0}
            />
          </div>
        )}
      </div>

      <div
        className={`${accentClasses[accent].budget} px-5 py-4 flex items-center justify-between shadow-inner font-sans`}
      >
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-2 border border-white/20 rounded-sm">
            <DollarSign size={20} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase opacity-70 font-sans">Estimated Budget</p>
            <p className="text-xs font-bold tracking-tight font-sans">
              งบประมาณประมาณการรวม (฿): {Number(budget || 0).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="relative font-sans">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-xl font-black">฿</span>
          <input
            disabled={readOnly}
            type="number"
            placeholder="0"
            className="bg-black/30 border-2 border-white/20 focus:border-white/50 focus:ring-0 text-white py-1.5 pl-8 pr-3 w-64 font-black text-2xl text-right transition-all tracking-tighter disabled:opacity-80 rounded-sm"
            value={budget || ''}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>
      </div>
    </section>
  );
};

const MonthlyPlanFormView = ({ onBack, initialPlan = null }) => {
  const isEditMode = !!initialPlan;
  const isApproved = initialPlan?.status === 'Approved';
  const isReadOnly = isApproved;

  const [selectedMonth, setSelectedMonth] = useState(initialPlan?.month || MONTHS_TH[0]);
  const [selectedYear, setSelectedYear] = useState(initialPlan?.year || '2569');
  const [onlineTargetMode, setOnlineTargetMode] = useState('ALL');
  const [offlineTargetMode, setOfflineTargetMode] = useState('ALL');

  const [onlinePlan, setOnlinePlan] = useState(
    initialPlan?.onlineData || Array(4).fill().map(() => ({ activity: '', otherDetail: '', date: '', location: '' }))
  );
  const [offlinePlan, setOfflinePlan] = useState(
    initialPlan?.offlineData || Array(4).fill().map(() => ({ activity: '', otherDetail: '', date: '', location: '' }))
  );

  const [onlineBudget, setOnlineBudget] = useState(initialPlan?.onlineBudget || 0);
  const [offlineBudget, setOfflineBudget] = useState(initialPlan?.offlineBudget || 0);

  const totalBudget = onlineBudget + offlineBudget;

  const handleActivityChange = (type, weekIdx, field, value) => {
    if (isReadOnly) return;
    const setter = type === 'online' ? setOnlinePlan : setOfflinePlan;
    const plan = type === 'online' ? [...onlinePlan] : [...offlinePlan];
    plan[weekIdx][field] = value;
    setter(plan);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 pb-10 animate-in slide-in-from-bottom-2 duration-300">
      <div className="bg-white p-4 border border-slate-300 shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-3 rounded-sm font-sans">
        <div className="space-y-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-slate-400 hover:text-indigo-600 font-bold text-[10px] uppercase transition-colors"
          >
            <ChevronLeft size={14} /> กลับไปหน้ารายการ
          </button>
          <div>
            <h2 className="text-lg font-black text-slate-800 uppercase leading-none font-sans">
              {isEditMode ? 'รายละเอียดแผนการตลาด' : 'สร้างแผนการตลาดใหม่'}
            </h2>
            <div className="flex items-center gap-2 mt-2 font-sans">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Document No:</span>
              <span className="bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-[11px] font-black text-indigo-700 rounded-sm">
                {initialPlan?.docNo || 'NEW-PLAN-REQ'}
              </span>
              {initialPlan && <StatusBadge status={initialPlan.status} />}
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center bg-slate-50 p-2 border border-slate-200 rounded-sm font-sans font-black">
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase">ปี พ.ศ.</label>
            <select
              disabled={isReadOnly}
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white border-2 border-slate-400 text-xs font-bold py-1 px-2 outline-none focus:border-indigo-500 disabled:bg-slate-100 rounded-sm"
            >
              <option value="2569">2569</option>
              <option value="2570">2570</option>
            </select>
          </div>
          <div className="w-px h-6 bg-slate-300 mx-1"></div>
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase">เดือน</label>
            <select
              disabled={isReadOnly}
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-white border-2 border-slate-400 text-xs font-bold py-1 px-2 outline-none focus:border-indigo-500 disabled:bg-slate-100 rounded-sm font-sans"
            >
              {MONTHS_TH.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isApproved && (
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 flex items-center gap-3 shadow-sm rounded-sm font-sans font-black">
          <Lock className="text-emerald-600" size={18} />
          <p className="text-xs font-bold text-emerald-800 uppercase tracking-tight">
            Read-Only: แผนงานที่อนุมัติแล้วไม่สามารถแก้ไขได้
          </p>
        </div>
      )}

      {isApproved && initialPlan.approvalData && (
        <section className="bg-white border border-slate-300 overflow-hidden shadow-sm animate-in fade-in duration-500 rounded-sm font-sans">
          <div className="bg-emerald-700 px-5 py-2 flex items-center gap-2 text-white font-black">
            <ShieldCheck size={16} />
            <h3 className="text-[11px] uppercase tracking-tight">Approval Information</h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3 space-y-0.5 font-sans">
              <p className="text-[9px] font-bold text-slate-400 uppercase">วันที่อนุมัติ</p>
              <p className="text-xs font-black text-emerald-700">{initialPlan.approvalData.date}</p>
            </div>
            <InfoItem label="ผู้พิจารณา" value={initialPlan.approvalData.name} icon={<User size={14} />} accent="emerald" />
            <InfoItem label="อีเมลติดต่อ" value={initialPlan.approvalData.email} icon={<Mail size={14} />} accent="emerald" />
            <InfoItem label="เบอร์โทรศัพท์" value={initialPlan.approvalData.phone} icon={<Phone size={14} />} accent="emerald" />
          </div>
        </section>
      )}

      <section className="bg-white border border-slate-300 overflow-hidden shadow-sm rounded-sm font-sans font-black">
        <div className="bg-slate-800 px-5 py-2 flex items-center gap-2 text-white font-black font-sans">
          <Store size={16} />
          <h3 className="text-[11px] uppercase tracking-tight">Dealer Information</h3>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <InfoItem label="ชื่อผู้จำหน่าย" value={MOCK_DEALER_INFO.dealerName} icon={<Layout size={14} />} />
          </div>
          <InfoItem label="ผู้ติดต่อ" value={MOCK_DEALER_INFO.contactPerson} icon={<User size={14} />} />
          <InfoItem label="อีเมลติดต่อ" value={MOCK_DEALER_INFO.email} icon={<Mail size={14} />} />
          <InfoItem label="เบอร์โทรศัพท์" value={MOCK_DEALER_INFO.mobilePhone} icon={<Phone size={14} />} />
        </div>
      </section>

      <ActivitySectionForm
        title="Online Activity"
        type="online"
        icon={<Globe size={16} />}
        accent="indigo"
        options={ONLINE_OPTIONS}
        data={onlinePlan}
        budget={onlineBudget}
        setBudget={setOnlineBudget}
        targetMode={onlineTargetMode}
        setTargetMode={setOnlineTargetMode}
        readOnly={isReadOnly}
        onChange={handleActivityChange}
        targetValues={{ leads: initialPlan?.leads || 0, bookings: initialPlan?.bookings || 0 }}
      />
      <ActivitySectionForm
        title="Offline Activity"
        type="offline"
        icon={<MapPin size={16} />}
        accent="slate"
        options={OFFLINE_OPTIONS}
        data={offlinePlan}
        budget={offlineBudget}
        setBudget={setOfflineBudget}
        targetMode={offlineTargetMode}
        setTargetMode={setOfflineTargetMode}
        readOnly={isReadOnly}
        onChange={handleActivityChange}
        targetValues={{ leads: initialPlan?.leads || 0, bookings: initialPlan?.bookings || 0 }}
      />

      <section className="bg-emerald-900 border-b-4 border-emerald-400 shadow-lg text-white p-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center rounded-sm font-sans font-black">
        <div className="flex items-center gap-4 border-r border-emerald-800 pr-6 font-sans">
          <div className="bg-emerald-700 p-3 rounded-none shadow-inner font-sans">
            <Wallet size={28} />
          </div>
          <div className="font-sans font-black">
            <p className="text-[10px] font-bold text-emerald-300 uppercase">Grand Total Cost</p>
            <h4 className="text-lg font-black uppercase tracking-tight">รวมงบประมาณทั้งสิ้น</h4>
          </div>
        </div>
        <div className="md:col-span-2 text-right">
          <p className="text-5xl font-black tracking-tighter">฿{totalBudget.toLocaleString()}</p>
          <p className="text-[10px] font-bold text-emerald-300 uppercase mt-1">
            Sum of Online and Offline estimated budgets
          </p>
        </div>
      </section>

      <div className="flex justify-end gap-3 pt-4 font-sans font-black">
        <button
          onClick={onBack}
          className="px-10 py-2.5 border border-slate-300 bg-white hover:bg-slate-100 text-slate-500 font-bold text-xs uppercase transition-all rounded-sm font-black"
        >
          {isReadOnly ? 'ปิดหน้าต่าง' : 'ยกเลิก'}
        </button>
        {!isReadOnly && (
          <>
            <button
              onClick={onBack}
              className="px-10 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black text-xs uppercase flex items-center gap-2 shadow-sm transition-all rounded-sm"
            >
              <Save size={18} /> บันทึกร่าง (Save Draft)
            </button>
            <button
              onClick={onBack}
              className="px-14 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase flex items-center gap-2 shadow-md transition-all active:scale-95 rounded-sm"
            >
              <TrendingUp size={18} /> {isEditMode ? 'บันทึกและส่งข้อมูล' : 'ส่งแผนงานเพื่อขออนุมัติ'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const ContentFormView = ({ onBack, onPreviewImage, initialReq = null }) => {
  const isEditMode = !!initialReq;
  const isDraft = initialReq?.status === 'Draft';
  const isReadOnly = initialReq && initialReq.status !== 'Draft';
  const isRejected = initialReq?.status === 'Rejected';

  return (
    <div className="max-w-7xl mx-auto space-y-4 pb-10 animate-in slide-in-from-bottom-2 duration-300">
      <div className="bg-white p-4 border border-slate-300 shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-3 rounded-sm font-sans">
        <div className="space-y-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-slate-400 hover:text-indigo-600 font-bold text-[10px] uppercase transition-colors"
          >
            <ChevronLeft size={14} /> กลับไปหน้ารายการ
          </button>
          <div>
            <h2 className="text-lg font-black text-slate-800 uppercase leading-none font-sans">
              {isEditMode ? 'รายละเอียดการขออนุมัติสื่อ' : 'สร้างคำขออนุมัติสื่อใหม่'}
            </h2>
            {initialReq && (
              <div className="flex items-center gap-2 mt-2 font-sans">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">คำขอเลขที่:</span>
                <span className="bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-[11px] font-black text-indigo-700 rounded-sm">
                  #{initialReq.id}
                </span>
                <StatusBadge status={initialReq.status} />
              </div>
            )}
          </div>
        </div>
      </div>

      {isRejected && initialReq.rejectData && (
        <section className="bg-white border border-slate-300 overflow-hidden shadow-sm animate-in fade-in duration-500 rounded-sm font-sans font-black">
          <div className="bg-rose-700 px-5 py-2 flex items-center gap-2 text-white font-black">
            <UserX size={16} />
            <h3 className="text-[11px] uppercase tracking-tight">Rejection Information</h3>
          </div>
          <div className="p-5 font-sans font-black">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-3 space-y-0.5 font-sans">
                <p className="text-[9px] font-bold text-slate-400 uppercase">วันที่ไม่อนุมัติ</p>
                <p className="text-xs font-black text-rose-700">{initialReq.rejectData.date}</p>
              </div>
              <InfoItem label="ผู้พิจารณา" value={initialReq.rejectData.name} icon={<User size={14} />} accent="rose" />
              <InfoItem label="อีเมลติดต่อ" value={initialReq.rejectData.email} icon={<Mail size={14} />} accent="rose" />
              <InfoItem label="เบอร์โทรศัพท์" value={initialReq.rejectData.phone} icon={<Phone size={14} />} accent="rose" />
            </div>
            <div className="p-4 bg-rose-50 border border-rose-200 border-l-4 border-l-rose-500 font-sans font-black">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle size={14} className="text-rose-600" />
                <p className="text-[10px] font-bold text-rose-600 uppercase">เหตุผลการไม่อนุมัติ (Rejection Reason)</p>
              </div>
              <p className="text-sm font-black text-rose-900 leading-relaxed">{initialReq.rejectReason}</p>
            </div>
          </div>
        </section>
      )}

      {initialReq?.status === 'Approved' && initialReq.approvalData && (
        <section className="bg-white border border-slate-300 overflow-hidden shadow-sm animate-in fade-in duration-500 rounded-sm font-sans">
          <div className="bg-emerald-700 px-5 py-2 flex items-center gap-2 text-white font-black">
            <ShieldCheck size={16} />
            <h3 className="text-[11px] uppercase tracking-tight">Approval Information</h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3 space-y-0.5 font-black font-sans">
              <p className="text-[9px] font-bold text-slate-400 uppercase">วันที่อนุมัติ</p>
              <p className="text-xs font-black text-emerald-700">{initialReq.approvalData.date}</p>
            </div>
            <InfoItem label="ผู้พิจารณา" value={initialReq.approvalData.name} icon={<User size={14} />} accent="emerald" />
            <InfoItem label="อีเมลติดต่อ" value={initialReq.approvalData.email} icon={<Mail size={14} />} accent="emerald" />
            <InfoItem label="เบอร์โทรศัพท์" value={initialReq.approvalData.phone} icon={<Phone size={14} />} accent="emerald" />
          </div>
        </section>
      )}

      <section className="bg-white border border-slate-300 overflow-hidden shadow-sm rounded-sm font-sans font-black">
        <div className="bg-slate-800 px-5 py-2 flex items-center gap-2 text-white font-black font-sans">
          <Store size={16} />
          <h3 className="text-[11px] uppercase tracking-tight font-sans">Dealer Information</h3>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <InfoItem label="ชื่อผู้จำหน่าย" value={MOCK_DEALER_INFO.dealerName} icon={<Layout size={14} />} />
          </div>
          <InfoItem label="ผู้ติดต่อ" value={MOCK_DEALER_INFO.contactPerson} icon={<User size={14} />} />
          <InfoItem label="อีเมลติดต่อ" value={MOCK_DEALER_INFO.email} icon={<Mail size={14} />} />
          <InfoItem label="เบอร์โทรศัพท์" value={MOCK_DEALER_INFO.mobilePhone} icon={<Phone size={14} />} />
        </div>
      </section>

      <section className="bg-white border border-slate-300 overflow-hidden rounded-sm font-sans font-black">
        <div className="bg-indigo-700 px-5 py-2 flex items-center gap-2.5 text-white font-black font-sans">
          <ClipboardCheck size={16} />
          <h3 className="text-[11px] uppercase tracking-tight font-sans">รายละเอียดคำขอ</h3>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            <div className="space-y-1">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-tight font-sans">หัวข้อการขออนุมัติ</label>
              <input
                disabled={isReadOnly}
                defaultValue={initialReq?.title}
                type="text"
                placeholder="ระบุชื่อหัวข้อสื่อ..."
                className="w-full border-2 border-slate-400 text-sm font-bold py-2 px-3 bg-white focus:border-indigo-500 outline-none shadow-sm transition-all rounded-sm font-sans"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-tight font-sans">วันที่ยื่นคำขอ</label>
              <input
                disabled={isReadOnly}
                defaultValue={initialReq?.date || new Date().toISOString().split('T')[0]}
                type="date"
                className="w-full border-2 border-slate-400 text-sm font-bold py-2 px-3 bg-white focus:border-indigo-500 outline-none shadow-sm transition-all disabled:bg-slate-50 rounded-sm font-sans"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-black text-slate-500 uppercase tracking-tight font-sans">รายละเอียดการใช้งาน</label>
            <textarea
              disabled={isReadOnly}
              defaultValue={initialReq?.usage}
              placeholder="ระบุวัตถุประสงค์การใช้งานสื่อชิ้นนี้..."
              className="w-full border-2 border-slate-400 text-sm font-bold py-2 px-3 bg-white focus:border-indigo-500 outline-none shadow-sm min-h-[100px] transition-all rounded-sm font-sans"
              rows={4}
            />
          </div>
        </div>
      </section>

      <section className="bg-white border border-slate-300 overflow-hidden rounded-sm font-sans font-black">
        <div className="bg-slate-800 px-5 py-2 flex items-center gap-2.5 text-white font-black font-sans">
          <Upload size={16} />
          <h3 className="text-[11px] uppercase tracking-tight font-sans">จัดการสื่อรูปภาพ (PNG/JPG ONLY)</h3>
        </div>
        <div className="p-5 space-y-4 font-sans font-black">
          {initialReq?.files && initialReq.files.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {initialReq.files.map((f, i) => (
                <div key={i} className="border border-slate-200 group/card relative bg-white rounded-sm overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => onPreviewImage(f)}
                        className="p-2 bg-white/90 hover:bg-white rounded-full text-indigo-600 shadow-lg transition-all hover:scale-110"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      {isDraft && (
                        <button
                          className="p-2 bg-white/90 hover:bg-white rounded-full text-rose-600 shadow-lg transition-all hover:scale-110"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="p-2 bg-slate-900 text-white font-black">
                    <span className="text-[9px] font-bold uppercase truncate block">{f.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(!initialReq || isDraft) && (
            <div className="border-2 border-dashed border-slate-400 bg-slate-50 p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer transition-all rounded-sm font-sans font-black">
              <ImageIcon size={32} className="mb-2 opacity-50 font-sans" />
              <p className="text-xs font-bold uppercase tracking-tight">Drag & Drop Image Files or Click to Upload</p>
              <p className="text-[10px] mt-1 text-rose-500 font-black uppercase">เฉพาะไฟล์ .png และ .jpg เท่านั้น</p>
            </div>
          )}
        </div>
      </section>

      <div className="flex justify-end gap-3 pt-4 font-sans font-black">
        <button
          onClick={onBack}
          className="px-10 py-2.5 border border-slate-300 bg-white hover:bg-slate-100 text-slate-500 font-bold text-xs uppercase transition-all rounded-sm"
        >
          {isReadOnly ? 'ปิดหน้าต่าง' : 'ยกเลิก'}
        </button>
        {!isReadOnly && (
          <>
            <button
              onClick={onBack}
              className="px-10 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black text-xs uppercase flex items-center gap-2 shadow-sm transition-all rounded-sm"
            >
              <Save size={18} /> บันทึกร่าง (Save Draft)
            </button>
            <button
              onClick={onBack}
              className="px-14 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase flex items-center gap-2 shadow-md transition-all active:scale-95 rounded-sm"
            >
              <Save size={18} /> ส่งคำขออนุมัติสื่อ
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const MonthlyListingView = ({ plans, onCreateNew, onOpenDetail }) => (
  <div className="space-y-4 animate-in fade-in duration-300 font-sans font-black">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight font-sans">Monthly Marketing Plans</h2>
      <button
        onClick={onCreateNew}
        className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-4 py-2 font-bold text-sm shadow-sm transition-all active:scale-95 rounded-sm"
      >
        <Plus size={18} /> สร้างแผนงานใหม่
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans font-black">
      <SummaryCard title="Leads ทั้งหมด" value="550" icon={<Target className="text-indigo-600 w-5 h-5 font-sans" />} />
      <SummaryCard title="ยอด Booking" value="35" icon={<CheckCircle2 className="text-emerald-600 w-5 h-5 font-sans" />} />
      <SummaryCard title="งบประมาณที่ใช้" value="฿830,000" icon={<DollarSign className="text-amber-600 w-5 h-5 font-sans" />} />
    </div>
    <div className="bg-white border border-slate-300 overflow-hidden shadow-sm rounded-sm font-sans font-black">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-sans font-black">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 text-[11px]">
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">Doc No.</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">เดือน/ปี</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans text-center">สถานะ</th>
              <th className="px-5 py-2.5 font-black text-center text-slate-500 tracking-tight font-sans">Leads Target</th>
              <th className="px-5 py-2.5 font-black text-center text-slate-500 tracking-tight font-sans">Booking Target</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">งบประมาณรวม</th>
              <th className="px-5 py-2.5 font-sans"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {plans.map((plan) => (
              <tr
                key={plan.id}
                className="hover:bg-slate-50 transition-colors group cursor-pointer font-sans font-black"
                onClick={() => onOpenDetail(plan)}
              >
                <td className="px-5 py-2.5 font-black text-indigo-600 tracking-tight">{plan.docNo}</td>
                <td className="px-5 py-2.5 font-bold text-slate-700">
                  {plan.month} {plan.year}
                </td>
                <td className="px-5 py-2.5 text-center font-black">
                  <StatusBadge status={plan.status} />
                </td>
                <td className="px-5 py-2.5 text-slate-600 text-center font-bold">{plan.leads}</td>
                <td className="px-5 py-2.5 text-slate-600 text-center font-bold">{plan.bookings}</td>
                <td className="px-5 py-2.5 font-black text-slate-900">฿{plan.totalBudget.toLocaleString()}</td>
                <td className="px-5 py-2.5 text-right font-black">
                  <div className="p-1 text-slate-400 group-hover:text-indigo-600 transition-all inline-block">
                    <ChevronRight size={18} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const ContentListingView = ({ requests, onCreateNew, onOpenDetail }) => (
  <div className="space-y-4 animate-in fade-in duration-300 font-sans font-black">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-sans font-black">
      <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight font-sans">Content Approval Listing</h2>
      <button
        onClick={onCreateNew}
        className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-4 py-2 font-bold text-sm shadow-sm transition-all active:scale-95 rounded-sm"
      >
        <Plus size={18} /> สร้างคำขอใหม่
      </button>
    </div>
    <div className="bg-white border border-slate-300 overflow-hidden shadow-sm rounded-sm font-sans font-black">
      <table className="w-full text-left text-sm font-sans font-black">
        <thead>
          <tr className="bg-slate-100 border-b border-slate-300 text-[11px] font-sans font-black">
            <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">หัวข้อการขออนุมัติ</th>
            <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight text-center font-sans">วันที่ส่ง</th>
            <th className="px-5 py-2.5 font-black text-center text-slate-500 tracking-tight font-sans">จำนวนไฟล์ภาพ</th>
            <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">สถานะ</th>
            <th className="px-5 py-2.5 font-sans"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {requests.map((req) => (
            <tr
              key={req.id}
              className="hover:bg-slate-50 transition-colors group cursor-pointer font-sans font-black"
              onClick={() => onOpenDetail(req)}
            >
              <td className="px-5 py-2.5 font-bold text-slate-700 tracking-tight">{req.title}</td>
              <td className="px-5 py-2.5 text-slate-500 text-center">{req.date}</td>
              <td className="px-5 py-2.5 text-slate-600 text-center font-bold tracking-tight">{req.files.length}</td>
              <td className="px-5 py-2.5 font-black">
                <StatusBadge status={req.status} />
              </td>
              <td className="px-5 py-2.5 text-right font-black">
                <div className="p-1 text-slate-400 group-hover:text-indigo-600 transition-all inline-block">
                  <ChevronRight size={16} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- Report & Claim ---
const ReportClaimListingView = ({ reports, onCreateNew, onOpenDetail }) => (
  <div className="space-y-4 animate-in fade-in duration-300 font-sans font-black">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight font-sans">Report & Claim</h2>
      <button
        onClick={onCreateNew}
        className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-4 py-2 font-bold text-sm shadow-sm transition-all active:scale-95 rounded-sm"
      >
        <Plus size={18} /> สร้างรายงานใหม่
      </button>
    </div>
    <div className="bg-white border border-slate-300 overflow-hidden shadow-sm rounded-sm font-sans font-black">
      <table className="w-full text-left text-sm font-sans font-black">
        <thead>
          <tr className="bg-slate-100 border-b border-slate-300 text-[11px]">
            <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">Doc No.</th>
            <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">อ้างอิงแผน</th>
            <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">เดือน/ปี</th>
            <th className="px-5 py-2.5 font-black text-center text-slate-500 tracking-tight font-sans">สถานะ</th>
            <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">งบใช้จริง</th>
            <th className="px-5 py-2.5 font-sans"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {reports.map((r) => (
            <tr
              key={r.id}
              className="hover:bg-slate-50 transition-colors group cursor-pointer font-sans font-black"
              onClick={() => onOpenDetail(r)}
            >
              <td className="px-5 py-2.5 font-black text-indigo-600 tracking-tight">{r.docNo}</td>
              <td className="px-5 py-2.5 font-bold text-slate-700">{r.planDocNo || '-'}</td>
              <td className="px-5 py-2.5 font-bold text-slate-700">
                {r.month} {r.year}
              </td>
              <td className="px-5 py-2.5 font-black">
                <StatusBadge status={r.status} />
              </td>
              <td className="px-5 py-2.5 font-black text-slate-900">
                ฿{((r.onlineActualBudget || 0) + (r.offlineActualBudget || 0)).toLocaleString()}
              </td>
              <td className="px-5 py-2.5 text-right font-black">
                <div className="p-1 text-slate-400 group-hover:text-indigo-600 transition-all inline-block">
                  <ChevronRight size={16} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ReportClaimFormView = ({ onBack, onPreviewImage, plans, initialReport = null }) => {
  const isEditMode = !!initialReport;
  const isApproved = initialReport?.status === 'Approved';
  const isReadOnly = isApproved;

  const [planDocNo, setPlanDocNo] = useState(initialReport?.planDocNo || '');
  const [onlineActivityType, setOnlineActivityType] = useState(initialReport?.onlineActivityType || '');
  const [onlineRows, setOnlineRows] = useState(
    initialReport?.onlineRows || [{ url: '', impression: '', leads: '' }]
  );
  const [offlineActivityType, setOfflineActivityType] = useState(initialReport?.offlineActivityType || '');
  const [offlineFiles, setOfflineFiles] = useState(initialReport?.offlineFiles || []);
  const [actualBudgetUsed, setActualBudgetUsed] = useState(
    initialReport
      ? (Number(initialReport.onlineActualBudget) || 0) + (Number(initialReport.offlineActualBudget) || 0)
      : 0
  );
  const [claimRows, setClaimRows] = useState(
    initialReport?.claimRows || [{ activityType: 'online', claimType: '', detail: '', price: '', receiptFile: null }]
  );

  const addOnlineRow = () => {
    if (onlineRows.length >= 5) return;
    setOnlineRows((p) => [...p, { url: '', impression: '', leads: '' }]);
  };
  const removeOnlineRow = (idx) => {
    if (onlineRows.length <= 1) return;
    setOnlineRows((p) => p.filter((_, i) => i !== idx));
  };
  const updateOnlineRow = (idx, field, val) => {
    setOnlineRows((p) => {
      const n = [...p];
      n[idx] = { ...n[idx], [field]: val };
      return n;
    });
  };

  const addClaimRow = () => {
    if (claimRows.length >= 5) return;
    setClaimRows((p) => [...p, { activityType: 'online', claimType: '', detail: '', price: '', receiptFile: null }]);
  };
  const removeClaimRow = (idx) => {
    if (claimRows.length <= 1) return;
    setClaimRows((p) => p.filter((_, i) => i !== idx));
  };
  const updateClaimRow = (idx, field, val) => {
    setClaimRows((p) => {
      const n = [...p];
      n[idx] = { ...n[idx], [field]: val };
      return n;
    });
  };

  const totalClaimAmount = claimRows.reduce((s, r) => s + (Number(r.price) || 0), 0);

  const approvedPlans = plans.filter((p) => p.status === 'Approved');

  return (
    <div className="max-w-7xl mx-auto space-y-4 pb-10 animate-in slide-in-from-bottom-2 duration-300">
      <div className="bg-white p-4 border border-slate-300 shadow-sm flex flex-col md:flex-row md:items-end justify-between gap-3 rounded-sm font-sans">
        <div className="space-y-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-slate-400 hover:text-indigo-600 font-bold text-[10px] uppercase transition-colors"
          >
            <ChevronLeft size={14} /> กลับไปหน้ารายการ
          </button>
          <div>
            <h2 className="text-lg font-black text-slate-800 uppercase leading-none font-sans">
              {isEditMode ? 'รายละเอียดรายงานและเบิกค่าใช้จ่าย' : 'สร้างรายงานการดำเนินกิจกรรม และเบิกค่าใช้จ่าย'}
        </h2>
        {initialReport && (
            <div className="flex items-center gap-2 mt-2 font-sans">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Document No:</span>
              <span className="bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-[11px] font-black text-indigo-700 rounded-sm">
                {initialReport.docNo}
              </span>
              <StatusBadge status={initialReport.status} />
            </div>
          )}
        </div>
        </div>
      </div>

      {isApproved && (
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 flex items-center gap-3 shadow-sm rounded-sm font-sans font-black">
          <Lock className="text-emerald-600" size={18} />
          <p className="text-xs font-bold text-emerald-800 uppercase tracking-tight">
            Read-Only: รายงานที่อนุมัติแล้วไม่สามารถแก้ไขได้
          </p>
        </div>
      )}

      {isApproved && initialReport.approvalData && (
        <section className="bg-white border border-slate-300 overflow-hidden shadow-sm animate-in fade-in duration-500 rounded-sm font-sans">
          <div className="bg-emerald-700 px-5 py-2 flex items-center gap-2 text-white font-black">
            <ShieldCheck size={16} />
            <h3 className="text-[11px] uppercase tracking-tight">Approval Information</h3>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3 space-y-0.5 font-sans">
              <p className="text-[9px] font-bold text-slate-400 uppercase">วันที่อนุมัติ</p>
              <p className="text-xs font-black text-emerald-700">{initialReport.approvalData.date}</p>
            </div>
            <InfoItem label="ผู้พิจารณา" value={initialReport.approvalData.name} icon={<User size={14} />} accent="emerald" />
            <InfoItem label="อีเมลติดต่อ" value={initialReport.approvalData.email} icon={<Mail size={14} />} accent="emerald" />
            <InfoItem label="เบอร์โทรศัพท์" value={initialReport.approvalData.phone} icon={<Phone size={14} />} accent="emerald" />
          </div>
        </section>
      )}

      <section className="bg-white border border-slate-300 overflow-hidden shadow-sm rounded-sm font-sans font-black">
        <div className="bg-slate-800 px-5 py-2 flex items-center gap-2 text-white font-black font-sans">
          <Store size={16} />
          <h3 className="text-[11px] uppercase tracking-tight">Dealer Information</h3>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <InfoItem label="ชื่อผู้จำหน่าย" value={MOCK_DEALER_INFO.dealerName} icon={<Layout size={14} />} />
          </div>
          <InfoItem label="ผู้ติดต่อ" value={MOCK_DEALER_INFO.contactPerson} icon={<User size={14} />} />
          <InfoItem label="อีเมลติดต่อ" value={MOCK_DEALER_INFO.email} icon={<Mail size={14} />} />
          <InfoItem label="เบอร์โทรศัพท์" value={MOCK_DEALER_INFO.mobilePhone} icon={<Phone size={14} />} />
        </div>
      </section>

      <section className="bg-white border border-slate-300 overflow-hidden rounded-sm font-sans font-black">
        <div className="bg-indigo-700 px-5 py-2 flex items-center gap-2 text-white font-black font-sans">
          <FileText size={16} />
          <h3 className="text-[11px] uppercase tracking-tight">Document No. อ้างอิงจาก Monthly Plan</h3>
        </div>
        <div className="p-5">
          <select
            disabled={isReadOnly}
            value={planDocNo}
            onChange={(e) => setPlanDocNo(e.target.value)}
            className="w-full max-w-xs border-2 border-slate-400 text-xs font-bold py-1.5 px-2 bg-white focus:border-indigo-500 outline-none shadow-sm disabled:bg-slate-100 disabled:border-slate-300 rounded-sm"
          >
            <option value="">-- เลือกแผนงานที่อนุมัติแล้ว --</option>
            {approvedPlans.map((p) => (
              <option key={p.id} value={p.docNo}>
                {p.docNo} ({p.month} {p.year})
              </option>
            ))}
            {approvedPlans.length === 0 && <option value="">ไม่มีแผนที่อนุมัติ</option>}
          </select>
        </div>
      </section>

      <section className="bg-white border border-slate-300 overflow-hidden shadow-sm rounded-sm font-sans font-black">
        <div className="bg-indigo-700 px-5 py-2 flex items-center gap-2 text-white font-black font-sans">
          <Globe size={16} />
          <h3 className="text-[11px] uppercase tracking-tight">Online Activity Report</h3>
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="font-black text-slate-500 uppercase flex items-center gap-1.5 tracking-tight text-[11px]">
              <Zap size={12} className="text-indigo-500" /> กิจกรรม
            </label>
            <select
              disabled={isReadOnly}
              value={onlineActivityType}
              onChange={(e) => setOnlineActivityType(e.target.value)}
              className="w-full max-w-xs border-2 border-slate-400 text-xs font-bold py-1.5 px-2 bg-white focus:border-indigo-500 outline-none shadow-sm disabled:bg-slate-100 disabled:border-slate-300 rounded-sm"
            >
              <option value="">-- เลือกกิจกรรม --</option>
              {ONLINE_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-black text-slate-500 uppercase">Link to Post / Internal SM Tools (สูงสุด 5)</label>
              {!isReadOnly && onlineRows.length < 5 && (
                <button
                  type="button"
                  onClick={addOnlineRow}
                  className="text-indigo-600 hover:text-indigo-700 text-xs font-black flex items-center gap-1"
                >
                  <Plus size={14} /> เพิ่มรายการ
                </button>
              )}
            </div>
            {onlineRows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-sm w-full">
                <div className="md:col-span-6 space-y-1 flex flex-col min-w-0">
                  <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1 shrink-0">
                    <Link size={12} /> URL
                  </label>
                  <input
                    disabled={isReadOnly}
                    value={row.url}
                    onChange={(e) => updateOnlineRow(idx, 'url', e.target.value)}
                    placeholder="https://..."
                    className="w-full border-2 border-slate-400 text-xs py-1.5 px-2 rounded-sm focus:border-indigo-500 outline-none min-h-[34px]"
                  />
                </div>
                <div className="md:col-span-2 space-y-1 flex flex-col min-w-0">
                  <label className="text-[10px] font-bold text-slate-500 uppercase shrink-0 flex items-center gap-1">
                    <Eye size={12} className="text-indigo-500" /> Impression
                  </label>
                  <input
                    disabled={isReadOnly}
                    type="number"
                    value={row.impression}
                    onChange={(e) => updateOnlineRow(idx, 'impression', e.target.value)}
                    placeholder="0"
                    className="w-full border-2 border-slate-400 text-xs py-1.5 px-2 rounded-sm focus:border-indigo-500 outline-none min-h-[34px]"
                  />
                </div>
                <div className="md:col-span-2 space-y-1 flex flex-col min-w-0">
                  <label className="text-[10px] font-bold text-slate-500 uppercase shrink-0 flex items-center gap-1">
                    <Target size={12} className="text-indigo-500" /> Leads
                  </label>
                  <input
                    disabled={isReadOnly}
                    type="number"
                    value={row.leads}
                    onChange={(e) => updateOnlineRow(idx, 'leads', e.target.value)}
                    placeholder="0"
                    className="w-full border-2 border-slate-400 text-xs py-1.5 px-2 rounded-sm focus:border-indigo-500 outline-none min-h-[34px]"
                  />
                </div>
<div className="md:col-span-2 flex flex-col min-w-0 md:justify-end">
                  {!isReadOnly && onlineRows.length > 1 && (
                    <div className="h-[34px] flex items-center justify-center shrink-0">
                      <button
                        type="button"
                        onClick={() => removeOnlineRow(idx)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-sm transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border border-slate-300 overflow-hidden shadow-sm rounded-sm font-sans font-black">
        <div className="bg-slate-800 px-5 py-2 flex items-center gap-2 text-white font-black font-sans">
          <MapPin size={16} />
          <h3 className="text-[11px] uppercase tracking-tight">Offline Activity Report</h3>
        </div>
        <div className="p-5 space-y-4">
          <div className="space-y-1">
            <label className="font-black text-slate-500 uppercase flex items-center gap-1.5 tracking-tight text-[11px]">
              <Zap size={12} className="text-indigo-500" /> กิจกรรม
            </label>
            <select
              disabled={isReadOnly}
              value={offlineActivityType}
              onChange={(e) => setOfflineActivityType(e.target.value)}
              className="w-full max-w-xs border-2 border-slate-400 text-xs font-bold py-1.5 px-2 bg-white focus:border-indigo-500 outline-none shadow-sm disabled:bg-slate-100 disabled:border-slate-300 rounded-sm"
            >
              <option value="">-- เลือกกิจกรรม --</option>
              {OFFLINE_OPTIONS.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-500 uppercase">รูปกิจกรรม (PNG/JPG)</label>
            {offlineFiles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {offlineFiles.map((f, i) => (
                  <div key={i} className="border border-slate-200 group/card relative bg-white rounded-sm overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={f.url || f} alt={f.name || `img-${i}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                        <button
                          type="button"
                          onClick={() => onPreviewImage(typeof f === 'object' ? f : { name: `img-${i}`, url: f })}
                          className="p-2 bg-white/90 hover:bg-white rounded-full text-indigo-600 shadow-lg transition-all hover:scale-110"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        {!isReadOnly && (
                          <button
                            type="button"
                            onClick={() => setOfflineFiles((p) => p.filter((_, ix) => ix !== i))}
                            className="p-2 bg-white/90 hover:bg-white rounded-full text-rose-600 shadow-lg transition-all hover:scale-110"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="p-2 bg-slate-900 text-white font-black">
                      <span className="text-[9px] font-bold uppercase truncate block">{f.name || `รูปกิจกรรม ${i + 1}`}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!isReadOnly && (
              <div className="border-2 border-dashed border-slate-400 bg-slate-50 p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer transition-all rounded-sm font-sans font-black">
                <ImageIcon size={32} className="mb-2 opacity-50" />
                <p className="text-xs font-bold uppercase tracking-tight">Drag & Drop หรือ Click เพื่อ Upload รูปกิจกรรม</p>
                <p className="text-[10px] mt-1 text-rose-500 font-black uppercase">เฉพาะไฟล์ .png และ .jpg</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-emerald-900 border-b-4 border-emerald-400 shadow-lg text-white rounded-sm font-sans font-black overflow-hidden">
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex items-center gap-4 border-r border-emerald-800 pr-6 font-sans">
            <div className="bg-emerald-700 p-3 rounded-none shadow-inner font-sans">
              <Wallet size={28} />
            </div>
            <div className="font-sans font-black">
              <p className="text-[10px] font-bold text-emerald-300 uppercase">Actual Budget Used</p>
              <h4 className="text-lg font-black uppercase tracking-tight">งบประมาณที่ใช้จริง</h4>
            </div>
          </div>
          <div className="md:col-span-2 text-right">
            {isReadOnly ? (
              <p className="text-5xl font-black tracking-tighter">฿{(actualBudgetUsed || 0).toLocaleString()}</p>
            ) : (
              <div className="flex flex-col items-end gap-1">
                <div className="relative font-sans">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-xl font-black">฿</span>
                  <input
                    type="number"
                    value={actualBudgetUsed || ''}
                    onChange={(e) => setActualBudgetUsed(Number(e.target.value) || 0)}
                    placeholder="0"
                    className="bg-black/30 border-2 border-white/20 focus:border-white/50 focus:ring-0 text-white py-1.5 pl-8 pr-3 w-64 font-black text-2xl text-right transition-all tracking-tighter rounded-sm"
                  />
                </div>
                <p className="text-[10px] font-bold text-emerald-300 uppercase">
                  งบประมาณที่ใช้จริงรวม (฿)
                </p>
              </div>
            )}
            {isReadOnly && (
              <p className="text-[10px] font-bold text-emerald-300 uppercase mt-1">
                Total actual budget used
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white border border-slate-300 overflow-hidden shadow-sm rounded-sm font-sans font-black">
        <div className="bg-amber-700 px-5 py-2 flex items-center gap-2 text-white font-black font-sans">
          <Receipt size={16} />
          <h3 className="text-[11px] uppercase tracking-tight">Claim Information (รายการเบิกค่าใช้จ่าย สูงสุด 5)</h3>
        </div>
        <div className="p-5 space-y-4">
          {claimRows.map((row, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black text-slate-500 uppercase">รายการ #{idx + 1}</span>
                {!isReadOnly && claimRows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeClaimRow(idx)}
                    className="text-rose-500 hover:text-rose-600"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Left column: แถว 1 = กิจกรรม, ประเภทเคลม | แถว 2 = รายการสินค้า, ราคา */}
                <div className="md:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase flex items-center gap-1.5 tracking-tight text-[10px]">
                      <Zap size={12} className="text-indigo-500" /> กิจกรรม
                    </label>
                    <select
                      disabled={isReadOnly}
                      value={row.activityType}
                      onChange={(e) => updateClaimRow(idx, 'activityType', e.target.value)}
                      className="w-full border-2 border-slate-400 text-xs font-bold py-1.5 px-2 bg-white focus:border-indigo-500 outline-none shadow-sm disabled:bg-slate-100 disabled:border-slate-300 rounded-sm"
                    >
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase flex items-center gap-1.5 tracking-tight text-[10px]">
                      <Tag size={12} className="text-indigo-500" /> ประเภทเคลม
                    </label>
                    <select
                      disabled={isReadOnly}
                      value={row.claimType}
                      onChange={(e) => updateClaimRow(idx, 'claimType', e.target.value)}
                      className="w-full border-2 border-slate-400 text-xs font-bold py-1.5 px-2 bg-white focus:border-indigo-500 outline-none shadow-sm disabled:bg-slate-100 disabled:border-slate-300 rounded-sm"
                    >
                      <option value="">-- เลือก --</option>
                      {CLAIM_TYPE_OPTIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase flex items-center gap-1.5 tracking-tight text-[10px]">
                      <FileText size={12} className="text-indigo-500" /> รายการสินค้า
                    </label>
                    <input
                      disabled={isReadOnly}
                      value={row.detail}
                      onChange={(e) => updateClaimRow(idx, 'detail', e.target.value)}
                      placeholder="..."
                      className="w-full border-2 border-slate-400 text-xs py-1.5 px-2 rounded-sm focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase flex items-center gap-1.5 tracking-tight text-[10px]">
                      <DollarSign size={12} className="text-indigo-500" /> ราคา (฿)
                    </label>
                    <input
                      disabled={isReadOnly}
                      type="number"
                      value={row.price}
                      onChange={(e) => updateClaimRow(idx, 'price', e.target.value)}
                      placeholder="0"
                      className="w-full border-2 border-slate-400 text-xs py-1.5 px-2 rounded-sm focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>
                {/* Right column: ใบเสร็จ */}
                <div className="md:col-span-2 space-y-1">
                  <label className="font-bold text-slate-500 uppercase flex items-center gap-1.5 tracking-tight text-[10px]">
                    <Receipt size={12} className="text-indigo-500" /> ใบเสร็จ
                  </label>
                  {row.receiptFile ? (
                    <div className="border border-slate-200 group/card relative bg-white rounded-sm overflow-hidden">
                      <div className="relative aspect-video overflow-hidden bg-slate-100">
                        <img
                          src={row.receiptFile.url || IMAGE_URLS_REPORT[0]}
                          alt={row.receiptFile.name || 'ใบเสร็จ'}
                          className="w-full h-full object-contain"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                          <button
                            type="button"
                            onClick={() => onPreviewImage({ name: row.receiptFile.name, url: row.receiptFile.url || IMAGE_URLS_REPORT[0] })}
                            className="p-2 bg-white/90 hover:bg-white rounded-full text-indigo-600 shadow-lg transition-all hover:scale-110"
                            title="ดูรูปเต็ม"
                          >
                            <Eye size={18} />
                          </button>
                          {!isReadOnly && (
                            <button
                              type="button"
                              onClick={() => updateClaimRow(idx, 'receiptFile', null)}
                              className="p-2 bg-white/90 hover:bg-white rounded-full text-rose-600 shadow-lg transition-all hover:scale-110"
                              title="ลบ"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="p-2 bg-slate-900 text-white font-black">
                        <span className="text-[9px] font-bold uppercase truncate block">{row.receiptFile.name || 'ใบเสร็จ'}</span>
                      </div>
                    </div>
                  ) : (
                    !isReadOnly && (
                      <div className="border-2 border-dashed border-slate-400 bg-slate-50 p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 rounded-sm text-slate-400 transition-all min-h-[140px]">
                        <Upload size={28} className="mb-2 opacity-60" />
                        <p className="text-xs font-bold uppercase tracking-tight">Drag & Drop หรือ Click เพื่อ Upload ใบเสร็จ</p>
                        <p className="text-[10px] mt-1 text-slate-400">PNG, JPG</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
          {!isReadOnly && claimRows.length < 5 && (
            <button
              type="button"
              onClick={addClaimRow}
              className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 hover:border-indigo-400 hover:text-indigo-600 font-bold text-xs uppercase transition-colors rounded-sm flex items-center justify-center gap-2"
            >
              <Plus size={16} /> เพิ่มรายการเคลม
            </button>
          )}
          <div className="mt-6 -mx-5 -mb-5">
            <section className="bg-amber-900 border-b-4 border-amber-400 shadow-lg text-white p-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center rounded-sm font-sans font-black">
              <div className="flex items-center gap-4 border-r border-amber-800 pr-6 font-sans">
                <div className="bg-amber-700 p-3 rounded-none shadow-inner font-sans">
                  <Receipt size={28} />
                </div>
                <div className="font-sans font-black">
                  <p className="text-[10px] font-bold text-amber-300 uppercase">Total Claim Amount</p>
                  <h4 className="text-lg font-black uppercase tracking-tight">รวมยอดเคลม</h4>
                </div>
              </div>
              <div className="md:col-span-2 text-right">
                <p className="text-5xl font-black tracking-tighter">฿{totalClaimAmount.toLocaleString()}</p>
                <p className="text-[10px] font-bold text-amber-300 uppercase mt-1">
                  Sum of all claim items
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3 pt-4 font-sans font-black">
        <button
          onClick={onBack}
          className="px-10 py-2.5 border border-slate-300 bg-white hover:bg-slate-100 text-slate-500 font-bold text-xs uppercase rounded-sm"
        >
          {isReadOnly ? 'ปิดหน้าต่าง' : 'ยกเลิก'}
        </button>
        {!isReadOnly && (
          <>
            <button
              onClick={onBack}
              className="px-10 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black text-xs uppercase flex items-center gap-2 shadow-sm rounded-sm"
            >
              <Save size={18} /> บันทึกร่าง
            </button>
            <button
              onClick={onBack}
              className="px-14 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase flex items-center gap-2 shadow-md rounded-sm"
            >
              <TrendingUp size={18} /> ส่งรายงานเพื่อขออนุมัติ
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('monthly_plan');
  const [view, setView] = useState('listing');
  const [plans] = useState(MOCK_PLANS);
  const [reports] = useState(MOCK_REPORT_CLAIMS);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  const pendingPlans = plans.filter((p) => p.status === 'Pending');
  const pendingContent = MOCK_CONTENT_REQUESTS.filter((r) => r.status === 'Pending');
  const pendingReports = reports.filter((r) => r.status === 'Pending');
  const totalPending = pendingPlans.length + pendingContent.length + pendingReports.length;

  const notificationPlans = plans.filter((p) => p.status === 'Approved' || p.status === 'Rejected');
  const notificationContent = MOCK_CONTENT_REQUESTS.filter((r) => r.status === 'Approved' || r.status === 'Rejected');
  const notificationReports = reports.filter((r) => r.status === 'Approved' || r.status === 'Rejected');

  const formatDateWithTime = (dateStr, timeStr) => {
    if (!dateStr) return '—';
    const [y, m, d] = dateStr.split('-');
    if (!d) return dateStr;
    return `${d}/${m}/${y} ${timeStr || '09:00'}`;
  };
  const getPlanDate = (p) => {
    if (p.approvalData?.date) return formatDateWithTime(p.approvalData.date, p.approvalData.time);
    return p.month && p.year ? `${p.month} ${p.year}` : '—';
  };
  const getContentDate = (r) => {
    if (r.date) return formatDateWithTime(r.date, r.time);
    if (r.approvalData?.date) return formatDateWithTime(r.approvalData.date, r.approvalData?.time);
    if (r.rejectData?.date) return formatDateWithTime(r.rejectData.date, r.rejectData?.time);
    return '—';
  };
  const getReportDate = (r) => {
    if (r.date) return formatDateWithTime(r.date, r.time);
    if (r.approvalData?.date) return formatDateWithTime(r.approvalData.date, r.approvalData?.time);
    return r.month && r.year ? `${r.month} ${r.year}` : '—';
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) setNotificationOpen(false);
    };
    if (notificationOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [notificationOpen]);

  const menuItems = [
    { id: 'monthly_plan', label: 'Monthly Plan', icon: <Calendar size={20} /> },
    { id: 'content', label: 'Content Approval', icon: <ClipboardCheck size={20} /> },
    { id: 'report', label: 'Report & Claim', icon: <FileSpreadsheet size={20} /> },
    { id: 'activity_summary', label: 'Activity Summary', icon: <BarChart3 size={20} /> },
  ];

  const handleOpenContentDetail = (req) => {
    setSelectedRequest(req);
    setView('content_detail');
  };

  const handleOpenPlanDetail = (plan) => {
    setSelectedPlan(plan);
    setView('plan_detail');
  };

  const handleOpenReportDetail = (report) => {
    setSelectedReport(report);
    setView('report_detail');
  };

  const renderContent = () => {
    if (activeMenu === 'monthly_plan') {
      if (view === 'listing')
        return (
          <MonthlyListingView
            plans={plans}
            onCreateNew={() => setView('create')}
            onOpenDetail={handleOpenPlanDetail}
          />
        );
      if (view === 'create') return <MonthlyPlanFormView onBack={() => setView('listing')} />;
      if (view === 'plan_detail')
        return <MonthlyPlanFormView onBack={() => setView('listing')} initialPlan={selectedPlan} />;
    }

    if (activeMenu === 'content') {
      if (view === 'listing')
        return (
          <ContentListingView
            requests={MOCK_CONTENT_REQUESTS}
            onCreateNew={() => setView('create')}
            onOpenDetail={handleOpenContentDetail}
          />
        );
      if (view === 'create')
        return <ContentFormView onBack={() => setView('listing')} onPreviewImage={setPreviewImage} />;
      if (view === 'content_detail')
        return (
          <ContentFormView
            onBack={() => setView('listing')}
            onPreviewImage={setPreviewImage}
            initialReq={selectedRequest}
          />
        );
    }

    if (activeMenu === 'report') {
      if (view === 'listing')
        return (
          <ReportClaimListingView
            reports={reports}
            onCreateNew={() => setView('create')}
            onOpenDetail={handleOpenReportDetail}
          />
        );
      if (view === 'create')
        return (
          <ReportClaimFormView
            onBack={() => setView('listing')}
            onPreviewImage={setPreviewImage}
            plans={plans}
          />
        );
      if (view === 'report_detail')
        return (
          <ReportClaimFormView
            onBack={() => setView('listing')}
            onPreviewImage={setPreviewImage}
            plans={plans}
            initialReport={selectedReport}
          />
        );
    }

    return (
      <div className="flex flex-col items-center justify-center h-[60vh] bg-white border border-dashed border-slate-300 rounded-sm font-sans font-black">
        <h2 className="text-xl font-black text-slate-400 uppercase tracking-tight">
          {menuItems.find((m) => m.id === activeMenu)?.label}
        </h2>
        <p className="text-slate-400 text-sm tracking-tight font-black">ส่วนนี้อยู่ระหว่างการพัฒนา (Placeholder View)</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 font-sans select-none text-[13px] flex font-sans">
      <aside
        className={`bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col sticky top-0 h-screen z-50 ${isSidebarOpen ? 'w-64' : 'w-16'} font-sans`}
      >
        <div className="h-16 flex items-center px-4 bg-slate-950 border-b border-slate-800">
          <div className="bg-indigo-600 p-1.5 rounded-none mr-3 shadow-lg shadow-indigo-900/20 font-black">
            <FileText className="text-white w-5 h-5" />
          </div>
          {isSidebarOpen && (
            <h1 className="text-sm font-black text-white uppercase tracking-tighter truncate">OJ Marketing Portal</h1>
          )}
        </div>

        <nav className="flex-1 py-4 font-black">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                setView('listing');
              }}
              className={`w-full flex items-center py-3 px-4 transition-colors relative group ${activeMenu === item.id ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <div className="min-w-[24px] font-black">{item.icon}</div>
              {isSidebarOpen && (
                <span className="ml-3 font-bold text-xs uppercase tracking-tight truncate font-black">{item.label}</span>
              )}
              {activeMenu === item.id && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white font-black"></div>
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-4 hover:bg-slate-800 border-t border-slate-800 flex justify-center text-slate-500 hover:text-white transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 font-sans">
        <header className="bg-white border-b border-slate-300 min-h-12 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm font-black">
          <div className="flex items-center gap-2 font-black">
            {!isSidebarOpen && <span className="font-black text-indigo-600 uppercase text-xs font-black">OJ</span>}
            <span className="text-xs text-slate-400 font-bold uppercase tracking-tight font-black">
              {menuItems.find((m) => m.id === activeMenu)?.label}
            </span>
          </div>
          <div className="flex items-center gap-3 font-black">
            {/* Single notification badge: click to open list */}
            <div className="relative" ref={notificationRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setNotificationOpen((o) => !o);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border transition-colors ${
                  totalPending > 0
                    ? 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
                title="การแจ้งเตือนรออนุมัติ"
              >
                <Bell size={16} className={totalPending > 0 ? 'text-amber-600' : 'text-slate-400'} />
                {totalPending > 0 && (
                  <span className="text-[10px] font-bold tabular-nums min-w-[18px] text-center">{totalPending}</span>
                )}
              </button>
              {notificationOpen && (
                <div className="absolute right-0 top-full mt-1 w-80 max-h-[70vh] overflow-y-auto bg-white border border-slate-200 shadow-lg rounded-sm z-50 font-sans">
                  <div className="p-2 border-b border-slate-100 font-black text-[10px] uppercase text-slate-500 tracking-tight">
                    การแจ้งเตือน (Approved / Rejected)
                  </div>
                  <ul className="py-1 text-xs">
                    <li className="border-b border-slate-100">
                      <div className="px-3 py-1.5 font-bold text-slate-500 text-[10px] uppercase tracking-tight flex items-center gap-2">
                        <Calendar size={12} /> Monthly Plan ({notificationPlans.length})
                      </div>
                      <ul className="pb-2">
                        {notificationPlans.length === 0 ? (
                          <li className="px-3 py-1 text-slate-400 text-[11px]">ไม่มีรายการ</li>
                        ) : (
                          notificationPlans.map((p) => (
                            <li key={p.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenu('monthly_plan');
                                  setSelectedPlan(p);
                                  setView('plan_detail');
                                  setNotificationOpen(false);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex flex-col gap-0.5"
                              >
                                <span className="text-[11px] font-bold text-slate-800 truncate">{p.docNo} — {p.month} {p.year}</span>
                                <span className="flex items-center gap-2 text-[10px] text-slate-500">
                                  <StatusBadge status={p.status} />
                                  <span>{getPlanDate(p)}</span>
                                </span>
                              </button>
                            </li>
                          ))
                        )}
                      </ul>
                    </li>
                    <li className="border-b border-slate-100">
                      <div className="px-3 py-1.5 font-bold text-slate-500 text-[10px] uppercase tracking-tight flex items-center gap-2">
                        <ClipboardCheck size={12} /> Content Approval ({notificationContent.length})
                      </div>
                      <ul className="pb-2">
                        {notificationContent.length === 0 ? (
                          <li className="px-3 py-1 text-slate-400 text-[11px]">ไม่มีรายการ</li>
                        ) : (
                          notificationContent.map((r) => (
                            <li key={r.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenu('content');
                                  setSelectedRequest(r);
                                  setView('content_detail');
                                  setNotificationOpen(false);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex flex-col gap-0.5"
                              >
                                <span className="text-[11px] font-bold text-slate-800 truncate">{r.title}</span>
                                <span className="flex items-center gap-2 text-[10px] text-slate-500">
                                  <StatusBadge status={r.status} />
                                  <span>{getContentDate(r)}</span>
                                </span>
                              </button>
                            </li>
                          ))
                        )}
                      </ul>
                    </li>
                    <li>
                      <div className="px-3 py-1.5 font-bold text-slate-500 text-[10px] uppercase tracking-tight flex items-center gap-2">
                        <FileSpreadsheet size={12} /> Report & Claim ({notificationReports.length})
                      </div>
                      <ul className="pb-2">
                        {notificationReports.length === 0 ? (
                          <li className="px-3 py-1 text-slate-400 text-[11px]">ไม่มีรายการ</li>
                        ) : (
                          notificationReports.map((r) => (
                            <li key={r.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenu('report');
                                  setSelectedReport(r);
                                  setView('report_detail');
                                  setNotificationOpen(false);
                                }}
                                className="w-full text-left px-3 py-1.5 hover:bg-slate-50 flex flex-col gap-0.5"
                              >
                                <span className="text-[11px] font-bold text-slate-800 truncate">{r.docNo} — {r.month} {r.year}</span>
                                <span className="flex items-center gap-2 text-[10px] text-slate-500">
                                  <StatusBadge status={r.status} />
                                  <span>{getReportDate(r)}</span>
                                </span>
                              </button>
                            </li>
                          ))
                        )}
                      </ul>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <span className="text-xs text-slate-700 font-bold tracking-tight hidden sm:inline">
              {MOCK_DEALER_INFO.contactPerson}
            </span>
            <div className="w-8 h-8 bg-slate-800 rounded-none flex items-center justify-center text-white text-xs font-black shrink-0">
              OJ
            </div>
          </div>
        </header>

        <main className="p-6 relative font-sans">{renderContent()}</main>
      </div>

      {previewImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay animate-in fade-in duration-200 font-sans"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center group font-black">
            <button
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors flex items-center gap-2 uppercase font-black text-xs"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewImage(null);
              }}
            >
              <X size={20} /> ปิดหน้าต่าง
            </button>
            <div className="bg-white p-1 shadow-2xl border border-white/10 font-sans" onClick={(e) => e.stopPropagation()}>
              <img
                src={previewImage.url}
                alt={previewImage.name}
                className="max-w-full max-h-[80vh] object-contain block font-sans"
              />
              <div className="p-4 flex items-center justify-between border-t border-slate-100 bg-white font-sans font-black">
                <div className="flex flex-col font-sans">
                  <span className="font-black text-slate-800 uppercase text-xs tracking-tight font-black">
                    {previewImage.name}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 font-sans">
                    OMODA JAECOO Content Preview System
                  </span>
                </div>
                <div className="bg-indigo-50 text-indigo-600 px-3 py-1 text-[10px] font-black uppercase border border-indigo-100 font-sans">
                  Full Size Preview
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
