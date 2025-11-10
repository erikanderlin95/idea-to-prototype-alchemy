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
    "hero.title1": "Healthcare Made",
    "hero.title2": "Simple & Smart",
    "hero.subtitle": "Join virtual queues, book appointments instantly, and connect with healthcare professionals across Singapore",
    "hero.findClinics": "Find Clinics",
    "hero.learnMore": "Learn More",
    "hero.queueTitle": "Queue",
    "hero.queueDesc": "Real-time virtual queues & wait times",
    "hero.bookTitle": "Book",
    "hero.bookDesc": "Instant appointments across all clinics",
    "hero.connectTitle": "Connect",
    "hero.connectDesc": "AI health assistant & support",
    
    // Features
    "features.badge": "Features",
    "features.title": "Digital Queue • Book • Connect",
    "features.subtitle": "A complete healthcare platform designed for Singapore's diverse medical ecosystem",
    "features.queue.title": "Digital Queue",
    "features.queue.subtitle": "Real-time Updates",
    "features.queue.description": "Join virtual queues from anywhere and see live queue status and wait times before you go.",
    "features.book.title": "Book",
    "features.book.subtitle": "Easy Appointments",
    "features.book.description": "Book appointments across GP, TCM, and wellness centers with instant confirmation.",
    "features.connect.title": "Connect",
    "features.connect.subtitle": "Smart Assistance",
    "features.connect.description": "Pre and post consultation support via AI-powered health chatbot assistance.",
    "features.transparency.title": "Doctor Transparency",
    "features.transparency.description": "View profiles, specialties, and patient reviews",
    "features.pdpa.title": "PDPA Compliant",
    "features.pdpa.description": "Your data is secure and privacy-protected",
    "features.fast.title": "Fast & Efficient",
    "features.fast.description": "Reduce waiting time and streamline your healthcare journey",
    
    // Queue Page
    "queue.title": "Live Queue",
    "queue.loading": "Loading queue information...",
    "queue.inQueue": "In Queue",
    "queue.estWait": "Est. Wait",
    "queue.enableNotifications": "Enable notifications for queue updates",
    "queue.notificationDesc": "Get notified when it's almost your turn so you don't miss your spot",
    "queue.complete": "Consultation Complete!",
    "queue.thankYou": "Thank you for visiting",
    "queue.rateVisit": "Rate your visit",
    "queue.feedbackThanks": "Thanks for your feedback!",
    "queue.feedbackHelps": "Your feedback helps us improve our service",
    "queue.returnHome": "Return to Home",
    "queue.beingServedNow": "You're Being Served Now!",
    "queue.proceedToConsultation": "Please proceed to the consultation area",
    "queue.yourQueueNumber": "Your Queue Number",
    "queue.checkedIn": "You're in Queue!",
    "queue.updated": "Updated",
    "queue.ago": "ago",
    "queue.queueNumber": "Queue Number",
    "queue.status": "Status",
    "queue.waiting": "Waiting",
    "queue.estWaitTime": "Est. Wait",
    "queue.visitType": "Visit Type",
    "queue.peopleAhead": "People Ahead",
    "queue.generalConsultation": "General Consultation",
    "queue.notifiedWhenTurn": "You'll be notified when it's your turn",
    "queue.leaveQueue": "Leave Queue",
    "queue.checkIn": "Check In",
    "queue.joinQueue": "Join Queue",
    "queue.notificationsOn": "Notifications On",
    "queue.enableAlerts": "Enable Alerts",
    "queue.minutes": "min",
    
    // Staff Dashboard
    "staff.title": "Staff Dashboard",
    "staff.loading": "Loading staff dashboard...",
    "staff.queueStatus": "Queue Status:",
    "staff.open": "Open",
    "staff.closed": "Closed",
    "staff.totalToday": "Total Today",
    "staff.waiting": "Waiting",
    "staff.served": "Served",
    "staff.avgWait": "Avg Wait",
    "staff.currentQueue": "Current Queue",
    "staff.managePatients": "Manage patients waiting in line",
    "staff.callNextPatient": "Call Next Patient",
    "staff.noPatients": "No patients in queue",
    "staff.queueEmpty": "Queue is empty right now",
    "staff.patient": "Patient",
    "staff.waitingTime": "Waiting:",
    "staff.minutes2": "minutes",
    "staff.callPatient": "Call Patient",
    "staff.markServed": "Mark Served",
    "staff.cancel": "Cancel",
    "staff.noShow": "No-Show",
    "staff.moveUp": "Move up",
    "staff.moveDown": "Move down",
    
    // Footer
    "footer.tagline": "Simplifying healthcare access across Singapore",
    "footer.forPatients": "For Patients",
    "footer.findClinics": "Find Clinics",
    "footer.howItWorks": "How it Works",
    "footer.faq": "FAQ",
    "footer.forClinics": "For Clinics",
    "footer.joinPlatform": "Join Platform",
    "footer.features": "Features",
    "footer.pricing": "Pricing",
    "footer.company": "Company",
    "footer.aboutUs": "About Us",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.termsOfService": "Terms of Service",
    "footer.copyright": "© 2024 ClynicQ. PDPA Compliant Healthcare Platform.",
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
    "hero.title1": "简单智能的",
    "hero.title2": "医疗保健",
    "hero.subtitle": "随时随地加入虚拟队列、即时预约，并与新加坡各地的医疗保健专业人员联系",
    "hero.findClinics": "寻找诊所",
    "hero.learnMore": "了解更多",
    "hero.queueTitle": "排队",
    "hero.queueDesc": "实时虚拟队列和等待时间",
    "hero.bookTitle": "预约",
    "hero.bookDesc": "所有诊所的即时预约",
    "hero.connectTitle": "连接",
    "hero.connectDesc": "AI健康助手和支持",
    
    // Features
    "features.badge": "功能特色",
    "features.title": "数字排队 • 预约 • 连接",
    "features.subtitle": "为新加坡多元化医疗生态系统设计的完整医疗保健平台",
    "features.queue.title": "数字排队",
    "features.queue.subtitle": "实时更新",
    "features.queue.description": "随时随地加入虚拟队列，在出发前查看实时队列状态和等待时间。",
    "features.book.title": "预约",
    "features.book.subtitle": "轻松预约",
    "features.book.description": "在全科、中医和健康中心预约，即时确认。",
    "features.connect.title": "连接",
    "features.connect.subtitle": "智能协助",
    "features.connect.description": "通过AI驱动的健康聊天机器人提供咨询前后的支持。",
    "features.transparency.title": "医生透明度",
    "features.transparency.description": "查看简介、专长和患者评价",
    "features.pdpa.title": "符合PDPA",
    "features.pdpa.description": "您的数据安全且受隐私保护",
    "features.fast.title": "快速高效",
    "features.fast.description": "减少等待时间，简化您的医疗保健旅程",
    
    // Queue Page
    "queue.title": "实时队列",
    "queue.loading": "加载队列信息中...",
    "queue.inQueue": "队列中",
    "queue.estWait": "预计等待",
    "queue.enableNotifications": "启用队列更新通知",
    "queue.notificationDesc": "在轮到您时收到通知，不会错过您的位置",
    "queue.complete": "咨询完成！",
    "queue.thankYou": "感谢您的光临",
    "queue.rateVisit": "评价您的就诊",
    "queue.feedbackThanks": "感谢您的反馈！",
    "queue.feedbackHelps": "您的反馈帮助我们改进服务",
    "queue.returnHome": "返回主页",
    "queue.beingServedNow": "正在为您服务！",
    "queue.proceedToConsultation": "请前往咨询区",
    "queue.yourQueueNumber": "您的队列号码",
    "queue.checkedIn": "您在队列中！",
    "queue.updated": "更新于",
    "queue.ago": "前",
    "queue.queueNumber": "队列号码",
    "queue.status": "状态",
    "queue.waiting": "等待中",
    "queue.estWaitTime": "预计等待",
    "queue.visitType": "就诊类型",
    "queue.peopleAhead": "前面的人数",
    "queue.generalConsultation": "一般咨询",
    "queue.notifiedWhenTurn": "轮到您时会收到通知",
    "queue.leaveQueue": "离开队列",
    "queue.checkIn": "签到",
    "queue.joinQueue": "加入队列",
    "queue.notificationsOn": "通知已开启",
    "queue.enableAlerts": "启用提醒",
    "queue.minutes": "分钟",
    
    // Staff Dashboard
    "staff.title": "员工仪表板",
    "staff.loading": "加载员工仪表板中...",
    "staff.queueStatus": "队列状态：",
    "staff.open": "开放",
    "staff.closed": "关闭",
    "staff.totalToday": "今日总数",
    "staff.waiting": "等待中",
    "staff.served": "已服务",
    "staff.avgWait": "平均等待",
    "staff.currentQueue": "当前队列",
    "staff.managePatients": "管理排队等候的患者",
    "staff.callNextPatient": "呼叫下一位患者",
    "staff.noPatients": "队列中没有患者",
    "staff.queueEmpty": "队列目前为空",
    "staff.patient": "患者",
    "staff.waitingTime": "等待：",
    "staff.minutes2": "分钟",
    "staff.callPatient": "呼叫患者",
    "staff.markServed": "标记已服务",
    "staff.cancel": "取消",
    "staff.noShow": "未出现",
    "staff.moveUp": "上移",
    "staff.moveDown": "下移",
    
    // Footer
    "footer.tagline": "简化新加坡的医疗保健服务",
    "footer.forPatients": "患者服务",
    "footer.findClinics": "寻找诊所",
    "footer.howItWorks": "工作原理",
    "footer.faq": "常见问题",
    "footer.forClinics": "诊所服务",
    "footer.joinPlatform": "加入平台",
    "footer.features": "功能特色",
    "footer.pricing": "价格",
    "footer.company": "公司",
    "footer.aboutUs": "关于我们",
    "footer.privacyPolicy": "隐私政策",
    "footer.termsOfService": "服务条款",
    "footer.copyright": "© 2024 ClynicQ. 符合PDPA的医疗保健平台。",
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
