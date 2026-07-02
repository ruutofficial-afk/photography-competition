'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Trophy, Calendar, Camera, Check, X, Lock, User, 
  LogOut, Search, Filter, ExternalLink, FileText, 
  MapPin, Mail, Phone, ArrowLeftRight, ArrowLeft, RefreshCw, Eye 
} from 'lucide-react';

interface Submission {
  id: string;
  full_name: string;
  mobile_number: string;
  email: string;
  dob: string;
  address: string;
  story: string;
  location: string;
  raw_image_url: string;
  edited_image_url: string;
  submission_status: 'submitted' | 'approved' | 'rejected';
  created_at: string;
}

export default function AdminPage() {
  // Authentication & Loading States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Login Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Submissions Data States
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'submitted' | 'approved' | 'rejected'>('all');

  // Detail Modal State
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  // Modal Image Toggle
  const [modalViewMode, setModalViewMode] = useState<'compare' | 'raw' | 'edited'>('compare');

  // Initial Authentication Check
  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/submissions');
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Auth verification failed', err);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        // Fetch submissions
        await checkAuthAndFetch();
      } else {
        setLoginError(data.error || 'Invalid credentials.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setSubmissions([]);
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch('/api/admin/submissions');
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
      }
    } catch (err) {
      console.error('Refresh failed', err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: 'approved' | 'rejected') => {
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        // Update local state
        setSubmissions((prev) =>
          prev.map((sub) =>
            sub.id === id ? { ...sub, submission_status: newStatus } : sub
          )
        );
        // Update selected modal submission details if open
        if (selectedSubmission && selectedSubmission.id === id) {
          setSelectedSubmission((prev) => (prev ? { ...prev, submission_status: newStatus } : null));
        }
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update submission status.');
      }
    } catch (err: any) {
      alert(err.message || 'Network error.');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Compute stats
  const totalCount = submissions.length;
  const pendingCount = submissions.filter((s) => s.submission_status === 'submitted').length;
  const approvedCount = submissions.filter((s) => s.submission_status === 'approved').length;
  const rejectedCount = submissions.filter((s) => s.submission_status === 'rejected').length;

  // Filter & Search submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch = 
      sub.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.mobile_number.includes(searchQuery) ||
      sub.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' || 
      sub.submission_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Render Loader
  if (loading) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#E6DED1] text-[#664436]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#664436] border-t-transparent rounded-full animate-spin"></div>
          <span className="font-extrabold uppercase tracking-widest text-xs">Verifying Host Session...</span>
        </div>
      </main>
    );
  }

  // 1. RENDER LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen w-full flex flex-col justify-center items-center bg-[#E6DED1] px-4 font-sans select-none relative overflow-hidden">
        {/* Sunburst background */}
        <div className="absolute inset-0 bg-sunburst opacity-[0.05] pointer-events-none z-0"></div>

        {/* Vintage Styled Card */}
        <div className="relative max-w-md w-full bg-[#F9F6F0] border-4 border-[#664436] rounded-3xl p-8 sm:p-10 shadow-2xl z-10">
          {/* Decorative Corner Cutouts */}
          <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-[#E6DED1] border-4 border-[#664436] z-10"></div>
          <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-[#E6DED1] border-4 border-[#664436] z-10"></div>
          <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-[#E6DED1] border-4 border-[#664436] z-10"></div>
          <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-[#E6DED1] border-4 border-[#664436] z-10"></div>

          {/* Dash border inside */}
          <div className="absolute inset-2 border-2 border-dashed border-[#895158]/35 rounded-2xl pointer-events-none"></div>

          {/* Header */}
          <div className="flex flex-col items-center gap-2 mb-6 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/favicon-192x192.png"
              alt="ṚUUT Logo"
              className="w-12 h-12 object-contain"
            />
            <h1 className="text-xl font-extrabold tracking-widest text-[#664436] font-serif uppercase">
              ṚUUT ADMIN
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-[#895158]">
              Contest Host Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Username Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#664436]">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter username (e.g. host)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D1C7B7] bg-white text-[#4A3324] font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#895158]/35 focus:border-[#664436]"
                />
                <User size={16} className="absolute left-3.5 top-3.5 text-[#664436]/50" />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#664436]">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter security key"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D1C7B7] bg-white text-[#4A3324] font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#895158]/35 focus:border-[#664436]"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-[#664436]/50" />
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="py-4 bg-[#664436] text-[#F9F6F0] rounded-xl font-extrabold text-sm uppercase tracking-widest hover:bg-[#4A3324] active:scale-95 transition-all shadow-md mt-2 flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#F9F6F0] border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </>
              ) : (
                <span>Access Dashboard</span>
              )}
            </button>

            <Link
              href="/"
              className="text-[11px] font-bold text-center uppercase tracking-widest text-[#895158] hover:text-[#e28d1c] transition-colors mt-2"
            >
              ← Back to Submission Form
            </Link>
          </form>
        </div>
      </main>
    );
  }

  // 2. RENDER ADMIN DASHBOARD
  return (
    <main className="min-h-screen w-full flex flex-col bg-[#E6DED1] font-sans pb-12">
      {/* Sunburst background */}
      <div className="absolute inset-0 bg-sunburst opacity-[0.04] pointer-events-none z-0"></div>

      {/* HEADER / NAVBAR */}
      <header className="relative w-full py-5 px-6 flex justify-between items-center border-b-4 border-[#664436] bg-[#F9F6F0] z-20 shadow-sm select-none">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/favicon-192x192.png"
            alt="ṚUUT Logo"
            className="w-9 h-9 object-contain"
          />
          <div>
            <span className="font-extrabold tracking-widest text-lg uppercase text-[#664436] font-serif block leading-none">
              ṚUUT
            </span>
            <span className="text-[9px] font-extrabold uppercase text-[#895158] tracking-widest mt-0.5 block">
              Contest Host Dashboard
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 border-2 border-[#D1C7B7] hover:border-[#664436] text-[#664436] rounded-xl hover:bg-[#EADBC8]/20 transition-all flex items-center justify-center"
            title="Refresh Data"
          >
            <RefreshCw size={16} className={`${refreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#895158] hover:text-[#664436] border-2 border-[#895158]/30 px-3.5 py-1.5 rounded-full transition-all"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* CONTENT BODY */}
      <div className="relative w-full max-w-7xl mx-auto px-4 mt-8 z-10 flex flex-col gap-6">
        
        {/* STATS OVERVIEW SECTION */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Stat Card: Total */}
          <div className="bg-[#F9F6F0] border-2 border-[#664436] rounded-2xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <span className="text-[10px] font-black text-[#895158] uppercase tracking-wider">Total Submissions</span>
            <span className="text-4xl font-extrabold text-[#664436] font-heading mt-2">{totalCount}</span>
            <div className="absolute right-3 bottom-3 text-[#664436]/10 font-heading text-6xl pointer-events-none select-none">#</div>
          </div>

          {/* Stat Card: Pending */}
          <div className="bg-[#F9F6F0] border-2 border-[#664436] rounded-2xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <span className="text-[10px] font-black text-[#e28d1c] uppercase tracking-wider">Pending Review</span>
            <span className="text-4xl font-extrabold text-[#e28d1c] font-heading mt-2">{pendingCount}</span>
            <div className="absolute right-3 bottom-3 text-[#e28d1c]/10 font-heading text-6xl pointer-events-none select-none">?</div>
          </div>

          {/* Stat Card: Approved */}
          <div className="bg-[#F9F6F0] border-2 border-[#664436] rounded-2xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <span className="text-[10px] font-black text-green-700 uppercase tracking-wider">Approved Entries</span>
            <span className="text-4xl font-extrabold text-green-700 font-heading mt-2">{approvedCount}</span>
            <div className="absolute right-3 bottom-3 text-green-700/10 font-heading text-6xl pointer-events-none select-none">✓</div>
          </div>

          {/* Stat Card: Rejected */}
          <div className="bg-[#F9F6F0] border-2 border-[#664436] rounded-2xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <span className="text-[10px] font-black text-red-700 uppercase tracking-wider">Rejected Entries</span>
            <span className="text-4xl font-extrabold text-red-700 font-heading mt-2">{rejectedCount}</span>
            <div className="absolute right-3 bottom-3 text-red-700/10 font-heading text-6xl pointer-events-none select-none">✗</div>
          </div>

        </div>

        {/* SEARCH AND FILTERS */}
        <div className="bg-[#F9F6F0] border-2 border-[#664436] rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm select-none">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search by name, email, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D1C7B7] bg-white text-[#4A3324] font-semibold text-xs transition-all focus:outline-none focus:ring-2 focus:ring-[#895158]/20 focus:border-[#664436]"
            />
            <Search size={14} className="absolute left-3.5 top-3.5 text-[#664436]/50" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs font-extrabold text-[#895158] hover:text-[#664436]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#664436] mr-2 flex items-center gap-1.5">
              <Filter size={12} />
              Filter:
            </span>
            {[
              { label: 'All', value: 'all' },
              { label: 'Pending', value: 'submitted' },
              { label: 'Approved', value: 'approved' },
              { label: 'Rejected', value: 'rejected' },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => setStatusFilter(btn.value as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  statusFilter === btn.value
                    ? 'bg-[#664436] text-[#F9F6F0] shadow-sm'
                    : 'bg-[#EADBC8]/30 hover:bg-[#EADBC8]/50 text-[#664436]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* SUBMISSIONS GRID FEED */}
        {filteredSubmissions.length === 0 ? (
          <div className="bg-[#F9F6F0]/50 border-2 border-dashed border-[#664436]/30 rounded-3xl p-12 text-center text-[#664436]">
            <h3 className="text-lg font-bold uppercase tracking-wider mb-1">No Submissions Found</h3>
            <p className="text-xs text-[#664436]/70 max-w-xs mx-auto">
              There are no contest submissions matching your search criteria or filters at this time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSubmissions.map((sub) => {
              const dateStr = new Date(sub.created_at).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });

              return (
                <div 
                  key={sub.id} 
                  className="bg-[#F9F6F0] border-2 border-[#664436] rounded-2xl overflow-hidden shadow-md flex flex-col group transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  
                  {/* Dynamic Compare Preview */}
                  <div className="relative aspect-[3/2] bg-[#E6DED1] border-b-2 border-[#664436] overflow-hidden group-hover:brightness-[1.02] transition-all">
                    {/* Visual Comparison Split (Raw vs Final) */}
                    <div className="absolute inset-0 flex select-none">
                      <div className="w-1/2 h-full relative overflow-hidden border-r border-[#664436]/30">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={sub.raw_image_url}
                          alt="Raw preview"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 bg-[#664436]/80 text-[#F9F6F0] text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded">
                          RAW
                        </span>
                      </div>
                      <div className="w-1/2 h-full relative overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={sub.edited_image_url}
                          alt="Final preview"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 right-2 bg-[#895158]/90 text-[#F9F6F0] text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded">
                          FINAL
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 select-none">
                      {sub.submission_status === 'approved' && (
                        <span className="bg-green-50 border border-green-200 text-green-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                          Approved
                        </span>
                      )}
                      {sub.submission_status === 'rejected' && (
                        <span className="bg-red-50 border border-red-200 text-red-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                          Rejected
                        </span>
                      )}
                      {sub.submission_status === 'submitted' && (
                        <span className="bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                          Pending Review
                        </span>
                      )}
                    </div>

                    {/* Quick View Button overlay on hover */}
                    <button 
                      onClick={() => {
                        setSelectedSubmission(sub);
                        setModalViewMode('compare');
                      }}
                      className="absolute inset-0 bg-[#664436]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto"
                    >
                      <span className="bg-[#F9F6F0] text-[#664436] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-md flex items-center gap-1.5 select-none hover:scale-105 active:scale-95 transition-all">
                        <Eye size={14} />
                        View Details
                      </span>
                    </button>
                  </div>

                  {/* Submission Info Summary */}
                  <div className="p-4 flex flex-col flex-1 gap-2.5">
                    
                    <div className="flex justify-between items-start gap-1 select-none">
                      <div className="truncate">
                        <h4 className="font-extrabold text-[#664436] uppercase tracking-wide truncate">
                          {sub.full_name}
                        </h4>
                        <span className="text-[10px] font-bold text-[#895158] uppercase tracking-widest flex items-center gap-1 mt-0.5">
                          <MapPin size={10} />
                          {sub.location}
                        </span>
                      </div>
                      <span className="text-[9px] font-extrabold text-[#664436]/60 shrink-0 uppercase tracking-widest bg-[#EADBC8]/30 px-2 py-0.5 rounded border border-[#D1C7B7]/20">
                        {dateStr}
                      </span>
                    </div>

                    {/* Story Snippet */}
                    <p className="text-xs text-[#664436]/80 font-medium line-clamp-2 leading-relaxed bg-[#EADBC8]/10 p-2 rounded-lg border border-[#D1C7B7]/10 flex-1">
                      &ldquo;{sub.story}&rdquo;
                    </p>

                    {/* Grid Action Controls */}
                    <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#664436]/10 select-none">
                      <button
                        onClick={() => handleStatusUpdate(sub.id, 'approved')}
                        disabled={actionLoadingId === sub.id}
                        className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border flex items-center justify-center gap-1.5 ${
                          sub.submission_status === 'approved'
                            ? 'bg-green-700 text-[#F9F6F0] border-green-800'
                            : 'bg-white hover:bg-green-50 border-green-600/30 hover:border-green-600 text-green-700'
                        } ${actionLoadingId === sub.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <Check size={12} className="stroke-[3]" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(sub.id, 'rejected')}
                        disabled={actionLoadingId === sub.id}
                        className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border flex items-center justify-center gap-1.5 ${
                          sub.submission_status === 'rejected'
                            ? 'bg-red-700 text-[#F9F6F0] border-red-800'
                            : 'bg-white hover:bg-red-50 border-red-600/30 hover:border-red-600 text-red-700'
                        } ${actionLoadingId === sub.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <X size={12} className="stroke-[3]" />
                        Reject
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* DETAIL MODAL OVERLAY */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto select-none">
          
          <div className="bg-[#F9F6F0] border-4 border-[#664436] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col p-4 sm:p-6 md:p-8 animate-scale-in">
            
            {/* Scalloped Corners for Modal */}
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-[#E6DED1] border-4 border-[#664436] z-10 hidden sm:block"></div>
            <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-[#E6DED1] border-4 border-[#664436] z-10 hidden sm:block"></div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-[#E6DED1] border-4 border-[#664436] z-10 hidden sm:block"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-[#E6DED1] border-4 border-[#664436] z-10 hidden sm:block"></div>
            
            {/* Modal Inner Dash Border */}
            <div className="absolute inset-2 border-2 border-dashed border-[#895158]/30 rounded-2xl pointer-events-none hidden sm:block"></div>

            {/* Header Details */}
            <div className="relative flex justify-between items-start border-b border-[#664436]/20 pb-4 mb-4 select-text">
              <div>
                <span className="text-[10px] font-black text-[#895158] uppercase tracking-wider block mb-1">
                  Submission ID: {selectedSubmission.id}
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#664436] font-heading leading-none">
                  {selectedSubmission.full_name}
                </h3>
                <span className="text-xs font-bold text-[#e28d1c] uppercase tracking-widest flex items-center gap-1 mt-1 bg-[#EADBC8]/30 px-2.5 py-0.5 rounded-full w-fit">
                  <MapPin size={12} />
                  {selectedSubmission.location}
                </span>
              </div>
              <button 
                onClick={() => setSelectedSubmission(null)}
                className="p-1 border-2 border-[#664436] rounded-full hover:bg-red-50 hover:text-red-700 hover:border-red-700 transition-all select-none"
              >
                <X size={18} className="stroke-[3]" />
              </button>
            </div>

            {/* Modal Body Grid */}
            <div className="flex flex-col lg:flex-row gap-6 overflow-y-visible">
              
              {/* Left Column: Interactive Image Comparison */}
              <div className="flex-1 flex flex-col gap-3">
                
                {/* View Selector Controls */}
                <div className="flex justify-center border border-[#664436]/20 rounded-xl overflow-hidden text-[10px] font-black uppercase tracking-wider bg-white select-none">
                  <button
                    onClick={() => setModalViewMode('compare')}
                    className={`flex-1 py-2 text-center transition-all ${
                      modalViewMode === 'compare' ? 'bg-[#664436] text-[#F9F6F0]' : 'hover:bg-[#EADBC8]/20 text-[#664436]'
                    }`}
                  >
                    Compare Side-by-Side
                  </button>
                  <button
                    onClick={() => setModalViewMode('raw')}
                    className={`flex-1 py-2 text-center border-l border-r border-[#664436]/15 transition-all ${
                      modalViewMode === 'raw' ? 'bg-[#664436] text-[#F9F6F0]' : 'hover:bg-[#EADBC8]/20 text-[#664436]'
                    }`}
                  >
                    Raw Image
                  </button>
                  <button
                    onClick={() => setModalViewMode('edited')}
                    className={`flex-1 py-2 text-center transition-all ${
                      modalViewMode === 'edited' ? 'bg-[#664436] text-[#F9F6F0]' : 'hover:bg-[#EADBC8]/20 text-[#664436]'
                    }`}
                  >
                    Final Image
                  </button>
                </div>

                {/* Main View Area */}
                <div className="relative aspect-[3/2] bg-stone-900 border-2 border-[#664436] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                  
                  {modalViewMode === 'compare' && (
                    <div className="absolute inset-0 flex select-none">
                      <div className="w-1/2 h-full relative overflow-hidden border-r border-[#F9F6F0]/20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={selectedSubmission.raw_image_url}
                          alt="Raw file"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded">
                          RAW
                        </span>
                        <a 
                          href={selectedSubmission.raw_image_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="absolute top-2 left-2 p-1.5 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all"
                          title="Open full size RAW"
                        >
                          <ExternalLink size={10} />
                        </a>
                      </div>
                      <div className="w-1/2 h-full relative overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={selectedSubmission.edited_image_url}
                          alt="Final file"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded">
                          FINAL
                        </span>
                        <a 
                          href={selectedSubmission.edited_image_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all"
                          title="Open full size FINAL"
                        >
                          <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  )}

                  {modalViewMode === 'raw' && (
                    <div className="absolute inset-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedSubmission.raw_image_url}
                        alt="Raw full size"
                        className="w-full h-full object-contain"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded">
                        RAW Original
                      </span>
                      <a 
                        href={selectedSubmission.raw_image_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all"
                        title="Open full size"
                      >
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}

                  {modalViewMode === 'edited' && (
                    <div className="absolute inset-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedSubmission.edited_image_url}
                        alt="Edited full size"
                        className="w-full h-full object-contain"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded">
                        FINAL Color-Graded
                      </span>
                      <a 
                        href={selectedSubmission.edited_image_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all"
                        title="Open full size"
                      >
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}

                </div>

              </div>

              {/* Right Column: Participant details & Story (Selectable text) */}
              <div className="w-full lg:w-96 flex flex-col gap-4 select-text">
                
                {/* Status bar */}
                <div className="bg-white border border-[#664436]/25 rounded-2xl p-3 flex justify-between items-center select-none">
                  <span className="text-[10px] font-black text-[#664436] uppercase tracking-wider">Status:</span>
                  <div className="flex items-center gap-1.5">
                    {selectedSubmission.submission_status === 'submitted' && (
                      <span className="bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full">
                        Pending review
                      </span>
                    )}
                    {selectedSubmission.submission_status === 'approved' && (
                      <span className="bg-green-50 border border-green-200 text-green-700 text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full">
                        Approved
                      </span>
                    )}
                    {selectedSubmission.submission_status === 'rejected' && (
                      <span className="bg-red-50 border border-red-200 text-red-700 text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full">
                        Rejected
                      </span>
                    )}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-white border border-[#664436]/20 rounded-2xl p-4 flex flex-col gap-3">
                  <h4 className="text-[10px] font-black text-[#895158] uppercase tracking-widest pb-1.5 border-b border-[#D1C7B7]/30 select-none">
                    Contestant Details
                  </h4>
                  
                  {/* Email */}
                  <div className="flex items-center gap-2.5">
                    <Mail size={14} className="text-[#664436]/60 shrink-0 select-none" />
                    <div className="overflow-hidden">
                      <span className="text-[9px] font-bold text-[#895158] uppercase tracking-wider block select-none">Email Address</span>
                      <a href={`mailto:${selectedSubmission.email}`} className="text-xs font-bold text-[#664436] hover:underline block truncate">
                        {selectedSubmission.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-2.5">
                    <Phone size={14} className="text-[#664436]/60 shrink-0 select-none" />
                    <div>
                      <span className="text-[9px] font-bold text-[#895158] uppercase tracking-wider block select-none">Mobile Number</span>
                      <a href={`tel:${selectedSubmission.mobile_number}`} className="text-xs font-bold text-[#664436] hover:underline block">
                        {selectedSubmission.mobile_number}
                      </a>
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="flex items-center gap-2.5">
                    <Calendar size={14} className="text-[#664436]/60 shrink-0 select-none" />
                    <div>
                      <span className="text-[9px] font-bold text-[#895158] uppercase tracking-wider block select-none">Date of Birth</span>
                      <span className="text-xs font-bold text-[#664436] block">
                        {new Date(selectedSubmission.dob).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Postal Address */}
                  <div className="flex items-start gap-2.5 border-t border-[#D1C7B7]/25 pt-2 mt-1">
                    <FileText size={14} className="text-[#664436]/60 mt-0.5 shrink-0 select-none" />
                    <div>
                      <span className="text-[9px] font-bold text-[#895158] uppercase tracking-wider block select-none">Postal Address</span>
                      <p className="text-xs font-semibold text-[#664436] leading-normal">
                        {selectedSubmission.address}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Creative Story text */}
                <div className="bg-[#EADBC8]/20 border border-[#664436]/15 rounded-2xl p-4 flex flex-col gap-2 max-h-56 overflow-y-auto">
                  <h4 className="text-[10px] font-black text-[#895158] uppercase tracking-widest pb-1 border-b border-[#D1C7B7]/25 select-none">
                    Story behind the photo
                  </h4>
                  <p className="text-xs font-semibold text-[#664436]/90 leading-relaxed italic pr-1">
                    &ldquo;{selectedSubmission.story}&rdquo;
                  </p>
                </div>

              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#664436]/20 select-none">
              <button
                onClick={() => handleStatusUpdate(selectedSubmission.id, 'rejected')}
                disabled={actionLoadingId === selectedSubmission.id}
                className="px-5 py-2.5 rounded-xl border border-red-700 text-red-700 font-extrabold text-xs uppercase tracking-widest hover:bg-red-50 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <X size={14} className="stroke-[3]" />
                Reject Entry
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedSubmission.id, 'approved')}
                disabled={actionLoadingId === selectedSubmission.id}
                className="px-5 py-2.5 rounded-xl bg-green-700 text-[#F9F6F0] font-extrabold text-xs uppercase tracking-widest hover:bg-green-800 active:scale-95 transition-all flex items-center gap-1.5 shadow"
              >
                <Check size={14} className="stroke-[3]" />
                Approve Entry
              </button>
            </div>

          </div>

        </div>
      )}

    </main>
  );
}
