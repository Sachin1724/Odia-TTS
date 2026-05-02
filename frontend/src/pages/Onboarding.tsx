import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    ageGroup: '',
    gender: '',
    district: '',
    subArea: '',
    dialect: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save metadata to localStorage to access in the Collect page
    localStorage.setItem('odiaTtsMetadata', JSON.stringify({
      name: formData.fullName,
      age: formData.ageGroup,
      gender: formData.gender,
      district: formData.district,
      subArea: formData.subArea,
      dialect: formData.dialect
    }));
    navigate('/collect');
  };

  return (
    <div className="bg-[#141313] text-[#e5e2e1] font-sans min-h-screen flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg relative">
        <Link to="/" className="absolute -top-12 left-0 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-medium">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Home
        </Link>
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-semibold text-white mb-2">OdiaTTS Research</h1>
          <p className="text-sm text-zinc-400 max-w-sm mx-auto">
            Contribute your voice to help us build comprehensive open-source datasets for Odia dialect synthesis.
          </p>
        </header>

        {/* Form Card */}
        <main className="bg-[#201f1f] rounded-xl border border-white/10 p-6 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-[#e5e2e1] mb-1 uppercase tracking-wider" htmlFor="fullName">Full Name</label>
              <input
                className="w-full bg-[#0e0e0e] border border-[#444748] rounded-md px-4 py-2 font-mono text-sm text-[#e5e2e1] focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors placeholder:text-zinc-600"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                required
                type="text"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Age & Gender Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#e5e2e1] mb-1 uppercase tracking-wider" htmlFor="ageGroup">Age Group</label>
                <select
                  className="w-full bg-[#0e0e0e] border border-[#444748] rounded-md px-4 py-2 font-mono text-sm text-[#e5e2e1] focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
                  id="ageGroup"
                  name="ageGroup"
                  required
                  value={formData.ageGroup}
                  onChange={handleChange}
                >
                  <option disabled value="">Select</option>
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55+">55+</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#e5e2e1] mb-1 uppercase tracking-wider" htmlFor="gender">Gender</label>
                <select
                  className="w-full bg-[#0e0e0e] border border-[#444748] rounded-md px-4 py-2 font-mono text-sm text-[#e5e2e1] focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option disabled value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#e5e2e1] mb-1 uppercase tracking-wider" htmlFor="district">District</label>
                <select
                  className="w-full bg-[#0e0e0e] border border-[#444748] rounded-md px-4 py-2 font-mono text-sm text-[#e5e2e1] focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
                  id="district"
                  name="district"
                  required
                  value={formData.district}
                  onChange={handleChange}
                >
                  <option disabled value="">Select District</option>
                  <option value="Angul">Angul</option>
                  <option value="Balangir">Balangir</option>
                  <option value="Balasore">Balasore (Baleswar)</option>
                  <option value="Bargarh">Bargarh</option>
                  <option value="Bhadrak">Bhadrak</option>
                  <option value="Boudh">Boudh</option>
                  <option value="Cuttack">Cuttack</option>
                  <option value="Deogarh">Deogarh</option>
                  <option value="Dhenkanal">Dhenkanal</option>
                  <option value="Gajapati">Gajapati</option>
                  <option value="Ganjam">Ganjam</option>
                  <option value="Jagatsinghpur">Jagatsinghpur</option>
                  <option value="Jajpur">Jajpur</option>
                  <option value="Jharsuguda">Jharsuguda</option>
                  <option value="Kalahandi">Kalahandi</option>
                  <option value="Kandhamal">Kandhamal</option>
                  <option value="Kendrapara">Kendrapara</option>
                  <option value="Kendujhar">Kendujhar (Keonjhar)</option>
                  <option value="Khordha">Khordha</option>
                  <option value="Koraput">Koraput</option>
                  <option value="Malkangiri">Malkangiri</option>
                  <option value="Mayurbhanj">Mayurbhanj</option>
                  <option value="Nabarangpur">Nabarangpur</option>
                  <option value="Nayagarh">Nayagarh</option>
                  <option value="Nuapada">Nuapada</option>
                  <option value="Puri">Puri</option>
                  <option value="Rayagada">Rayagada</option>
                  <option value="Sambalpur">Sambalpur</option>
                  <option value="Subarnapur">Subarnapur (Sonepur)</option>
                  <option value="Sundargarh">Sundargarh</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#e5e2e1] mb-1 uppercase tracking-wider" htmlFor="subArea">Sub-Area/Village</label>
                <input
                  className="w-full bg-[#0e0e0e] border border-[#444748] rounded-md px-4 py-2 font-mono text-sm text-[#e5e2e1] focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors placeholder:text-zinc-600"
                  id="subArea"
                  name="subArea"
                  placeholder="e.g., Bhubaneswar"
                  required
                  type="text"
                  value={formData.subArea}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Target Dialect */}
            <div>
              <label className="block text-xs font-medium text-[#e5e2e1] mb-1 uppercase tracking-wider" htmlFor="dialect">Target Dialect</label>
              <select
                className="w-full bg-[#0e0e0e] border border-[#444748] rounded-md px-4 py-2 font-mono text-sm text-[#e5e2e1] focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-colors"
                id="dialect"
                name="dialect"
                required
                value={formData.dialect}
                onChange={handleChange}
              >
                <option disabled value="">Select primary spoken dialect</option>
                <option value="Standard Odia">Standard Odia (Mughalbandi)</option>
                <option value="Sambalpuri">Sambalpuri (Western)</option>
                <option value="Ganjami">Ganjami (Southern)</option>
                <option value="Baleswari">Baleswari (Northern)</option>
                <option value="Desiya">Desiya (Koraputia)</option>
                <option value="Phulbani">Phulbani Odia</option>
                <option value="Kalahandia">Kalahandia</option>
                <option value="Sundargarhi">Sundargarhi</option>
                <option value="Bhatri">Bhatri</option>
                <option value="Halbi">Halbi</option>
              </select>
              <p className="text-[11px] text-zinc-500 mt-1">Select the dialect you use most naturally in daily conversation.</p>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                className="w-full bg-white text-black text-xs font-medium uppercase tracking-widest py-4 rounded-md hover:bg-white/90 transition-colors flex items-center justify-center gap-2 group"
                type="submit"
              >
                <span>Start Recording Session</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </form>
        </main>

        {/* Footer */}
        <footer className="mt-8 flex items-center justify-center gap-2 text-zinc-500 opacity-80">
          <span className="material-symbols-outlined text-[14px]">lock</span>
          <span className="font-mono text-[11px]">All data is encrypted and strictly used for academic research.</span>
        </footer>
      </div>
    </div>
  );
};

export default Onboarding;
