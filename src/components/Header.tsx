import React from 'react';
import { Client } from '../types';
import { Sparkles, BarChart3, Users } from 'lucide-react';

interface HeaderProps {
  clients: Client[];
  selectedClientId: string;
  onSelectClient: (id: string) => void;
  onOpenMetrics: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  clients,
  selectedClientId,
  onSelectClient,
  onOpenMetrics,
}) => {
  return (
    <header>
      <div className="top-nav">
        <div className="brand-wrapper">
          <div className="brand-logo-icon">💍</div>
          <div className="brand-title-area">
            <h1>The Date Crew</h1>
            <div className="brand-subtitle">
              <span>Preference-Aware Matchmaking Assistant</span>
              <span className="badge-tag">DECISION SUPPORT TOOL</span>
            </div>
          </div>
        </div>

        <div className="nav-actions">
          <button className="btn-secondary" onClick={onOpenMetrics}>
            <BarChart3 size={16} />
            <span>Funnel & Pilot KPIs</span>
          </button>
        </div>
      </div>

      <div className="client-selector-bar">
        <div className="client-selector-label">
          <Users size={15} />
          <span>Active Client:</span>
        </div>
        <div className="client-pills">
          {clients.map((client) => {
            const isActive = client.id === selectedClientId;
            return (
              <button
                key={client.id}
                className={`client-pill-btn ${isActive ? 'active' : ''}`}
                onClick={() => onSelectClient(client.id)}
              >
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="client-pill-avatar"
                />
                <span>{client.name}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>({client.city})</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
