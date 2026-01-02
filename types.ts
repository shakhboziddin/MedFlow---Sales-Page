export type Language = 'uz' | 'ru';

export type Role = 'doctor' | 'admin' | 'patient';

export interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  diagnosis?: string;
  status: 'waiting' | 'in_progress' | 'completed';
}

export interface Attachment {
  type: 'mrt' | 'eco' | 'rentgen';
  name: string;
  date: string;
}

export interface MedicalHistoryItem {
  id: number;
  type: 'diagnosis' | 'prescription' | 'lab' | 'exam';
  title: string;
  date: string;
  description: string;
  attachments?: Attachment[];
  medicines?: string[];
}

export interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed';
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  patients: number;
  revenue: string;
  rating: number;
  status: 'online' | 'busy' | 'offline';
  initials: string;
}

export interface Specialty {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface ChartData {
  name: string;
  value: number;
  value2?: number;
}

export interface TranslationStructure {
  nav: {
    features: string;
    clinicSystem: string;
    onlineQueue: string;
    whyUs: string;
    login: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  features: {
    title: string;
    subtitle: string;
    list: { title: string; desc: string; icon: string }[];
  };
  telegramSection: {
    title: string;
    subtitle: string;
    button: string;
  };
  demo: {
    titleClinic: string;
    subtitleClinic: string;
    titlePatient: string;
    subtitlePatient: string;
    roles: {
      admin: string;
      doctor: string;
      patient: string;
    };
    common: {
      liveTest: string;
      searchPlaceholder: string;
      yearsOld: string;
      save: string;
      cancel: string;
      confirm: string;
      success: string;
      back: string;
    };
    doctorView: {
      patientList: string;
      queueTitle: string;
      inProgressTitle: string;
      startVisit: string;
      finishVisit: string;
      currentPatient: string;
      addDiagnosis: string;
      writePrescription: string;
      attachFile: string;
      addMedicine: string;
      history: string;
      actions: string;
      diagnosisHistory: string;
      testResults: string;
      modalDiagnosisTitle: string;
      modalPrescriptionTitle: string;
      inputPlaceholder: string;
      medicinePlaceholder: string;
      fileTypes: {
        mrt: string;
        eco: string;
        rentgen: string;
      };
    };
    adminView: {
      revenue: string;
      patients: string;
      efficiency: string;
      chartRevenue: string;
      chartVisits: string;
      period: string;
      doctorsTitle: string;
      doctorName: string;
      specialty: string;
      patientsTreated: string;
      revenueGen: string;
      rating: string;
      status: string;
    };
    patientView: {
      welcome: string;
      nextVisit: string;
      bookAppointment: string;
      myAppointments: string;
      medicalHistory: string;
      status: string;
      today: string;
      selectTime: string;
      queuePosition: string;
      yourTurnIn: string;
      minutes: string;
      steps: {
        specialty: string;
        doctor: string;
        date: string;
        time: string;
        confirm: string;
      };
      noDoctors: string;
    };
  };
  whyUs: {
    title: string;
    items: { title: string; desc: string }[];
  };
  footer: {
    description: string;
    privacy: string;
    terms: string;
    rights: string;
  };
}