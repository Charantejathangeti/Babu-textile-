
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, CheckCircle2, User as UserIcon, MapPin, Loader2 } from 'lucide-react';
import { StorageService } from '../services/storage';
import { User } from '../types';

const Login: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Mobile, 2: OTP, 3: Profile Info
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    state: 'Andhra Pradesh' as 'Andhra Pradesh' | 'Telangana'
  });

  const navigate = useNavigate();

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length !== 10) return alert('Enter a valid 10-digit number');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '1234') return alert('Incorrect OTP. Try 1234');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Mock Check if user exists
      const existingUser = StorageService.getUser();
      if (existingUser && existingUser.mobile === mobile) {
        StorageService.saveUser(existingUser);
        navigate('/shop');
        window.location.reload();
      } else {
        setStep(3);
      }
    }, 1000);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      mobile,
      name: profile.name,
      address: profile.address,
      state: profile.state,
      isAdmin: mobile === '9999999999' // Super admin bypass for demo
    };
    StorageService.saveUser(newUser);
    navigate('/shop');
    window.location.reload();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 saree-pattern">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-store-gold/10">
        <div className="bg-store-green p-10 text-center text-store-cream space-y-2">
          <h2 className="text-3xl font-serif tracking-widest text-store-gold">NAMASKARAM</h2>
          <p className="text-sm opacity-80 font-light">Welcome to Babu’s Textiles</p>
        </div>

        <div className="p-10">
          {step === 1 && (
            <form onSubmit={handleMobileSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-store-green tracking-widest flex items-center gap-2">
                  <Phone className="h-3 w-3" /> MOBILE NUMBER
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">+91</span>
                  <input 
                    type="tel" 
                    required 
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-14 pr-4 py-4 rounded-xl border border-amber-200 focus:ring-2 focus:ring-store-gold outline-none text-lg tracking-[0.2em]"
                    placeholder="XXXXXXXXXX"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-store-maroon text-white py-4 rounded-xl font-bold hover:bg-store-green transition shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'SEND OTP'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">Enter 4-digit OTP sent to <span className="text-store-green font-bold">+91 {mobile}</span></p>
                <div className="flex justify-center gap-4">
                  <input 
                    type="text" 
                    required 
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-32 text-center py-4 rounded-xl border border-amber-200 focus:ring-2 focus:ring-store-gold outline-none text-2xl tracking-[0.5em] font-bold"
                    placeholder="----"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-4 italic underline cursor-pointer" onClick={() => setStep(1)}>Change mobile number</p>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-store-gold text-white py-4 rounded-xl font-bold hover:bg-store-maroon transition shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'VERIFY & CONTINUE'}
              </button>
              <p className="text-center text-[10px] text-gray-400">Default OTP is <span className="font-bold">1234</span> for demo.</p>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="flex items-center gap-2 text-store-gold mb-6 border-b border-amber-50 pb-2">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-bold text-sm">MOBILE VERIFIED</span>
              </div>
              
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-store-green flex items-center gap-2"><UserIcon className="h-3 w-3" /> FULL NAME</label>
                <input 
                  type="text" required 
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-store-gold outline-none"
                  placeholder="E.g. Ramesh Kumar"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-store-green flex items-center gap-2"><MapPin className="h-3 w-3" /> DELIVERY ADDRESS</label>
                <textarea 
                  required 
                  value={profile.address}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-store-gold outline-none min-h-[100px]"
                  placeholder="Building No, Area, City, Pin Code"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-store-green">STATE (DELIVERY SERVICE AREA)</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:ring-2 focus:ring-store-gold outline-none bg-white"
                  value={profile.state}
                  onChange={(e) => setProfile({...profile, state: e.target.value as any})}
                >
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-store-green text-white py-4 rounded-xl font-bold hover:bg-store-maroon transition shadow-lg mt-4"
              >
                CREATE ACCOUNT
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
