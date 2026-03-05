/* ==============================
   Designer Workspace — script.js
   ============================== */

// ---- Page meta ----
const PAGE_META = {
  home:     { label: 'ホーム',           subtitle: 'ダッシュボード' },
  projects: { label: 'デザイン案件管理', subtitle: 'プロジェクトの進捗を管理' },
  school:   { label: 'スクール課題管理', subtitle: '課題の進捗を追跡' },
  notes:    { label: '学習ノート',       subtitle: 'アイデアと知識をメモ' },
  tasks:    { label: 'タスク / ToDo',    subtitle: 'タスクを整理して集中' },
  ideas:    { label: 'アイデア・SNS',    subtitle: '投稿ドラフトを管理' },
  income:   { label: '収入管理',         subtitle: '売上と収入を把握' },
};

let currentPage = 'home';

// ---- Navigate ----
function navigate(page) {
  if (!PAGE_META[page]) return;
  currentPage = page;

  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });

  // Update header subtitle
  const meta = PAGE_META[page];
  document.getElementById('pageSubtitle').textContent = meta.label;

  // Render content
  const area = document.getElementById('pageArea');
  area.classList.remove('page-enter');
  void area.offsetWidth; // force reflow for re-animation
  area.classList.add('page-enter');
  area.innerHTML = renderPage(page);
}

