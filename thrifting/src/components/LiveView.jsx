import { useState } from 'react';
import { Radio, Calendar, Eye, Bell, Play, Store, MapPin, Sparkles } from 'lucide-react';
import SafeImage from './SafeImage.jsx';

export default function LiveView({
  liveSessions = [],
  onOpenLiveRoom,
  onToggleReminder
}) {
  const [activeSubTab, setActiveSubTab] = useState('live'); // 'live' | 'upcoming'

  const liveList = liveSessions.filter((s) => s.status === 'live');
  const upcomingList = liveSessions.filter((s) => s.status === 'upcoming');

  return (
    <div className="live-page-container">
      {/* Header Pengantar Live */}
      <div className="live-page-header">
        <div className="live-header-text">
          <div className="live-title-badge">
            <Radio size={13} className="pulse-red" />
            <span>THRIFTING LIVE</span>
          </div>
          <h1 className="live-main-heading">Lihat Pakaian Pre-Loved Secara Langsung</h1>
          <p className="live-subheading">
            Tonton seller memperlihatkan serat kain, ukuran panjang x lebar, dan detail jahitan secara transparan sebelum kamu memutuskan membeli.
          </p>
        </div>

        {/* 2 Tab: Sedang Live & Akan Datang */}
        <div className="live-subtabs-nav" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeSubTab === 'live'}
            className={`live-subtab-btn ${activeSubTab === 'live' ? 'is-active' : ''}`}
            onClick={() => setActiveSubTab('live')}
          >
            <Radio size={14} />
            <span>Sedang Live ({liveList.length})</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeSubTab === 'upcoming'}
            className={`live-subtab-btn ${activeSubTab === 'upcoming' ? 'is-active' : ''}`}
            onClick={() => setActiveSubTab('upcoming')}
          >
            <Calendar size={14} />
            <span>Akan Datang ({upcomingList.length})</span>
          </button>
        </div>
      </div>

      {/* Grid Sesi Live */}
      {activeSubTab === 'live' ? (
        <div className="live-sessions-grid">
          {liveList.map((session) => (
            <article key={session.id} className="live-session-card">
              <div
                className="live-card-thumbnail-wrap"
                onClick={() => onOpenLiveRoom(session)}
                role="button"
                tabIndex={0}
              >
                <img
                  src={session.thumbnail}
                  alt={session.title}
                  className="live-card-thumb"
                />
                <div className="live-badge-stream">
                  <Radio size={11} /> LIVE
                </div>
                <div className="live-badge-viewers">
                  <Eye size={12} /> {session.viewers}
                </div>
                <div className="live-play-hover-indicator">
                  <Play size={24} fill="#fff" />
                </div>
              </div>

              <div className="live-card-content">
                <div className="live-card-seller">
                  <img src={session.avatar} alt={session.shop} className="seller-avatar-mini" />
                  <div className="seller-text">
                    <strong>{session.shop}</strong>
                    <small><MapPin size={10} /> {session.location}</small>
                  </div>
                </div>

                <h3
                  className="live-card-title"
                  onClick={() => onOpenLiveRoom(session)}
                >
                  {session.title}
                </h3>

                <button
                  type="button"
                  className="btn-join-live"
                  onClick={() => onOpenLiveRoom(session)}
                >
                  <Play size={14} fill="currentColor" />
                  <span>Tonton Live (DEMO)</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="live-sessions-grid">
          {upcomingList.map((session) => (
            <article key={session.id} className="live-session-card upcoming-card">
              <div className="live-card-thumbnail-wrap">
                <img
                  src={session.thumbnail}
                  alt={session.title}
                  className="live-card-thumb"
                />
                <div className="live-badge-schedule">
                  <Calendar size={11} /> {session.scheduledTime}
                </div>
              </div>

              <div className="live-card-content">
                <div className="live-card-seller">
                  <img src={session.avatar} alt={session.shop} className="seller-avatar-mini" />
                  <div className="seller-text">
                    <strong>{session.shop}</strong>
                    <small><MapPin size={10} /> {session.location}</small>
                  </div>
                </div>

                <h3 className="live-card-title">{session.title}</h3>

                <button
                  type="button"
                  className={`btn-set-reminder ${session.reminded ? 'is-set' : ''}`}
                  onClick={() => onToggleReminder(session.id)}
                >
                  <Bell size={14} fill={session.reminded ? 'currentColor' : 'none'} />
                  <span>{session.reminded ? 'Pengingat Terpasang' : 'Ingatkan Saya'}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Catatan Protokol Live */}
      <div className="live-demo-disclaimer">
        <span>✦</span>
        <p>
          <strong>Simulasi Thrifting Live:</strong> Fitur live streaming ini menggunakan video placeholder dan simulasi interaktif berlabel DEMO. Seluruh interaksi chat dan pembelian dapat dicoba secara langsung.
        </p>
      </div>
    </div>
  );
}
