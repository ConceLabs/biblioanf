import React, { useState, useMemo } from 'react';

interface AbonoCalculatorProps {
  onBack: () => void;
}

const AbonoCalculator: React.FC<AbonoCalculatorProps> = ({ onBack }) => {
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [nonComplianceDays, setNonComplianceDays] = useState('0');
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    if (!startDate || !endDate) return null;

    const d1 = new Date(startDate);
    const d2 = new Date(endDate);
    if (d1 > d2) return { totalDays: 0, effectiveDays: 0, abonoDays: '0.00', error: "La fecha de inicio no puede ser posterior a la fecha de fin." };

    const inc = parseInt(nonComplianceDays) || 0;
    const diff = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24)) + 1;
    const efectivos = Math.max(0, diff - inc);
    const abono = (efectivos * 8) / 12;

    return {
      totalDays: diff,
      effectiveDays: efectivos,
      abonoDays: abono.toFixed(2),
      error: null,
    };
  }, [startDate, endDate, nonComplianceDays]);

  const handleCalculate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="flex flex-col flex-grow bg-white overflow-hidden">
      <header className="bg-slate-100 p-4 flex justify-between items-center border-b z-10 flex-shrink-0">
        <button onClick={onBack} className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors">
          <i className="fa-solid fa-arrow-left"></i>
          <span className="font-semibold">Volver</span>
        </button>
        <h2 className="font-bold text-slate-800 text-lg">Calculadora de Abonos</h2>
      </header>
      <div className="flex-grow overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-md mx-auto">
            <form className="bg-white p-6 rounded-xl shadow-lg">
              <h1 className="text-xl font-bold text-center text-slate-800 mb-6">Abono por Arresto Nocturno</h1>
              <div className="space-y-4">
                <div>
                  <label htmlFor="startDate" className="block text-slate-600 mb-1 font-semibold">Primer día de arresto</label>
                  <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-slate-600 mb-1 font-semibold">Último día de arresto</label>
                  <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div>
                  <label htmlFor="nonComplianceDays" className="block text-slate-600 mb-1 font-semibold">Días de incumplimiento</label>
                  <input type="number" id="nonComplianceDays" value={nonComplianceDays} onChange={e => setNonComplianceDays(e.target.value)} min="0" required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <button onClick={handleCalculate} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Calcular días y abono
                </button>
              </div>
            </form>
          
          {showResult && result && (
             <div className="mt-6">
              {result.error ? (
                  <div className="text-center p-4 bg-red-100 text-red-700 rounded-lg">
                    {result.error}
                  </div>
              ) : (
                <>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="font-bold text-slate-700 mb-2">Resultados:</h3>
                    <div className="text-slate-600 space-y-1">
                      <p>Período total: <span className="font-semibold">{result.totalDays} día{result.totalDays !== 1 ? 's' : ''}</span></p>
                      <p>Días efectivos de arresto: <span className="font-semibold">{result.effectiveDays}</span></p>
                    </div>
                  </div>
                  <div className="mt-4 bg-green-50 text-green-800 p-4 rounded-lg text-center shadow-inner">
                    <p className="font-semibold uppercase tracking-wider">Días de Abono</p>
                    <p className="text-4xl font-bold text-green-600 mt-1">{result.abonoDays}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AbonoCalculator;