// ---- Page renderer ----
function renderPage(page) {
  if (page === 'home') {
    return `
      <div class="space-y-6">

        <!-- サマリーカード 4枚 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <!-- 1: 今日のタスク -->
          <div class="bg-[#1c1930] border border-[#2a2545] rounded-2xl p-5 flex flex-col gap-4 hover:border-indigo-500/40 transition-colors">
            <div class="flex items-start justify-between">
              <div class="w-10 h-10 rounded-full flex items-center justify-center
                          bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 flex-shrink-0">
                <i class="fas fa-check text-white text-sm"></i>
              </div>
              <span class="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full font-medium">Today</span>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">今日のタスク</p>
              <p class="text-3xl font-bold text-white leading-none">5</p>
              <p class="text-xs text-gray-500 mt-2">
                <span class="text-emerald-400 font-medium">3件 完了済み</span>
                &nbsp;· 残り 2件
              </p>
            </div>
          </div>

          <!-- 2: 進行中案件 -->
          <div class="bg-[#1c1930] border border-[#2a2545] rounded-2xl p-5 flex flex-col gap-4 hover:border-indigo-500/40 transition-colors">
            <div class="flex items-start justify-between">
              <div class="w-10 h-10 rounded-full flex items-center justify-center
                          bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 flex-shrink-0">
                <i class="fas fa-briefcase text-white text-sm"></i>
              </div>
              <span class="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full font-medium">Active</span>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">進行中案件</p>
              <p class="text-3xl font-bold text-white leading-none">3</p>
              <p class="text-xs text-gray-500 mt-2">
                <span class="text-amber-400 font-medium">2件 今週締切</span>
                &nbsp;· 要確認
              </p>
            </div>
          </div>

          <!-- 3: 今月の収入合計 -->
          <div class="bg-[#1c1930] border border-[#2a2545] rounded-2xl p-5 flex flex-col gap-4 hover:border-indigo-500/40 transition-colors">
            <div class="flex items-start justify-between">
              <div class="w-10 h-10 rounded-full flex items-center justify-center
                          bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30 flex-shrink-0">
                <i class="fas fa-yen-sign text-white text-sm"></i>
              </div>
              <span class="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full font-medium">今月</span>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">今月の収入合計</p>
              <p class="text-3xl font-bold text-white leading-none">¥120,000</p>
              <p class="text-xs text-gray-500 mt-2">
                <span class="text-emerald-400 font-medium">↑ 先月比 +15%</span>
              </p>
            </div>
          </div>

          <!-- 4: 学習ログ -->
          <div class="bg-[#1c1930] border border-[#2a2545] rounded-2xl p-5 flex flex-col gap-4 hover:border-indigo-500/40 transition-colors">
            <div class="flex items-start justify-between">
              <div class="w-10 h-10 rounded-full flex items-center justify-center
                          bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg shadow-teal-500/30 flex-shrink-0">
                <i class="fas fa-book-open text-white text-sm"></i>
              </div>
              <span class="text-[10px] text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full font-medium">学習</span>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">学習ログ（今月累計）</p>
              <p class="text-3xl font-bold text-white leading-none">12<span class="text-lg font-semibold text-gray-400">h</span></p>
              <p class="text-xs text-gray-500 mt-2">
                今週 <span class="text-teal-400 font-medium">3.5h</span>
                &nbsp;· 昨日比 +1h
              </p>
            </div>
          </div>

        </div>

        <!-- 最近の更新 -->
        <div class="bg-[#1c1930] border border-[#2a2545] rounded-2xl overflow-hidden">
          <div class="px-5 py-4 border-b border-[#2a2545] flex items-center justify-between">
            <h3 class="text-sm font-semibold text-gray-200">最近の更新</h3>
            <span class="text-xs text-gray-600">過去7日間</span>
          </div>
          <ul class="divide-y divide-[#2a2545]">

            <li class="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
              <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                          bg-gradient-to-br from-blue-500 to-indigo-600">
                <i class="fas fa-briefcase text-white text-xs"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-200 truncate">ブランディングロゴ — 修正提出</p>
                <p class="text-xs text-gray-500">案件管理</p>
              </div>
              <span class="text-xs text-gray-600 flex-shrink-0">2時間前</span>
            </li>

            <li class="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
              <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                          bg-gradient-to-br from-purple-500 to-pink-600">
                <i class="fas fa-graduation-cap text-white text-xs"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-200 truncate">タイポグラフィ演習 — 完了</p>
                <p class="text-xs text-gray-500">スクール課題</p>
              </div>
              <span class="text-xs text-gray-600 flex-shrink-0">昨日</span>
            </li>

            <li class="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
              <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                          bg-gradient-to-br from-teal-500 to-cyan-600">
                <i class="fas fa-book-open text-white text-xs"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-200 truncate">Figma Auto Layout — ノート追加</p>
                <p class="text-xs text-gray-500">学習ノート</p>
              </div>
              <span class="text-xs text-gray-600 flex-shrink-0">2日前</span>
            </li>

          </ul>
        </div>

      </div>
    `;
  }

  const meta = PAGE_META[page];
  return `
    <div class="flex flex-col items-center justify-center py-24 text-center">
      <div class="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4">
        <i class="fas fa-tools text-indigo-400 text-2xl"></i>
      </div>
      <h2 class="text-xl font-bold text-gray-300 mb-2">${meta.label}</h2>
      <p class="text-sm text-gray-500">このページは近日公開予定です</p>
    </div>
  `;
}

// ---- Dark mode ----
let isDark = localStorage.getItem('dw_dark') !== 'false'; // default: dark

function applyDark() {
  document.documentElement.classList.toggle('dark', isDark);
  const icon = document.querySelector('#darkToggle i');
  if (icon) {
    icon.className = isDark ? 'fas fa-sun text-sm' : 'fas fa-moon text-sm';
    document.getElementById('darkToggle').classList.toggle('text-yellow-400', isDark);
    document.getElementById('darkToggle').classList.toggle('text-gray-400', !isDark);
  }
}

// ---- Header date ----
function setHeaderDate() {
  const el = document.getElementById('headerDate');
  if (!el) return;
  el.textContent = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short'
  });
}

// ---- Mobile sidebar ----
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('overlay').classList.remove('hidden');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.add('hidden');
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  applyDark();
  setHeaderDate();
  navigate('home');

  // Nav click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigate(link.dataset.page);
      closeSidebar();
    });
  });

  // Dark mode toggle
  document.getElementById('darkToggle').addEventListener('click', () => {
    isDark = !isDark;
    localStorage.setItem('dw_dark', isDark);
    applyDark();
  });

  // Mobile menu
  document.getElementById('mobileMenuBtn')?.addEventListener('click', openSidebar);
});
