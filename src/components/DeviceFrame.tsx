import React, { useState } from 'react';
import { Smartphone, Monitor, Moon, Sun, RotateCcw, Wifi, Battery, Sparkles } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  onResetData: () => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  onResetData,
}) => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'expanded'>('mobile');
  const [isLightMode, setIsLightMode] = useState(false);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isLightMode ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      {/* Top Client Presentation Control Toolbar */}
      <header className={`px-4 sm:px-6 py-2.5 border-b transition-colors flex flex-wrap items-center justify-between gap-3 text-xs ${
        isLightMode ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-900/90 border-slate-800 text-slate-300'
      }`}>
        <div className="flex items-center gap-3">
          <span className="font-extrabold tracking-tight text-emerald-500 uppercase text-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            FitTrack UX Prototype
          </span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:inline text-slate-400">
            Nike Training Club-inspired Client Concept
          </span>
        </div>

        {/* Viewport switch & Theme Switch */}
        <div className="flex items-center gap-2">
          {/* Mobile frame vs Full Screen */}
          <div className={`flex items-center p-0.5 rounded-lg border ${
            isLightMode ? 'bg-slate-100 border-slate-300' : 'bg-slate-800 border-slate-700'
          }`}>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`min-h-[32px] px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium transition-colors ${
                deviceMode === 'mobile'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Frame</span>
            </button>
            <button
              onClick={() => setDeviceMode('expanded')}
              className={`min-h-[32px] px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium transition-colors ${
                deviceMode === 'expanded'
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Full View</span>
            </button>
          </div>

          {/* Theme Palette Toggle */}
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            className={`min-h-[36px] min-w-[36px] px-2 py-1 rounded-lg border flex items-center gap-1.5 transition-colors ${
              isLightMode
                ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Toggle between Balanced Slate and Clean Daylight palette"
          >
            {isLightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden sm:inline text-[11px]">
              {isLightMode ? 'Daylight' : 'Balanced'}
            </span>
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={onResetData}
            aria-label="Reset prototype demo data"
            className={`min-h-[36px] px-2.5 py-1 rounded-lg border flex items-center gap-1 text-[11px] font-medium transition-colors ${
              isLightMode
                ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <RotateCcw className="w-3 h-3 text-slate-400" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </header>

      {/* Main Container Area */}
      <main className="flex justify-center items-start p-0 sm:py-6 sm:px-4">
        {deviceMode === 'mobile' ? (
          /* Phone Bezel Simulator (iPhone 16 Pro Dimensions) */
          <div className="relative w-full sm:max-w-[412px] min-h-screen sm:min-h-[850px] sm:max-h-[920px] bg-slate-900 border-0 sm:border-[8px] sm:border-slate-800 sm:rounded-[48px] shadow-2xl overflow-hidden flex flex-col transition-all">
            {/* Mobile Top Status Bar */}
            <div className="hidden sm:flex items-center justify-between px-6 pt-3 pb-1 bg-slate-900/90 text-slate-300 text-xs font-semibold select-none shrink-0 z-40">
              <span>9:41</span>
              {/* Dynamic Island Pill */}
              <div className="w-20 h-4 bg-slate-950 rounded-full mx-auto" />
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Inner Mobile Scroll Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col no-scrollbar">
              {children}
            </div>

            {/* iPhone Home Swipe Indicator Bar */}
            <div className="hidden sm:block py-1.5 bg-slate-900 shrink-0">
              <div className="w-32 h-1 bg-slate-600 rounded-full mx-auto" />
            </div>
          </div>
        ) : (
          /* Expanded Viewport Mode */
          <div className="w-full max-w-4xl min-h-[860px] bg-slate-900/95 sm:rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
