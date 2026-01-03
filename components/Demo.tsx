import React, { useState, useEffect } from 'react';
import { 
  User, Stethoscope, BarChart3, Activity, 
  Calendar, FileText, Plus, Search, CheckCircle, Clock, 
  ChevronRight, X, UserPlus, Users, DollarSign, TrendingUp, Bell, ArrowLeft, Star,
  Upload, Pill, FileImage, Play, CheckSquare, HeartPulse, Brain, Smile, Baby, ScanFace, ChevronLeft, MapPin
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { Language, Role, Patient, MedicalHistoryItem, Appointment, Attachment, Specialty, Doctor } from '../types';
import { TRANSLATIONS, MOCK_PATIENTS, MOCK_REVENUE_DATA, MOCK_VISIT_DATA, MOCK_DOCTORS, MOCK_SPECIALTIES } from '../constants';

interface DemoProps {
  lang: Language;
  activeRole: Role;
  onRoleChange: (role: Role) => void;
}

const Demo: React.FC<DemoProps> = ({ lang, activeRole, onRoleChange }) => {
  const t = TRANSLATIONS[lang].demo;
  const isClinicView = activeRole === 'admin' || activeRole === 'doctor';

  return (
    <div className="py-12 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            {t.common.liveTest}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            {isClinicView ? t.titleClinic : t.titlePatient}
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto px-2">
            {isClinicView ? t.subtitleClinic : t.subtitlePatient}
          </p>
        </div>

        {/* Role Switcher - Horizontal Scroll on Mobile */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 justify-start md:justify-center gap-4 mb-10 px-2 no-scrollbar snap-x">
          {[
            { id: 'admin', icon: BarChart3, label: t.roles.admin },
            { id: 'doctor', icon: Stethoscope, label: t.roles.doctor },
            { id: 'patient', icon: User, label: t.roles.patient },
          ].map((role) => (
            <button
              key={role.id}
              onClick={() => onRoleChange(role.id as Role)}
              className={`snap-center shrink-0 flex items-center gap-3 px-6 py-4 rounded-xl font-bold text-sm transition-all duration-300 border ${
                activeRole === role.id
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 border-blue-600 scale-100 md:scale-105'
                  : 'bg-white text-slate-500 hover:bg-white hover:text-slate-800 border-slate-200 hover:border-slate-300'
              }`}
            >
              <role.icon className={`w-5 h-5 ${activeRole === role.id ? 'text-blue-200' : 'text-slate-400'}`} />
              {role.label}
            </button>
          ))}
        </div>

        {/* Demo Window Container */}
        <div className="relative mx-auto max-w-[1200px]">
           {/* Decorative elements - Hidden on small mobile to prevent overflow */}
           <div className="hidden md:block absolute -top-10 -left-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"></div>
           <div className="hidden md:block absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-400/10 rounded-full blur-3xl"></div>

           <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 min-h-[600px] md:min-h-[700px] flex flex-col relative z-10 ring-1 ring-slate-900/5">
            {/* Fake Browser Toolbar */}
            <div className="bg-slate-50/80 backdrop-blur-sm border-b border-slate-200 px-4 md:px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80 border border-red-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400/80 border border-amber-500/20"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80 border border-green-500/20"></div>
              </div>
              <div className="flex-1 max-w-md mx-auto">
                 <div className="bg-white border border-slate-200 rounded-lg px-4 py-1.5 text-xs font-medium text-slate-400 flex items-center justify-center shadow-sm truncate">
                   <span className="text-slate-300 mr-2">🔒</span> app.medflow.uz/{activeRole}
                 </div>
              </div>
              <div className="w-10 md:w-16"></div> 
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-slate-50/50 relative overflow-x-hidden overflow-y-auto max-h-[800px]">
              {activeRole === 'doctor' && <DoctorView t={t} />}
              {activeRole === 'admin' && <AdminView t={t} />}
              {activeRole === 'patient' && <PatientView t={t} lang={lang} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Doctor Interactive View (Unchanged from previous prompt) --- */
const DoctorView = ({ t }: { t: any }) => {
  // Split patients by status
  const waitingPatients = MOCK_PATIENTS.filter(p => p.status === 'waiting');
  const currentPatients = MOCK_PATIENTS.filter(p => p.status === 'in_progress');
  
  // Combine logic so we have a selected patient
  const [selectedPatient, setSelectedPatient] = useState<Patient>(
    currentPatients.length > 0 ? currentPatients[0] : waitingPatients[0] || MOCK_PATIENTS[0]
  );
  
  const [viewState, setViewState] = useState<'list' | 'detail'>('list'); 
  const [isExamining, setIsExamining] = useState(selectedPatient.status === 'in_progress');

  const [history, setHistory] = useState<MedicalHistoryItem[]>([
    { 
      id: 1, 
      type: 'diagnosis', 
      title: 'Bronxit', 
      date: '12.05.2024', 
      description: t.doctorView.diagnosisHistory,
      medicines: ['Amoxicillin 500mg', 'Paracetamol'],
      attachments: [{ type: 'rentgen', name: 'Ko\'krak qafasi rentgeni', date: '12.05.2024' }]
    },
    { id: 2, type: 'lab', title: t.doctorView.testResults, date: '12.05.2024', description: 'Hemoglobin: 130, RBC: 4.5' }
  ]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'diagnosis' | 'prescription'>('diagnosis');
  const [inputText, setInputText] = useState('');
  
  // New Examination State
  const [medicineInput, setMedicineInput] = useState('');
  const [currentMedicines, setCurrentMedicines] = useState<string[]>([]);
  const [newAttachments, setNewAttachments] = useState<Attachment[]>([]);

  // Update examining state when switching patients
  useEffect(() => {
    setIsExamining(selectedPatient.status === 'in_progress');
    // Reset temporary form data when switching
    setCurrentMedicines([]);
    setNewAttachments([]);
  }, [selectedPatient]);

  const handleSelectPatient = (p: Patient) => {
    setSelectedPatient(p);
    if (window.innerWidth < 1024) {
      setViewState('detail');
    }
  };

  const handleBackToList = () => {
    setViewState('list');
  };

  const handleStatusChange = () => {
    if (selectedPatient.status === 'waiting') {
       // Start Appointment
       const updated = {...selectedPatient, status: 'in_progress' as const};
       setSelectedPatient(updated);
       setIsExamining(true);
       // In a real app, this would update the backend/global state
    } else if (selectedPatient.status === 'in_progress') {
       // Finish Appointment
       const updated = {...selectedPatient, status: 'completed' as const};
       setSelectedPatient(updated);
       setIsExamining(false);
       setViewState('list');
    }
  };

  const handleAddMedicine = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && medicineInput.trim()) {
      setCurrentMedicines([...currentMedicines, medicineInput.trim()]);
      setMedicineInput('');
    }
  };

  const handleAttachFile = (type: 'mrt' | 'eco' | 'rentgen') => {
    const names = {
      mrt: 'Bosh miya MRT',
      eco: 'Yurak EXO',
      rentgen: 'O\'pka Rentgen'
    };
    setNewAttachments([...newAttachments, { type, name: names[type], date: new Date().toLocaleDateString() }]);
  };

  const handleAdd = (type: 'diagnosis' | 'prescription') => {
    setModalType(type);
    setModalOpen(true);
    setInputText('');
  };

  const handleSaveModal = () => {
    if (!inputText) return;
    const newItem: MedicalHistoryItem = {
      id: Date.now(),
      type: modalType,
      title: modalType === 'diagnosis' ? t.doctorView.modalDiagnosisTitle : t.doctorView.modalPrescriptionTitle,
      date: new Date().toLocaleDateString(),
      description: inputText,
      medicines: modalType === 'diagnosis' ? [] : undefined
    };
    setHistory([newItem, ...history]);
    setModalOpen(false);
  };

  const handleSaveExamination = () => {
    // This saves the full examination from the main UI
    if (currentMedicines.length === 0 && newAttachments.length === 0) return;

    const newItem: MedicalHistoryItem = {
      id: Date.now(),
      type: 'exam',
      title: 'Qabul natijalari',
      date: new Date().toLocaleDateString(),
      description: 'Navbatdagi ko\'rik o\'tkazildi.',
      medicines: currentMedicines,
      attachments: newAttachments
    };
    setHistory([newItem, ...history]);
    setCurrentMedicines([]);
    setNewAttachments([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 h-full min-h-[600px] relative">
      {/* Sidebar List */}
      <div className={`
        ${viewState === 'list' ? 'block' : 'hidden lg:flex'}
        col-span-1 lg:col-span-4 border-r border-slate-200 bg-white h-full flex-col
      `}>
        <div className="p-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div className="relative group mb-4">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              placeholder={t.common.searchPlaceholder}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-6">
          {/* Current Patients */}
          <div>
            <h4 className="px-3 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              {t.doctorView.inProgressTitle}
            </h4>
            {currentPatients.length === 0 && <p className="px-3 text-sm text-slate-400 italic">Hozirda bemor yo'q</p>}
            {currentPatients.map((p) => (
              <div 
                key={p.id}
                onClick={() => handleSelectPatient(p)}
                className={`mx-2 p-3 rounded-xl cursor-pointer transition-all border ${
                  selectedPatient.id === p.id 
                    ? 'bg-blue-50 border-blue-200 shadow-sm' 
                    : 'bg-white border-transparent hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-bold text-sm ${selectedPatient.id === p.id ? 'text-blue-900' : 'text-slate-700'}`}>{p.name}</span>
                  <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">ON-AIR</span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3"/> 14:00 (15 min)</p>
              </div>
            ))}
          </div>

           {/* Waiting Queue */}
           <div>
            <h4 className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {t.doctorView.queueTitle}
            </h4>
            {waitingPatients.map((p) => (
              <div 
                key={p.id}
                onClick={() => handleSelectPatient(p)}
                className={`mx-2 p-3 rounded-xl cursor-pointer transition-all border ${
                  selectedPatient.id === p.id 
                    ? 'bg-blue-50 border-blue-200 shadow-sm' 
                    : 'bg-white border-transparent hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-semibold text-sm ${selectedPatient.id === p.id ? 'text-blue-900' : 'text-slate-700'}`}>{p.name}</span>
                  <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-medium">Wait</span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3"/> {p.age} {t.common.yearsOld}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`
        ${viewState === 'detail' ? 'block' : 'hidden lg:flex'}
        col-span-1 lg:col-span-8 bg-slate-50/50 flex-col h-full overflow-hidden relative
      `}>
        {/* Top Header Panel */}
        <div className="bg-white border-b border-slate-200 px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm z-20 relative">
          <div className="flex items-center gap-4">
             <button onClick={handleBackToList} className="lg:hidden text-slate-500">
               <ArrowLeft className="w-5 h-5" />
             </button>
             <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-lg font-bold border-2 border-slate-200">
                {selectedPatient.name.charAt(0)}
             </div>
             <div>
                <h2 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">{selectedPatient.name}</h2>
                <div className="flex items-center gap-3 text-xs md:text-sm text-slate-500">
                  <span className="flex items-center gap-1"><User className="w-3 h-3"/> ID: #{selectedPatient.id}4023</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {selectedPatient.age} {t.common.yearsOld}</span>
                </div>
             </div>
          </div>

          <div className="w-full md:w-auto flex gap-2">
            {selectedPatient.status === 'waiting' ? (
              <button 
                onClick={handleStatusChange}
                className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                {t.doctorView.startVisit}
              </button>
            ) : selectedPatient.status === 'in_progress' ? (
              <button 
                 onClick={handleStatusChange}
                 className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2"
              >
                <CheckSquare className="w-4 h-4" />
                {t.doctorView.finishVisit}
              </button>
            ) : (
              <span className="px-4 py-2 bg-slate-100 text-slate-500 rounded-lg font-bold text-sm">Completed</span>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-20">
          
          {/* Active Examination Area - Only visible if In Progress */}
          {isExamining && (
            <div className="bg-white rounded-2xl border border-blue-100 shadow-lg shadow-blue-50 mb-8 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
               <div className="bg-blue-50/50 px-6 py-3 border-b border-blue-100 flex justify-between items-center">
                 <h3 className="font-bold text-blue-800 flex items-center gap-2">
                   <Activity className="w-4 h-4" />
                   {t.doctorView.actions}
                 </h3>
                 <button onClick={handleSaveExamination} className="text-xs font-bold text-blue-600 hover:underline">
                    Qo'shish
                 </button>
               </div>
               <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* File Attachments */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">{t.doctorView.attachFile}</label>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                       <button onClick={() => handleAttachFile('mrt')} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-slate-600 hover:text-blue-700">
                         <FileImage className="w-6 h-6" />
                         <span className="text-[10px] font-bold">{t.doctorView.fileTypes.mrt}</span>
                       </button>
                       <button onClick={() => handleAttachFile('eco')} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-slate-600 hover:text-blue-700">
                         <Activity className="w-6 h-6" />
                         <span className="text-[10px] font-bold">{t.doctorView.fileTypes.eco}</span>
                       </button>
                       <button onClick={() => handleAttachFile('rentgen')} className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-slate-600 hover:text-blue-700">
                         <Upload className="w-6 h-6" />
                         <span className="text-[10px] font-bold">{t.doctorView.fileTypes.rentgen}</span>
                       </button>
                    </div>
                    {newAttachments.length > 0 && (
                      <div className="space-y-1">
                        {newAttachments.map((file, idx) => (
                           <div key={idx} className="flex items-center gap-2 text-xs bg-slate-50 p-2 rounded border border-slate-100 text-slate-600">
                             <CheckCircle className="w-3 h-3 text-green-500" />
                             {file.name}
                           </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Medicine Prescriptions */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">{t.doctorView.addMedicine}</label>
                    <div className="relative mb-3">
                       <input 
                         type="text" 
                         value={medicineInput}
                         onChange={(e) => setMedicineInput(e.target.value)}
                         onKeyDown={handleAddMedicine}
                         className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder={t.doctorView.medicinePlaceholder}
                       />
                       <Plus className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {currentMedicines.map((med, idx) => (
                         <span key={idx} className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-bold border border-indigo-100">
                           <Pill className="w-3 h-3" />
                           {med}
                         </span>
                       ))}
                    </div>
                  </div>
               </div>
            </div>
          )}

          <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            {t.doctorView.history}
          </h4>
          
          {/* Timeline */}
          <div className="space-y-6 pl-4 border-l-2 border-slate-100 ml-2">
            {history.map((item) => (
              <div key={item.id} className="relative pl-6">
                <div className={`absolute -left-[31px] w-8 h-8 rounded-full border-4 border-slate-50 flex items-center justify-center ${
                    item.type === 'diagnosis' ? 'bg-red-500 text-white' :
                    item.type === 'prescription' ? 'bg-blue-500 text-white' :
                    item.type === 'exam' ? 'bg-indigo-500 text-white' :
                    'bg-purple-500 text-white'
                }`}>
                    {item.type === 'diagnosis' ? <Activity className="w-4 h-4" /> : 
                     item.type === 'prescription' ? <FileText className="w-4 h-4" /> : 
                     item.type === 'exam' ? <Stethoscope className="w-4 h-4" /> : 
                     <Activity className="w-4 h-4" />}
                </div>
                
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-slate-800 text-base">{item.title}</p>
                      <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-md">{item.date}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.description}</p>
                    
                    {/* Attachments Section within History */}
                    {item.attachments && item.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-3 mb-3 pt-3 border-t border-slate-50">
                        {item.attachments.map((file, i) => (
                          <div key={i} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer border border-slate-100">
                             <FileImage className="w-4 h-4 text-blue-500" />
                             {file.name}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Medicines Section within History */}
                    {item.medicines && item.medicines.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.medicines.map((med, i) => (
                           <span key={i} className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">
                             <Pill className="w-3 h-3" />
                             {med}
                           </span>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Simple Modal for Quick Actions */}
        {modalOpen && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 md:p-8">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-in fade-in zoom-in duration-200">
              <h3 className="text-xl font-bold mb-4">
                {modalType === 'diagnosis' ? t.doctorView.modalDiagnosisTitle : t.doctorView.modalPrescriptionTitle}
              </h3>
              <textarea 
                className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] mb-4"
                placeholder={t.doctorView.inputPlaceholder}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                autoFocus
              ></textarea>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {t.common.cancel}
                </button>
                <button 
                  onClick={handleSaveModal}
                  className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg shadow-blue-200 transition-colors"
                >
                  {t.common.save}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* --- Admin Interactive View (Unchanged) --- */
const AdminView = ({ t }: { t: any }) => {
  return (
    <div className="p-4 md:p-8 h-full overflow-y-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
         <h3 className="text-2xl font-bold text-slate-800">{t.roles.admin}</h3>
         <div className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm flex items-center gap-2">
           <Calendar className="w-4 h-4 text-slate-400" />
           {t.adminView.period}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: DollarSign, color: 'blue', value: '124.5 M', label: t.adminView.revenue, growth: '+12.5%' },
          { icon: Users, color: 'indigo', value: '1,240', label: t.adminView.patients, growth: '+5.2%' },
          { icon: TrendingUp, color: 'purple', value: '94%', label: t.adminView.efficiency, growth: null },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute right-0 top-0 w-24 h-24 bg-${stat.color}-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 bg-${stat.color}-100 rounded-xl text-${stat.color}-600`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                {stat.growth && <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">{stat.growth}</span>}
              </div>
              <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-6">{t.adminView.chartRevenue}</h4>
          <div className="h-64 md:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Area type="monotone" dataKey="value" stroke="#2563eb" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-6">{t.adminView.chartVisits}</h4>
           <div className="h-64 md:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_VISIT_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-bold text-slate-800 text-lg">{t.adminView.doctorsTitle}</h4>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:text-blue-700 hover:underline">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">{t.adminView.doctorName}</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">{t.adminView.specialty}</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">{t.adminView.patientsTreated}</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">{t.adminView.revenueGen}</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">{t.adminView.rating}</th>
                <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">{t.adminView.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_DOCTORS.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {doc.initials}
                      </div>
                      <span className="font-semibold text-slate-800 text-sm">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-500">{doc.specialty}</td>
                  <td className="py-3 px-4 text-sm text-slate-800 font-medium text-center">{doc.patients}</td>
                  <td className="py-3 px-4 text-sm text-slate-800 font-medium text-right">{doc.revenue}</td>
                  <td className="py-3 px-4">
                     <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-sm">
                       <Star className="w-4 h-4 fill-amber-400" />
                       <span className="text-slate-700">{doc.rating}</span>
                     </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      doc.status === 'online' ? 'bg-green-50 text-green-700 border-green-100' :
                      doc.status === 'busy' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-slate-50 text-slate-500 border-slate-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        doc.status === 'online' ? 'bg-green-500' :
                        doc.status === 'busy' ? 'bg-amber-500' :
                        'bg-slate-400'
                      }`}></span>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* --- Patient Interactive View --- */
const PatientView = ({ t, lang }: { t: any, lang: Language }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, doctor: 'Dr. Azimov', specialty: 'Kardiolog', date: t.patientView.today, time: '14:30', status: 'upcoming' }
  ]);
  const [queuePos, setQueuePos] = useState(3);
  const [notifyMe, setNotifyMe] = useState(false);
  
  // Booking Wizard State
  // 0: Dashboard, 1: Select Specialty, 2: Select Doctor, 3: Select Date, 4: Select Time, 5: Confirm
  const [bookingStep, setBookingStep] = useState(0); 
  const [bookingData, setBookingData] = useState<{
    specialty: Specialty | null;
    doctor: Doctor | null;
    date: string | null;
    time: string | null;
  }>({ specialty: null, doctor: null, date: null, time: null });

  // Simulate queue movement
  useEffect(() => {
    const timer = setInterval(() => {
      setQueuePos(prev => prev > 1 ? prev - 1 : 1);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  const resetBooking = () => {
    setBookingStep(0);
    setBookingData({ specialty: null, doctor: null, date: null, time: null });
  };

  const confirmBooking = () => {
    if (bookingData.doctor && bookingData.date && bookingData.time) {
      const newAppt: Appointment = {
        id: Date.now(),
        doctor: bookingData.doctor.name,
        specialty: bookingData.doctor.specialty,
        date: bookingData.date,
        time: bookingData.time,
        status: 'upcoming'
      };
      setAppointments([...appointments, newAppt]);
      resetBooking();
    }
  };

  const getAvailableDoctors = () => {
    if (!bookingData.specialty) return [];
    return MOCK_DOCTORS.filter(doc => doc.specialty === bookingData.specialty?.name);
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 5; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      dates.push(nextDay.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' }));
    }
    return dates;
  };

  const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

  // Icons map for specialties
  const icons: Record<string, React.ReactNode> = {
    'stethoscope': <Stethoscope className="w-6 h-6" />,
    'heart-pulse': <HeartPulse className="w-6 h-6" />,
    'brain': <Brain className="w-6 h-6" />,
    'smile': <Smile className="w-6 h-6" />,
    'baby': <Baby className="w-6 h-6" />,
    'scan-face': <ScanFace className="w-6 h-6" />,
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 h-full overflow-y-auto pb-24 relative">
      
      {/* --- DASHBOARD VIEW (Step 0) --- */}
      {bookingStep === 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white mb-8 shadow-xl shadow-blue-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.patientView.welcome}</h2>
              <p className="text-blue-50 text-base md:text-lg mb-8 opacity-90">{t.patientView.nextVisit}</p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setBookingStep(1)}
                  className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-2 w-full md:w-auto justify-center"
                >
                  <Plus className="w-5 h-5" />
                  {t.patientView.bookAppointment}
                </button>
              </div>
            </div>
          </div>

          {/* Queue Status Visualizer */}
          <div className="mb-8">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              {t.patientView.status}
            </h3>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                 <div>
                   <p className="text-sm text-slate-500 mb-1">{t.patientView.queuePosition}</p>
                   <p className="text-4xl font-extrabold text-slate-900">{queuePos}</p>
                 </div>
                 <div className="text-left sm:text-right">
                    <p className="text-sm text-slate-500 mb-1">{t.patientView.yourTurnIn}</p>
                    <p className="text-xl font-bold text-blue-600">~{queuePos * 15} {t.patientView.minutes}</p>
                 </div>
               </div>
               
               {/* Visual Queue Bar */}
               <div className="h-4 bg-slate-100 rounded-full overflow-hidden flex mb-6">
                 <div className={`h-full bg-blue-500 transition-all duration-1000 ease-out`} style={{width: `${100 - (queuePos * 10)}%`}}></div>
               </div>

               <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                 <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                   <Bell className={`w-4 h-4 ${notifyMe ? 'text-blue-500 fill-blue-500' : 'text-slate-400'}`} />
                   {lang === 'uz' ? 'Meni ogohlantirish' : 'Уведомить меня'}
                 </div>
                 <button 
                   onClick={() => setNotifyMe(!notifyMe)}
                   className={`w-11 h-6 rounded-full transition-colors relative ${notifyMe ? 'bg-blue-600' : 'bg-slate-200'}`}
                 >
                   <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${notifyMe ? 'translate-x-5' : ''}`}></span>
                 </button>
               </div>
            </div>
          </div>

          {/* Appointments List */}
          <div>
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              {t.patientView.myAppointments}
            </h3>
            <div className="space-y-3">
              {appointments.map(appt => (
                  <div key={appt.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex gap-4 items-center">
                    <div className="bg-blue-50 text-blue-700 p-3 rounded-xl text-center min-w-[70px]">
                      <span className="block text-xs font-bold uppercase tracking-wider">{appt.date}</span>
                      <span className="block text-xl font-extrabold">{appt.time}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-base md:text-lg">{appt.specialty}</h4>
                      <p className="text-sm text-slate-500 font-medium">{appt.doctor}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wide bg-green-50 text-green-700 px-2 py-0.5 rounded-md">
                        {appt.status === 'upcoming' ? (lang === 'uz' ? 'Tasdiqlangan' : 'Подтверждено') : 'Yakunlangan'}
                      </span>
                    </div>
                    <div className="bg-green-100 text-green-700 p-2 rounded-full hidden sm:block">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- BOOKING WIZARD STEPS --- */}
      {bookingStep > 0 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-300 h-full flex flex-col">
           {/* Wizard Header */}
           <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setBookingStep(bookingStep - 1)} className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
                 <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                 <h2 className="text-xl font-bold text-slate-900">
                    {bookingStep === 1 && t.patientView.steps.specialty}
                    {bookingStep === 2 && t.patientView.steps.doctor}
                    {bookingStep === 3 && t.patientView.steps.date}
                    {bookingStep === 4 && t.patientView.steps.time}
                    {bookingStep === 5 && t.patientView.steps.confirm}
                 </h2>
                 <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map(s => (
                       <div key={s} className={`h-1.5 w-8 rounded-full transition-colors ${s <= bookingStep ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto pb-4">
              
              {/* Step 1: Specialty */}
              {bookingStep === 1 && (
                <div className="grid grid-cols-2 gap-4">
                   {MOCK_SPECIALTIES.map(spec => (
                      <button 
                        key={spec.id}
                        onClick={() => {
                          setBookingData({...bookingData, specialty: spec});
                          setBookingStep(2);
                        }}
                        className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-1 transition-all text-left group"
                      >
                         <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                           {icons[spec.icon] || <Stethoscope />}
                         </div>
                         <h3 className="font-bold text-slate-900 mb-1">{spec.name}</h3>
                         <p className="text-xs text-slate-500">{spec.count} doctors</p>
                      </button>
                   ))}
                </div>
              )}

              {/* Step 2: Doctor */}
              {bookingStep === 2 && (
                <div className="space-y-4">
                   {getAvailableDoctors().length === 0 ? (
                      <div className="text-center py-12 text-slate-400">
                         <Stethoscope className="w-12 h-12 mx-auto mb-4 opacity-50" />
                         <p>{t.patientView.noDoctors}</p>
                      </div>
                   ) : (
                      getAvailableDoctors().map(doc => (
                        <div 
                          key={doc.id}
                          onClick={() => {
                            setBookingData({...bookingData, doctor: doc});
                            setBookingStep(3);
                          }}
                          className="p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
                        >
                           <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-lg">
                              {doc.initials}
                           </div>
                           <div className="flex-1">
                              <h3 className="font-bold text-slate-900">{doc.name}</h3>
                              <p className="text-sm text-slate-500">{doc.specialty}</p>
                              <div className="flex items-center gap-1 mt-1">
                                 <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                 <span className="text-xs font-bold text-slate-700">{doc.rating}</span>
                              </div>
                           </div>
                           <ChevronRight className="text-slate-300" />
                        </div>
                      ))
                   )}
                </div>
              )}

              {/* Step 3: Date */}
              {bookingStep === 3 && (
                <div className="space-y-4">
                   <div className="bg-white p-4 rounded-2xl border border-slate-200">
                      <h4 className="font-bold text-slate-800 mb-4">{bookingData.doctor?.name}</h4>
                      <div className="flex flex-col gap-2">
                         {generateDates().map(date => (
                            <button
                               key={date}
                               onClick={() => {
                                 setBookingData({...bookingData, date: date});
                                 setBookingStep(4);
                               }}
                               className="p-4 rounded-xl border border-slate-100 hover:border-blue-500 hover:bg-blue-50 text-left transition-all flex justify-between items-center"
                            >
                               <span className="font-medium text-slate-700">{date}</span>
                               <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">Available</span>
                            </button>
                         ))}
                      </div>
                   </div>
                </div>
              )}

              {/* Step 4: Time */}
              {bookingStep === 4 && (
                 <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200">
                       <h4 className="font-bold text-slate-800 mb-6">{bookingData.date}</h4>
                       <div className="grid grid-cols-3 gap-3">
                          {timeSlots.map(time => (
                             <button
                                key={time}
                                onClick={() => {
                                   setBookingData({...bookingData, time: time});
                                   setBookingStep(5);
                                }}
                                className="py-2 px-1 rounded-lg border border-slate-200 text-sm font-medium hover:border-blue-500 hover:text-white hover:bg-blue-600 transition-all text-slate-600"
                             >
                                {time}
                             </button>
                          ))}
                       </div>
                    </div>
                 </div>
              )}

               {/* Step 5: Confirmation */}
               {bookingStep === 5 && (
                 <div className="space-y-6">
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
                       <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-6">
                          <CheckCircle className="w-8 h-8" />
                       </div>
                       <h3 className="text-xl font-bold text-slate-900 mb-2">
                         {lang === 'uz' ? 'Qabulni tasdiqlaysizmi?' : 'Подтверждаете запись?'}
                       </h3>
                       <p className="text-slate-500 mb-8">
                         {lang === 'uz' ? 'Quyidagi ma\'lumotlarni tekshiring' : 'Проверьте данные ниже'}
                       </p>

                       <div className="bg-slate-50 rounded-xl p-4 text-left space-y-3 mb-8">
                          <div className="flex justify-between border-b border-slate-200 pb-2">
                             <span className="text-slate-500 text-sm">Shifokor</span>
                             <span className="font-bold text-slate-900">{bookingData.doctor?.name}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-200 pb-2">
                             <span className="text-slate-500 text-sm">Mutaxassislik</span>
                             <span className="font-bold text-slate-900">{bookingData.doctor?.specialty}</span>
                          </div>
                          <div className="flex justify-between border-b border-slate-200 pb-2">
                             <span className="text-slate-500 text-sm">Sana</span>
                             <span className="font-bold text-slate-900">{bookingData.date}</span>
                          </div>
                          <div className="flex justify-between">
                             <span className="text-slate-500 text-sm">Vaqt</span>
                             <span className="font-bold text-slate-900">{bookingData.time}</span>
                          </div>
                       </div>

                       <button 
                         onClick={confirmBooking}
                         className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                       >
                         {t.common.confirm}
                       </button>
                    </div>
                 </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
}

export default Demo;