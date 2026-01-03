import { TranslationStructure, Patient, ChartData, Doctor, Specialty } from './types';

export const TRANSLATIONS: Record<'uz' | 'ru', TranslationStructure> = {
  uz: {
    nav: {
      features: "Imkoniyatlar",
      clinicSystem: "Klinika Tizimi",
      onlineQueue: "Navbat Olish",
      whyUs: "Nega Biz?",
      login: "Kirish",
    },
    hero: {
      title: "Elektron Tibbiyot Tizimi\nQog‘ozbozlik tugadi. Klinikangiz endi to‘liq raqamli.",
      subtitle: "Bemor kartalari, qabul ma’lumotlari va shifokor ish jarayonlari yagona xavfsiz tizimda boshqariladi. MedFlow klinikadagi barcha ish jarayonlarini tartibga soladi.",
      ctaPrimary: "Tizimni ko‘rish",
      ctaSecondary: "Bemor ilovasini ko‘rish",
    },
    features: {
      title: "Klinikalar uchun raqamli yechimlar",
      subtitle: "Shifokorlar va ma’muriyat ishini yengillashtiruvchi zamonaviy workflow vositalari.",
      list: [
        { 
          title: "Elektron bemor kartasi", 
          desc: "Barcha tashriflar tarixi, tashxislar, tayinlovlar, tahlillar va hujjatlar yagona xavfsiz bazada saqlanadi.", 
          icon: "user" 
        },
        { 
          title: "Klinika boshqaruvi (CRM)", 
          desc: "Shifokorlar yuklamasi, bemor oqimi, moliyaviy hisobotlar va xodimlar faoliyati to‘liq nazorat ostida.", 
          icon: "bar-chart" 
        },
        { 
          title: "Avtomatik eslatmalar", 
          desc: "Bemorlarga qabul vaqti haqida SMS eslatmalar yuborish orqali kelmay qolish holatlari kamaytiriladi.", 
          icon: "bell" 
        },
        { 
          title: "Onlayn navbat va qabul", 
          desc: "Bemorlar masofadan qabulga yozilishi mumkin. Bu klinikadagi tirbandlik va tartibsizlikni bartaraf etadi.", 
          icon: "calendar" 
        },
      ],
    },
    telegramSection: {
      title: "Telegram Bot Integratsiyasi",
      subtitle: "Bemor ilovasi Telegram bot orqali ham to'liq integratsiya qilingan. Ilovani yuklab olish shart emas — barcha xizmatlar (navbat, qabul, tarix) Telegram orqali boshqariladi.",
      button: "Telegram Botni Sinab Ko'rish"
    },
    demo: {
      titleClinic: "Interaktiv demo — Klinika boshqaruv tizimi",
      subtitleClinic: "Klinika rahbarlari va shifokorlar uchun yagona nazorat markazi.",
      titlePatient: "Interaktiv demo — Bemorlar uchun ilova",
      subtitlePatient: "Bemorlar uydan chiqmasdan shifokor qabuliga yoziladi va navbatini ko‘radi.",
      roles: {
        admin: "Administrator rejimi",
        doctor: "Shifokor rejimi",
        patient: "Bemor ilovasi",
      },
      common: {
        liveTest: "Jonli Test",
        searchPlaceholder: "Qidirish...",
        yearsOld: "yosh",
        save: "Saqlash",
        cancel: "Bekor qilish",
        confirm: "Tasdiqlash",
        success: "Muvaffaqiyatli!",
        back: "Orqaga"
      },
      doctorView: {
        patientList: "Bemorlar bazasi",
        queueTitle: "Navbatdagi bemorlar",
        inProgressTitle: "Qabul jarayonida",
        startVisit: "Bemorni qabul qilish",
        finishVisit: "Qabulni yakunlash",
        currentPatient: "Bemor kartasi",
        addDiagnosis: "Tashxis",
        writePrescription: "Retsept",
        attachFile: "Fayl biriktirish",
        addMedicine: "Dori qo'shish",
        history: "Kasallik tarixi",
        actions: "Ko'rik natijalari",
        diagnosisHistory: "Shikoyat: Nafas qisishi. Surunkali bronxit xuruji.",
        testResults: "Qon tahlili natijalari",
        modalDiagnosisTitle: "Yangi Tashxis",
        modalPrescriptionTitle: "Yangi Retsept",
        inputPlaceholder: "Batafsil ma'lumot kiriting...",
        medicinePlaceholder: "Dori nomini kiriting va Enter bosing...",
        fileTypes: {
          mrt: "MRT",
          eco: "EKG/EKO",
          rentgen: "Rentgen"
        }
      },
      adminView: {
        revenue: "Jami Daromad",
        patients: "Bemorlar soni",
        efficiency: "Samaradorlik",
        chartRevenue: "Daromad (Mln so'm)",
        chartVisits: "Haftalik Tashriflar",
        period: "Oxirgi 30 kun",
        doctorsTitle: "Shifokorlar Ko'rsatkichlari",
        doctorName: "Shifokor",
        specialty: "Mutaxassislik",
        patientsTreated: "Qabul qilingan",
        revenueGen: "Tushum",
        rating: "Reyting",
        status: "Holat",
      },
      patientView: {
        welcome: "Salom, Alisher!",
        nextVisit: "Keyingi qabul: 14:30, Dr. Azimov",
        bookAppointment: "Qabulga yozilish",
        myAppointments: "Mening qabullarim",
        medicalHistory: "Hujjatlar",
        status: "Navbat holati",
        today: "Bugun",
        selectTime: "Qabul vaqtini tanlang",
        queuePosition: "Navbatdagi o'rningiz",
        yourTurnIn: "Qabulga kirish",
        minutes: "daqiqadan so'ng",
        steps: {
          specialty: "Mutaxassislikni tanlang",
          doctor: "Shifokorni tanlang",
          date: "Kunni tanlang",
          time: "Vaqtni tanlang",
          confirm: "Ma'lumotlarni tasdiqlash"
        },
        noDoctors: "Bu mutaxassislik bo'yicha shifokorlar topilmadi."
      },
    },
    whyUs: {
      title: "Nima uchun klinikalar MedFlow’ni tanlaydi?",
      items: [
        { title: "Ish jarayonlari soddalashadi", desc: "Barcha jarayonlar raqamlashtiriladi va boshqariladi." },
        { title: "Bemorlar kam kutadi", desc: "Belgilangan vaqt asosida qabul — tirbandlik 40% gacha kamayadi." },
        { title: "Klinikaga ishonch ortadi", desc: "Zamonaviy xizmat sifati klinika nufuzini oshiradi." },
      ],
    },
    footer: {
      description: "MedFlow — klinikalar va shifoxonalar uchun workflow tizimi",
      privacy: "Maxfiylik siyosati",
      terms: "Foydalanish shartlari",
      rights: "",
    },
  },
  ru: {
    nav: {
      features: "Возможности",
      clinicSystem: "Система клиники",
      onlineQueue: "Онлайн-запись",
      whyUs: "Почему мы?",
      login: "Вход",
    },
    hero: {
      title: "Электронная медицинская система\nБумажная работа осталась в прошлом.",
      subtitle: "Карты пациентов, приёмы и рабочие процессы врачей объединены в одной защищённой системе. MedFlow упрощает все процессы в клинике.",
      ctaPrimary: "Посмотреть систему",
      ctaSecondary: "Посмотреть приложение",
    },
    features: {
      title: "Цифровые решения для клиник",
      subtitle: "Современные инструменты для оптимизации работы врачей и администрации.",
      list: [
        { 
          title: "Электронная карта пациента", 
          desc: "Вся история посещений, диагнозы, назначения, анализы и документы хранятся в единой защищённой системе.", 
          icon: "user" 
        },
        { 
          title: "Управление клиникой (CRM)", 
          desc: "Контроль нагрузки врачей, потока пациентов, финансовых отчётов и работы персонала.", 
          icon: "bar-chart" 
        },
        { 
          title: "Автоматические напоминания", 
          desc: "SMS-уведомления пациентам о приёмах снижают количество пропусков визитов.", 
          icon: "bell" 
        },
        { 
          title: "Онлайн-запись и очередь", 
          desc: "Пациенты записываются дистанционно, что устраняет очереди и хаос в клинике.", 
          icon: "calendar" 
        },
      ],
    },
    telegramSection: {
      title: "Интеграция с Telegram Ботом",
      subtitle: "Приложение пациента полностью интегрировано с Telegram. Не нужно скачивать приложение — управление очередью, записью и историей через бот.",
      button: "Попробовать Telegram Бот"
    },
    demo: {
      titleClinic: "Интерактивная демонстрация — система клиники",
      subtitleClinic: "Единый центр управления для руководителей и врачей.",
      titlePatient: "Интерактивная демонстрация — приложение",
      subtitlePatient: "Пациенты могут записываться к врачу онлайн и отслеживать очередь.",
      roles: {
        admin: "Режим администратора",
        doctor: "Режим врача",
        patient: "Приложение пациента",
      },
      common: {
        liveTest: "Живой Тест",
        searchPlaceholder: "Поиск...",
        yearsOld: "лет",
        save: "Сохранить",
        cancel: "Отмена",
        confirm: "Подтвердить",
        success: "Успешно!",
        back: "Назад"
      },
      doctorView: {
        patientList: "База пациентов",
        queueTitle: "Пациенты в очереди",
        inProgressTitle: "На приеме",
        startVisit: "Начать прием",
        finishVisit: "Завершить прием",
        currentPatient: "Карта пациента",
        addDiagnosis: "Диагноз",
        writePrescription: "Рецепт",
        attachFile: "Прикрепить файл",
        addMedicine: "Добавить лекарство",
        history: "История болезни",
        actions: "Результаты осмотра",
        diagnosisHistory: "Жалоба: Одышка. Назначены антибиотики.",
        testResults: "Результаты анализов",
        modalDiagnosisTitle: "Новый Диагноз",
        modalPrescriptionTitle: "Новый Рецепт",
        inputPlaceholder: "Введите данные...",
        medicinePlaceholder: "Введите название лекарства и нажмите Enter...",
        fileTypes: {
          mrt: "МРТ",
          eco: "ЭКГ/ЭХО",
          rentgen: "Рентген"
        }
      },
      adminView: {
        revenue: "Доходы, расходы",
        patients: "Кол-во пациентов",
        efficiency: "Эффективность",
        chartRevenue: "Доходы (Млн сум)",
        chartVisits: "Еженедельные визиты",
        period: "Последние 30 дней",
        doctorsTitle: "Показатели Врачей",
        doctorName: "Врач",
        specialty: "Специальность",
        patientsTreated: "Принято",
        revenueGen: "Выручка",
        rating: "Рейтинг",
        status: "Статус",
      },
      patientView: {
        welcome: "Здравствуйте, Алишер!",
        nextVisit: "След. визит: 14:30, Др. Азимов",
        bookAppointment: "Записаться",
        myAppointments: "Мои записи",
        medicalHistory: "Документы",
        status: "Очередь",
        today: "Сегодня",
        selectTime: "Выберите время приема",
        queuePosition: "Ваша позиция в очереди",
        yourTurnIn: "Вход на прием через",
        minutes: "минут",
        steps: {
          specialty: "Выберите специальность",
          doctor: "Выберите врача",
          date: "Выберите дату",
          time: "Выберите время",
          confirm: "Подтверждение"
        },
        noDoctors: "Врачей этой специальности не найдено."
      },
    },
    whyUs: {
      title: "Почему клиники выбирают MedFlow?",
      items: [
        { title: "Упрощённые рабочие процессы", desc: "Все операции переведены в цифровой формат." },
        { title: "Меньше ожиданий", desc: "Приёмы по времени сокращают очереди до 40%." },
        { title: "Рост доверия к клинике", desc: "Современный сервис повышает репутацию и лояльность пациентов." },
      ],
    },
    footer: {
      description: "MedFlow — система управления клиникой",
      privacy: "Политика конфиденциальности",
      terms: "Условия использования",
      rights: "",
    },
  },
};

