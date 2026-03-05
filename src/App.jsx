import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx';
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
  Settings,
  LogOut,
  Download,
} from 'lucide-react';

// --- Constants & Mock Data ---
const MOCK_DEALER_INFO = {
  dealerPrefix: 'AGE',
  dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง',
  contactPerson: 'สมชาย มีความสุข',
  mobilePhone: '081-234-5678',
  email: 'somchai.m@omodajaecoo.co.th',
};

const MOCK_ADMIN_INFO = {
  name: 'ธนาวุฒิ อนุมัติไว',
  email: 'thanawut.a@omodajaecoo.co.th',
  phone: '02-111-2233',
};

const MOCK_USERS = [
  { id: 1, name: 'ธนาวุฒิ อนุมัติไว', email: 'thanawut.a@omodajaecoo.co.th', phone: '02-111-2233', role: 'admin' },
  { id: 2, name: 'สมชาย มีความสุข', email: 'somchai.m@omodajaecoo.co.th', phone: '081-234-5678', role: 'dealer', dealerCode: 'AGE', dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง' },
  { id: 3, name: 'ศิริมา อนุมัติเก่ง', email: 'sirima.k@omodajaecoo.co.th', phone: '02-999-8877', role: 'admin' },
  { id: 4, name: 'วิชัย ผู้จัดการดีลเลอร์', email: 'wichai.d@dealer.co.th', phone: '089-111-2233', role: 'dealer', dealerCode: 'AGEB', dealerName: 'โอ โมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขาบางนา' },
  { id: 5, name: 'มานี มาร์เก็ตติ้ง', email: 'manee.m@omodajaecoo.co.th', phone: '082-444-5566', role: 'dealer', dealerCode: 'BSKK', dealerName: 'โอโมดา แอนด์ เจคู บลูสกาย สาขาถนนเศรษฐกิจ' },
];

const MOCK_DEALERS = [
  { id: 1, dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง', dealerCode: 'AGE' },
  { id: 2, dealerName: 'โอ โมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขาบางนา', dealerCode: 'AGEB' },
  { id: 3, dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารังสิต', dealerCode: 'AGERS' },
  { id: 4, dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ ชลบุรี', dealerCode: 'AGEC' },
  { id: 5, dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ พัทยา', dealerCode: 'AGEP' },
  { id: 6, dealerName: 'โอ โมดา แอนด์ เจคู เอกสห สาขาสุวินทวงศ์', dealerCode: 'MLS' },
  { id: 7, dealerName: 'โอ โมดา แอนด์ เจคู บลูสกาย สาขาพระราม 2', dealerCode: 'BSK2' },
  { id: 8, dealerName: 'โอโมดา แอนด์ เจคู บลูสกาย สาขาถนนเศรษฐกิจ', dealerCode: 'BSKK' },
  { id: 9, dealerName: 'โอโมดา แอนด์ เจคู บลูสกาย สาขาสรงประภา', dealerCode: 'BSKS' },
  { id: 10, dealerName: 'โอโมดา แอนด์ เจคู ซีซีซี ออโต้ จังหวัดอุบลราชธานี', dealerCode: 'CCC' },
  { id: 11, dealerName: 'โอโมดา แอนด์ เจคู ช.เอราวัณ จังหวัดนครปฐม', dealerCode: 'CHER' },
  { id: 12, dealerName: 'โอโมดา แอนด์ เจคู เอ็มเพอร์เรอร์ บางแค', dealerCode: 'EMP' },
  { id: 13, dealerName: 'โอโมดา แอนด์ เจคู ยูโรเปียน ทองหล่อ', dealerCode: 'ERO' },
  { id: 14, dealerName: 'โอ โมดา แอนด์ เจคู เอกสห นครราชสีมา (โคราช)', dealerCode: 'ESK' },
  { id: 15, dealerName: 'โอ โมดา แอนด์ เจคู อีวี บางกอก สาขาดอนเมือง', dealerCode: 'EVBK' },
  { id: 16, dealerName: 'โอโมดา แอนด์ เจคู ฮอร์ริซอน พีเอฟ สาขาหาดใหญ่', dealerCode: 'HRH' },
  { id: 17, dealerName: 'โอโมดา แอนด์ เจคู จิ่วเฉิง หลักสี่', dealerCode: 'JIU' },
  { id: 18, dealerName: 'โอโมดา แอนด์ เจคู ไลฟ์สไตล์ออโต สาขาภูเก็ต', dealerCode: 'LSA' },
  { id: 19, dealerName: 'โอ โมดา แอนด์ เจคู มาพร ระยอง', dealerCode: 'MAP' },
  { id: 20, dealerName: 'โอโมดา แอนด์ เจคู เมก้า สาขาติวานนท์', dealerCode: 'MEG' },
  { id: 21, dealerName: 'โอโมดา แอนด์ เจคู นครินทร์ สาขาถนนศรีนครินทร์', dealerCode: 'NKN' },
  { id: 22, dealerName: 'โอโมดา แอนด์ เจคู นครินทร์ สาขาบิ๊กซี สมุทรปราการ', dealerCode: 'NKNS' },
  { id: 23, dealerName: 'โอโมดา แอนด์ เจคู พระนคร สาขา บางซื่อ', dealerCode: 'PNAB' },
  { id: 24, dealerName: 'โอโมดา แอนด์ เจคู พระนคร สาขา อุดมสุข', dealerCode: 'PNAU' },
  { id: 25, dealerName: 'โอโมดา แอนด์ เจคู ริช เชียงใหม่', dealerCode: 'RCM' },
  { id: 26, dealerName: 'โอโมดา แอนด์ เจคู ริช เชียงราย', dealerCode: 'RCR' },
  { id: 27, dealerName: 'โอ โมดา แอนด์ เจคู ริช ลำปาง', dealerCode: 'RLP' },
  { id: 28, dealerName: 'โอโมดา แอนด์ เจคู อาร์งวัฒนา อุดรธานี', dealerCode: 'RHU' },
  { id: 29, dealerName: 'โอโมดา แอนด์ เจคู สกายได้ร์ฟ สาขาสิรินธร', dealerCode: 'SKD' },
  { id: 30, dealerName: 'โอโมดา แอนด์ เจคู สกายได้ร์ฟ สาขาพาซิโอพาร์ค กาญจนาภิเษก (เฉพาะจัดจำหน่าย)', dealerCode: 'SKDK' },
  { id: 31, dealerName: 'โอโมดา แอนด์ เจคู ศรีวัฒน์ สาขาแจ้งวัฒนะ', dealerCode: 'SRWC' },
  { id: 32, dealerName: 'โอโมดา แอนด์ เจคู ศรีวัฒน์ สาขารัตนาธิเบศ', dealerCode: 'SRWR' },
  { id: 33, dealerName: 'โอโมดา แอนด์ เจคู เทคคาร์ ลาดพร้าว', dealerCode: 'TCK' },
  { id: 34, dealerName: 'โอโมดา แอนด์ เจคู ไทยธาดา อีวี จังหวัดอยุธยา', dealerCode: 'THEV' },
  { id: 35, dealerName: 'โอโมดา แอนด์ เจคู ธนาสิทธิ์ ขอนแก่น', dealerCode: 'THS' },
  { id: 36, dealerName: 'โอโมดา แอนด์ เจคู วี กรุ๊ป สาขานครศรีธรรมราช', dealerCode: 'TNS' },
  { id: 37, dealerName: 'โอโมดา แอนด์ เจคู เอกสห ตราด', dealerCode: 'VGN' },
  { id: 38, dealerName: 'โอโมดา แอนด์ เจคู วี กรุ๊ป สาขาสุราษฎร์ธานี', dealerCode: 'VGNS' },
  { id: 39, dealerName: 'โอโมดา แอนด์ เจคู วี กรุ๊ป สาขาพัทลุง', dealerCode: 'VGP' },
  { id: 40, dealerName: 'โอโมดา แอนด์ เจคู วี กรุ๊ป สาขากาญจนบุรี', dealerCode: 'VGPK' },
  { id: 41, dealerName: 'โอโมดา แอนด์ เจคู วี กรุ๊ป สาขาสงขลา', dealerCode: 'VGS' },
  { id: 42, dealerName: 'โอโมดา แอนด์ เจคู ยูนิค ออโต้ สาขา', dealerCode: 'UOS' },
  { id: 43, dealerName: 'โอโมดา แอนด์ เจคู อาเร่ สาขา', dealerCode: 'ARE' },
  { id: 44, dealerName: 'โอโมดา แอนด์ เจคู ทีดีเอส', dealerCode: 'TDS' },
  { id: 45, dealerName: 'โอโมดา แอนด์ เจคู เอสเอ็มแอล', dealerCode: 'SML' },
  { id: 46, dealerName: 'โอโมดา แอนด์ เจคู เอ็นเอ', dealerCode: 'ANA' },
  { id: 47, dealerName: 'โอโมดา แอนด์ เจคู ซีเอ็มพี', dealerCode: 'CMP' },
  { id: 48, dealerName: 'โอโมดา แอนด์ เจคู วีจีที', dealerCode: 'VGT' },
  { id: 49, dealerName: 'โอโมดา แอนด์ เจคู วีจีเอ็มเอส', dealerCode: 'VGMS' },
  { id: 50, dealerName: 'โอโมดา แอนด์ เจคู ซีอีวีเอส สาขา', dealerCode: 'CEVSW' },
  { id: 51, dealerName: 'โอโมดา แอนด์ เจคู ดีเคบี', dealerCode: 'DKB' },
  { id: 52, dealerName: 'โอโมดา แอนด์ เจคู เอสทีเอชเอช', dealerCode: 'STHH' },
  { id: 53, dealerName: 'โอโมดา แอนด์ เจคู ซีอีวีเอสเค', dealerCode: 'CEVSK' },
  { id: 54, dealerName: 'โอโมดา แอนด์ เจคู เอ็นทีอาร์', dealerCode: 'NTR' },
  { id: 55, dealerName: 'โอโมดา แอนด์ เจคู อีเอสอาร์', dealerCode: 'ESR' },
  { id: 56, dealerName: 'โอโมดา แอนด์ เจคู พีพีแอล', dealerCode: 'PPL' },
  { id: 57, dealerName: 'โอโมดา แอนด์ เจคู เอสจีเอ็น', dealerCode: 'SGAN' },
  { id: 58, dealerName: 'โอโมดา แอนด์ เจคู เอ็มทีซี', dealerCode: 'MTC' },
  { id: 59, dealerName: 'โอโมดา แอนด์ เจคู เอสเค', dealerCode: 'ASK' },
  { id: 60, dealerName: 'โอโมดา แอนด์ เจคู เอ็มเอแอล', dealerCode: 'MAL' },
  { id: 61, dealerName: 'โอโมดา แอนด์ เจคู พีทีเอ็น', dealerCode: 'PTN' },
  { id: 62, dealerName: 'โอโมดา แอนด์ เจคู ซีเอชอาร์บี', dealerCode: 'CHRB' },
  { id: 63, dealerName: 'โอโมดา แอนด์ เจคู เอกสห สาขาตราด', dealerCode: 'ESKT' },
  { id: 64, dealerName: 'โอโมดา แอนด์ เจคู เอกสห จันทบุรี', dealerCode: 'ESKC' },
  { id: 65, dealerName: 'โอ โมดา แอนด์ เจคู ซีแอล ออโต ฉะเชิงเทรา', dealerCode: 'CLC' },
  { id: 66, dealerName: 'โอ โมดา แอนด์ เจคู ซีแอล ออโต ปราจีนบุรี', dealerCode: 'CLP' },
  { id: 67, dealerName: 'โอโมดา แอนด์ เจคู ที ออโต้ ไดรฟ์ สิงห์บุรี', dealerCode: 'TADS' },
  { id: 68, dealerName: 'โอโมดา แอนด์ เจคู ไดรฟ์ บุรีรัมย์', dealerCode: 'DBR' },
  { id: 69, dealerName: 'โอ โมดา แอนด์ เจคู อีวีเอส พลัส รามอินทรา', dealerCode: 'PGR' },
  { id: 70, dealerName: 'โอโมดา แอนด์ เจคู ฟิวเจอร์ กาญจนบุรี', dealerCode: 'FKR' },
];

const ONLINE_OPTIONS = ['Livestream', 'Post on Facebook', 'Post on TikTok', 'Other'];
const OFFLINE_OPTIONS = ['Roadshow', 'OJ Club', 'Showroom event', 'Other'];

const VEHICLE_MODELS = ['OMODA C5 EV', 'JAECOO 5 EV', 'JAECOO 6 EV', 'JAECOO 7 PHEV'];
const MONTHS_TH = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

const sortPlansByDateDesc = (list) =>
  [...list].sort((a, b) => {
    const y = Number(b.year || 0) - Number(a.year || 0);
    if (y !== 0) return y;
    return MONTHS_TH.indexOf(b.month) - MONTHS_TH.indexOf(a.month);
  });
const sortContentByDateDesc = (list) => [...list].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
const sortReportsByDateDesc = (list) =>
  [...list].sort((a, b) => {
    const getKey = (r) =>
      r.date || `${r.year || ''}-${String((MONTHS_TH.indexOf(r.month) + 1) || 1).padStart(2, '0')}-01`;
    return getKey(b).localeCompare(getKey(a));
  });
const sortActivityListByDateDesc = (list) =>
  [...list].sort((a, b) => {
    const y = Number(b.plan?.year || 0) - Number(a.plan?.year || 0);
    if (y !== 0) return y;
    return MONTHS_TH.indexOf(b.plan?.month) - MONTHS_TH.indexOf(a.plan?.month);
  });

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
    id: 0,
    docNo: 'AGE20251201v1',
    dealerCode: 'AGE',
    dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง',
    month: 'ธันวาคม',
    year: '2568',
    status: 'Approved',
    totalBudget: 400000,
    leads: 260,
    bookings: 16,
    onlineData: [
      { activity: 'Post on Facebook', otherDetail: 'โปรโมทส่งท้ายปี OMODA & JAECOO', date: '2025-12-05', location: 'Facebook Page' },
      { activity: 'Livestream', otherDetail: 'ไลฟ์สรุปโปรโมชั่นเดือนธันวาคม', date: '2025-12-15', location: 'TikTok / FB' },
      { activity: 'Post on TikTok', otherDetail: 'คลิปรีวิว OMODA C5 EV', date: '2025-12-20', location: 'TikTok' },
      { activity: 'Post on Facebook', otherDetail: 'โฆษณาปลายปี', date: '2025-12-28', location: 'Meta Ads' },
    ],
    offlineData: [
      { activity: 'Roadshow', otherDetail: 'จัดแสดงส่งท้ายปีที่ศูนย์การค้า', date: '2025-12-01', location: 'Central World' },
      { activity: 'Showroom event', otherDetail: 'งานปีใหม่ที่โชว์รูม', date: '2025-12-20', location: 'Showroom Ram' },
      { activity: 'OJ Club', otherDetail: 'กิจกรรมสมาชิกคลับส่งท้ายปี', date: '2025-12-27', location: 'Showroom Ram' },
      { activity: 'Other', otherDetail: 'กิจกรรมแจกรางวัล', date: '2025-12-31', location: 'Showroom Ram' },
    ],
    onlineBudget: 220000,
    offlineBudget: 180000,
    approvalData: {
      date: '2025-12-08',
      time: '10:00',
      name: 'ธนาวุฒิ อนุมัติไว (Admin)',
      email: 'thanawut.a@omodajaecoo.co.th',
      phone: '02-111-2233',
    },
  },
  {
    id: 1,
    docNo: 'AGE20260115v1',
    dealerCode: 'AGE',
    dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง',
    month: 'มกราคม',
    year: '2569',
    status: 'Approved',
    totalBudget: 450000,
    leads: 300,
    bookings: 20,
    onlineData: [
      { activity: 'Post on Facebook', otherDetail: 'โพสต์โปรโมท OMODA C5 EV', date: '2026-01-05', location: 'Facebook Page' },
      { activity: 'Livestream', otherDetail: 'ไลฟ์สดแนะนำฟีเจอร์รถ OMODA C5 EV', date: '2026-01-12', location: 'TikTok / FB' },
      { activity: 'Post on Facebook', otherDetail: 'ยิงโฆษณาแคมเปญหลัก OMODA', date: '2026-01-19', location: 'Meta Ads' },
      { activity: 'Post on TikTok', otherDetail: 'รีวิวสั้นๆ 15 วินาที OMODA C5', date: '2026-01-26', location: 'TikTok' },
    ],
    offlineData: [
      { activity: 'Roadshow', otherDetail: 'จัดแสดงที่ห้างสรรพสินค้าชั้นนำ', date: '2026-01-01', location: 'Central World' },
      { activity: 'Showroom event', otherDetail: 'งานเปิดตัว OMODA C5 EV รุ่นพิเศษ', date: '2026-01-15', location: 'Showroom Ram' },
      { activity: 'OJ Club', otherDetail: 'กิจกรรมสมาชิกคลับ OMODA & JAECOO', date: '2026-01-20', location: 'Showroom Ram' },
      { activity: 'Other', otherDetail: 'กิจกรรมแจกรางวัลผู้จอง OMODA', date: '2026-01-31', location: 'Showroom Ram' },
    ],
    onlineBudget: 250000,
    offlineBudget: 200000,
    approvalData: {
      date: '2026-01-10',
      time: '10:30',
      name: 'ธนาวุฒิ อนุมัติไว (Admin)',
      email: 'thanawut.a@omodajaecoo.co.th',
      phone: '02-111-2233',
    },
  },
  {
    id: 2,
    docNo: 'AGE20260201v1',
    dealerCode: 'AGE',
    dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง',
    month: 'กุมภาพันธ์',
    year: '2569',
    status: 'Approved',
    totalBudget: 420000,
    leads: 280,
    bookings: 18,
    onlineData: [
      { activity: 'Post on Facebook', otherDetail: 'แคมเปญวาเลนไทน์ OMODA & JAECOO', date: '2026-02-05', location: 'Facebook Page' },
      { activity: 'Post on TikTok', otherDetail: 'คลิปทดลองขับ JAECOO 5 EV', date: '2026-02-14', location: 'TikTok' },
      { activity: 'Livestream', otherDetail: 'ไลฟ์สรุปผลงานเดือนมกราคม', date: '2026-02-20', location: 'TikTok / FB' },
      { activity: 'Post on Facebook', otherDetail: 'โปรโมชั่นปลายเดือนกุมภาพันธ์', date: '2026-02-25', location: 'Meta Ads' },
    ],
    offlineData: [
      { activity: 'Showroom event', otherDetail: 'งานวาเลนไทน์ที่โชว์รูม', date: '2026-02-07', location: 'Showroom Ram' },
      { activity: 'Roadshow', otherDetail: 'จัดแสดงที่ศูนย์การค้าพระราม 9', date: '2026-02-15', location: 'The Street Ratchada' },
      { activity: 'OJ Club', otherDetail: 'พบปะสมาชิกคลับ', date: '2026-02-22', location: 'Showroom Ram' },
      { activity: 'Other', otherDetail: 'กิจกรรมส่งท้ายเดือน', date: '2026-02-28', location: 'Showroom Ram' },
    ],
    onlineBudget: 220000,
    offlineBudget: 200000,
    approvalData: {
      date: '2026-02-03',
      time: '14:00',
      name: 'ธนาวุฒิ อนุมัติไว (Admin)',
      email: 'thanawut.a@omodajaecoo.co.th',
      phone: '02-111-2233',
    },
  },
  {
    id: 3,
    docNo: 'AGE20260304v2',
    dealerCode: 'AGE',
    dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง',
    month: 'มีนาคม',
    year: '2569',
    status: 'Pending',
    totalBudget: 380000,
    leads: 250,
    bookings: 15,
    onlineData: [
      { activity: 'Post on TikTok', otherDetail: 'ทำคอนเทนต์เปิดตัว JAECOO 6 EV', date: '2026-03-10', location: 'Social Media' },
      { activity: 'Post on Facebook', otherDetail: 'โปรโมทโปรโมชั่น JAECOO ประจำเดือน', date: '2026-03-15', location: 'Facebook' },
      { activity: '', otherDetail: '', date: '', location: '' },
      { activity: '', otherDetail: '', date: '', location: '' },
    ],
    offlineData: [
      { activity: 'Showroom event', otherDetail: 'คาราวานทดลองขับ JAECOO 6 EV รอบเมือง', date: '2026-03-05', location: 'ถนนสุขุมวิท' },
      { activity: 'Showroom event', otherDetail: 'ธีมแคมเปญฤดูฝน JAECOO', date: '2026-03-01', location: 'Showroom' },
      { activity: '', otherDetail: '', date: '', location: '' },
      { activity: '', otherDetail: '', date: '', location: '' },
    ],
    onlineBudget: 200000,
    offlineBudget: 180000,
  },
  {
    id: 4,
    docNo: 'AGE20260401v3',
    dealerCode: 'AGE',
    dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง',
    month: 'เมษายน',
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
    dealerCode: 'AGE',
    dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง',
    title: 'สื่อโฆษณา Facebook OMODA C5 EV',
    usage: 'โปรโมทแคมเปญเดือนมีนาคม',
    date: '2025-03-04',
    time: '09:15',
    status: 'Pending',
    files: [{ name: 'omoda_c5_front.jpg', url: IMAGE_URLS[0] }],
  },
  {
    id: 102,
    dealerCode: 'AGE',
    dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง',
    title: 'ภาพกราฟิกงาน Roadshow',
    usage: 'ภาพบรรยากาศงานโชว์รูม',
    date: '2025-03-01',
    time: '08:00',
    status: 'Approved',
    files: [{ name: 'jaecoo_event_1.jpg', url: IMAGE_URLS[2] }],
    approvalData: {
      date: '2025-03-02',
      time: '14:20',
      name: 'ศิริมา อนุมัติเก่ง (Marketing Admin)',
      email: 'sirima.k@omodajaecoo.co.th',
      phone: '02-999-8877',
    },
  },
  {
    id: 103,
    dealerCode: 'AGE',
    dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง',
    title: 'แคมเปญ JAECOO 7 PHEV',
    usage: 'แจ้งโปรโมชั่นประจำไตรมาส',
    date: '2025-02-25',
    time: '11:45',
    status: 'Rejected',
    files: [{ name: 'jaecoo_7_profile.png', url: IMAGE_URLS[4] }],
    rejectReason:
      'องค์ประกอบของภาพไม่เป็นไปตาม Corporate Identity (CI) ล่าสุด กรุณาปรับปรุงโทนสีและ Layout ให้ทันสมัยขึ้น',
    rejectData: {
      date: '2025-02-26',
      name: 'ระวีวรรณ ตรวจละเอียด (Content QC)',
      email: 'raweewan.t@omodajaecoo.co.th',
      phone: '02-555-4433',
    },
  },
  {
    id: 104,
    dealerCode: 'AGE',
    dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง',
    title: 'ชุดภาพโปรโมท JAECOO 6 (ร่าง)',
    usage: 'เตรียมสื่อสำหรับเปิดสาขาใหม่ไตรมาส 3',
    date: '2025-03-04',
    status: 'Draft',
    files: [
      { name: 'jaecoo_6_draft.jpg', url: IMAGE_URLS[5] },
      { name: 'omoda_interior.jpg', url: IMAGE_URLS[1] },
    ],
  },
];

const CLAIM_TYPE_OPTIONS = ['Space rental', 'POS production', 'Customer giveaway'];

const defaultBookingRow = () => ({ leadsOffline: 0, testDrive: 0, bookingPlus2wd: 0, bookingUltimate4wd: 0, bookingOther: 0 });

const MOCK_REPORT_CLAIMS = [
  {
    id: 200,
    docNo: 'RPT-AGE-2025-012',
    dealerCode: 'AGE',
    dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง',
    planDocNo: 'AGE20251201v1',
    month: 'ธันวาคม',
    year: '2568',
    status: 'Approved',
    date: '2025-12-31',
    onlineActivityType: 'Post on Facebook',
    onlineRows: [
      { url: 'https://facebook.com/post/dec', impression: '25000', leads: '55' },
      { url: 'https://meta.business/ads/dec', impression: '18000', leads: '48' },
    ],
    offlineActivityType: 'Roadshow',
    offlineFiles: [
      { name: 'roadshow_dec_1.jpg', url: IMAGE_URLS_REPORT[0] },
      { name: 'roadshow_dec_2.jpg', url: IMAGE_URLS_REPORT[1] },
    ],
    onlineActualBudget: 200000,
    offlineActualBudget: 165000,
    claimRows: [
      { activityType: 'offline', claimType: 'Space rental', detail: 'ค่าเช่าพื้นที่ส่งท้ายปี', price: '80000', receiptFile: { name: 'receipt_dec_1.jpg', url: IMAGE_URLS_REPORT[0] } },
      { activityType: 'offline', claimType: 'Customer giveaway', detail: 'ของแจกผู้เข้าร่วมงาน', price: '35000', receiptFile: { name: 'receipt_dec_2.jpg', url: IMAGE_URLS_REPORT[1] } },
    ],
    bookingResult: [
      { leadsOffline: 38, testDrive: 5, bookingPlus2wd: 1, bookingUltimate4wd: 0, bookingOther: 0 },
      { leadsOffline: 32, testDrive: 4, bookingPlus2wd: 0, bookingUltimate4wd: 1, bookingOther: 0 },
      { leadsOffline: 28, testDrive: 3, bookingPlus2wd: 0, bookingUltimate4wd: 0, bookingOther: 1 },
      { leadsOffline: 25, testDrive: 2, bookingPlus2wd: 1, bookingUltimate4wd: 0, bookingOther: 0 },
    ],
    approvalData: {
      date: '2026-01-05',
      time: '14:00',
      name: 'ธนาวุฒิ อนุมัติไว (Admin)',
      email: 'thanawut.a@omodajaecoo.co.th',
      phone: '02-111-2233',
    },
  },
  {
    id: 201,
    docNo: 'RPT-AGE-2026-001',
    dealerCode: 'AGE',
    dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง',
    planDocNo: 'AGE20260115v1',
    month: 'มกราคม',
    year: '2569',
    status: 'Approved',
    date: '2026-01-31',
    onlineActivityType: 'Post on Facebook',
    onlineRows: [
      { url: 'https://facebook.com/post/xxx', impression: '45000', leads: '120' },
      { url: 'https://meta.business/ads/yyy', impression: '28000', leads: '95' },
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
    bookingResult: [
      { leadsOffline: 85, testDrive: 12, bookingPlus2wd: 4, bookingUltimate4wd: 3, bookingOther: 2 },
      { leadsOffline: 72, testDrive: 8, bookingPlus2wd: 2, bookingUltimate4wd: 1, bookingOther: 0 },
      { leadsOffline: 68, testDrive: 6, bookingPlus2wd: 1, bookingUltimate4wd: 2, bookingOther: 1 },
      { leadsOffline: 65, testDrive: 5, bookingPlus2wd: 2, bookingUltimate4wd: 0, bookingOther: 2 },
    ],
    approvalData: {
      date: '2026-02-05',
      time: '16:00',
      name: 'ธนาวุฒิ อนุมัติไว (Admin)',
      email: 'thanawut.a@omodajaecoo.co.th',
      phone: '02-111-2233',
    },
  },
  {
    id: 202,
    docNo: 'RPT-AGE-2026-002',
    dealerCode: 'AGE',
    dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง',
    planDocNo: 'AGE20260201v1',
    month: 'กุมภาพันธ์',
    year: '2569',
    status: 'Pending',
    date: '2026-02-28',
    time: '13:30',
    onlineActivityType: 'Post on TikTok',
    onlineRows: [
      { url: 'https://tiktok.com/@xxx', impression: '5000', leads: '12' },
      { url: 'https://tiktok.com/@yyy', impression: '3200', leads: '8' },
    ],
    offlineActivityType: 'Event at Mall',
    offlineFiles: [
      { name: 'event_mall_1.jpg', url: IMAGE_URLS_REPORT[0] },
      { name: 'event_mall_2.jpg', url: IMAGE_URLS_REPORT[1] },
    ],
    onlineActualBudget: 45000,
    offlineActualBudget: 120000,
    claimRows: [
      { activityType: 'offline', claimType: 'Space rental', detail: 'ค่าเช่าพื้นที่ศูนย์การค้า', price: '75000', receiptFile: { name: 'receipt_mall.jpg', url: IMAGE_URLS_REPORT[2] } },
      { activityType: 'offline', claimType: 'POS production', detail: 'บัตร stand พร้อมของแจก', price: '25000', receiptFile: { name: 'receipt_pos.jpg', url: IMAGE_URLS_REPORT[3] } },
      { activityType: 'online', claimType: '', detail: '', price: '', receiptFile: null },
    ],
    bookingResult: [
      { leadsOffline: 14, testDrive: 6, bookingPlus2wd: 1, bookingUltimate4wd: 1, bookingOther: 0 },
      { leadsOffline: 10, testDrive: 4, bookingPlus2wd: 2, bookingUltimate4wd: 0, bookingOther: 0 },
      { leadsOffline: 8, testDrive: 3, bookingPlus2wd: 0, bookingUltimate4wd: 1, bookingOther: 1 },
      { leadsOffline: 6, testDrive: 2, bookingPlus2wd: 1, bookingUltimate4wd: 0, bookingOther: 0 },
    ],
  },
  {
    id: 203,
    docNo: 'RPT-AGE-2026-003',
    dealerCode: 'AGE',
    dealerName: 'โอโมดา แอนด์ เจคู เอจีอี ออโต้ แกลเลอรี่ สาขารามคำแหง',
    planDocNo: null,
    month: 'มีนาคม',
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
    bookingResult: VEHICLE_MODELS.map(() => defaultBookingRow()),
  },
];

// --- Action Activity (KPI Plan vs Report) ---
const getReportTotals = (report) => {
  if (!report) return { leadsActual: 0, bookingActual: 0 };
  const onlineLeads = (report.onlineRows || []).reduce((s, r) => s + (Number(r.leads) || 0), 0);
  const bookingResult = report.bookingResult || [];
  const leadsOffline = bookingResult.reduce((s, r) => s + (Number(r.leadsOffline) || 0), 0);
  const leadsActual = onlineLeads + leadsOffline;
  const bookingActual = bookingResult.reduce(
    (s, r) =>
      s +
      (Number(r.bookingPlus2wd) || 0) +
      (Number(r.bookingUltimate4wd) || 0) +
      (Number(r.bookingOther) || 0),
    0
  );
  return { leadsActual, bookingActual };
};

const buildActivityList = (plans, reports) => {
  const submitted = (reports || []).filter((r) => r.planDocNo && r.status === 'Approved');
  return submitted
    .map((report) => {
      const plan = (plans || []).find((p) => p.docNo === report.planDocNo);
      if (!plan) return null;
      const { leadsActual, bookingActual } = getReportTotals(report);
      const leadsTarget = Number(plan.leads) || 0;
      const bookingTarget = Number(plan.bookings) || 0;
      const leadPass = leadsActual >= leadsTarget;
      const bookingPass = bookingActual >= bookingTarget;
      const overallPass = leadPass && bookingPass;
      return {
        plan,
        report,
        leadsTarget,
        leadsActual,
        bookingTarget,
        bookingActual,
        leadPass,
        bookingPass,
        overallPass,
      };
    })
    .filter(Boolean);
};

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
      className={`inline-flex items-center justify-center font-bold border uppercase whitespace-nowrap ${large ? 'min-w-[6.25rem] px-2 py-1 text-xs' : 'min-w-[5.5rem] px-2 py-0.5 text-[9px]'} ${styles[status] || 'bg-slate-50'}`}
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

const MonthlyPlanFormView = ({ onBack, initialPlan = null, isAdmin = false }) => {
  const isEditMode = !!initialPlan;
  const isApproved = initialPlan?.status === 'Approved';
  const isPending = initialPlan?.status === 'Pending';
  const isReadOnly = isApproved || isPending || isAdmin;

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
              <option value="2568">2568</option>
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

      {(isApproved || isPending || isAdmin) && (
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 flex items-center gap-3 shadow-sm rounded-sm font-sans font-black">
          <Lock className="text-emerald-600" size={18} />
          <p className="text-xs font-bold text-emerald-800 uppercase tracking-tight">
            {isAdmin ? 'Read-Only: โหมด Admin — ไม่สามารถแก้ไขข้อมูลได้' : isPending ? 'Read-Only: แผนงานที่รออนุมัติไม่สามารถแก้ไขได้' : 'Read-Only: แผนงานที่อนุมัติแล้วไม่สามารถแก้ไขได้'}
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
          {isAdmin ? 'ยกเลิก' : isReadOnly ? 'ปิดหน้าต่าง' : 'ยกเลิก'}
        </button>
        {isAdmin && initialPlan && initialPlan.status !== 'Approved' && (
          <button
            onClick={onBack}
            className="px-10 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase flex items-center gap-2 shadow-md transition-all active:scale-95 rounded-sm"
          >
            <CheckCircle2 size={18} /> Approved
          </button>
        )}
        {!isReadOnly && !isAdmin && (
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

const readFileAsDataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const ContentFormView = ({ onBack, onPreviewImage, initialReq = null, isAdmin = false, onApprove, onReject }) => {
  const isEditMode = !!initialReq;
  const isDraft = initialReq?.status === 'Draft';
  const isReadOnly = (initialReq && initialReq.status !== 'Draft') || isAdmin;
  const isRejected = initialReq?.status === 'Rejected';
  const isPending = initialReq?.status === 'Pending';

  const [uploadedFiles, setUploadedFiles] = useState(initialReq?.files ? [...initialReq.files] : []);
  const [rejectReasonText, setRejectReasonText] = useState('');
  const fileInputRef = useRef(null);

  const acceptTypes = 'image/png,image/jpeg,image/jpg';
  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || []).filter(
      (f) => f.type === 'image/png' || f.type === 'image/jpeg' || f.type === 'image/jpg'
    );
    const newEntries = await Promise.all(
      files.map(async (f) => ({ name: f.name, url: await readFileAsDataURL(f) }))
    );
    setUploadedFiles((p) => [...p, ...newEntries]);
  };

  const onUploadZoneClick = () => fileInputRef.current?.click();
  const onFileInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = '';
  };
  const onUploadZoneDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-50');
    handleFiles(e.dataTransfer?.files);
  };
  const onUploadZoneDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-indigo-500', 'bg-indigo-50');
  };
  const onUploadZoneDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-50');
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

      {isReadOnly && !isAdmin && (isPending || initialReq?.status === 'Approved') && (
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 flex items-center gap-3 shadow-sm rounded-sm font-sans font-black">
          <Lock className="text-emerald-600" size={18} />
          <p className="text-xs font-bold text-emerald-800 uppercase tracking-tight">
            {isPending ? 'Read-Only: คำขอที่รออนุมัติไม่สามารถแก้ไขได้' : 'Read-Only: คำขอที่อนุมัติแล้วไม่สามารถแก้ไขได้'}
          </p>
        </div>
      )}

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
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptTypes}
            multiple
            className="hidden"
            onChange={onFileInputChange}
          />
          {uploadedFiles.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {uploadedFiles.map((f, i) => (
                <div key={i} className="border border-slate-200 group/card relative bg-white rounded-sm overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                      <button
                        type="button"
                        onClick={() => onPreviewImage(f)}
                        className="p-2 bg-white/90 hover:bg-white rounded-full text-indigo-600 shadow-lg transition-all hover:scale-110"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      {(!initialReq || isDraft) && (
                        <button
                          type="button"
                          onClick={() => setUploadedFiles((p) => p.filter((_, ix) => ix !== i))}
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
            <div
              role="button"
              tabIndex={0}
              onClick={onUploadZoneClick}
              onDrop={onUploadZoneDrop}
              onDragOver={onUploadZoneDragOver}
              onDragLeave={onUploadZoneDragLeave}
              className="border-2 border-dashed border-slate-400 bg-slate-50 p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer transition-all rounded-sm font-sans font-black"
            >
              <ImageIcon size={32} className="mb-2 opacity-50 font-sans" />
              <p className="text-xs font-bold uppercase tracking-tight">Drag & Drop Image Files or Click to Upload</p>
              <p className="text-[10px] mt-1 text-rose-500 font-black uppercase">เฉพาะไฟล์ .png และ .jpg เท่านั้น</p>
            </div>
          )}
        </div>
      </section>

      {isAdmin && isPending && (
        <section className="bg-white border border-slate-300 overflow-hidden rounded-sm font-sans font-black">
          <div className="bg-rose-600 px-5 py-2 flex items-center gap-2.5 text-white font-black font-sans">
            <AlertCircle size={16} />
            <h3 className="text-[11px] uppercase tracking-tight font-sans">เหตุผลการปฏิเสธ (กรณี Rejected)</h3>
          </div>
          <div className="p-5">
            <textarea
              value={rejectReasonText}
              onChange={(e) => setRejectReasonText(e.target.value)}
              placeholder="กรอกเหตุผลการไม่อนุมัติ..."
              className="w-full border-2 border-slate-300 rounded-sm px-3 py-2 text-sm font-bold min-h-[80px] focus:border-rose-500 outline-none"
              rows={3}
            />
          </div>
        </section>
      )}

      <div className="flex justify-end gap-3 pt-4 font-sans font-black">
        <button
          onClick={onBack}
          className="px-10 py-2.5 border border-slate-300 bg-white hover:bg-slate-100 text-slate-500 font-bold text-xs uppercase transition-all rounded-sm"
        >
          {isAdmin ? 'ยกเลิก' : isReadOnly ? 'ปิดหน้าต่าง' : 'ยกเลิก'}
        </button>
        {isAdmin && isPending && (
          <>
            <button
              type="button"
              onClick={() => onReject?.(rejectReasonText)}
              className="px-10 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase flex items-center gap-2 shadow-md rounded-sm"
            >
              <UserX size={18} /> Rejected
            </button>
            <button
              type="button"
              onClick={() => onApprove?.()}
              className="px-10 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase flex items-center gap-2 shadow-md rounded-sm"
            >
              <CheckCircle2 size={18} /> Approved
            </button>
          </>
        )}
        {!isReadOnly && !isAdmin && (
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

const LISTING_PER_PAGE = 10;

const MonthlyListingView = ({ plans = [], onCreateNew, onOpenDetail, showDealerColumn = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const list = Array.isArray(plans) ? plans : [];
  const totalPages = Math.max(1, Math.ceil(list.length / LISTING_PER_PAGE));
  const page = Math.min(Math.max(1, currentPage), totalPages);
  const start = (page - 1) * LISTING_PER_PAGE;
  const paginated = list.slice(start, start + LISTING_PER_PAGE);
  const goToPage = (p) => setCurrentPage(Math.max(1, Math.min(p, totalPages)));

  return (
    <div className="space-y-4 animate-in fade-in duration-300 font-sans font-black">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight font-sans">Monthly Marketing Plans</h2>
        {!showDealerColumn && (
          <button
            onClick={onCreateNew}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-4 py-2 font-bold text-sm shadow-sm transition-all active:scale-95 rounded-sm"
          >
            <Plus size={18} /> สร้างแผนงานใหม่
          </button>
        )}
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
                {showDealerColumn && (
                  <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans min-w-[12rem]">Dealer Code / Name</th>
                )}
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
              {paginated.map((plan) => (
                <tr
                  key={plan.id}
                  className="hover:bg-slate-50 transition-colors group cursor-pointer font-sans font-black"
                  onClick={() => onOpenDetail(plan)}
                >
                  {showDealerColumn && (
                    <td className="px-5 py-2.5 font-bold text-slate-700">
                      <span className="font-black text-indigo-600">{plan.dealerCode || '—'}</span>
                      <span className="text-slate-400 mx-1">/</span>
                      <span className="text-slate-800">{plan.dealerName || '—'}</span>
                    </td>
                  )}
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
        {list.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-t border-slate-200 bg-slate-50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">
              แสดง {start + 1}–{start + paginated.length} จาก {list.length} รายการ (หน้า {page}/{totalPages})
            </span>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1}
                  className="p-2 rounded-sm border border-slate-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 font-black"
                  aria-label="หน้าก่อน"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2))
                  .reduce((acc, p, i, arr) => {
                    if (i > 0 && arr[i - 1] !== p - 1) acc.push('…');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === '…' ? (
                      <span key={`mp-ellip-${i}`} className="px-2 text-slate-400 font-bold">
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => goToPage(p)}
                        className={`min-w-[2rem] py-1.5 px-2 rounded-sm border text-xs font-black ${
                          p === page
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= totalPages}
                  className="p-2 rounded-sm border border-slate-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 font-black"
                  aria-label="หน้าถัดไป"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ContentListingView = ({ requests = [], onCreateNew, onOpenDetail, showDealerColumn = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const list = Array.isArray(requests) ? requests : [];
  const totalPages = Math.max(1, Math.ceil(list.length / LISTING_PER_PAGE));
  const page = Math.min(Math.max(1, currentPage), totalPages);
  const start = (page - 1) * LISTING_PER_PAGE;
  const paginated = list.slice(start, start + LISTING_PER_PAGE);
  const goToPage = (p) => setCurrentPage(Math.max(1, Math.min(p, totalPages)));

  return (
    <div className="space-y-4 animate-in fade-in duration-300 font-sans font-black">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-sans font-black">
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight font-sans">Content Approval Listing</h2>
        {!showDealerColumn && (
          <button
            onClick={onCreateNew}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-4 py-2 font-bold text-sm shadow-sm transition-all active:scale-95 rounded-sm"
          >
            <Plus size={18} /> สร้างคำขอใหม่
          </button>
        )}
      </div>
      <div className="bg-white border border-slate-300 overflow-hidden shadow-sm rounded-sm font-sans font-black">
        <table className="w-full text-left text-sm font-sans font-black">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 text-[11px] font-sans font-black">
              {showDealerColumn && (
                <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans min-w-[12rem]">Dealer Code / Name</th>
              )}
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">หัวข้อการขออนุมัติ</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight text-center font-sans">วันที่ส่ง</th>
              <th className="px-5 py-2.5 font-black text-center text-slate-500 tracking-tight font-sans">จำนวนไฟล์ภาพ</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">สถานะ</th>
              <th className="px-5 py-2.5 font-sans"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {paginated.map((req) => (
              <tr
                key={req.id}
                className="hover:bg-slate-50 transition-colors group cursor-pointer font-sans font-black"
                onClick={() => onOpenDetail(req)}
              >
                {showDealerColumn && (
                  <td className="px-5 py-2.5 font-bold text-slate-700">
                    <span className="font-black text-indigo-600">{req.dealerCode || '—'}</span>
                    <span className="text-slate-400 mx-1">/</span>
                    <span className="text-slate-800">{req.dealerName || '—'}</span>
                  </td>
                )}
                <td className="px-5 py-2.5 font-bold text-slate-700 tracking-tight">{req.title}</td>
                <td className="px-5 py-2.5 text-slate-500 text-center">{req.date}</td>
                <td className="px-5 py-2.5 text-slate-600 text-center font-bold tracking-tight">{req.files?.length ?? 0}</td>
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
        {list.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-t border-slate-200 bg-slate-50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">
              แสดง {start + 1}–{start + paginated.length} จาก {list.length} รายการ (หน้า {page}/{totalPages})
            </span>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1}
                  className="p-2 rounded-sm border border-slate-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 font-black"
                  aria-label="หน้าก่อน"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2))
                  .reduce((acc, p, i, arr) => {
                    if (i > 0 && arr[i - 1] !== p - 1) acc.push('…');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === '…' ? (
                      <span key={`ct-ellip-${i}`} className="px-2 text-slate-400 font-bold">
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => goToPage(p)}
                        className={`min-w-[2rem] py-1.5 px-2 rounded-sm border text-xs font-black ${
                          p === page
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= totalPages}
                  className="p-2 rounded-sm border border-slate-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 font-black"
                  aria-label="หน้าถัดไป"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Dealer Management (Admin) ---
const DEALER_PAGE_SIZE = 10;

const DealerManagementView = ({ dealers = [], onAddDealer, onEditDealer }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const list = Array.isArray(dealers) ? dealers : [];
  const filtered = list.filter(
    (d) =>
      (d.dealerName || '').toLowerCase().includes(search.toLowerCase()) ||
      (d.dealerCode || '').toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / DEALER_PAGE_SIZE));
  const page = Math.min(Math.max(1, currentPage), totalPages);
  const start = (page - 1) * DEALER_PAGE_SIZE;
  const paginated = filtered.slice(start, start + DEALER_PAGE_SIZE);

  const goToPage = (p) => setCurrentPage(Math.max(1, Math.min(p, totalPages)));

  return (
    <div className="space-y-4 animate-in fade-in duration-300 font-sans font-black">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight font-sans">Dealer Management</h2>
        {onAddDealer && (
          <button
            type="button"
            onClick={onAddDealer}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-4 py-2 font-bold text-sm shadow-sm transition-all active:scale-95 rounded-sm"
          >
            <Plus size={18} /> เพิ่ม Dealer
          </button>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          type="text"
          placeholder="ค้นหา Dealer name หรือ Code..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 max-w-xs border-2 border-slate-300 rounded-sm px-3 py-2 text-sm font-bold focus:border-indigo-500 outline-none"
        />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">
          ทั้งหมด {filtered.length} รายการ
        </span>
      </div>
      <div className="bg-white border border-slate-300 overflow-hidden shadow-sm rounded-sm font-sans font-black">
        <table className="w-full text-left text-sm font-sans font-black">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 text-[11px]">
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans w-24">ลำดับ</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">Dealer Name</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans w-32">Dealer Code</th>
              {onEditDealer && <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans w-20 text-center">จัดการ</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {paginated.map((d, idx) => (
              <tr key={d.id} className="hover:bg-slate-50 transition-colors font-sans font-black">
                <td className="px-5 py-2.5 font-bold text-slate-500 tabular-nums">{start + idx + 1}</td>
                <td className="px-5 py-2.5 font-bold text-slate-800">{d.dealerName || '—'}</td>
                <td className="px-5 py-2.5 font-black text-indigo-600 tracking-tight">{d.dealerCode || '—'}</td>
                {onEditDealer && (
                  <td className="px-5 py-2.5 text-center">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onEditDealer(d); }}
                      className="inline-flex items-center justify-center gap-1 px-2 py-1.5 border border-slate-300 bg-white hover:bg-indigo-50 hover:border-indigo-300 text-slate-600 hover:text-indigo-700 font-bold text-xs rounded-sm transition-colors"
                      title="แก้ไข"
                    >
                      <FileEdit size={14} /> แก้ไข
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-t border-slate-200 bg-slate-50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">
              แสดง {start + 1}–{start + paginated.length} จาก {filtered.length} รายการ (หน้า {page}/{totalPages})
            </span>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1}
                  className="p-2 rounded-sm border border-slate-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 font-black"
                  aria-label="หน้าก่อน"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2))
                  .reduce((acc, p, i, arr) => {
                    if (i > 0 && arr[i - 1] !== p - 1) acc.push('…');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === '…' ? (
                      <span key={`ellip-${i}`} className="px-2 text-slate-400 font-bold">…</span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => goToPage(p)}
                        className={`min-w-[2rem] py-1.5 px-2 rounded-sm border text-xs font-black ${
                          p === page
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= totalPages}
                  className="p-2 rounded-sm border border-slate-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 font-black"
                  aria-label="หน้าถัดไป"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- User Management (Admin) ---
const USER_PAGE_SIZE = 10;

const UserManagementView = ({ users = [], onAddUser, onEditUser }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const list = Array.isArray(users) ? users : [];
  const filtered = list.filter(
    (u) =>
      (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.phone || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.role || '').toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / USER_PAGE_SIZE));
  const page = Math.min(Math.max(1, currentPage), totalPages);
  const start = (page - 1) * USER_PAGE_SIZE;
  const paginated = filtered.slice(start, start + USER_PAGE_SIZE);

  const goToPage = (p) => setCurrentPage(Math.max(1, Math.min(p, totalPages)));

  return (
    <div className="space-y-4 animate-in fade-in duration-300 font-sans font-black">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight font-sans">User Management</h2>
        {onAddUser && (
          <button
            type="button"
            onClick={onAddUser}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-4 py-2 font-bold text-sm shadow-sm transition-all active:scale-95 rounded-sm"
          >
            <Plus size={18} /> เพิ่ม User
          </button>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          type="text"
          placeholder="ค้นหา Name, Email, Phone, Role..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 max-w-xs border-2 border-slate-300 rounded-sm px-3 py-2 text-sm font-bold focus:border-indigo-500 outline-none"
        />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">
          ทั้งหมด {filtered.length} รายการ
        </span>
      </div>
      <div className="bg-white border border-slate-300 overflow-hidden shadow-sm rounded-sm font-sans font-black">
        <table className="w-full text-left text-sm font-sans font-black">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 text-[11px]">
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans w-24">ลำดับ</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">Name</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">Email</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans w-32">Phone</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans w-24">Role</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">Dealer (Code / Name)</th>
              {onEditUser && <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans w-20 text-center">จัดการ</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {paginated.map((u, idx) => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors font-sans font-black">
                <td className="px-5 py-2.5 font-bold text-slate-500 tabular-nums">{start + idx + 1}</td>
                <td className="px-5 py-2.5 font-bold text-slate-800">{u.name || '—'}</td>
                <td className="px-5 py-2.5 font-bold text-slate-700">{u.email || '—'}</td>
                <td className="px-5 py-2.5 font-bold text-slate-700">{u.phone || '—'}</td>
                <td className="px-5 py-2.5">
                  <span
                    className={`inline-flex px-2 py-0.5 text-[10px] font-black uppercase rounded-sm ${
                      u.role === 'admin' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}
                  >
                    {u.role === 'admin' ? 'Admin' : 'Dealer'}
                  </span>
                </td>
                <td className="px-5 py-2.5 font-bold text-slate-700 text-[11px]">
                  {u.role === 'dealer' ? (u.dealerCode || '') + (u.dealerName ? ` / ${u.dealerName}` : '') || '—' : '—'}
                </td>
                {onEditUser && (
                  <td className="px-5 py-2.5 text-center">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); onEditUser(u); }}
                      className="inline-flex items-center justify-center gap-1 px-2 py-1.5 border border-slate-300 bg-white hover:bg-indigo-50 hover:border-indigo-300 text-slate-600 hover:text-indigo-700 font-bold text-xs rounded-sm transition-colors"
                      title="แก้ไข"
                    >
                      <FileEdit size={14} /> แก้ไข
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-t border-slate-200 bg-slate-50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">
              แสดง {start + 1}–{start + paginated.length} จาก {filtered.length} รายการ (หน้า {page}/{totalPages})
            </span>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1}
                  className="p-2 rounded-sm border border-slate-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 font-black"
                  aria-label="หน้าก่อน"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2))
                  .reduce((acc, p, i, arr) => {
                    if (i > 0 && arr[i - 1] !== p - 1) acc.push('…');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === '…' ? (
                      <span key={`u-ellip-${i}`} className="px-2 text-slate-400 font-bold">…</span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => goToPage(p)}
                        className={`min-w-[2rem] py-1.5 px-2 rounded-sm border text-xs font-black ${
                          p === page ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= totalPages}
                  className="p-2 rounded-sm border border-slate-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 font-black"
                  aria-label="หน้าถัดไป"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Report & Claim ---
const ReportClaimListingView = ({ reports = [], onCreateNew, onOpenDetail, showDealerColumn = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const list = Array.isArray(reports) ? reports : [];
  const totalPages = Math.max(1, Math.ceil(list.length / LISTING_PER_PAGE));
  const page = Math.min(Math.max(1, currentPage), totalPages);
  const start = (page - 1) * LISTING_PER_PAGE;
  const paginated = list.slice(start, start + LISTING_PER_PAGE);
  const goToPage = (p) => setCurrentPage(Math.max(1, Math.min(p, totalPages)));

  return (
    <div className="space-y-4 animate-in fade-in duration-300 font-sans font-black">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight font-sans">Report & Claim</h2>
        {!showDealerColumn && (
          <button
            onClick={onCreateNew}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-4 py-2 font-bold text-sm shadow-sm transition-all active:scale-95 rounded-sm"
          >
            <Plus size={18} /> สร้างรายงานใหม่
          </button>
        )}
      </div>
      <div className="bg-white border border-slate-300 overflow-hidden shadow-sm rounded-sm font-sans font-black">
        <table className="w-full text-left text-sm font-sans font-black">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 text-[11px]">
              {showDealerColumn && (
                <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">Dealer Code / Name</th>
              )}
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">Doc No.</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">อ้างอิงแผน</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">เดือน/ปี</th>
              <th className="px-5 py-2.5 font-black text-center text-slate-500 tracking-tight font-sans">สถานะ</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 tracking-tight font-sans">งบใช้จริง</th>
              <th className="px-5 py-2.5 font-sans"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {paginated.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-slate-50 transition-colors group cursor-pointer font-sans font-black"
                onClick={() => onOpenDetail(r)}
              >
                {showDealerColumn && (
                  <td className="px-5 py-2.5 font-bold text-slate-700">
                    {r.dealerCode || ''} / {r.dealerName || '-'}
                  </td>
                )}
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
        {list.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-t border-slate-200 bg-slate-50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">
              แสดง {start + 1}–{start + paginated.length} จาก {list.length} รายการ (หน้า {page}/{totalPages})
            </span>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1}
                  className="p-2 rounded-sm border border-slate-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 font-black"
                  aria-label="หน้าก่อน"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2))
                  .reduce((acc, p, i, arr) => {
                    if (i > 0 && arr[i - 1] !== p - 1) acc.push('…');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === '…' ? (
                      <span key={`rp-ellip-${i}`} className="px-2 text-slate-400 font-bold">
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => goToPage(p)}
                        className={`min-w-[2rem] py-1.5 px-2 rounded-sm border text-xs font-black ${
                          p === page
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= totalPages}
                  className="p-2 rounded-sm border border-slate-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 font-black"
                  aria-label="หน้าถัดไป"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ReportClaimFormView = ({ onBack, onPreviewImage, plans, initialReport = null, isAdmin = false, onApprove }) => {
  const isEditMode = !!initialReport;
  const isApproved = initialReport?.status === 'Approved';
  const isPending = initialReport?.status === 'Pending';
  const isReadOnly = isApproved || isPending || isAdmin;

  const [planDocNo, setPlanDocNo] = useState(initialReport?.planDocNo || '');
  const [onlineActivityType, setOnlineActivityType] = useState(initialReport?.onlineActivityType || '');
  const [onlineRows, setOnlineRows] = useState(
    initialReport?.onlineRows || [{ url: '', impression: '', leads: '' }]
  );
  const [offlineActivityType, setOfflineActivityType] = useState(initialReport?.offlineActivityType || '');
  const [offlineFiles, setOfflineFiles] = useState(initialReport?.offlineFiles || []);
  const [uploadingForClaimRow, setUploadingForClaimRow] = useState(null);
  const offlineFileInputRef = useRef(null);
  const receiptFileInputRef = useRef(null);
  const [actualBudgetUsed, setActualBudgetUsed] = useState(
    initialReport
      ? (Number(initialReport.onlineActualBudget) || 0) + (Number(initialReport.offlineActualBudget) || 0)
      : 0
  );
  const [claimRows, setClaimRows] = useState(
    initialReport?.claimRows || [{ activityType: 'online', claimType: '', detail: '', price: '', receiptFile: null }]
  );

  const defaultBookingRow = () => ({ leadsOffline: 0, testDrive: 0, bookingPlus2wd: 0, bookingUltimate4wd: 0, bookingOther: 0 });
  const [bookingResult, setBookingResult] = useState(
    initialReport?.bookingResult || VEHICLE_MODELS.map(() => defaultBookingRow())
  );

  const updateBookingResult = (modelIdx, field, value) => {
    setBookingResult((p) => {
      const next = [...p];
      next[modelIdx] = { ...next[modelIdx], [field]: Number(value) || 0 };
      return next;
    });
  };

  const bookingTotals = bookingResult.reduce(
    (acc, row) => ({
      leadsOffline: acc.leadsOffline + (row.leadsOffline || 0),
      testDrive: acc.testDrive + (row.testDrive || 0),
      bookingPlus2wd: acc.bookingPlus2wd + (row.bookingPlus2wd || 0),
      bookingUltimate4wd: acc.bookingUltimate4wd + (row.bookingUltimate4wd || 0),
      bookingOther: acc.bookingOther + (row.bookingOther || 0),
    }),
    { leadsOffline: 0, testDrive: 0, bookingPlus2wd: 0, bookingUltimate4wd: 0, bookingOther: 0 }
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

  const handleOfflineFiles = async (fileList) => {
    const files = Array.from(fileList || []).filter(
      (f) => f.type === 'image/png' || f.type === 'image/jpeg' || f.type === 'image/jpg'
    );
    const newEntries = await Promise.all(
      files.map(async (f) => ({ name: f.name, url: await readFileAsDataURL(f) }))
    );
    setOfflineFiles((p) => [...p, ...newEntries]);
  };
  const onOfflineUploadClick = () => offlineFileInputRef.current?.click();
  const onOfflineFileChange = (e) => {
    handleOfflineFiles(e.target.files);
    e.target.value = '';
  };
  const onOfflineDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-50');
    handleOfflineFiles(e.dataTransfer?.files);
  };
  const onOfflineDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-indigo-500', 'bg-indigo-50');
  };
  const onOfflineDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-50');
  };

  const onReceiptUploadClick = (idx) => {
    setUploadingForClaimRow(idx);
    receiptFileInputRef.current?.click();
  };
  const onReceiptFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (uploadingForClaimRow === null || !file) {
      setUploadingForClaimRow(null);
      return;
    }
    if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
      setUploadingForClaimRow(null);
      return;
    }
    const url = await readFileAsDataURL(file);
    updateClaimRow(uploadingForClaimRow, 'receiptFile', { name: file.name, url });
    setUploadingForClaimRow(null);
  };
  const onReceiptDrop = (e, idx) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-50');
    const file = e.dataTransfer?.files?.[0];
    if (!file || (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg')) return;
    readFileAsDataURL(file).then((url) => updateClaimRow(idx, 'receiptFile', { name: file.name, url }));
  };
  const onReceiptDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-indigo-500', 'bg-indigo-50');
  };
  const onReceiptDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-50');
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

      {(isApproved || isPending || isAdmin) && (
        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 flex items-center gap-3 shadow-sm rounded-sm font-sans font-black">
          <Lock className="text-emerald-600" size={18} />
          <p className="text-xs font-bold text-emerald-800 uppercase tracking-tight">
            {isAdmin ? 'Read-Only: โหมด Admin — ไม่สามารถแก้ไขข้อมูลได้' : isPending ? 'Read-Only: รายงานที่รออนุมัติไม่สามารถแก้ไขได้' : 'Read-Only: รายงานที่อนุมัติแล้วไม่สามารถแก้ไขได้'}
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
            <input
              ref={offlineFileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              multiple
              className="hidden"
              onChange={onOfflineFileChange}
            />
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
              <div
                role="button"
                tabIndex={0}
                onClick={onOfflineUploadClick}
                onDrop={onOfflineDrop}
                onDragOver={onOfflineDragOver}
                onDragLeave={onOfflineDragLeave}
                className="border-2 border-dashed border-slate-400 bg-slate-50 p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer transition-all rounded-sm font-sans font-black"
              >
                <ImageIcon size={32} className="mb-2 opacity-50" />
                <p className="text-xs font-bold uppercase tracking-tight">Drag & Drop หรือ Click เพื่อ Upload รูปกิจกรรม</p>
                <p className="text-[10px] mt-1 text-rose-500 font-black uppercase">เฉพาะไฟล์ .png และ .jpg</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white border border-slate-300 overflow-hidden shadow-sm rounded-sm font-sans font-black">
        <div className="bg-indigo-700 px-5 py-2 flex items-center gap-2 text-white font-black font-sans">
          <BarChart3 size={16} />
          <h3 className="text-[11px] uppercase tracking-tight">Booking Resul</h3>
        </div>
        <p className="px-5 pt-2 text-[10px] font-bold text-slate-500 uppercase">Please complete number all the boxes</p>
        <div className="p-5 overflow-x-auto">
          <table className="w-full border border-slate-800 text-sm font-sans font-black">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300">
                <th className="border border-slate-300 px-3 py-2 text-left text-[10px] font-black uppercase text-slate-600 min-w-[11rem] w-[11rem]">Model</th>
                <th className="border border-slate-300 px-3 py-2 text-center text-[10px] font-black uppercase text-slate-600">No of Leads (off-line)</th>
                <th className="border border-slate-300 px-3 py-2 text-center text-[10px] font-black uppercase text-slate-600 bg-slate-200">No of Test drive</th>
                <th colSpan={3} className="border border-slate-300 px-3 py-2 text-center text-[10px] font-black uppercase text-slate-600">No of Booking</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-300">
                <th className="border border-slate-300 px-3 py-1 min-w-[11rem] w-[11rem]"></th>
                <th className="border border-slate-300 px-3 py-1"></th>
                <th className="border border-slate-300 px-3 py-1 bg-slate-200"></th>
                <th className="border border-slate-300 px-3 py-1 text-[10px] font-black uppercase text-slate-500">Plus/2WD</th>
                <th className="border border-slate-300 px-3 py-1 text-[10px] font-black uppercase text-slate-500">Utimate/4WD</th>
                <th className="border border-slate-300 px-3 py-1 text-[10px] font-black uppercase text-slate-500">other</th>
              </tr>
            </thead>
            <tbody>
              {VEHICLE_MODELS.map((model, idx) => (
                <tr key={model} className="border-b border-slate-200">
                  <td className="border border-slate-300 px-3 py-1.5 font-bold text-slate-800 text-xs min-w-[11rem] w-[11rem] whitespace-nowrap">{model}</td>
                  <td className="border border-slate-300 px-2 py-1.5">
                    <input
                      disabled={isReadOnly}
                      type="number"
                      min={0}
                      value={bookingResult[idx]?.leadsOffline ?? ''}
                      onChange={(e) => updateBookingResult(idx, 'leadsOffline', e.target.value)}
                      className="w-full min-w-[4rem] border border-slate-400 py-1.5 px-2 text-xs font-bold text-center focus:border-indigo-500 outline-none disabled:bg-slate-100"
                    />
                  </td>
                  <td className="border border-slate-300 px-2 py-1.5 bg-slate-100">
                    <input
                      disabled={isReadOnly}
                      type="number"
                      min={0}
                      value={bookingResult[idx]?.testDrive ?? ''}
                      onChange={(e) => updateBookingResult(idx, 'testDrive', e.target.value)}
                      className="w-full min-w-[4rem] border border-slate-300 bg-slate-50 py-1.5 px-2 text-xs font-bold text-center focus:border-indigo-500 outline-none disabled:bg-slate-100"
                    />
                  </td>
                  <td className="border border-slate-300 px-2 py-1.5">
                    <input
                      disabled={isReadOnly}
                      type="number"
                      min={0}
                      value={bookingResult[idx]?.bookingPlus2wd ?? ''}
                      onChange={(e) => updateBookingResult(idx, 'bookingPlus2wd', e.target.value)}
                      className="w-full min-w-[4rem] border border-slate-400 py-1.5 px-2 text-xs font-bold text-center focus:border-indigo-500 outline-none disabled:bg-slate-100"
                    />
                  </td>
                  <td className="border border-slate-300 px-2 py-1.5">
                    <input
                      disabled={isReadOnly}
                      type="number"
                      min={0}
                      value={bookingResult[idx]?.bookingUltimate4wd ?? ''}
                      onChange={(e) => updateBookingResult(idx, 'bookingUltimate4wd', e.target.value)}
                      className="w-full min-w-[4rem] border border-slate-400 py-1.5 px-2 text-xs font-bold text-center focus:border-indigo-500 outline-none disabled:bg-slate-100"
                    />
                  </td>
                  <td className="border border-slate-300 px-2 py-1.5">
                    <input
                      disabled={isReadOnly}
                      type="number"
                      min={0}
                      value={bookingResult[idx]?.bookingOther ?? ''}
                      onChange={(e) => updateBookingResult(idx, 'bookingOther', e.target.value)}
                      className="w-full min-w-[4rem] border border-slate-400 py-1.5 px-2 text-xs font-bold text-center focus:border-indigo-500 outline-none disabled:bg-slate-100"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-100 border-t-2 border-slate-400 font-black">
                <td className="border border-slate-300 px-3 py-2 text-xs uppercase text-slate-700 min-w-[11rem] w-[11rem]">Total</td>
                <td className="border border-slate-300 px-3 py-2 text-center text-xs font-black tabular-nums">{bookingTotals.leadsOffline}</td>
                <td className="border border-slate-300 px-3 py-2 text-center text-xs font-black tabular-nums bg-slate-200">{bookingTotals.testDrive}</td>
                <td className="border border-slate-300 px-3 py-2 text-center text-xs font-black tabular-nums">{bookingTotals.bookingPlus2wd}</td>
                <td className="border border-slate-300 px-3 py-2 text-center text-xs font-black tabular-nums">{bookingTotals.bookingUltimate4wd}</td>
                <td className="border border-slate-300 px-3 py-2 text-center text-xs font-black tabular-nums">{bookingTotals.bookingOther}</td>
              </tr>
            </tbody>
          </table>
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
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                {/* Left column: แถว 1 = กิจกรรม, ประเภทเคลม | แถว 2 = รายการสินค้า, ราคา */}
                <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-3 min-h-[160px] content-start">
                  <div className="space-y-1.5">
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
                  <div className="space-y-1.5">
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
                  <div className="space-y-1.5">
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
                  <div className="space-y-1.5">
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
                <div className="md:col-span-4 flex flex-col min-h-0">
                  <label className="font-bold text-slate-500 uppercase flex items-center gap-1.5 tracking-tight text-[10px] shrink-0">
                    <Receipt size={12} className="text-indigo-500" /> ใบเสร็จ
                  </label>
                  {idx === 0 && (
                    <input
                      ref={receiptFileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      className="hidden"
                      onChange={onReceiptFileChange}
                    />
                  )}
                  <div className="flex-1 flex flex-col min-h-0 mt-1">
                  {row.receiptFile ? (
                    <div className="border border-slate-200 group/card relative bg-white rounded-sm overflow-hidden flex-1 flex flex-col min-h-0">
                      <div className="relative flex-1 min-h-0 overflow-hidden bg-slate-100">
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
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => onReceiptUploadClick(idx)}
                        onDrop={(e) => onReceiptDrop(e, idx)}
                        onDragOver={onReceiptDragOver}
                        onDragLeave={onReceiptDragLeave}
                        className="border-2 border-dashed border-slate-400 bg-slate-50 rounded-sm flex-1 min-h-0 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition-all text-slate-400"
                      >
                        <Upload size={28} className="mb-2 opacity-60" />
                        <p className="text-xs font-bold uppercase tracking-tight">Drag & Drop หรือ Click เพื่อ Upload ใบเสร็จ</p>
                        <p className="text-[10px] mt-1 text-rose-500 font-black uppercase">เฉพาะไฟล์ .png และ .jpg</p>
                      </div>
                    )
                  )}
                  </div>
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
          {isAdmin ? 'ยกเลิก' : isReadOnly ? 'ปิดหน้าต่าง' : 'ยกเลิก'}
        </button>
        {isAdmin && isPending && (
          <button
            type="button"
            onClick={() => onApprove?.()}
            className="px-10 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase flex items-center gap-2 shadow-md rounded-sm"
          >
            <CheckCircle2 size={18} /> Approved
          </button>
        )}
        {!isReadOnly && !isAdmin && (
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

// --- Action Activity (KPI Summary) Views ---
const KpiStatusBadge = ({ pass }) =>
  pass ? (
    <span className="inline-flex items-center justify-center gap-1 font-black text-[10px] uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-sm min-w-[5.5rem]">
      <CheckCircle2 size={12} /> PASS
    </span>
  ) : (
    <span className="inline-flex items-center justify-center gap-1 font-black text-[10px] uppercase bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-sm min-w-[5.5rem]">
      <X size={12} /> NO PASS
    </span>
  );

const ProgressBar = ({ target, actual, label }) => {
  const pct = target > 0 ? Math.min(150, Math.round((Number(actual) / target) * 100)) : 0;
  const isOver = actual >= target;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold text-slate-600 uppercase">
        <span>{label}</span>
        <span className="tabular-nums">{actual} / {target} ({pct}%)</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${isOver ? 'bg-emerald-500' : 'bg-amber-500'}`}
          style={{ width: `${Math.min(100, pct)}%` }}
        />
      </div>
    </div>
  );
};

const ActionActivityListingView = ({ activityList = [], onOpenDetail }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const list = Array.isArray(activityList) ? activityList : [];
  const totalPages = Math.max(1, Math.ceil(list.length / LISTING_PER_PAGE));
  const page = Math.min(Math.max(1, currentPage), totalPages);
  const start = (page - 1) * LISTING_PER_PAGE;
  const paginated = list.slice(start, start + LISTING_PER_PAGE);
  const goToPage = (p) => setCurrentPage(Math.max(1, Math.min(p, totalPages)));

  return (
    <div className="space-y-4 animate-in fade-in duration-300 font-sans font-black">
      <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Activity Summary</h2>
      <p className="text-xs font-bold text-slate-500 uppercase">สรุป KPI แผนรายเดือนเทียบกับ Report & Claim (แสดงเมื่อมี Report ส่งแล้วและอ้างอิง Doc No เดียวกัน)</p>
      <div className="bg-white border border-slate-300 overflow-hidden shadow-sm rounded-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 text-[11px]">
              <th className="px-5 py-2.5 font-black uppercase text-slate-500">Doc No.</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500">เดือน/ปี</th>
              <th className="px-5 py-2.5 font-black uppercase text-slate-500 text-center">สถานะรวม</th>
              <th className="px-5 py-2.5 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {list.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-slate-400 text-xs font-bold uppercase">
                  ยังไม่มี Report & Claim ที่ส่งแล้วและอ้างอิงแผน — ส่ง Report ที่มี Plan Doc No. ก่อน
                </td>
              </tr>
            ) : (
              paginated.map((item) => (
                <tr
                  key={item.report.id}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => onOpenDetail(item)}
                >
                  <td className="px-5 py-2.5 font-black text-indigo-600">{item.plan.docNo}</td>
                  <td className="px-5 py-2.5 font-bold text-slate-700">
                    {item.plan.month} {item.plan.year}
                  </td>
                  <td className="px-5 py-2.5 text-center">
                    <KpiStatusBadge pass={item.overallPass} />
                  </td>
                  <td className="px-5 py-2.5 text-right">
                    <div className="p-1 text-slate-400 inline-block">
                      <ChevronRight size={16} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {list.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 border-t border-slate-200 bg-slate-50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">
              แสดง {start + 1}–{start + paginated.length} จาก {list.length} รายการ (หน้า {page}/{totalPages})
            </span>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1}
                  className="p-2 rounded-sm border border-slate-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 font-black"
                  aria-label="หน้าก่อน"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2))
                  .reduce((acc, p, i, arr) => {
                    if (i > 0 && arr[i - 1] !== p - 1) acc.push('…');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === '…' ? (
                      <span key={`as-ellip-${i}`} className="px-2 text-slate-400 font-bold">
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => goToPage(p)}
                        className={`min-w-[2rem] py-1.5 px-2 rounded-sm border text-xs font-black ${
                          p === page ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 bg-white hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= totalPages}
                  className="p-2 rounded-sm border border-slate-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 font-black"
                  aria-label="หน้าถัดไป"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ActionActivityDetailView = ({ activity, onBack, onDownloadExcel, dealerInfo }) => {
  if (!activity) return null;
  const { plan, report, leadsTarget, leadsActual, bookingTarget, bookingActual, leadPass, bookingPass, overallPass } = activity;
  const leadPct = leadsTarget > 0 ? Math.min(150, Math.round((leadsActual / leadsTarget) * 100)) : 0;
  const bookPct = bookingTarget > 0 ? Math.min(150, Math.round((bookingActual / bookingTarget) * 100)) : 0;

  return (
    <div className="space-y-4 animate-in fade-in duration-300 font-sans font-black pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-slate-400 hover:text-indigo-600 font-bold text-[10px] uppercase mb-2"
          >
            <ChevronLeft size={14} /> กลับไปหน้ารายการ
          </button>
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Activity Summary — {plan.docNo}</h2>
          <p className="text-[10px] font-bold text-slate-500 mt-1">
            Report: {report.docNo} · {plan.month} {plan.year}
          </p>
        </div>
        <button
          onClick={() => onDownloadExcel(report)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 font-bold text-xs uppercase rounded-sm shadow-sm"
        >
          <Download size={18} /> Download Report (Excel)
        </button>
      </div>

      <section className="bg-white border border-slate-300 overflow-hidden shadow-sm rounded-sm font-sans font-black">
        <div className="bg-slate-800 px-5 py-2 flex items-center gap-2 text-white font-black font-sans">
          <Store size={16} />
          <h3 className="text-[11px] uppercase tracking-tight">Dealer Information</h3>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <InfoItem label="ชื่อผู้จำหน่าย" value={dealerInfo?.dealerName || '—'} icon={<Layout size={14} />} />
          </div>
          <InfoItem label="ผู้ติดต่อ" value={dealerInfo?.contactPerson || '—'} icon={<User size={14} />} />
          <InfoItem label="อีเมลติดต่อ" value={dealerInfo?.email || '—'} icon={<Mail size={14} />} />
          <InfoItem label="เบอร์โทรศัพท์" value={dealerInfo?.mobilePhone || '—'} icon={<Phone size={14} />} />
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-300 rounded-sm p-5 shadow-sm">
          <h3 className="text-[11px] font-black uppercase text-slate-500 border-b border-slate-200 pb-2 mb-4">Lead KPI</h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-slate-600">Target vs Actual</span>
            <KpiStatusBadge pass={leadPass} />
          </div>
          <ProgressBar target={leadsTarget} actual={leadsActual} label="Leads" />
        </div>
        <div className="bg-white border border-slate-300 rounded-sm p-5 shadow-sm">
          <h3 className="text-[11px] font-black uppercase text-slate-500 border-b border-slate-200 pb-2 mb-4">Booking KPI</h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-slate-600">Target vs Actual</span>
            <KpiStatusBadge pass={bookingPass} />
          </div>
          <ProgressBar target={bookingTarget} actual={bookingActual} label="Bookings" />
        </div>
      </div>

      <div
        className={`rounded-sm p-8 shadow-md border-2 text-center ${
          overallPass
            ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200/50'
            : 'bg-rose-50 border-rose-400 ring-2 ring-rose-200/50'
        }`}
      >
        <p className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-3">สถานะรวม (Overall)</p>
        <div className="flex flex-col items-center gap-3">
          {overallPass ? (
            <span className="inline-flex items-center justify-center gap-2 font-black text-lg uppercase bg-emerald-500 text-white border-2 border-emerald-600 px-6 py-3 rounded-sm shadow-lg min-w-[10rem]">
              <CheckCircle2 size={28} strokeWidth={2.5} />
              PASS
            </span>
          ) : (
            <span className="inline-flex items-center justify-center gap-2 font-black text-lg uppercase bg-rose-500 text-white border-2 border-rose-600 px-6 py-3 rounded-sm shadow-lg min-w-[10rem]">
              <X size={28} strokeWidth={2.5} />
              NO PASS
            </span>
          )}
          <p className={`text-sm font-bold max-w-md ${overallPass ? 'text-emerald-800' : 'text-rose-800'}`}>
            {overallPass
              ? 'Lead และ Booking เป็นไปตามเป้าหมายที่ตั้งไว้'
              : 'Lead หรือ Booking ยังไม่ถึงเป้าหมาย'}
          </p>
        </div>
      </div>

      <section className="bg-white border border-slate-300 rounded-sm overflow-hidden shadow-sm">
        <div className="bg-slate-800 px-5 py-2 flex items-center gap-2 text-white font-black">
          <BarChart3 size={16} />
          <h3 className="text-[11px] uppercase">สรุปจาก Report & Claim</h3>
        </div>
        <div className="p-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Dealer</p>
            <p className="font-black text-slate-800">{dealerInfo?.dealerName || '—'}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Report Doc No.</p>
            <p className="font-black text-indigo-600">{report.docNo}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Lead Actual (Offline + Online)</p>
            <p className="font-black tabular-nums">{leadsActual}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Booking Actual</p>
            <p className="font-black tabular-nums">{bookingActual}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Session ---
const SESSION_KEY = 'oj_portal_session';

const getStoredSession = () => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data?.role === 'dealer' || data?.role === 'admin') return data;
    return null;
  } catch {
    return null;
  }
};

const clearSession = () => {
  sessionStorage.removeItem(SESSION_KEY);
};

// --- Login View ---
const LoginView = ({ onLogin }) => (
  <div className="min-h-screen bg-[#F1F5F9] flex flex-col items-center justify-center p-6 font-sans">
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-sm mb-4 shadow-lg">
          <FileText className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">OJ Marketing Portal</h1>
        <p className="text-sm font-bold text-slate-500 mt-2 uppercase tracking-wide">เลือกสิทธิ์การเข้าใช้งาน</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onLogin('dealer')}
          className="flex flex-col items-center justify-center p-8 bg-white border-2 border-slate-300 hover:border-indigo-500 rounded-sm shadow-sm transition-all hover:shadow-md font-black group"
        >
          <Store size={40} className="text-indigo-600 mb-3 group-hover:scale-110 transition-transform" />
          <span className="text-lg uppercase tracking-tight text-slate-800">Dealer</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">ผู้จำหน่าย</span>
        </button>
        <button
          type="button"
          onClick={() => onLogin('admin')}
          className="flex flex-col items-center justify-center p-8 bg-white border-2 border-slate-300 hover:border-indigo-500 rounded-sm shadow-sm transition-all hover:shadow-md font-black group"
        >
          <ShieldCheck size={40} className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
          <span className="text-lg uppercase tracking-tight text-slate-800">Admin / Staff</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">อนุมัติ / ตรวจสอบ</span>
        </button>
      </div>
      <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wide">
        กดออกจากระบบเพื่อเปลี่ยนสิทธิ์
      </p>
    </div>
  </div>
);

const App = () => {
  const [session, setSession] = useState(() => getStoredSession());
  const isLoggedIn = !!session;
  const userRole = session?.role ?? null;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('monthly_plan');
  const [view, setView] = useState('listing');
  const [plans] = useState(MOCK_PLANS);
  const [reports, setReports] = useState(MOCK_REPORT_CLAIMS);
  const [contentRequests, setContentRequests] = useState(MOCK_CONTENT_REQUESTS);
  const [dealers, setDealers] = useState(MOCK_DEALERS);
  const [showAddDealerModal, setShowAddDealerModal] = useState(false);
  const [editingDealerId, setEditingDealerId] = useState(null);
  const [addDealerName, setAddDealerName] = useState('');
  const [addDealerCode, setAddDealerCode] = useState('');
  const [users, setUsers] = useState(MOCK_USERS);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userFormName, setUserFormName] = useState('');
  const [userFormEmail, setUserFormEmail] = useState('');
  const [userFormPhone, setUserFormPhone] = useState('');
  const [userFormRole, setUserFormRole] = useState('dealer');
  const [userFormDealerId, setUserFormDealerId] = useState('');
  const [userFormDealerCode, setUserFormDealerCode] = useState('');
  const [userFormDealerName, setUserFormDealerName] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const avatarRef = useRef(null);

  const currentUser = userRole === 'admin' ? MOCK_ADMIN_INFO : { name: MOCK_DEALER_INFO.contactPerson, email: MOCK_DEALER_INFO.email };
  const avatarInitials = (currentUser.email || 'OJ').slice(0, 2).toUpperCase();

  const pendingPlans = plans.filter((p) => p.status === 'Pending');
  const pendingContent = contentRequests.filter((r) => r.status === 'Pending');
  const pendingReports = reports.filter((r) => r.status === 'Pending');
  const totalPending = pendingPlans.length + pendingContent.length + pendingReports.length;

  const notificationPlans = userRole === 'admin' ? pendingPlans : plans.filter((p) => p.status === 'Approved' || p.status === 'Rejected');
  const notificationContent = userRole === 'admin' ? pendingContent : contentRequests.filter((r) => r.status === 'Approved' || r.status === 'Rejected');
  const notificationReports = userRole === 'admin' ? pendingReports : reports.filter((r) => r.status === 'Approved' || r.status === 'Rejected');

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
      if (avatarRef.current && !avatarRef.current.contains(e.target)) setAvatarMenuOpen(false);
    };
    if (notificationOpen || avatarMenuOpen) document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [notificationOpen, avatarMenuOpen]);

  const handleLogin = (role) => {
    const data = { role };
    setSession(data);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
    setActiveMenu('monthly_plan');
    setView('listing');
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setAvatarMenuOpen(false);
  };

  const menuItems = [
    { id: 'monthly_plan', label: 'Monthly Plan', icon: <Calendar size={20} /> },
    { id: 'content', label: 'Content Approval', icon: <ClipboardCheck size={20} /> },
    { id: 'report', label: 'Report & Claim', icon: <FileSpreadsheet size={20} /> },
    { id: 'activity_summary', label: 'Activity Summary', icon: <BarChart3 size={20} /> },
  ];

  const adminMenuItems = [
    { id: 'user_management', label: 'User management', icon: <User size={20} /> },
    { id: 'dealer_management', label: 'Dealer Management', icon: <Store size={20} /> },
  ];

  const allMenuItems = userRole === 'admin' ? [...menuItems, ...adminMenuItems] : menuItems;

  const activityList = buildActivityList(plans, reports);

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  const handleOpenActivityDetail = (item) => {
    setSelectedActivity(item);
    setView('activity_detail');
  };

  const handleDownloadReportExcel = (report) => {
    if (!report) return;
    const wb = XLSX.utils.book_new();
    const br = report.bookingResult || [];
    const onlineRows = report.onlineRows || [];
    const totalOnlineImpression = onlineRows.reduce((s, r) => s + (Number(r.impression) || 0), 0);
    const totalOnlineLeads = onlineRows.reduce((s, r) => s + (Number(r.leads) || 0), 0);
    const totalBudget = (Number(report.onlineActualBudget) || 0) + (Number(report.offlineActualBudget) || 0);
    const totalLeadsOffline = br.reduce((s, r) => s + (Number(r.leadsOffline) || 0), 0);
    const totalTestDrive = br.reduce((s, r) => s + (Number(r.testDrive) || 0), 0);
    const totalPlus = br.reduce((s, r) => s + (Number(r.bookingPlus2wd) || 0), 0);
    const totalUlt = br.reduce((s, r) => s + (Number(r.bookingUltimate4wd) || 0), 0);
    const totalOther = br.reduce((s, r) => s + (Number(r.bookingOther) || 0), 0);
    const reportDate = report.date || (report.month && report.year ? `${report.month} ${report.year}` : '');
    const offFiles = report.offlineFiles || [];

    const rows = [
      ['', '', '', '', '', '', 'Refer to Document No.', report.docNo || ''],
      [],
      ['', '', '', 'OMODA | JAECOO', '', '', '', '', ''],
      ['', '', '', 'REPORT FORM', '', '', '', '', ''],
      ['', 'Please submit report at least 7 working days after event.', '', '', '', '', '', '', ''],
      [],
      ['Date', '', reportDate, '', '', '', '', '', ''],
      ['Dealer Name', '', MOCK_DEALER_INFO.dealerName, '', '', '', '', '', ''],
      ['Contact person', '', MOCK_DEALER_INFO.contactPerson, '', '', '', '', '', ''],
      ['Tel', '', '', '', '', '', MOCK_DEALER_INFO.mobilePhone, '', ''],
      ['Date of activity', '', reportDate, '', '', '', '', '', ''],
      ['Type of activity', '', report.offlineActivityType || '', '', 'Activity', report.onlineActivityType || '', '', ''],
      ['Location', '', '', '', '', '', '', '', ''],
      [],
      ['', 'Please upload the event photos (both online & offline, artwork, materials, activity, customer, car, etc)', '', '', '', '', '', '', ''],
      ['', offFiles[0]?.name || 'Photo 1', '', offFiles[1]?.name || 'Photo 2', '', offFiles[2]?.name || 'Photo 3', '', offFiles[3]?.name || 'Photo 4', ''],
      [],
      ['', 'Actual Budget', totalBudget, 'THB', '', '', 'For online activity', '', ''],
      ['', '', '', '', '', '', 'Impression', 'Leads (online)', ''],
      ['', '', '', '', '', '', totalOnlineImpression || '', totalOnlineLeads || '', ''],
      [],
      [],
      ['', 'Booking Result : Please complete number all the boxes', '', '', '', '', '', '', ''],
      ['', 'Model', 'No of Leads (off-line)', '', 'No of Test drive', '', 'Plus/2WD', 'Ultimate/4WD', 'other'],
      ['', VEHICLE_MODELS[0] || '', br[0]?.leadsOffline ?? '', '', br[0]?.testDrive ?? '', '', br[0]?.bookingPlus2wd ?? '', br[0]?.bookingUltimate4wd ?? '', br[0]?.bookingOther ?? ''],
      ['', VEHICLE_MODELS[1] || '', br[1]?.leadsOffline ?? '', '', br[1]?.testDrive ?? '', '', br[1]?.bookingPlus2wd ?? '', br[1]?.bookingUltimate4wd ?? '', br[1]?.bookingOther ?? ''],
      ['', VEHICLE_MODELS[2] || '', br[2]?.leadsOffline ?? '', '', br[2]?.testDrive ?? '', '', br[2]?.bookingPlus2wd ?? '', br[2]?.bookingUltimate4wd ?? '', br[2]?.bookingOther ?? ''],
      ['', VEHICLE_MODELS[3] || '', br[3]?.leadsOffline ?? '', '', br[3]?.testDrive ?? '', '', br[3]?.bookingPlus2wd ?? '', br[3]?.bookingUltimate4wd ?? '', br[3]?.bookingOther ?? ''],
      ['', 'Total', totalLeadsOffline, '', totalTestDrive, '', totalPlus, totalUlt, totalOther],
    ];

    const ws = XLSX.utils.aoa_to_sheet(rows);
    if (ws['!cols'] === undefined) ws['!cols'] = [];
    [1, 2, 3, 4, 5, 6, 7, 8].forEach((i) => { ws['!cols'][i] = ws['!cols'][i] || {}; ws['!cols'][i].wch = Math.max(ws['!cols'][i].wch || 0, 14); });
    XLSX.utils.book_append_sheet(wb, ws, 'Report Form');
    XLSX.writeFile(wb, `Report_${(report.docNo || 'export').replace(/\s/g, '_')}.xlsx`);
  };

  const handleOpenContentDetail = (req) => {
    setSelectedRequest(req);
    setView('content_detail');
  };

  const getTodayDateStr = () => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  };

  const handleContentApprove = () => {
    if (!selectedRequest?.id) return;
    setContentRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequest.id
          ? {
              ...r,
              status: 'Approved',
              approvalData: {
                date: getTodayDateStr(),
                time: '12:00',
                name: MOCK_ADMIN_INFO.name,
                email: MOCK_ADMIN_INFO.email,
                phone: MOCK_ADMIN_INFO.phone,
              },
            }
          : r
      )
    );
    setSelectedRequest(null);
    setView('listing');
  };

  const handleContentReject = (reason) => {
    if (!selectedRequest?.id) return;
    setContentRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequest.id
          ? {
              ...r,
              status: 'Rejected',
              rejectReason: reason || '—',
              rejectData: {
                date: getTodayDateStr(),
                name: MOCK_ADMIN_INFO.name,
                email: MOCK_ADMIN_INFO.email,
                phone: MOCK_ADMIN_INFO.phone,
              },
            }
          : r
      )
    );
    setSelectedRequest(null);
    setView('listing');
  };

  const handleOpenPlanDetail = (plan) => {
    setSelectedPlan(plan);
    setView('plan_detail');
  };

  const handleOpenReportDetail = (report) => {
    setSelectedReport(report);
    setView('report_detail');
  };

  const handleReportApprove = () => {
    if (!selectedReport?.id) return;
    setReports((prev) =>
      prev.map((r) =>
        r.id === selectedReport.id
          ? {
              ...r,
              status: 'Approved',
              approvalData: {
                date: getTodayDateStr(),
                time: '12:00',
                name: MOCK_ADMIN_INFO.name,
                email: MOCK_ADMIN_INFO.email,
                phone: MOCK_ADMIN_INFO.phone,
              },
            }
          : r
      )
    );
    setSelectedReport(null);
    setView('listing');
  };

  const renderContent = () => {
    if (activeMenu === 'monthly_plan') {
      if (view === 'listing')
        return (
          <MonthlyListingView
            plans={sortPlansByDateDesc(userRole === 'admin' ? plans.filter((p) => p.status !== 'Draft') : plans)}
            onCreateNew={() => setView('create')}
            onOpenDetail={handleOpenPlanDetail}
            showDealerColumn={userRole === 'admin'}
          />
        );
      if (view === 'create') return <MonthlyPlanFormView onBack={() => setView('listing')} />;
      if (view === 'plan_detail')
        return (
          <MonthlyPlanFormView
            onBack={() => setView('listing')}
            initialPlan={selectedPlan}
            isAdmin={userRole === 'admin'}
          />
        );
    }

    if (activeMenu === 'content') {
      if (view === 'listing')
        return (
          <ContentListingView
            requests={sortContentByDateDesc(userRole === 'admin' ? contentRequests.filter((r) => r.status !== 'Draft') : contentRequests)}
            onCreateNew={() => setView('create')}
            onOpenDetail={handleOpenContentDetail}
            showDealerColumn={userRole === 'admin'}
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
            isAdmin={userRole === 'admin'}
            onApprove={handleContentApprove}
            onReject={handleContentReject}
          />
        );
    }

    if (activeMenu === 'report') {
      if (view === 'listing')
        return (
          <ReportClaimListingView
            reports={sortReportsByDateDesc(userRole === 'admin' ? reports.filter((r) => r.status !== 'Draft') : reports)}
            onCreateNew={() => setView('create')}
            onOpenDetail={handleOpenReportDetail}
            showDealerColumn={userRole === 'admin'}
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
            isAdmin={userRole === 'admin'}
            onApprove={handleReportApprove}
          />
        );
    }

    if (activeMenu === 'activity_summary') {
      if (view === 'listing')
        return (
          <ActionActivityListingView
            activityList={sortActivityListByDateDesc(activityList)}
            onOpenDetail={handleOpenActivityDetail}
          />
        );
      if (view === 'activity_detail')
        return (
          <ActionActivityDetailView
            activity={selectedActivity}
            onBack={() => { setView('listing'); setSelectedActivity(null); }}
            onDownloadExcel={handleDownloadReportExcel}
            dealerInfo={MOCK_DEALER_INFO}
          />
        );
    }

    if (activeMenu === 'user_management') {
      return (
        <div className="min-h-[50vh]">
          <UserManagementView
            users={users}
            onAddUser={() => {
              setEditingUserId(null);
              setUserFormName('');
              setUserFormEmail('');
              setUserFormPhone('');
              setUserFormRole('dealer');
              setUserFormDealerId('');
              setUserFormDealerCode('');
              setUserFormDealerName('');
              setShowUserModal(true);
            }}
            onEditUser={(u) => {
              setEditingUserId(u.id);
              setUserFormName(u.name || '');
              setUserFormEmail(u.email || '');
              setUserFormPhone(u.phone || '');
              setUserFormRole(u.role || 'dealer');
              const match = dealers.find((d) => d.dealerCode === u.dealerCode);
              setUserFormDealerId(match ? String(match.id) : '');
              setUserFormDealerCode(u.dealerCode || '');
              setUserFormDealerName(u.dealerName || '');
              setShowUserModal(true);
            }}
          />
          {showUserModal && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
              onClick={() => { setShowUserModal(false); setEditingUserId(null); }}
            >
              <div
                className="bg-white rounded-sm shadow-xl border border-slate-200 max-w-md w-full p-6 font-sans font-black"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-sm font-black uppercase tracking-tight text-slate-800 mb-4">{editingUserId ? 'แก้ไข User' : 'เพิ่ม User'}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-slate-500 tracking-tight mb-1">Name</label>
                    <input
                      type="text"
                      value={userFormName}
                      onChange={(e) => setUserFormName(e.target.value)}
                      placeholder="ชื่อ-นามสกุล"
                      className="w-full border-2 border-slate-300 rounded-sm px-3 py-2 text-sm font-bold focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase text-slate-500 tracking-tight mb-1">Email</label>
                    <input
                      type="email"
                      value={userFormEmail}
                      onChange={(e) => setUserFormEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full border-2 border-slate-300 rounded-sm px-3 py-2 text-sm font-bold focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase text-slate-500 tracking-tight mb-1">Phone</label>
                    <input
                      type="text"
                      value={userFormPhone}
                      onChange={(e) => setUserFormPhone(e.target.value)}
                      placeholder="เบอร์โทรศัพท์"
                      className="w-full border-2 border-slate-300 rounded-sm px-3 py-2 text-sm font-bold focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase text-slate-500 tracking-tight mb-1">Role</label>
                    <select
                      value={userFormRole}
                      onChange={(e) => {
                        setUserFormRole(e.target.value);
                        if (e.target.value !== 'dealer') {
                          setUserFormDealerId('');
                          setUserFormDealerCode('');
                          setUserFormDealerName('');
                        }
                      }}
                      className="w-full border-2 border-slate-300 rounded-sm px-3 py-2 text-sm font-bold focus:border-indigo-500 outline-none"
                    >
                      <option value="admin">Admin</option>
                      <option value="dealer">Dealer</option>
                    </select>
                  </div>
                  {userFormRole === 'dealer' && (
                    <div>
                      <label className="block text-[11px] font-black uppercase text-slate-500 tracking-tight mb-1">Dealer (Code / Name) <span className="text-rose-500">*</span></label>
                      <select
                        value={userFormDealerId}
                        onChange={(e) => {
                          const id = e.target.value;
                          setUserFormDealerId(id);
                          const d = dealers.find((x) => x.id === Number(id));
                          if (d) {
                            setUserFormDealerCode(d.dealerCode || '');
                            setUserFormDealerName(d.dealerName || '');
                          } else {
                            setUserFormDealerCode('');
                            setUserFormDealerName('');
                          }
                        }}
                        className="w-full border-2 border-slate-300 rounded-sm px-3 py-2 text-sm font-bold focus:border-indigo-500 outline-none"
                      >
                        <option value="">— เลือก Dealer —</option>
                        {dealers.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.dealerCode} / {d.dealerName || ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => { setShowUserModal(false); setEditingUserId(null); }}
                    className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-100 text-slate-600 font-bold text-xs uppercase rounded-sm"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const name = userFormName.trim();
                      const email = userFormEmail.trim();
                      const phone = userFormPhone.trim();
                      const role = userFormRole || 'dealer';
                      const isDealer = role === 'dealer';
                      const dealerOk = !isDealer || (userFormDealerCode && userFormDealerName);
                      if (name && email && dealerOk) {
                        const payload = { name, email, phone, role };
                        if (isDealer) {
                          payload.dealerCode = userFormDealerCode;
                          payload.dealerName = userFormDealerName;
                        } else {
                          payload.dealerCode = undefined;
                          payload.dealerName = undefined;
                        }
                        if (editingUserId != null) {
                          setUsers((prev) =>
                            prev.map((u) => (u.id === editingUserId ? { ...u, ...payload } : u))
                          );
                        } else {
                          const nextId = Math.max(0, ...users.map((u) => u.id)) + 1;
                          setUsers((prev) => [...prev, { id: nextId, ...payload }]);
                        }
                        setShowUserModal(false);
                        setEditingUserId(null);
                        setUserFormName('');
                        setUserFormEmail('');
                        setUserFormPhone('');
                        setUserFormRole('dealer');
                        setUserFormDealerId('');
                        setUserFormDealerCode('');
                        setUserFormDealerName('');
                      }
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase rounded-sm"
                  >
                    บันทึก
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (activeMenu === 'dealer_management') {
      return (
        <div className="min-h-[50vh]">
          <DealerManagementView
            dealers={dealers}
            onAddDealer={() => {
              setEditingDealerId(null);
              setAddDealerName('');
              setAddDealerCode('');
              setShowAddDealerModal(true);
            }}
            onEditDealer={(d) => {
              setEditingDealerId(d.id);
              setAddDealerName(d.dealerName || '');
              setAddDealerCode(d.dealerCode || '');
              setShowAddDealerModal(true);
            }}
          />
          {showAddDealerModal && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
              onClick={() => { setShowAddDealerModal(false); setEditingDealerId(null); }}
            >
              <div
                className="bg-white rounded-sm shadow-xl border border-slate-200 max-w-md w-full p-6 font-sans font-black"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-sm font-black uppercase tracking-tight text-slate-800 mb-4">{editingDealerId ? 'แก้ไข Dealer' : 'เพิ่ม Dealer'}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-slate-500 tracking-tight mb-1">Dealer Name</label>
                    <input
                      type="text"
                      value={addDealerName}
                      onChange={(e) => setAddDealerName(e.target.value)}
                      placeholder="ชื่อ dealer"
                      className="w-full border-2 border-slate-300 rounded-sm px-3 py-2 text-sm font-bold focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase text-slate-500 tracking-tight mb-1">Dealer Code</label>
                    <input
                      type="text"
                      value={addDealerCode}
                      onChange={(e) => setAddDealerCode(e.target.value.toUpperCase())}
                      placeholder="รหัส dealer"
                      className="w-full border-2 border-slate-300 rounded-sm px-3 py-2 text-sm font-bold focus:border-indigo-500 outline-none uppercase"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => { setShowAddDealerModal(false); setEditingDealerId(null); }}
                    className="px-4 py-2 border border-slate-300 bg-white hover:bg-slate-100 text-slate-600 font-bold text-xs uppercase rounded-sm"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const name = addDealerName.trim();
                      const code = (addDealerCode || '').trim().toUpperCase();
                      if (name && code) {
                        if (editingDealerId != null) {
                          setDealers((prev) =>
                            prev.map((d) => (d.id === editingDealerId ? { ...d, dealerName: name, dealerCode: code } : d))
                          );
                        } else {
                          const nextId = Math.max(0, ...dealers.map((d) => d.id)) + 1;
                          setDealers((prev) => [...prev, { id: nextId, dealerName: name, dealerCode: code }]);
                        }
                        setShowAddDealerModal(false);
                        setEditingDealerId(null);
                        setAddDealerName('');
                        setAddDealerCode('');
                      }
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase rounded-sm"
                  >
                    บันทึก
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-[60vh] bg-white border border-dashed border-slate-300 rounded-sm font-sans font-black">
        <h2 className="text-xl font-black text-slate-400 uppercase tracking-tight">
          {allMenuItems.find((m) => m.id === activeMenu)?.label}
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
          {userRole === 'admin' && (
            <>
              <div className="mx-4 my-2 border-t border-slate-700" aria-hidden="true" />
              {adminMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    setView('listing');
                  }}
                  className={`w-full flex items-center py-3 transition-colors relative group ${activeMenu === item.id ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'} ${item.isSub ? 'pl-8 pr-4' : 'px-4'}`}
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
            </>
          )}
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
            <span
              className={`text-[10px] font-black uppercase tracking-tight px-2 py-0.5 rounded-sm border ${
                userRole === 'admin' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
              }`}
            >
              {userRole === 'admin' ? 'Admin' : 'Dealer'}
            </span>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-tight font-black">
              {allMenuItems.find((m) => m.id === activeMenu)?.label}
            </span>
          </div>
          <div className="flex items-center gap-3 font-black">
            {/* Single notification badge: click to open list */}
            <div className="relative" ref={notificationRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setAvatarMenuOpen(false);
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
                    {userRole === 'admin' ? 'การแจ้งเตือน (รออนุมัติ)' : 'การแจ้งเตือน (Approved / Rejected)'}
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
              {currentUser.name}
            </span>
            <div className="relative" ref={avatarRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setNotificationOpen(false);
                  setAvatarMenuOpen((o) => !o);
                }}
                className="w-8 h-8 bg-slate-800 rounded-none flex items-center justify-center text-white text-xs font-black shrink-0 hover:bg-slate-700 transition-colors cursor-pointer"
                title="เมนูผู้ใช้"
              >
                {avatarInitials}
              </button>
              {avatarMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-slate-200 shadow-lg rounded-sm z-50 font-sans overflow-hidden">
                  <div className="p-2 border-b border-slate-100 font-black text-[10px] uppercase text-slate-500 tracking-tight">
                    เมนู
                  </div>
                  <ul className="py-1 text-sm">
                    <li>
                      <button
                        type="button"
                        onClick={() => setAvatarMenuOpen(false)}
                        className="w-full text-left px-3 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-slate-800 font-bold"
                      >
                        <User size={14} className="text-slate-500" />
                        Edit profile
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => setAvatarMenuOpen(false)}
                        className="w-full text-left px-3 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-slate-800 font-bold"
                      >
                        <Settings size={14} className="text-slate-500" />
                        Settings
                      </button>
                    </li>
                    <li className="border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          handleLogout();
                        }}
                        className="w-full text-left px-3 py-2.5 hover:bg-slate-50 flex items-center gap-2 text-rose-600 font-bold"
                      >
                        <LogOut size={14} />
                        ออกจากระบบ
                      </button>
                    </li>
                  </ul>
                </div>
              )}
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
