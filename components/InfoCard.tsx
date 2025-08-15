import React from 'react';

const InfoCard: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg mb-6 prose max-w-none">
      <h2 className="text-3xl font-bold text-slate-800 mb-4 text-center">Asistencia Jurídica Asociados</h2>
      
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-blue-700 mb-4">🔷 Beneficio: Asesoría Jurídica</h3>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-red-600 text-white p-4 rounded-lg text-center font-semibold shadow">
            Asesoría y acompañamiento en sumarios administrativos.
          </div>
          <div className="bg-red-600 text-white p-4 rounded-lg text-center font-semibold shadow">
            Asesoría en causas penales mediante pool de abogados de la ANF.
          </div>
          <div className="bg-red-600 text-white p-4 rounded-lg text-center font-semibold shadow">
            Copago de 20 UF para asesoría en causa penal con abogado particular de confianza.
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-slate-800 mb-3">📝 Pasos para derivación y seguimiento de causas</h3>
        <ol className="list-decimal list-inside space-y-4 text-gray-700">
          <li>
            <span className="font-semibold">Enviar email a Javier Calisto</span> (director de bienestar) <a className="text-blue-600 underline hover:text-blue-800" href="mailto:jcalisto@minpublico.cl">jcalisto@minpublico.cl</a> con copia a <a className="text-blue-600 underline hover:text-blue-800" href="mailto:tguevara@fiscales.cl">tguevara@fiscales.cl</a>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Indicar datos personales (nombre, RUT, email, número celular).</li>
              <li>Indicar qué asesoría solicita: administrativa o penal (si es penal, indicar abogado/a).</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Recepción del email:</span> se deriva a abogada/o indicado y se registra para seguimiento.
          </li>
          <li>
            <span className="font-semibold">Para pago copago de 20 UF:</span> enviar boleta de honorarios a <a className="text-blue-600 underline hover:text-blue-800" href="mailto:tguevara@fiscales.cl">tguevara@fiscales.cl</a>, indicando nombre del asociado/a, número de causa y datos bancarios.
          </li>
        </ol>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-red-700 mb-4">👩‍⚖️ Pool Abogados ANF</h3>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="mb-4">
            <h4 className="font-bold text-slate-800 text-lg">Sumarios administrativos:</h4>
            <p className="text-gray-700"><strong>Gabriel Osorio</strong> — <a href="tel:+56969082544" className="text-blue-600 hover:text-blue-800">+56 9 6908 2544</a> — <a href="mailto:gabriel@osva.cl" className="text-blue-600 hover:text-blue-800">gabriel@osva.cl</a></p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-lg">Causas penales:</h4>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Juan Yuseff</strong> — <a href="tel:+56981584508" className="text-blue-600 hover:text-blue-800">+56 9 8158 4508</a> — <a href="mailto:yuseffabogados@gmail.com" className="text-blue-600 hover:text-blue-800">yuseffabogados@gmail.com</a></li>
              <li><strong>Marcela García</strong> — <a href="tel:+56981309329" className="text-blue-600 hover:text-blue-800">+56 9 8130 9329</a> — <a href="mailto:mgarciawigolorchewabogada@gmail.com" className="text-blue-600 hover:text-blue-800">mgarciawigolorchewabogada@gmail.com</a></li>
              <li><strong>Ricardo Freire</strong> — <a href="tel:+56998705876" className="text-blue-600 hover:text-blue-800">+56 9 9870 5876</a> — <a href="mailto:ricardo@freireabogados.cl" className="text-blue-600 hover:text-blue-800">ricardo@freireabogados.cl</a></li>
              <li><strong>Silvia Olivares</strong> — <a href="tel:+56996554754" className="text-blue-600 hover:text-blue-800">+56 9 9655 4754</a> — <a href="mailto:silvia.olivares@olifiabogados.cl" className="text-blue-600 hover:text-blue-800">silvia.olivares@olifiabogados.cl</a></li>
              <li><strong>Fernanda Cuevas</strong> — <a href="tel:+56962298445" className="text-blue-600 hover:text-blue-800">+56 9 6229 8445</a> — <a href="mailto:fernandacuevas@cmlegales.com" className="text-blue-600 hover:text-blue-800">fernandacuevas@cmlegales.com</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoCard;