export const MOCK_PATIENTS: Patient[] = [
  { id: '1', name: 'Alisher Sobirjonov', age: 34, lastVisit: '12.05.2024', status: 'waiting', diagnosis: 'Bronxit' },
  { id: '2', name: 'Elena Ivanova', age: 28, lastVisit: '10.05.2024', status: 'in_progress' },
  { id: '3', name: 'Jamshid Karimov', age: 45, lastVisit: '02.04.2024', status: 'completed', diagnosis: 'Gipertoniya' },
  { id: '4', name: 'Malika Azizova', age: 22, lastVisit: 'Bugun', status: 'waiting' },
];

export const MOCK_REVENUE_DATA: ChartData[] = [
  { name: 'Jan', value: 120 },
  { name: 'Feb', value: 135 },
  { name: 'Mar', value: 160 },
  { name: 'Apr', value: 145 },
  { name: 'May', value: 190 },
  { name: 'Jun', value: 210 },
];

export const MOCK_VISIT_DATA: ChartData[] = [
  { name: 'Mon', value: 45 },
  { name: 'Tue', value: 52 },
  { name: 'Wed', value: 48 },
  { name: 'Thu', value: 61 },
  { name: 'Fri', value: 55 },
  { name: 'Sat', value: 30 },
];

export const MOCK_DOCTORS: Doctor[] = [
  { id: 1, name: 'Dr. Aziz Rahimov', specialty: 'Kardiolog', patients: 145, revenue: '12.5 M', rating: 4.9, status: 'busy', initials: 'AR' },
  { id: 2, name: 'Dr. Nodira Aliyeva', specialty: 'Terapevt', patients: 230, revenue: '15.2 M', rating: 4.8, status: 'online', initials: 'NA' },
  { id: 3, name: 'Dr. Jasur Karimov', specialty: 'Nevropatolog', patients: 98, revenue: '9.8 M', rating: 4.7, status: 'offline', initials: 'JK' },
  { id: 4, name: 'Dr. Malika Zokirova', specialty: 'Pediatr', patients: 180, revenue: '11.0 M', rating: 4.9, status: 'online', initials: 'MZ' },
];

export const MOCK_SPECIALTIES: Specialty[] = [
  { id: 'Terapevt', name: 'Terapevt', icon: 'stethoscope', count: 4 },
  { id: 'Kardiolog', name: 'Kardiolog', icon: 'heart-pulse', count: 2 },
  { id: 'Nevropatolog', name: 'Nevropatolog', icon: 'brain', count: 3 },
  { id: 'Pediatr', name: 'Pediatr', icon: 'baby', count: 5 },
  { id: 'Stomatolog', name: 'Stomatolog', icon: 'smile', count: 3 },
  { id: 'Dermatolog', name: 'Dermatolog', icon: 'scan-face', count: 1 },
];