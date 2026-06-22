import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const NAV = ['Главная', 'Генератор', 'Галерея', 'Подписка', 'API', 'Помощь'];

const MODELS = [
  { name: 'Veo 3.1', type: 'Видео', icon: 'Clapperboard', desc: 'Кинематографичное видео с озвучкой' },
  { name: 'Kling 3.0', type: 'Видео', icon: 'Film', desc: 'Реалистичная физика движения' },
  { name: 'Grok Video', type: 'Видео', icon: 'Video', desc: 'Быстрая генерация роликов' },
  { name: 'Seedance 2.0', type: 'Видео', icon: 'Sparkles', desc: 'Анимация персонажей' },
  { name: 'Nano Banana 2.0', type: 'Фото', icon: 'Image', desc: 'Молниеносная генерация картинок' },
  { name: 'Seedream 5.0', type: 'Фото', icon: 'Palette', desc: 'Художественные иллюстрации' },
  { name: 'GPT Image 2', type: 'Фото', icon: 'Aperture', desc: 'Точное следование промпту' },
  { name: 'WAN 2.7', type: 'Фото', icon: 'ImagePlus', desc: 'Фотореализм нового уровня' },
  { name: 'Suno', type: 'Аудио', icon: 'Music', desc: 'Музыка и вокал по тексту' },
];

const TABS = ['Видео', 'Фото', 'Аудио'] as const;

const SYNTAX: Record<string, { hint: string; chips: string[] }> = {
  'Видео': { hint: 'Kling / Veo синтаксис: [сцена], [движение камеры], [стиль], --duration 5s', chips: ['cinematic shot', 'slow zoom in', 'golden hour', '4k hyperreal', '--duration 10s'] },
  'Фото': { hint: 'GPT-Image синтаксис: subject, lighting, lens, style, --ar 16:9', chips: ['ultra detailed', 'soft studio light', '85mm lens', 'dark palette', '--ar 1:1'] },
  'Аудио': { hint: 'Suno синтаксис: [жанр], [настроение], [инструменты], [vocal: male/female]', chips: ['orchestral', 'epic build-up', '[verse]', '[chorus]', 'female vocal'] },
};

const PLANS = [
  { name: 'Дебют', price: '0₽', period: 'навсегда', features: ['30 генераций/мес', 'Фото 720p', 'Помощник промптов'], accent: false },
  { name: 'Престиж', price: '990₽', period: 'в месяц', features: ['Безлимит фото', 'Видео 4K', 'Все нейросети', 'Без водяных знаков'], accent: true },
  { name: 'Империал', price: '3 490₽', period: 'в месяц', features: ['Всё из Престиж', 'API доступ', 'Приоритет очереди', 'Команда до 5 чел.'], accent: false },
];

const HERO_IMG = 'https://cdn.poehali.dev/projects/9cc8405e-1d47-4203-b837-77e41c00918e/files/25107c46-9484-4ed9-9be6-d710aa55823d.jpg';
const PORTRAIT_IMG = 'https://cdn.poehali.dev/projects/9cc8405e-1d47-4203-b837-77e41c00918e/files/ae54987f-1b49-4bb1-ae98-0f4a3df166ef.jpg';

