'use client';

import { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import SectionTitle from '../shared/SectionTitle';
import StatCard from '../shared/StatCard';
import { Globe } from 'lucide-react';

function formatPopulation(number) {
  if (!number) return 'N/A';
  if (number >= 1_000_000_000) return (number / 1_000_000_000).toFixed(2) + 'B';
  if (number >= 1_000_000)     return (number / 1_000_000).toFixed(1) + 'M';
  return number.toLocaleString();
}

export default function CountriesPanel({ countriesData }) {
  const [search, setSearch] = useState('');

  const allCountries = countriesData?.countries || [];
  const top5Asian    = countriesData?.top5AsianByPopulation || [];
  const total        = countriesData?.totalCountries || 0;

  if (allCountries.length === 0) {
    return <div className="countries-panel"><p>No countries data to display.</p></div>;
  }

  const filtered = allCountries.filter(c =>
    c.name.common.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="countries-panel">

      <div className="stat-cards-row">
        <StatCard
          icon={Globe}
          label="Total Countries"
          value={total}
          color="blue"
        />
      </div>

      <SectionTitle>Top 5 Asian Countries by Population</SectionTitle>
      {top5Asian.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={top5Asian} margin={{ top: 8, right: 16, left: 60, bottom: 16 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: 'var(--dp-text)' }}/>
            <YAxis tickFormatter={formatPopulation} tick={{ fill: 'var(--dp-text)' }}/>
            <Tooltip formatter={(value) => [formatPopulation(value), 'Population']} />
            <Bar dataKey="population" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No Asian country data available.</p>
      )}

      <SectionTitle>All Countries ({filtered.length} results)</SectionTitle>
      <input
        type="text"
        className="countries-search"
        placeholder="Search by country name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p>No countries match your search.</p>
      ) : (
        <div className="countries-grid">
          {filtered.map(country => (
            <article key={country.name.common} className="country-card">
              {country.flags?.png && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={country.flags.png} alt={country.name.common} className="country-card-flag" />
              )}
              <h4>{country.name.common}</h4>
              <p>Population: {formatPopulation(country.population)}</p>
              <p>Region: {country.region !== 'Unknown' ? country.region : '—'}</p>
            </article>
          ))}
        </div>
      )}

    </div>
  );
}
