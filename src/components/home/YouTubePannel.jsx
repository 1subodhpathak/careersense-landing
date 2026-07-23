import React, { useState } from 'react';
import { 
  Play, Clock, PlayIcon, ExternalLink, 
  BarChart, Database, Code, AlertTriangle, Brain,
  Video, Film, Radio, GraduationCap, ListVideo, MessageSquare 
} from 'lucide-react';

const YouTubePanel = () => {
  // --- 1. CHANNEL NAVIGATION TABS ---
  const channelTabs = [
    { name: 'Videos', icon: <Video size={16}/>, url: 'https://www.youtube.com/@Senseofdata/videos' },
    { name: 'Shorts', icon: <Film size={16}/>, url: 'https://www.youtube.com/@Senseofdata/shorts' },
    { name: 'Live', icon: <Radio size={16}/>, url: 'https://www.youtube.com/@Senseofdata/streams' },
    { name: 'Courses', icon: <GraduationCap size={16}/>, url: 'https://www.youtube.com/@Senseofdata/courses' },
    { name: 'Playlists', icon: <ListVideo size={16}/>, url: 'https://www.youtube.com/@Senseofdata/playlists' },
    { name: 'Posts', icon: <MessageSquare size={16}/>, url: 'https://www.youtube.com/@Senseofdata/posts' }
  ];

  // Video Data Configuration
const videos = [
  {
    id: '7_kw3EFxi7g',
    title: "Don't Get Scammed! The TRUTH About Data Analytics Courses",
    channel: "DataSense",
    views: "12K views",
    duration: "33:24",
    category: "AI Builder",
    icon: <Brain size={14} className="text-purple-500" />
  },
  {
    id: 'WcMu3mGwwgU',
    title: "Claude Fable 5 vs Opus 4.8 vs GPT-5.5 Codex - Who Builds Better?",
    channel: "DataSense",
    views: "240K Views",
    duration: "19:37",
    category: "AI Battle",
    icon: <Brain size={14} className="text-purple-500" />
  },
  {
    id: 'wgdeJUm38yU',
    title: "Python Project 1: Build Snake Game in Python",
    channel: "DataSense",
    views: "12K Views",
    duration: "36:48",
    category: "Python",
    icon: <Code size={14} className="text-emerald-500" />
  },
  
  {
    id: 'GYNal5k6Nlo',
    title: "AWS for FREE on Your Laptop • 47 Services • No Credit Card",
    channel: "DataSense",
    views: "18K Views",
    duration: "09:05",
    category: "Cloud",
    icon: <Database size={14} className="text-blue-500" />
  },
  {
    id: 'F1B3KRG-A1w',
    title: "Claude Fable 5 vs GPT-5.5 Play Chess: One Broke the Rules",
    channel: "DataSense",
    views: "100k Views",
    duration: "10:45",
    category: "AI Challenge",
    icon: <Brain size={14} className="text-purple-500" />
  },
  {
    id: 'b8kFTTFh-_I',
    title: "How to Upload a Project to GitHub from Your Laptop",
    channel: "DataSense",
    views: "8K Views",
    duration: "36:12",
    category: "GitHub",
    icon: <Code size={14} className="text-emerald-500" />
  },
  {
      id: 'sMeeC6IJ2Qo',
      title: "Complete SQL Roadmap for Data Science",
      channel: "DataSense",
      views: "8.5K views",
      duration: "45:20",
      category: "SQL Mastery",
      icon: <Database size={14} className="text-blue-500"/>
},

{

    id: 'W-jQg5D1RoE',
    title: "Power BI 15 Day Crash Course - Full Playlist",
    channel: "DataSense",
    views: "25K views",
    duration: "1:30:00",
    category: "Power BI",
    icon: <BarChart size={14} className="text-orange-500"/>

},
  {
    id: '1wND5uT3H7A',
    title: "Reinforcement Learning for First-Timers",
    channel: "DataSense",
    views: "15K Views",
    duration: "01:06:13",
    category: "AI/ML",
    icon: <Brain size={14} className="text-purple-500" />
  }


];
  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  return (
    <section id="youtube-studio" className="w-full py-16 px-5 sm:px-6">
      <div className="mx-auto max-w-[1320px]">
        
        {/* --- HEADER SECTION --- */}
        <div className="mb-10 border-b border-slate-200 pb-6">
          
          {/* Logo & Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md shadow-blue-500/10 relative">
  {/* 1. Invisible SVG Definition for the Linear Gradient */}
  <svg className="absolute w-0 h-0" width="0" height="0">
    <defs>
      {/* Mapping your exact colors: cyan-700 (#0e7490), teal-600 (#0d9488), and blue-400 (#60a5fa) */}
      <linearGradient id="playIconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0e7490" />   {/* cyan-700 */}
        <stop offset="50%" stopColor="#0d9488" />  {/* teal-600 */}
        <stop offset="100%" stopColor="#60a5fa" /> {/* blue-400 */}
      </linearGradient>
    </defs>
  </svg>

  {/* 2. Reference the gradient ID in the fill & stroke attributes */}
  <PlayIcon 
    size={20} 
    fill="url(#playIconGradient)" 
    stroke="url(#playIconGradient)" 
  />
</div>

                <h2 className="text-[28px] font-extrabold text-slate-950 tracking-tight">
            CareerSense{" "}
            <span className="bg-gradient-to-r from-cyan-700 via-teal-600 to-blue-400 bg-clip-text text-transparent">
              Studio
            </span>
          </h2>
            </div>
            
            {/* Embedded Direct Subscribe CTA */}
            <a 
                href={`https://www.youtube.com/watch?v=${currentVideo.id}`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex max-w-max items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 px-5 py-2.5 text-[13px] font-bold text-white transition-all shadow-[0_4px_12px_rgba(37,99,235,0.2)] hover:brightness-105 active:scale-95"
            >
                Subscribe to Channel <ExternalLink size={14}/>
            </a>
          </div>

          {/* --- CHANNEL NAVIGATION BAR --- */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {channelTabs.map((tab) => (
                  <a 
                      key={tab.name}
                      href={tab.url}
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200/60 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all text-[13px] font-bold whitespace-nowrap group shadow-sm"
                  >
                      <span className="text-slate-400 group-hover:text-blue-500 transition-colors">
                          {tab.icon}
                      </span>
                      {tab.name}
                  </a>
              ))}
          </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: Main Video Player */}
          <div className="lg:col-span-2 flex flex-col gap-5">
              <div className="relative w-full pt-[56.25%] bg-slate-950 rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-200/80 group">
                  <iframe 
                      src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=0&rel=0`} 
                      title="YouTube video player"
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                  ></iframe>
              </div>
              
              {/* Video Info Card */}
              <div className="p-6 bg-white rounded-[24px] border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.02)]">
                  <div className="flex flex-col gap-3">
                      <h1 className="text-[22px] font-bold text-slate-900 leading-snug tracking-tight">
                          {currentVideo.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-3 text-[13px] text-slate-500">
                          <span className="font-bold text-slate-800">{currentVideo.channel}</span>
                          <span className="text-slate-300">•</span>
                          <span>{currentVideo.views}</span>
                          <span className="text-slate-300">•</span>
                          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg text-xs font-semibold">
                              {currentVideo.icon} {currentVideo.category}
                          </span>
                      </div>
                  </div>
              </div>
          </div>

          {/* RIGHT: Playlist Sidebar */}
          <div className="lg:col-span-1 flex flex-col h-full">
              <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.03)] overflow-hidden flex flex-col h-full max-h-[490px] md:max-h-[515px]">
                  
                  {/* Playlist Header */}
                  <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <h3 className="font-bold text-slate-900 text-[15px] flex items-center gap-2">
                          Up Next
                      </h3>
                      <span className="text-[11px] font-bold tracking-wider text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-md uppercase">Autoplay</span>
                  </div>

                  {/* Video List */}
                  <div className="overflow-y-auto p-3 space-y-2 flex-1 custom-scrollbar">
                      {videos.map((video) => (
                          <div 
                              key={video.id}
                              onClick={() => setCurrentVideo(video)}
                              className={`group flex gap-3.5 p-2.5 rounded-xl cursor-pointer transition-all duration-300 border ${
                                  currentVideo.id === video.id 
                                  ? 'bg-blue-50/70 border-blue-100' 
                                  : 'bg-transparent border-transparent hover:bg-slate-50'
                              }`}
                          >
                              {/* Thumbnail Container */}
                              <div className="relative w-28 shrink-0 aspect-video rounded-lg overflow-hidden bg-slate-100 shadow-sm">
                                  <img 
                                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                                      alt={video.title} 
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                  />
                                  <div className="absolute bottom-1 right-1 bg-slate-950/80 text-white text-[10px] font-bold px-1 py-0.5 rounded flex items-center gap-1 backdrop-blur-xs">
                                      <Clock size={9} /> {video.duration}
                                  </div>
                                  
                                  {currentVideo.id === video.id && (
                                      <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-xs flex items-center justify-center">
                                          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                                              <Play size={11} fill="currentColor" className="ml-0.5" />
                                          </div>
                                      </div>
                                  )}
                              </div>

                              {/* Meta Details */}
                              <div className="flex flex-col justify-center min-w-0">
                                  <h4 className={`text-[13px] font-bold leading-snug mb-1 line-clamp-2 transition-colors ${
                                      currentVideo.id === video.id ? 'text-blue-600' : 'text-slate-800 group-hover:text-slate-950'
                                  }`}>
                                      {video.title}
                                  </h4>
                                  <div className="text-[11px] text-slate-400 font-medium flex flex-col gap-0.5">
                                      <span>{video.channel}</span>
                                      <span className="opacity-80">{video.views}</span>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
                  
                  {/* CTA Footer */}
                  <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
                      <a 
                        href="https://www.youtube.com/@Senseofdata" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-[11px] font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-wider block"
                      >
                          View Full Channel
                      </a>
                  </div>
              </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default YouTubePanel;