const Index = () => {
  const [tab, setTab] = useState<typeof TABS[number]>('Видео');
  const [prompt, setPrompt] = useState('');

  const addChip = (c: string) => setPrompt((p) => (p ? `${p}, ${c}` : c));

  return (
    <div className="min-h-screen bg-luxe text-foreground overflow-x-hidden">
      <div className="fixed inset-0 luxe-lines pointer-events-none opacity-70" />

      {/* NAV */}
      <header className="sticky top-0 z-50">
        <nav className="glass mx-3 mt-3 px-6 py-4 flex items-center justify-between max-w-7xl xl:mx-auto gold-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-crimson/60 flex items-center justify-center glow-red">
              <Icon name="Flame" size={18} className="text-crimson" />
            </div>
            <span className="font-display font-bold text-2xl tracking-wide">NÉRA<span className="text-gold">FORGE</span></span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <a key={n} href="#" className="px-3 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors">{n}</a>
            ))}
          </div>
          <Button className="bg-crimson hover:bg-crimson-deep text-white rounded-none uppercase tracking-widest text-xs px-6 border-0">
            Войти
          </Button>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-5 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="h-px w-12 bg-gold" />
              <span className="text-xs uppercase tracking-[0.3em] text-gold font-mono">9 нейросетей · премиум</span>
            </div>
            <h1 className="font-display font-bold text-6xl md:text-7xl leading-[0.95] tracking-tight mb-8">
              Искусство, <br />рождённое <span className="text-gradient italic">алгоритмом</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-10 max-w-md font-light leading-relaxed">
              Veo 3.1, Kling 3.0, Suno и другие топовые модели в одном изысканном пространстве. Умный помощник подскажет идеальный промпт.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-crimson hover:bg-crimson-deep text-white rounded-none uppercase tracking-widest text-sm h-13 px-8 py-4 border-0 glow-red">
                <Icon name="Wand2" size={18} className="mr-3" /> Начать творить
              </Button>
              <Button size="lg" variant="outline" className="rounded-none uppercase tracking-widest text-sm h-13 px-8 py-4 glass gold-border hover:text-gold bg-transparent">
                <Icon name="Play" size={18} className="mr-3" /> Демо
              </Button>
            </div>
            <div className="flex items-center gap-8 mt-10 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-2"><Icon name="Check" size={14} className="text-gold" /> Без карты</span>
              <span className="flex items-center gap-2"><Icon name="Check" size={14} className="text-gold" /> 30 генераций</span>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="relative overflow-hidden gold-border p-1.5 hover-lift">
              <img src={HERO_IMG} alt="AI генерация" className="w-full h-[460px] object-cover" />
              <div className="absolute bottom-6 left-6 right-6 glass-red p-4 flex items-center gap-3">
                <div className="w-10 h-10 border border-crimson/60 flex items-center justify-center shrink-0">
                  <Icon name="Sparkles" size={18} className="text-crimson" />
                </div>
                <p className="text-sm font-mono text-foreground/90 truncate">crimson silk, golden smoke --duration 10s</p>
              </div>
            </div>
            <div className="absolute -top-5 -right-4 glass-red px-5 py-3 flex items-center gap-2 gold-border">
              <Icon name="Music" size={16} className="text-gold" />
              <span className="text-xs uppercase tracking-widest">Suno · готово</span>
            </div>
          </div>
        </div>
      </section>

      {/* MODELS */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-mono">Коллекция</span>
          <h2 className="font-display font-bold text-5xl md:text-6xl mt-4">Топовые модели <span className="text-gradient italic">2026</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {MODELS.map((m, i) => (
            <div key={m.name} className="bg-card p-8 hover-lift group cursor-pointer" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 border border-crimson/40 flex items-center justify-center group-hover:border-crimson group-hover:glow-red transition-all">
                  <Icon name={m.icon} size={22} className="text-crimson" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-mono">{m.type}</span>
              </div>
              <h3 className="font-display font-semibold text-2xl mb-1">{m.name}</h3>
              <p className="text-sm text-muted-foreground font-light">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GENERATOR */}
      <section className="max-w-5xl mx-auto px-5 py-20">
        <div className="glass-red p-10 md:p-14">
          <div className="flex items-center gap-3 mb-8">
            <Icon name="Terminal" size={20} className="text-gold" />
            <h2 className="font-display font-bold text-4xl">Ателье промптов</h2>
          </div>

          <div className="flex gap-px bg-border mb-6 w-fit">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setPrompt(''); }}
                className={`px-7 py-3 text-xs uppercase tracking-widest transition-all ${
                  tab === t ? 'bg-crimson text-white glow-red' : 'bg-card text-muted-foreground hover:text-gold'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <p className="text-xs font-mono text-muted-foreground mb-4 flex items-center gap-2">
            <Icon name="Info" size={14} className="text-gold" /> {SYNTAX[tab].hint}
          </p>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Опишите ваш замысел..."
            className="w-full h-32 bg-input border border-border focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson/40 p-4 font-mono text-sm resize-none transition-all rounded-none"
          />

          <div className="flex flex-wrap gap-2 my-5">
            {SYNTAX[tab].chips.map((c) => (
              <button key={c} onClick={() => addChip(c)} className="text-xs font-mono px-3 py-1.5 border border-border hover:border-gold hover:text-gold transition-colors">
                + {c}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground font-mono uppercase tracking-widest">{prompt.length} символов</span>
            <Button className="bg-crimson hover:bg-crimson-deep text-white rounded-none uppercase tracking-widest text-sm h-12 px-8 border-0 glow-red">
              <Icon name="Sparkles" size={18} className="mr-3" /> Сгенерировать
            </Button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-mono">Витрина</span>
            <h2 className="font-display font-bold text-5xl mt-3">Галерея <span className="text-gradient italic">мастеров</span></h2>
          </div>
          <a href="#" className="text-xs uppercase tracking-widest text-gold hover:text-crimson flex items-center gap-2 transition-colors">Все работы <Icon name="ArrowRight" size={16} /></a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[HERO_IMG, PORTRAIT_IMG, HERO_IMG, PORTRAIT_IMG].map((src, i) => (
            <div key={i} className="relative overflow-hidden gold-border p-1 hover-lift group">
              <img src={src} alt={`Работа ${i + 1}`} className="w-full h-60 object-cover" />
              <div className="absolute inset-1 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-[10px] uppercase tracking-widest font-mono text-gold">{i % 2 === 0 ? 'Veo 3.1' : 'Seedream 5.0'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-mono">Привилегии</span>
          <h2 className="font-display font-bold text-5xl md:text-6xl mt-4">Изысканные <span className="text-gradient italic">тарифы</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <div key={p.name} className={`relative p-10 hover-lift ${p.accent ? 'glass-red glow-red' : 'glass gold-border'}`}>
              {p.accent && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest px-4 py-1 bg-crimson text-white">Выбор ценителей</span>
              )}
              <h3 className="font-display font-semibold text-3xl mb-3">{p.name}</h3>
              <div className="mb-8">
                <span className="font-display font-bold text-5xl">{p.price}</span>
                <span className="text-muted-foreground text-xs uppercase tracking-widest"> / {p.period}</span>
              </div>
              <ul className="space-y-4 mb-10">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm font-light">
                    <Icon name="Check" size={16} className="text-gold shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button className={`w-full rounded-none uppercase tracking-widest text-xs h-12 border-0 ${p.accent ? 'bg-crimson hover:bg-crimson-deep text-white' : 'bg-transparent gold-border hover:text-gold text-foreground'}`}>
                Выбрать
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="relative glass-red p-12 md:p-20 text-center overflow-hidden gold-border">
          <div className="absolute inset-0 bg-gradient-to-br from-crimson/15 via-transparent to-gold/5" />
          <div className="relative">
            <h2 className="font-display font-bold text-5xl md:text-7xl mb-6">Время создавать <span className="text-gradient italic">шедевры</span></h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto font-light">Присоединяйтесь к избранным креаторам. Первые 30 генераций — в подарок.</p>
            <Button size="lg" className="bg-crimson hover:bg-crimson-deep text-white rounded-none uppercase tracking-widest text-sm h-14 px-10 border-0 glow-red">
              <Icon name="Crown" size={18} className="mr-3" /> Открыть ателье
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border mt-8">
        <div className="max-w-7xl mx-auto px-5 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-crimson/60 flex items-center justify-center">
              <Icon name="Flame" size={15} className="text-crimson" />
            </div>
            <span className="font-display font-bold text-xl">NÉRAFORGE</span>
          </div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">© 2026 NéraForge · Искусство нейросетей</p>
          <div className="flex gap-3">
            {['Send', 'Github', 'Twitter'].map((s) => (
              <a key={s} href="#" className="w-9 h-9 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                <Icon name={s} size={16} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
