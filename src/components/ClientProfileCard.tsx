import React from 'react';
import { Client } from '../types';
import { ShieldAlert, HeartHandshake, UserCheck, MapPin, Briefcase, GraduationCap } from 'lucide-react';

interface ClientProfileCardProps {
  client: Client;
}

export const ClientProfileCard: React.FC<ClientProfileCardProps> = ({ client }) => {
  return (
    <aside className="client-profile-sidebar">
      <div className="client-header-info">
        <img src={client.avatar} alt={client.name} className="client-avatar-lg" />
        <div className="client-meta">
          <h2>{client.name}, {client.age}</h2>
          <p className="flex items-center gap-1">
            <MapPin size={13} style={{ display: 'inline', verticalAlign: '-1px' }} /> {client.city} • {client.profession}
          </p>
          <div className="client-matchmaker-tag">
            <UserCheck size={12} />
            <span>Assigned: {client.assignedMatchmaker}</span>
          </div>
        </div>
      </div>

      <div className="client-bio-quote">
        “{client.bio}”
      </div>

      {/* HARD CONSTRAINTS / DEAL BREAKERS */}
      <div className="constraints-box">
        <div className="constraints-box-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ShieldAlert size={14} />
            Hard Deal Breakers
          </span>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, background: '#fecaca', padding: '1px 5px', borderRadius: 4 }}>
            NON-NEGOTIABLE
          </span>
        </div>

        <div className="constraint-rule-item">
          <strong>• Smoking:</strong> Allowed: [{client.dealBreakers.smokingAllowed.join(', ')}]
        </div>
        <div className="constraint-rule-item">
          <strong>• Drinking:</strong> Allowed: [{client.dealBreakers.drinkingAllowed.join(', ')}]
        </div>
        <div className="constraint-rule-item">
          <strong>• Children:</strong> [{client.dealBreakers.childrenPreferenceAllowed.join(' / ')}]
        </div>
        <div className="constraint-rule-item">
          <strong>• Age Bracket:</strong> {client.dealBreakers.minAge} to {client.dealBreakers.maxAge} years
        </div>
        <div className="constraint-rule-item">
          <strong>• Locations:</strong> {client.dealBreakers.allowedLocations.join(', ')}
        </div>
      </div>

      {/* PREFERENCES (STRONG & SOFT) */}
      <div className="preferences-box">
        <div className="preferences-box-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <HeartHandshake size={14} />
            Soft & Weighted Preferences
          </span>
          <span style={{ fontSize: '0.68rem', fontWeight: 600, background: '#e2e8f0', padding: '1px 5px', borderRadius: 4 }}>
            RANKING SIGNALS
          </span>
        </div>

        <div className="preference-item">
          <strong>Ideal Age:</strong> {client.softPreferences.idealAgeRange[0]}–{client.softPreferences.idealAgeRange[1]} yrs (+20 pts)
        </div>

        <div className="preference-item">
          <strong>Target Cities:</strong> {client.softPreferences.preferredLocations.join(', ')} (+25 pts)
        </div>

        <div className="preference-item">
          <strong>Target Industries:</strong> {client.softPreferences.preferredProfessions.join(', ')} (+20 pts)
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Lifestyle & Interests (+20 pts max):
          </div>
          <div className="pill-tag-group">
            {client.softPreferences.lifestyleKeywords.map((kw) => (
              <span key={kw} className="pill-tag">
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
