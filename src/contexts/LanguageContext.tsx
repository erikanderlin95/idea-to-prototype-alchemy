import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "zh";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.findClinics": "Find Clinics",
    "nav.staffDashboard": "Staff Dashboard",
    "nav.myAppointments": "My Appointments",
    "nav.healthAssistant": "Health Assistant",
    "nav.analytics": "Analytics",
    "nav.signOut": "Sign Out",
    "nav.login": "Login",
    "nav.signUp": "Sign Up",
    "nav.menu": "Menu",
    "nav.help": "Help & Support",
    "nav.restartTour": "Restart Tour",
    
    // Hero
    "hero.badge": "Queue • Book • Connect",
    "hero.title": "Healthcare Made Simple & Smart",
    "hero.subtitle": "Skip the wait, book with ease, and connect with trusted clinics instantly",
    "hero.findClinics": "Find Clinics",
    "hero.learnMore": "Learn More",
    
    // Features
    "features.title": "Features",
    "features.subtitle": "Everything you need for modern healthcare",
    "features.queue.title": "Digital Queue",
    "features.queue.subtitle": "No more waiting rooms",
    "features.queue.description": "Join virtual queues from anywhere and get notified when it's your turn",
    "features.book.title": "Book",
    "features.book.subtitle": "Instant appointments",
    "features.book.description": "Schedule appointments with your preferred doctors in just a few taps",
    "features.connect.title": "Connect",
    "features.connect.subtitle": "Stay informed",
    "features.connect.description": "Real-time updates and seamless communication with your healthcare providers",
    
    // Queue Page
    "queue.title": "Live Queue",
    "queue.checkedIn": "You're Checked In",
    "queue.inQueue": "You're in Queue!",
    "queue.beingServed": "You're Being Served",
    "queue.complete": "Consultation Complete!",
    "queue.thankYou": "Thank you for visiting",
    "queue.feedback": "How was your visit?",
    "queue.leaveQueue": "Leave Queue",
    "queue.queueNumber": "Queue Number",
    "queue.estimatedWait": "Estimated Wait",
    "queue.status": "Status",
    "queue.visitType": "Visit Type",
    "queue.peopleAhead": "People Ahead",
    "queue.lastUpdated": "Last updated",
    "queue.secondsAgo": "seconds ago",
    "queue.waiting": "Waiting",
    "queue.serving": "In Progress",
    "queue.served": "Served",
    
    // Staff Dashboard
    "staff.title": "Staff Dashboard",
    "staff.queueManagement": "Queue Management",
    "staff.openQueue": "Open Queue",
    "staff.closeQueue": "Close Queue",
    "staff.waiting": "Patients Waiting",
    "staff.inProgress": "In Progress",
    "staff.servedToday": "Served Today",
    "staff.callPatient": "Call Patient",
    "staff.markServed": "Mark Served",
    "staff.cancel": "Cancel",
    "staff.noShow": "No-Show",
    "staff.visitType": "Visit Type",
    "staff.noPatients": "No patients in queue",
  },
  zh: {
    // Navbar
    "nav.findClinics": "寻找诊所",
    "nav.staffDashboard": "员工仪表板",
    "nav.myAppointments": "我的预约",
    "nav.healthAssistant": "健康助手",
    "nav.analytics": "分析",
    "nav.signOut": "登出",
    "nav.login": "登录",
    "nav.signUp": "注册",
    "nav.menu": "菜单",
    "nav.help": "帮助与支持",
    "nav.restartTour": "重新开始导览",
    
    // Hero
    "hero.badge": "排队 • 预约 • 连接",
    "hero.title": "简单智能的医疗保健",
    "hero.subtitle": "跳过等待，轻松预约，即时连接可信赖的诊所",
    "hero.findClinics": "寻找诊所",
    "hero.learnMore": "了解更多",
    
    // Features
    "features.title": "功能特色",
    "features.subtitle": "现代医疗保健所需的一切",
    "features.queue.title": "数字排队",
    "features.queue.subtitle": "无需等候室",
    "features.queue.description": "随时随地加入虚拟队列，轮到您时收到通知",
    "features.book.title": "预约",
    "features.book.subtitle": "即时预约",
    "features.book.description": "只需几次点击即可与您首选的医生预约",
    "features.connect.title": "连接",
    "features.connect.subtitle": "保持知情",
    "features.connect.description": "与您的医疗保健提供者实时更新和无缝沟通",
    
    // Queue Page
    "queue.title": "实时队列",
    "queue.checkedIn": "您已签到",
    "queue.inQueue": "您在队列中！",
    "queue.beingServed": "正在为您服务",
    "queue.complete": "咨询完成！",
    "queue.thankYou": "感谢您的光临",
    "queue.feedback": "您的就诊体验如何？",
    "queue.leaveQueue": "离开队列",
    "queue.queueNumber": "队列号码",
    "queue.estimatedWait": "预计等待时间",
    "queue.status": "状态",
    "queue.visitType": "就诊类型",
    "queue.peopleAhead": "前面的人数",
    "queue.lastUpdated": "最后更新",
    "queue.secondsAgo": "秒前",
    "queue.waiting": "等待中",
    "queue.serving": "进行中",
    "queue.served": "已服务",
    
    // Staff Dashboard
    "staff.title": "员工仪表板",
    "staff.queueManagement": "队列管理",
    "staff.openQueue": "开放队列",
    "staff.closeQueue": "关闭队列",
    "staff.waiting": "等待中的患者",
    "staff.inProgress": "进行中",
    "staff.servedToday": "今日已服务",
    "staff.callPatient": "呼叫患者",
    "staff.markServed": "标记已服务",
    "staff.cancel": "取消",
    "staff.noShow": "未出现",
    "staff.visitType": "就诊类型",
    "staff.noPatients": "队列中没有患者",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved === "zh" ? "zh" : "en") as Language;
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
